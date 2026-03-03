"use client";

import { addItemToCart } from "@/features/cart/cartSlice";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddToCartBtn({ product }: { product: any }) {
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();
  const handleAdd = async (quantity: number) => {
    if (!product) return null;
    if (product) {
      console.log("Sending: ", product._id, quantity);
      dispatch(addItemToCart({ productId: product._id, quantity }));
      setQuantity(1);
    }
  };
  return (
  <div className="space-y-6">
    <div>
      <label className="block text-sm text-zinc-400 mb-3">
        Quantity
      </label>

      <div className="flex items-center gap-4">

        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 hover:border-[#d4af37] transition text-lg font-semibold"
          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
        >
          -
        </button>

        <div className="w-12 text-center text-lg font-semibold">
          {quantity}
        </div>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 hover:border-[#d4af37] transition text-lg font-semibold"
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          +
        </button>

      </div>
    </div>

    <button
      onClick={() => handleAdd(quantity)}
      className="w-full bg-[#d4af37] text-black font-semibold py-3 rounded-xl hover:bg-[#c5a028] transition-all duration-300"
    >
      ADD TO CART
    </button>

  </div>
);
}
