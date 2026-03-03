import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@/models/user.model";
import { dbConnect } from "@/dbConnect/dbConnect";

export async function getUser() {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return null;

  const decoded: any = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!
  );

  await dbConnect();

  const user = await User.findById(decoded._id).select(
    "username email role avatar"
  );

  return user;
}
