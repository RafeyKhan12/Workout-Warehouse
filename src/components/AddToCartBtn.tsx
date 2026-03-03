"use client";

import { addItemToCart } from "@/features/cart/cartSlice";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export default function AddToCartBtn({ product }: { product: any }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = () => {
    if (!product) return;

    dispatch(addItemToCart({ productId: product._id, quantity }));
    setQuantity(1);
    setOpen(true);
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
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
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
        onClick={handleAdd}
        className="w-full bg-[#d4af37] text-black font-semibold py-3 rounded-xl hover:bg-[#c5a028] transition-all duration-300"
      >
        ADD TO CART
      </button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-zinc-950 border border-zinc-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Item Added to Cart
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              {product?.name} has been successfully added to your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-900 border border-zinc-700 hover:border-[#d4af37]">
              Continue Shopping
            </AlertDialogCancel>

            <AlertDialogAction asChild>
              <Link
                href="/cart"
                className="bg-[#d4af37] text-black px-4 py-2 rounded-md hover:bg-[#c5a028]"
              >
                Go to Cart
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}