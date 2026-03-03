import Image from "next/image";
import Link from "next/link";

export default function UserNav({ user }: { user: any }) {
  return (
    <div className="flex items-center gap-6">
      <Link href="/products" className="hover:text-[#d4af37] transition">
        PRODUCTS
      </Link>

      <Link href="/cart" className="hover:text-[#d4af37] transition">
        CART
      </Link>

      <Link href="/orders" className="hover:text-[#d4af37] transition">
        ORDERS
      </Link>

      <Link href="/profile">
        <div className="w-9 h-9 rounded-full border border-zinc-700 hover:border-[#d4af37] transition overflow-hidden">
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt="Avatar"
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-900 text-sm font-semibold text-white">
              {user?.username?.[0]?.toUpperCase()}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
