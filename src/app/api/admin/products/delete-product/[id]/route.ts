import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConnect/dbConnect";
import { deleteProduct } from "@/controllers/product.controller";

export async function DELETE(_req: NextRequest, context: {params: Promise<{id: string}>}){
    try {
        await dbConnect();
        const { id } = await context.params;
        const product = await deleteProduct(id);
        return NextResponse.json({
            success: true,
            message: "Product deleted successfully",
            product,
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
            status: 401
        }
    )
    }
}