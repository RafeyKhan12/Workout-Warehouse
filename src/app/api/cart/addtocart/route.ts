import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConnect/dbConnect";
import { addToCart } from "@/controllers/cart.controller";

export async function POST(req: NextRequest){
    try {
        await dbConnect();
        const body = await req.json();
        console.log("Body: ", body);
        const item = await addToCart(body, req);
        return NextResponse.json({
            success: true,
            message: "Item added to cart successfully.",
            item
        },
        {
            status: 201
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