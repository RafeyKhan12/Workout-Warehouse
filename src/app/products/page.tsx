import EditAndDeleteBtn from "@/components/EditAndDeleteBtn";
import { getUser } from "@/helpers/getCurrentUser";
import { getProducts } from "@/helpers/getProducts";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const productsPerPage = 6;

  const allProducts = await getProducts();
  const user = await getUser();

  const totalPages = Math.ceil(
    (allProducts?.length || 0) / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = allProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="bg-zinc-950 min-h-screen text-white px-6 lg:px-20 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight mb-12">
          COMMERCIAL EQUIPMENT
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProducts?.map((product: any) => (
            <div
              key={product._id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-[#d4af37] transition-all"
            >
              <Link href={`/products/${product._id}`}>
              <Image
                src={product.productImg}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-xl object-contain mb-4"
              />

              <h2 className="text-lg font-bold uppercase">
                {product.name}
              </h2>

              <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                {product.description}
              </p>

              <p className="mt-4 text-xl font-semibold text-[#d4af37]">
                ₹{product.price}
              </p>
              </Link>
              {user?.role === "admin" && (
                <EditAndDeleteBtn id={product._id.toString()}  product={JSON.parse(JSON.stringify(product))} />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16 gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={`?page=${i + 1}`}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === i + 1
                  ? "bg-[#d4af37] text-black border-[#d4af37]"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}