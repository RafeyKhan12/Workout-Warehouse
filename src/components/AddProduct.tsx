"use client";

import { addProduct } from "@/features/products/productSlice";
import { useState } from "react";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

interface ProductPayload {
    name: string;
    description: string;
    price: number;
    stock: number;
    productImg ?: File | null;
}

export default function AddProduct() {

    const [data, setData] = useState<ProductPayload>({
        name: "",
        description: "",
        price: 0,
        stock: 0,
    });

    const dispatch = useDispatch<AppDispatch>()

    const handleAdd = async () => {
        if(!data.name || !data.description || data.price === undefined || data.stock === undefined || !data.productImg ) return;
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("stock", data.stock.toString());
        formData.append("productImg", data.productImg);

        try {
            await dispatch(addProduct(formData));
        } catch (error: any) {
            return error.message;
        }
        setData({
          name: "",
        description: "",
        price: 0,
        stock: 0,
        })

    }

  return (
  <div className="bg-zinc-950 min-h-screen text-white px-6 lg:px-20 py-16">
    <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-10">

      <h1 className="text-3xl font-bold mb-10 tracking-tight">
        ADD NEW PRODUCT
      </h1>

      <div className="space-y-6">

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={data.name}
            placeholder="Enter product name"
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Description
          </label>
          <textarea
            value={data.description}
            rows={5}
            placeholder="Enter product description"
            onChange={(e) =>
              setData({ ...data, description: e.target.value })
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Price
            </label>
            <input
              type="number"
              value={data.price}
              onChange={(e) =>
                setData({ ...data, price: Number(e.target.value) })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Stock
            </label>
            <input
              type="number"
              value={data.stock}
              onChange={(e) =>
                setData({ ...data, stock: Number(e.target.value) })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setData({
                ...data,
                productImg: e.target.files?.[0] || null,
              })
            }
            className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#d4af37] file:text-black hover:file:bg-[#c5a028]"
          />
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-[#d4af37] text-black font-semibold py-3 rounded-xl hover:bg-[#c5a028] transition-all duration-300 cursor-pointer"
        >
          ADD PRODUCT
        </button>

      </div>
    </div>
  </div>
);
}
