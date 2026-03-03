"use client";

import { getAddresses } from "@/features/address/addressSlice";
import { addOrder } from "@/features/orders/orderSlice";
import { useAppSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function PlaceOrderBtn({ items }: { items: any[] }) {
  const { products } = useAppSelector((state) => state.product);
  const { addresses } = useAppSelector((state) => state.address);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  interface createPayload {
    items: { productId: string; quantity: number }[];
    addressId: string;
    paymentType: "online" | "cash";
  }
  const cart = items[0];

  const totalAmount = cart.items.reduce((sum: number, c: any) => {
    const prod = products.find((p) => p._id === c.product);
    return sum + (prod?.price || 0) * c.quantity;
  }, 0);

  const [data, setData] = useState<createPayload>({
    items: [
      {
        productId: "",
        quantity: 0,
      },
    ],
    addressId: "",
    paymentType: "online",
  });

  const handlePay = () => {
    const payload = {
      ...data,
      items: cart.items.map((c: any) => ({
        productId: c.product,
        quantity: c.quantity,
      }))
    }
    dispatch(addOrder(payload));
  };
  return (
  <div className="space-y-6">
    <div>
      <label className="block text-sm text-zinc-400 mb-2">
        Select Delivery Address
      </label>
      <select
        onChange={(e) => setData({ ...data, addressId: e.target.value })}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition"
      >
        <option value="">Choose Address</option>
        {addresses.map((address: any) => (
          <option key={address._id} value={address._id}>
            {address.country} - {address.state} - {address.city} - {address.street}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm text-zinc-400 mb-2">
        Payment Method
      </label>
      <select
        onChange={(e) => {
          const value = e.target.value;
          if (value === "online" || value === "cash") {
            setData({ ...data, paymentType: value });
          }
        }}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition"
      >
        <option value="online">Online Payment</option>
        <option value="cash">Cash on Delivery</option>
      </select>
    </div>

    <div className="border-t border-zinc-800 pt-6">

      <div className="flex justify-between text-lg font-semibold mb-6">
        <span>Total Amount</span>
        <span className="text-[#d4af37]">
          ₹{totalAmount || 0}
        </span>
      </div>

      <button
        onClick={handlePay}
        disabled={!data.addressId}
        className="w-full bg-[#d4af37] text-black font-semibold py-3 rounded-xl hover:bg-[#c5a028] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        CONFIRM ORDER
      </button>

    </div>
  </div>
);
}
