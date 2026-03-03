import { getAddress } from "@/controllers/address.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        await dbConnect();
        const {id} = await params;
        const address = await getAddress(req, {addressId: id});
        return NextResponse.json({
            success: true,
            message: "Address fetched successfully",
            address
        },
        {
            status: 200
        }
    );
    } catch (error: any) {
        console.log("Issue: ", error.message);
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