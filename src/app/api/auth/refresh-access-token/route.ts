import { refreshAccessToken } from "@/controllers/user.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await dbConnect();
        const {newAccessToken, newRefreshToken} = await refreshAccessToken(req);
        const response = NextResponse.json(
            {accessToken: newAccessToken},
            {status: 200}
        );

        response.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7
        });

        return response;
    } catch (error: any) {
        console.log("Error: ", error.message);
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