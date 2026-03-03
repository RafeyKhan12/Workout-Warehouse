import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


export const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);