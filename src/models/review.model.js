import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
  },
  { timestamps: true },
);

reviewSchema.index({user: 1, product: 1}, {unique: true});

export const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);