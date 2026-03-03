"use client"

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "@/components/Checkout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOrderUser } from "@/features/orders/orderSlice";
import { AppDispatch } from "@/store/store";
import LoadingSpinner from "./LoadingSpinner";

export default function CheckoutPageContent({orderId} : {orderId: string}) {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      dispatch(getOrderUser(orderId));
    }, [dispatch, orderId]);
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        ;(async () => {
            const res = await fetch("/api/payment/create-payment-intent", {
              method: 'POST',
              body: JSON.stringify({orderId})
             });
             const { clientSecret } = await res.json();
             setClientSecret(clientSecret);
        })();
    }, [orderId]);
    
    return (
  <div className="min-h-screen bg-zinc-950 text-white px-6 lg:px-20 py-16">
    <div className="max-w-4xl mx-auto">

      <h1 className="text-3xl font-extrabold tracking-tight mb-10">
        Secure Checkout
      </h1>

      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkout />
        </Elements>
      ) : (
        <div className="flex justify-center py-20">
          <LoadingSpinner />
        </div>
      )}

    </div>
  </div>
);
}