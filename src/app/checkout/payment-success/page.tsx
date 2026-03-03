import Link from "next/link";

export const metadata = {
  title: "Payment Success"
}

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#d4af37] text-black text-2xl font-bold">
          ✓
        </div>

        <h1 className="text-2xl font-bold tracking-wide">
          PAYMENT SUCCESSFUL
        </h1>

        <p className="text-zinc-400 mt-4 leading-relaxed">
          Your order has been confirmed and is now being processed.
          You will receive an email confirmation shortly with the
          order details and shipping information.
        </p>

        <div className="mt-8 text-sm text-zinc-500 space-y-2">
          <p>• Our team is preparing your equipment</p>
          <p>• Shipping details will be shared via email</p>
          <p>• Estimated dispatch within 2–4 business days</p>
        </div>


        <div className="mt-10 flex gap-4">
          <Link
            href="/"
            className="flex-1 bg-[#d4af37] text-black font-semibold py-3 rounded-xl hover:bg-[#c5a028] transition"
          >
            RETURN HOME
          </Link>

          <Link
            href="/products"
            className="flex-1 border border-zinc-700 py-3 rounded-xl hover:border-[#d4af37] hover:text-[#d4af37] transition"
          >
            CONTINUE SHOPPING
          </Link>
        </div>

      </div>
    </div>
  );
}