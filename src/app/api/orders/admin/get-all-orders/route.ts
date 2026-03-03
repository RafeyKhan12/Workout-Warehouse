import { getOrders } from "@/controllers/order.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnect();
        const orders = await getOrders();
        return NextResponse.json({
            success: true,
            message: "Fetched orders successfully",
            orders
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