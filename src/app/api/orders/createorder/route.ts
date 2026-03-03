import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConnect/dbConnect";
import { createOrder } from "@/controllers/order.controller";

export async function POST(req: NextRequest){
    try {
        await dbConnect();
        const body = await req.json();
        const order = await createOrder(req, body);
        return NextResponse.json({
            success: true,
            message: "Order placed successfully",
            order,
        },
        {
            status: 201
        }
    )
    } catch (error: any) {
        console.log("Coming from Route: ", error.message);
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