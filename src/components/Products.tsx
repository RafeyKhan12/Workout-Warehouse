"use client";

import {
  getProducts,
  updateProduct,
  removeProduct,
} from "@/features/products/productSlice";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import Link from "next/link";
import { getUser } from "@/helpers/getCurrentUser";
import LoadingSpinner from "./LoadingSpinner";

interface UpdatePayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  productImg?: File | null;
}

export default function Products() {
  const { loading, error, products } = useAppSelector((state) => state.product);
  const [user, setUser] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 10;

const indexOfLast = currentPage * productsPerPage;
const indexOfFirst = indexOfLast - productsPerPage;

const currentProducts = products?.slice(indexOfFirst, indexOfLast);

const totalPages = Math.ceil((products?.length || 0) / productsPerPage);

  const [data, setData] = useState<UpdatePayload>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const dispatch = useDispatch<AppDispatch>();

  const [isUpdatingId, setIsUpdatingId] = useState<string | null>(null);

  const setValues = (product: any, id: string) => {
    setIsUpdatingId(id);
    setData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      productImg: null,
    });
  };

  const handleEdit = async (id: string) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    if (data.productImg) {
      formData.append("productImg", data.productImg);
    }
    try {
      await dispatch(updateProduct({ data: formData, id }));
    } catch (error: any) {
      return;
    }
    setIsUpdatingId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await dispatch(removeProduct(id));

      if (removeProduct.rejected.match(result)) {
        console.error(result.payload);
      }
    } catch (error: any) {
      return;
    }
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const userInfo = await getUser();
        setUser(userInfo)
      }catch(error: any){
        console.log(error)
      }
    }
    fetchUser();
  }, [])

  if (loading) return <LoadingSpinner />;

  return (
  <div className="bg-zinc-950 min-h-screen text-white px-6 lg:px-20 py-16">
    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-extrabold tracking-tight mb-12">
        COMMERCIAL EQUIPMENT
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts?.map((product: any) => (
          <div
            key={product._id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-[#d4af37] transition-all"
          >
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

            {user?.role === "admin" && (
              <div className="mt-6 flex gap-3">
                <button 
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl py-2 hover:border-[#d4af37] hover:text-[#d4af37] transition">
                  EDIT
                </button>

                <button
                onClick={() => handleDelete(product._id)} 
                className="flex-1 bg-zinc-800 border border-red-800 text-red-500 rounded-xl py-2 hover:bg-red-600 hover:text-white transition">
                  DELETE
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-16 flex justify-center gap-3">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === page
                  ? "bg-[#d4af37] text-black border-[#d4af37]"
                  : "border-zinc-700 text-zinc-400 hover:border-[#d4af37] hover:text-[#d4af37]"
              } transition`}
            >
              {page}
            </button>
          )
        )}
      </div>

    </div>
  </div>
);
}
