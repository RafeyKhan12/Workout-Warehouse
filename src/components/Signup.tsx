"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signupUser } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/hooks";

interface SignUpPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: File | null;
}

export default function Signup() {
  const [data, setData] = useState<SignUpPayload>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState<any>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading, error } = useAppSelector(state => state.auth)

  const handleSubmit = async () => {
    if (
      !data.username ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    )
      return;

    if (data.password !== data.confirmPassword) {
      setLocalError("Password does not match");
      return;
    }

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    if (data.avatar) {
      formData.append("avatarFile", data.avatar);
    }

    try {
      const result = await dispatch(signupUser(formData));
      if(signupUser.fulfilled.match(result)) router.push("/login");

      setData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: undefined,
      });
    } catch (error: any) {
      setLocalError(error.response?.data?.message || "Something went wrong");
    }
  };

  if(loading) return <h1>Loading...</h1>
  if(isAuthenticated) router.push("/");
  return (
  <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
    <div className="w-full max-w-lg bg-zinc-900 rounded-2xl p-10 border border-zinc-800 shadow-xl">

      <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
        CREATE ACCOUNT
      </h1>
      <p className="text-zinc-400 mb-8">
        Register to manage orders and request commercial equipment quotes.
      </p>

      <div className="space-y-5">

        <input
          type="text"
          value={data.username}
          placeholder="Username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
        />

        <input
          type="email"
          value={data.email}
          placeholder="Business Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
        />

        <input
          type="password"
          value={data.password}
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
        />

        <input
          type="password"
          value={data.confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
        />

        <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-400">
          <label className="block text-sm mb-2 text-zinc-400">
            Company Logo (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setData({ ...data, avatar: e.target.files?.[0] })
            }
            className="text-sm text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#d4af37] file:text-black hover:file:bg-[#c5a028] cursor-pointer"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#d4af37] text-black font-semibold py-3 rounded-xl hover:bg-[#c5a028] transition-all duration-300"
        >
          REGISTER ACCOUNT
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {localError && (
          <p className="text-red-500 text-sm text-center">{localError}</p>
        )}
      </div>
    </div>
  </div>
);
}
