"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/hooks";
import LoadingSpinner from "./LoadingSpinner";

interface LoginPayload {
  username: string;
  email: string;
  password: string;
}

export default function LogIn() {
  const [data, setData] = useState<LoginPayload>({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useAppSelector((state) => state.auth);
  const handleSubmit = async () => {
    if (!data.username || !data.email || !data.password) return;
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      router.push("/");
      router.refresh();
    };
    setData({ username: "", email: "", password: "" });
  };

  if(loading) return <LoadingSpinner />

  return (
  <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-xl border border-zinc-800">
      
      <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
        MEMBER ACCESS
      </h1>
      <p className="text-zinc-400 mb-8">
        Enter your credentials to access your gym arsenal.
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
          placeholder="Email"
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

        <button
          onClick={handleSubmit}
          className="w-full bg-[#d4af37] hover:bg-[#c5a028] text-black font-semibold py-3 rounded-xl transition-all duration-300"
        >
          LOGIN
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  </div>
);
}
