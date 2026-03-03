"use client";

import { getOrdersUser } from "@/features/orders/orderSlice";
import { useAppSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function UserOrders() {
  const dispatch = useDispatch<AppDispatch>();
  const {orders} = useAppSelector(state => state.order);
  const router = useRouter();

  useEffect(() => {
    dispatch(getOrdersUser());
  }, [dispatch]);

  const handlePay = (id: string) => {
    router.push(`/checkout/${id}`);
  }
  return (
  <div className="bg-zinc-950 min-h-screen text-white px-6 lg:px-20 py-16">
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-12 tracking-tight">
        MY ORDERS
      </h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 text-sm text-zinc-400">
                <p>
                  <span className="text-white font-semibold">
                    Name:
                  </span>{" "}
                  {order.address.fullName}
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Phone:
                  </span>{" "}
                  {order.address.phone}
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Address:
                  </span>{" "}
                  {order.address.country} - {order.address.state} -{" "}
                  {order.address.street}
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Products:
                  </span>{" "}
                  {order.items.length}
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Payment Status:
                  </span>{" "}
                  <span
                    className={`${
                      order.paymentStatus === "paid"
                        ? "text-green-400"
                        : "text-yellow-400"
                    } font-semibold`}
                  >
                    {order.paymentStatus.toUpperCase()}
                  </span>
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Order Status:
                  </span>{" "}
                  <span className="text-[#d4af37] font-semibold">
                    {order.status.toUpperCase()}
                  </span>
                </p>
              </div>

              <div className="flex flex-col justify-between items-start md:items-end">

                <div className="text-xl font-bold text-[#d4af37]">
                  ₹{order.totalAmount}
                </div>

                {order.paymentStatus !== "paid" ? (
                  <button
                    onClick={() => handlePay(order._id)}
                    className="mt-6 bg-[#d4af37] text-black font-semibold px-6 py-3 rounded-xl hover:bg-[#c5a028] transition-all duration-300"
                  >
                    COMPLETE PAYMENT
                  </button>
                ) : (
                  <button
                    className="mt-6 bg-[#d4af37] text-black font-semibold px-6 py-3 rounded-xl hover:bg-[#c5a028] transition-all duration-300"
                  >
                    PAYMENT COMPLETED
                  </button>

                )
              }

              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
);
}
