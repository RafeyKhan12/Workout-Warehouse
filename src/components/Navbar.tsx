import { getUser } from "@/helpers/getCurrentUser";
import Link from "next/link";
import Logout from "./Logout";
import AdminNav from "./AdminNav";
import UserNav from "./UserNav";

export async function Navbar() {
  const user = await getUser();

  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 text-white px-6 lg:px-20 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-extrabold tracking-wider hover:text-[#d4af37] transition"
        >
          WORKOUT WAREHOUSE
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium">

          {user ? (
            <>
              {user.role === "admin" ? (
                <AdminNav user={user} />
              ) : (
                <UserNav user={user} />
              )}
              <Logout />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-[#d4af37] transition"
              >
                LOGIN
              </Link>

              <Link
                href="/signup"
                className="bg-[#d4af37] text-black px-4 py-2 rounded-lg hover:bg-[#c5a028] transition"
              >
                SIGN UP
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}