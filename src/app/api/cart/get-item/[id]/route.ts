import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConnect/dbConnect";
import { getItem } from "@/controllers/cart.controller";

export async function GET(_req: NextRequest, {params} : {params: Promise<{id: string}>}) {
    try {
        await dbConnect();
        const {id} = await params;
        const item = await getItem(id);
        return NextResponse.json({
            success: true,
            message: "Item fetched successfully",
            item
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