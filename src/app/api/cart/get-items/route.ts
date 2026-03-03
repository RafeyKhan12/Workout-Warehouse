import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConnect/dbConnect";
import { getAllItems } from "@/controllers/cart.controller";

export async function GET(req: NextRequest){
    try {
        await dbConnect();
        const items = await getAllItems(req);
        return NextResponse.json({
            success: true,
            message: "Items fetched successfully",
            items
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