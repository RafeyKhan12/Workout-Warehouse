import { addAddress } from "@/controllers/address.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        await dbConnect();
        const body = await req.json();
        const address = await addAddress(req, body);
        return NextResponse.json({
            success: true,
            message: "Address added successfully",
            address
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