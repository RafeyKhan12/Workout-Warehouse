"use client";

import { updateUser } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface UpdateUser {
  username?: string;
  password?: string;
  avatarFile?: File | null;
}

export default function Profile({ user }: { user: any }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState<UpdateUser>({
    username: "",
    password: "",
  });
  if (!user) return null;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const setValues = (info: any) => {
    setIsUpdating(true);
    setData({
      username: info.username,
      password: info.password,
      avatarFile: info.avatar,
    });
  };
  const handleUpdate = async () => {
    const formData = new FormData();
    if (data.username) formData.append("username", data.username);
    if (data.password) formData.append("password", data.password);
    if (data.avatarFile) formData.append("avatarFile", data.avatarFile);
    try {
      dispatch(updateUser({ data: formData }));
    } catch (error: any) {
      return;
    }
    router.refresh();
  };
  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 lg:px-20 py-16">
      <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-10">
        {!isUpdating ? (
          <>
            <div className="flex items-center gap-6 mb-10">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-700">
                {user?.avatar && (
                  <Image
                    src={user.avatar}
                    alt="Avatar"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div>
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="text-zinc-400 text-sm">{user.email}</p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-400">User ID</span>
                <span className="font-medium">{user._id}</span>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button
                onClick={() => setValues(user)}
                className="flex-1 bg-[#d4af37] text-black font-semibold py-3 rounded-xl hover:bg-[#c5a028] transition"
              >
                EDIT PROFILE
              </button>

              <Link
                href="/profile/address"
                className="flex-1 text-center bg-zinc-800 border border-zinc-700 text-white font-semibold py-3 rounded-xl hover:border-[#d4af37] hover:text-[#d4af37] transition"
              >
                ADDRESSES
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-6">Update Profile</h2>

            <div className="space-y-4">
              <input
                type="text"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                placeholder="Username"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
              />

              <input
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="New Password"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setData({
                    ...data,
                    avatarFile: e.target.files?.[0] || null,
                  })
                }
                className="text-sm text-zinc-400"
              />

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-[#d4af37] text-black font-semibold py-3 rounded-xl hover:bg-[#c5a028] transition"
                >
                  SAVE CHANGES
                </button>

                <button
                  onClick={() => setIsUpdating(false)}
                  className="flex-1 border border-zinc-700 rounded-xl py-3 hover:border-zinc-500 transition"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
