import { createPaymentIntent } from "@/controllers/payment.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        await dbConnect();

        const { orderId } = await req.json();
        const clientSecret = await createPaymentIntent(req, orderId);
        console.log("Client Secret from Route: ", clientSecret);
        return NextResponse.json({
            success: true,
            message: "Payment Intent created",
            clientSecret
        },
        {
            status: 201
        }
    );
    }catch(err: any){
        console.log("Error: ", err.message);
        return NextResponse.json({
            success: false,
            message: err.message
        },
        {
            status: 400
        }
    )
    }
}