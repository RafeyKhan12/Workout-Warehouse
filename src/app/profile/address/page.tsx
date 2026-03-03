"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import {
  getAddresses,
  removeAddress,
  updateAddress,
} from "@/features/address/addressSlice";
import { useAppSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface UpdatePayload {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault?: boolean;
}

export const metadata = {
  title: "Address"
}

export default function Page() {
  const { addresses, loading } = useAppSelector((state) => state.address);
  const dispatch = useDispatch<AppDispatch>();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [data, setData] = useState<UpdatePayload>({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    isDefault: false,
  });

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  const startEditing = (address: any) => {
    setEditingId(address._id);
    setData({
      fullName: address.fullName,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
      isDefault: address.isDefault,
    });
  };

  const handleSave = () => {
    if (!editingId) return;
    dispatch(updateAddress({ id: editingId, data }));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    dispatch(removeAddress(id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 lg:px-20 py-16">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold">Your Addresses</h1>

          {addresses?.length < 5 && (
            <Link
              href="/profile/address/add"
              className="bg-[#d4af37] text-black font-semibold px-5 py-2 rounded-lg hover:bg-[#c5a028] transition"
            >
              + ADD ADDRESS
            </Link>
          )}
        </div>

        {(!addresses || addresses.length === 0) && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
            <p className="text-zinc-400 mb-6">No addresses saved yet.</p>
            <Link
              href="/profile/address/add"
              className="bg-[#d4af37] text-black font-semibold px-6 py-3 rounded-xl hover:bg-[#c5a028] transition"
            >
              Add Your First Address
            </Link>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {addresses?.map((address: any) => (
            <div
              key={address._id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-[#d4af37] transition"
            >
              {editingId === address._id ? (
                <div className="space-y-3">
                  <input
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                    value={data.fullName}
                    onChange={(e) =>
                      setData({ ...data, fullName: e.target.value })
                    }
                    placeholder="Full Name"
                  />
                  <input
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                    value={data.phone}
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                    placeholder="Phone"
                  />
                  <input
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                    value={data.street}
                    onChange={(e) =>
                      setData({ ...data, street: e.target.value })
                    }
                    placeholder="Street"
                  />
                  <input
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                    value={data.city}
                    onChange={(e) =>
                      setData({ ...data, city: e.target.value })
                    }
                    placeholder="City"
                  />
                  <input
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                    value={data.state}
                    onChange={(e) =>
                      setData({ ...data, state: e.target.value })
                    }
                    placeholder="State"
                  />
                  <input
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                    value={data.country}
                    onChange={(e) =>
                      setData({ ...data, country: e.target.value })
                    }
                    placeholder="Country"
                  />
                  <input
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                    value={data.pincode}
                    onChange={(e) =>
                      setData({ ...data, pincode: e.target.value })
                    }
                    placeholder="Pincode"
                  />

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-[#d4af37] text-black py-2 rounded-lg font-semibold hover:bg-[#c5a028] transition"
                    >
                      SAVE
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 border border-zinc-700 rounded-lg py-2 hover:border-zinc-500 transition"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="font-semibold text-lg">
                      {address.fullName}
                    </h2>

                    {address.isDefault && (
                      <span className="text-xs bg-[#d4af37] text-black px-3 py-1 rounded-full font-medium">
                        DEFAULT
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-zinc-400 space-y-1">
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state}
                    </p>
                    <p>
                      {address.country} - {address.pincode}
                    </p>
                    <p className="pt-2">{address.phone}</p>
                  </div>

                  <div className="mt-6 flex gap-3 text-sm">
                    <button
                      onClick={() => startEditing(address)}
                      className="flex-1 border border-zinc-700 rounded-lg py-2 hover:border-[#d4af37] hover:text-[#d4af37] transition"
                    >
                      EDIT
                    </button>

                    <button
                      onClick={() => handleDelete(address._id)}
                      className="flex-1 border border-red-800 text-red-500 rounded-lg py-2 hover:bg-red-600 hover:text-white transition"
                    >
                      DELETE
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {addresses?.length === 5 && (
          <p className="text-center text-zinc-500 mt-12 text-sm">
            You have reached the maximum of 5 saved addresses.
          </p>
        )}
      </div>
    </div>
  );
}