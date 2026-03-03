"use client";

import { useDispatch } from "react-redux";
import { logoutUser } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";

export default function Logout() {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const handleLogout = async () => {
        const result = await dispatch(logoutUser());
        if(logoutUser.fulfilled.match(result)) {
          router.push("/login");
        };
        router.refresh();
    }

  return (
    <button
  onClick={handleLogout}
  className="
    px-5 py-2.5
    rounded-xl
    bg-zinc-800
    text-zinc-300
    border border-zinc-700
    hover:border-[#d4af37]
    hover:text-[#d4af37]
    hover:bg-zinc-900
    transition-all duration-300
    font-medium
  "
>
  LOGOUT
</button>
  )
}
