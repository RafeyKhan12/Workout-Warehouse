import { getAllUsers } from "@/controllers/user.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnect();
        const users = await getAllUsers();
        return NextResponse.json({
            success: true,
            message: "Fetched all users",
            users
        })
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