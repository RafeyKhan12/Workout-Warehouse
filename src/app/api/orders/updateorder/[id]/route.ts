import { updateOrder } from "@/controllers/order.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        await dbConnect();
        const body = await req.json();
        const {id} = await params;
        const updatedOrder = await updateOrder(req, {orderId: id, ...body});
        return NextResponse.json({
            success: true,
            message: "Order updated successfully",
            updatedOrder
        },
        {
            status: 200
        }
    );
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message,
        },
        {
            status: 400
        }
    )
    }
}