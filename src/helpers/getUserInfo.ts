import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user.model";

export const getUserInfo = async (req: NextRequest) => {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader)
    throw new Error("Unauthorized request");
  try {
    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("accessToken="))
      ?.split("=")[1];
    if (!token)
      throw new Error("Unauthorized");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      _id: string;
    };
    const user = await User.findById(decoded._id).select(
      "-password -refreshToken",
    );
    if (!user)
      throw new Error("User not found");
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
