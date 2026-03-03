"use client";

import { removeProduct, updateProduct } from "@/features/products/productSlice";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface UpdatePayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  productImg?: File | null;
}

export default function EditAndDeleteBtn({id, product} : {id: string, product: any}) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  const [isUpdatingId, setIsUpdatingId] = useState<string | null>(null);
  const [data, setData] = useState<UpdatePayload>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });
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
    router.refresh()
  };
  const handleDelete = async (id: string) => {
    try {
      const result = await dispatch(removeProduct(id));

      if (removeProduct.rejected.match(result)) {
        console.error(result.payload);
      }
      router.refresh()
    } catch (error: any) {
      return;
    }
  };
  return (
  <div className="mt-6 space-y-4">

    {isUpdatingId ? (
      <div className="space-y-3 bg-zinc-950 border border-zinc-800 rounded-xl p-4">

        <input
          type="text"
          value={data.name}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#d4af37]"
          placeholder="Product Name"
        />

        <textarea
          value={data.description}
          onChange={(e) =>
            setData({ ...data, description: e.target.value })
          }
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#d4af37]"
          placeholder="Description"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            value={data.price}
            onChange={(e) =>
              setData({
                ...data,
                price: Number(e.target.value),
              })
            }
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#d4af37]"
            placeholder="Price"
          />

          <input
            type="number"
            value={data.stock}
            onChange={(e) =>
              setData({
                ...data,
                stock: Number(e.target.value),
              })
            }
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#d4af37]"
            placeholder="Stock"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setData({
              ...data,
              productImg: e.target.files?.[0] || null,
            })
          }
          className="text-sm text-zinc-400"
        />

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => handleEdit(id)}
            className="flex-1 bg-[#d4af37] text-black font-semibold py-2 rounded-lg hover:bg-[#c5a028] transition"
          >
            SAVE
          </button>

          <button
            onClick={() => setIsUpdatingId(null)}
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg py-2 hover:border-zinc-500 transition"
          >
            CANCEL
          </button>
        </div>
      </div>
    ) : (
      <div className="flex gap-3">
        <button
          onClick={() => setValues(product, id)}
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl py-2 hover:border-[#d4af37] hover:text-[#d4af37] transition"
        >
          EDIT
        </button>

        <button
          onClick={() => handleDelete(id)}
          className="flex-1 bg-zinc-800 border border-red-800 text-red-500 rounded-xl py-2 hover:bg-red-600 hover:text-white transition"
        >
          DELETE
        </button>
      </div>
    )}
  </div>
);
}
