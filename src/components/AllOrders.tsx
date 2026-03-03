"use client";

import {
  fetchOrders,
  orderStatusUpdate,
  removeOrder,
} from "@/features/orders/orderSlice";
import { useAppSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function AllOrders() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useAppSelector((state) => state.order);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const paymentOptions = [
    "pending",
    "paid",
    "shipped",
    "delivered",
    "cancelled",
  ];

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    try {
      dispatch(removeOrder(id));
      router.refresh();
    } catch (error: any) {
      return;
    }
  };

  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="bg-zinc-950 min-h-screen text-white px-6 lg:px-20 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-12 tracking-tight">
          COMMERCIAL ORDERS
        </h1>

        <div className="space-y-8">
          {currentOrders.map((order) => (
            <div
              key={order._id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 text-sm text-zinc-400">
                  <p>
                    <span className="text-white font-semibold">Client:</span>{" "}
                    {order.address.fullName}
                  </p>
                  <p>
                    <span className="text-white font-semibold">Phone:</span>{" "}
                    {order.address.phone}
                  </p>
                  <p>
                    <span className="text-white font-semibold">Address:</span>{" "}
                    {order.address.country} - {order.address.state} -{" "}
                    {order.address.street}
                  </p>
                  <p>
                    <span className="text-white font-semibold">Products:</span>{" "}
                    {order.items.length}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm text-zinc-400 block mb-2">
                      Payment Status
                    </label>

                    <select
                      value={order.paymentStatus}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        console.log(
                          "Update payment status:",
                          order._id,
                          newStatus,
                        );
                        dispatch(
                          orderStatusUpdate({ id: order._id, data: newStatus }),
                        );
                      }}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    >
                      {paymentOptions.map((option) => (
                        <option key={option} value={option}>
                          {option.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-sm">
                    <span className="text-zinc-400">Order Status: </span>
                    <span className="text-[#d4af37] font-semibold">
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="group relative w-full overflow-hidden rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm font-semibold text-red-400 transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600"
                    >
                      <span className="relative z-10 tracking-wide">
                        DELETE ORDER
                      </span>

                      <span className="absolute inset-0 bg-red-600 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12 gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === i + 1
                  ? "bg-[#d4af37] text-black border-[#d4af37]"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
