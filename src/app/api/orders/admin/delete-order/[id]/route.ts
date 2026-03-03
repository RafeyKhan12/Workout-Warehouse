import { deleteOrder } from "@/controllers/order.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_req: NextRequest, {params} : {params: Promise<{id: string}>}){
    try {
        await dbConnect();
        const {id} = await params;
        const deletedOrder = await deleteOrder({orderId: id});
        return NextResponse.json({
            success: true,
            message: "Order deleted successfully",
            deletedOrder
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