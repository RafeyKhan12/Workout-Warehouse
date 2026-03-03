import { editUser } from "@/controllers/user.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.formData();
        const data = {
            username: body.get("username") as string,
            password: body.get("password") as string,
            avatarFile: body.get("avatarFile") as File | null
        }
        const updatedUser = await editUser(data, req);
        return NextResponse.json({
            success: true,
            message: "User updated successfully",
            updatedUser
        },
        {
            status: 200
        }
    );
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