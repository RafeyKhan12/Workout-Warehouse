import { Payment } from "@/models/payment.model";
import { Order } from "@/models/order.model";
import { NextRequest } from "next/server";
import { getUserInfo } from "@/helpers/getUserInfo";
import { stripe } from "@/helpers/stripe";

export const createPaymentIntent = async (req: NextRequest, orderId: string) => {
    try {
        const user = await getUserInfo(req);
        if(!user) throw new Error("Unauthorized request");
        const order = await Order.findById(orderId);
        if(!order) throw new Error("Order does not exist");
        const totalAmount = order.totalAmount;
        const paymentType = order.paymentType;

        if(order.paymentStatus === "paid"){
            throw new Error("Order already paid");
        }

        const existingPayment = await Payment.findOne({
            order: order._id,
            status: "pending",
        });
        
        if (existingPayment) {
            const intent = await stripe.paymentIntents.retrieve(
                existingPayment.transactionId
            );
            return intent.client_secret;
        }
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100,
            currency: "inr",
            automatic_payment_methods: {enabled: true},
            metadata: {
                user: user._id.toString(),
                order: order._id.toString()
            }
        });

        const payment = await Payment.create({
            user: user._id,
            order: order._id,
            totalAmount,
            paymentType,
            currency: "INR",
            status: "pending",
            transactionId: paymentIntent.id
        });

        return paymentIntent.client_secret;
    } catch (error: any) {
        throw new Error(error.message);
    }
}