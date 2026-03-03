import CheckoutPageContent from "@/components/CheckoutPageContent";

export const metadata = {
  title: "Checkout"
}

export default async function CheckoutPage({params} : {params: Promise<{orderId: string}>}) {
  const {orderId} = await params;
  return <CheckoutPageContent orderId={orderId} />
}
