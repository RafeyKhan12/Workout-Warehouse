import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConnect/dbConnect";
import { removeFromCart } from "@/controllers/cart.controller";

export async function DELETE(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        await dbConnect();
        const body = await req.json();
        const {id} = await params;
        const deletedItem = await removeFromCart(id, body);

        return NextResponse.json({
            success: true,
            message: "Item Removed from cart",
            deletedItem
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