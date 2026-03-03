import CheckoutPageContent from "@/components/CheckoutPageContent";

export default async function CheckoutPage({params} : {params: Promise<{orderId: string}>}) {
  const {orderId} = await params;
  return <CheckoutPageContent orderId={orderId} />
}
