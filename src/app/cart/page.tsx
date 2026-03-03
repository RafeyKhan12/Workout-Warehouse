import CartItems from "@/components/CartItems";

export const metadata = {
  title: "Cart"
}

export default async function Cart() {
  return (
    <div>
      <CartItems />
    </div>
  )
}
