import AddToCartBtn from "@/components/AddToCartBtn";
import Image from "next/image";

export default async function SingleProduct({params} : {params: {id: string}}) {
    const {id} = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/products/get-product/${id}`)
    const data = await res.json();
    console.log(data);
    if(!data) return null;
  return (
  <div className="bg-zinc-950 min-h-screen text-white px-6 lg:px-20 py-16">
    <div className="max-w-6xl mx-auto">

      <div className="grid lg:grid-cols-2 gap-16 items-center">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 flex justify-center items-center">
          <Image
            src={data.product.productImg}
            alt={data.product.name}
            width={400}
            height={400}
            className="object-contain rounded-xl"
          />
        </div>

        <div className="space-y-8">

          <h1 className="text-4xl font-extrabold tracking-tight">
            {data.product.name}
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed">
            {data.product.description}
          </p>

          <div className="text-3xl font-bold text-[#d4af37]">
            ₹{data.product.price}
          </div>

          <div className="pt-6">
            <AddToCartBtn product={data.product} />
          </div>

        </div>

      </div>

    </div>
  </div>
);
}
