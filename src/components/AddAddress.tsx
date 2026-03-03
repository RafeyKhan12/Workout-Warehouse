"use client";

import { addAddress } from "@/features/address/addressSlice";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddAddress() {
  interface AddressPayload {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    isDefault?: boolean;
  }
  const [data, setData] = useState<AddressPayload>({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    isDefault: true,
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = () => {
    dispatch(addAddress(data));
    setData({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    });
  };

  return (
  <div className="min-h-screen bg-zinc-950 text-white px-6 lg:px-20 py-16">
    <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-10">

      <h1 className="text-2xl font-bold mb-8">
        Add New Address
      </h1>

      <div className="space-y-6">

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) =>
              setData({ ...data, fullName: e.target.value })
            }
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) =>
              setData({ ...data, phone: e.target.value })
            }
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Street Address
          </label>
          <input
            type="text"
            value={data.street}
            onChange={(e) =>
              setData({ ...data, street: e.target.value })
            }
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              City
            </label>
            <input
              type="text"
              value={data.city}
              onChange={(e) =>
                setData({ ...data, city: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              State
            </label>
            <input
              type="text"
              value={data.state}
              onChange={(e) =>
                setData({ ...data, state: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Country
            </label>
            <input
              type="text"
              value={data.country}
              onChange={(e) =>
                setData({ ...data, country: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Pincode
            </label>
            <input
              type="text"
              value={data.pincode}
              onChange={(e) =>
                setData({ ...data, pincode: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-3">
            Set as default address?
          </label>

          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={data.isDefault === true}
                onChange={() =>
                  setData({ ...data, isDefault: true })
                }
              />
              Yes
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={data.isDefault === false}
                onChange={() =>
                  setData({ ...data, isDefault: false })
                }
              />
              No
            </label>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="w-full mt-6 bg-[#d4af37] text-black font-semibold py-3 rounded-xl hover:bg-[#c5a028] transition"
        >
          SAVE ADDRESS
        </button>

      </div>
    </div>
  </div>
);
}
