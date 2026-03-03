"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getItems, cartClear } from "@/features/cart/cartSlice";
import { useAppSelector } from "@/store/hooks";
import type { AppDispatch } from "@/store/store";

import Product from "./Product";
import PlaceOrderBtn from "./PlaceOrderBtn";
import { fetchProduct } from "@/features/products/productSlice";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";

export default function CartItems() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, items } = useAppSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const cartId = items.length ? items[0]?._id : null;
  useEffect(() => {
    if (!items.length) return;

    const productIds = items.flatMap((cart) =>
      cart.items.map((item: any) => item.product),
    );

    productIds.forEach((id) => {
      dispatch(fetchProduct(id));
    });
  }, [items, dispatch]);

  const handleClear = async () => {
    if (!cartId) return;
    await dispatch(cartClear(cartId));
    dispatch(getItems());
  };

  const cartItems = items.flatMap((item: any) => item.items);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-6">
        <div className="bg-zinc-900 border border-red-500/30 rounded-2xl p-8 text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-red-400 mb-3">
            Something Went Wrong
          </h2>
          <p className="text-zinc-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center max-w-md w-full">
          <h2 className="text-2xl text-white font-bold mb-3">Your Cart is Empty</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Looks like you haven’t added anything yet.
          </p>

          <Link
            href="/products"
            className="inline-block bg-[#d4af37] text-black font-semibold px-6 py-3 rounded-xl hover:bg-[#c5a028] transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-white px-6 lg:px-20 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight mb-12">
          ORDER SUMMARY
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {items.map((cart) =>
              cart.items.map((cartItem: any) => (
                <div
                  key={cartItem._id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                >
                  <Product productId={cartItem.product} />
                </div>
              )),
            )}
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 h-fit">
            <h2 className="text-xl font-bold mb-6">Commercial Order Details</h2>

            <div className="space-y-4 text-zinc-400 text-sm">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span>
                  {items.reduce((acc, cart) => acc + cart.items.length, 0)}
                </span>
              </div>

              <div className="border-t border-zinc-800 pt-4 flex justify-between font-semibold text-white">
                <span>Total (Estimate)</span>
                <span className="text-[#d4af37]">Calculated at Checkout</span>
              </div>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={handleClear}
                className="w-full mt-6 bg-red-600 hover:bg-red-700 transition-colors text-white py-3 rounded-xl font-semibold"
              >
                Clear Cart
              </button>
            )}
            <div className="mt-6">
              <PlaceOrderBtn items={items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
