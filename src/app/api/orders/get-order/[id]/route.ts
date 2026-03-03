import { getUserOrder } from "@/controllers/order.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        await dbConnect();
        const {id} = await params;
        const order = await getUserOrder({orderId: id});
        return NextResponse.json({
            success: true,
            message: "Order fetched successfully",
            order
        },
        {
            status: 200
        }
    )
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