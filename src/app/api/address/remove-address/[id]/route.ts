import { removeAddress } from "@/controllers/address.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        await dbConnect();
        const { id } = await params;
        const address = await removeAddress(req, {addressId: id});
        return NextResponse.json({
            success: true,
            message: "Address removed successfully",
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