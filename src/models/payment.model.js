import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    order: {
        type: mongoose.Schema.ObjectId,
        ref: "Order"
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        enum: ["online", "cash"]
    },
    currency: {
        type: String,
        default: "INR"
    },
    status: {
        type: String,
        enum: ["pending", "successful", "failed"],
        required: true
    },
    transactionId: String,
}, {timestamps: true});

export const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);