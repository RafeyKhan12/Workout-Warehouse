"use client";

import { useAppSelector } from "@/store/hooks";
import Image from "next/image";

export default function Product({ productId}: { productId: string}) {
  const { products } = useAppSelector((state) => state.product);
  const product = products.find((p: any) => p._id === productId);
  if (!product) return null;

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-start">
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 flex items-center justify-center">
        <Image
          src={product.productImg}
          alt={product.name}
          width={300}
          height={300}
          className="object-contain rounded-xl"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold uppercase">
          {product.name}
        </h2>

        <p className="mt-4 text-zinc-400">
          {product.description}
        </p>

        <div className="mt-6">
          <p className="text-xl font-bold text-[#d4af37]">
            ₹{product.price}
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            {product.stock > 0
              ? `In Stock: ${product.stock}`
              : "Out of Stock"}
          </p>
        </div>
      </div>
    </div>
  );
}