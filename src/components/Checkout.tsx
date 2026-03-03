"use client";

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";

export default function Checkout() {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if(!stripe || !elements) return;

        
        setLoading(true);
        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/payment-success`
          }
        });

        if(result.error){
            console.log(result.error.message);
        }
        setLoading(false);
    }
  return (
  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
    <form onSubmit={handleSubmit} className="space-y-6">

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
        <PaymentElement />
      </div>

      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-[#d4af37] text-black font-semibold py-3 rounded-xl hover:bg-[#c5a028] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

    </form>
  </div>
);
}
