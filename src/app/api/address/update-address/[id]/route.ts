import { editAddress } from "@/controllers/address.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, {params} : {params: Promise<{id: string}>}){
    try {
        await dbConnect();
        const body = await req.json();
        const {id} = await params;
        const address = await editAddress(req, {...body, addressId: id});
        return NextResponse.json({
            success: true,
            message: "Address updated successfully",
            address
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