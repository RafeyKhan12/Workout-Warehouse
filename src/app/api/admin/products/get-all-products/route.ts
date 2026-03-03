import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConnect/dbConnect";
import { getAllProducts } from "@/controllers/product.controller";

export async function GET(){
    try {
        await dbConnect();
        const products = await getAllProducts();
        return NextResponse.json({
            success: true,
            message: "Fetched All Products",
            products
        },
        {
            status: 200
        }
    );        
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Failed to load products"
        },
        {
            status: 401
        }
    )
    }
}