import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConnect/dbConnect";
import { getProduct } from "@/controllers/product.controller";

export async function GET(_req: NextRequest, data: {params: Promise<{id: string}>}){
    try {
        await dbConnect();

        const {id} = await data.params;
        const product = await getProduct(id);

        return NextResponse.json({
            success: true,
            message: "Product fetching success",
            product
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