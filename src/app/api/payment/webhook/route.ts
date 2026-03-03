import { dbConnect } from "@/dbConnect/dbConnect";
import { stripe } from "@/helpers/stripe";
import { Order } from "@/models/order.model";
import { Payment } from "@/models/payment.model";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        await dbConnect();
        const body = await req.text();
        const signature = (await headers()).get("stripe-signature")!;

        let event;
        try{
            event = stripe.webhooks.constructEvent(
                body, 
                signature,
                process.env.STRIPE_WEBHOOK_SECRET!
            )
        } catch(err: any){
            return NextResponse.json({
                success: false,
                message: err.message
            },
            {
                status: 400
            }
        )
        }
        if(event.type === "payment_intent.succeeded"){
            const intent = event.data.object;
            const orderId = intent.metadata.order;
            await Payment.findOneAndUpdate(
                {transactionId: intent.id},
                {status: "successful"}
            );
            await Order.findByIdAndUpdate(orderId,
                {
                    status: "paid",
                    paymentStatus: "paid"
                }
            )
            
        }
        if(event.type === "payment_intent.payment_failed"){
            const intent = event.data.object;
            const orderId = intent.metadata.order;
            
            await Payment.findOneAndUpdate(
                {transactionId: intent.id},
                {status: "failed"}
            )
            await Order.findByIdAndUpdate(orderId, {
                status: "cancelled",
                paymentStatus: "unpaid"
            })
        }
        return NextResponse.json({
            success: true,
            message: "OK"
        },
        {
            status: 200
        }
    );
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        },
        {
            status: 400
        }
    )
    }
}