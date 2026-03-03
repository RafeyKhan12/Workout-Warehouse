import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    address: {
      type: mongoose.Schema.ObjectId,
      ref: "Address",
      required: true,
    },
    payment: {
      type: mongoose.Schema.ObjectId,
      ref: "Payment",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    paymentType: {
        type: String,
        enum: ["online", "cash"],
        required: true,
    },
  },
  { timestamps: true },
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
