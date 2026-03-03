import { registerUser } from "@/controllers/user.controller";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConnect/dbConnect";

export const runtime = "nodejs";

export async function POST(req: NextRequest){
    try {
        await dbConnect();
        const body = await req.formData();
        const data: any = {
            username: body.get("username") as string,
            email: body.get("email") as string,
            password: body.get("password") as string,
            confirmPassword: body.get("confirmPassword") as string,
            avatarFile: body.get("avatarFile") as File | null
        };

        const user = await registerUser(data);
    
        return NextResponse.json({
            success: true,
            user
        },
        {status: 201}
    );
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        },
        {
            status: 400
        }
    )}
};

