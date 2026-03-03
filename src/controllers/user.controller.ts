import { getUserInfo } from "@/helpers/getUserInfo";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { uploadToCloudinaryImage } from "@/helpers/cloudinary";

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatarFile?: File | null;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface editPayload {
  username: string;
  password: string;
  avatarFile?: File | null;
}

const registerUser = async (payload: RegisterPayload) => {
  try {
    const { username, email, password, confirmPassword, avatarFile } = payload;
    if (!username || !email || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    if (password !== confirmPassword) {
      throw new Error("Password does not match");
    }
    let avatar: string | undefined;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (avatarFile) {
      const buffer = Buffer.from(await avatarFile.arrayBuffer());
      const file = await uploadToCloudinaryImage(buffer, "profilePictures");
      avatar = file.secure_url;
    }
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "client";
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar,
      role,
    });

    if (!user) throw new Error("Error while creating user");
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const loginUser = async (payload: LoginPayload) => {
  try {
    const { email, password } = payload;
    if (!email || !password) {
      throw new Error("Atleast one field is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Password does not match");

    const accessToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    user.refreshToken = refreshToken;
    await user.save();
    const loggedInUser = await User.findOne({ email }).select(
      "-password -refreshToken",
    );
    return { accessToken, refreshToken, loggedInUser };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const editUser = async (payload: editPayload, req: NextRequest) => {
  try {
    const { username, password, avatarFile } = payload;
    if (!username && !password && !avatarFile) {
      throw new Error("Atleast one field is required.");
    }
    const updateData: any = {};
    if (username) updateData.username = username;
    if (password) updateData.password = await bcrypt.hash(password, 10);
    if (avatarFile && avatarFile instanceof File) {
      const buffer = Buffer.from(await avatarFile.arrayBuffer());
      const file = await uploadToCloudinaryImage(buffer, "profilePictures");
      updateData.avatar = file.secure_url;
    }
    const fetchUser = await getUserInfo(req);
    const user = await User.findByIdAndUpdate(fetchUser._id, updateData, {
      new: true,
    });
    if (!user) throw new Error("Error occured while updating user");
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteUser = async (req: NextRequest) => {
  try {
    const fetchUser = await getUserInfo(req);
    const user = await User.findByIdAndDelete(fetchUser._id);
    if (!user) throw new Error("Error occured while deleting user");
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getMe = async (req: NextRequest) => {
  try {
    const fetchUser = await getUserInfo(req);
    const user = await User.findById(fetchUser._id).select(
      "-password -refreshToken",
    );
    if (!user) throw new Error("User does not exist");
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find().select("-password -refreshToken");
    if (users.length === 0) throw new Error("No users found");
    return users;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const refreshAccessToken = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("refreshToken")?.value;

    if (!token) {
      throw new Error("Refresh token not found");
    }

    const decoded = (await jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!,
    )) as { _id: string };
    const user = await User.findById(decoded._id);
    if (!user) throw new Error("Unauthorized user");
    if (token !== user.refreshToken) {
      throw new Error("Invalid refresh Token");
    }

    const newAccessToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "15m",
      },
    );

    const newRefreshToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    return { newAccessToken, newRefreshToken };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export {
  registerUser,
  loginUser,
  editUser,
  deleteUser,
  getMe,
  getAllUsers,
  refreshAccessToken,
};
