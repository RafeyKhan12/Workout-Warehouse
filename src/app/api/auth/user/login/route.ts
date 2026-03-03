import { loginUser } from "@/controllers/user.controller";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConnect/dbConnect";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { accessToken, refreshToken, loggedInUser } = await loginUser(body);

    const response = NextResponse.json(
      {
        success: true,
        message: "Log in successful",
        loggedInUser,
      },
      { status: 200 }
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 15, // 15 minutes
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}
