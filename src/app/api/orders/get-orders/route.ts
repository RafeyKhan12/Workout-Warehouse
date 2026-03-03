import { getUserOrders } from "@/controllers/order.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest){
    try {
        await dbConnect();
        const orders = await getUserOrders(req);
        return NextResponse.json({
            success: true,
            message: "Orders fetched successfully",
            orders
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