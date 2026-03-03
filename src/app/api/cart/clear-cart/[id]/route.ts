import { clearCart } from "@/controllers/cart.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
    try {
        await dbConnect();
        const {id} = await params;
        const cart = await clearCart(id, req);
        return NextResponse.json({
            success: true,
            message: "Cart cleared",
            cart
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