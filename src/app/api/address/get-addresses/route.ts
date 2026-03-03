import { getAddresses } from "@/controllers/address.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        await dbConnect();
        const addresses = await getAddresses(req);
        return NextResponse.json({
            success: true,
            message: "Addresses fetched successfully",
            addresses
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