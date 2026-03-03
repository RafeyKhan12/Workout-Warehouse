import { Product } from "@/models/product.model";
import { getUserInfo } from "@/helpers/getUserInfo";
import { Review } from "@/models/review.model.js";
import { NextRequest } from "next/server";

const addReview = async (req:NextRequest, payload: {
    review: string,
    productId: string,
    rating: number,
}) => {
    try {
        const user = await getUserInfo(req);
        if(!user) throw new Error("User not found");
        if(!payload.review || !payload.productId || payload.rating === undefined) throw new Error("All fields are required");
        const product = await Product.findById(payload.productId);
        if(!product) throw new Error("Product not found");
        const reviewCount = await Review.countDocuments({user: user._id, product: product._id});
        if(reviewCount >= 1) throw new Error("Max number of reviews reached");
        const review = await Review.create({
            user: user._id,
            product: product._id,
            review: payload.review,
            rating: payload.rating
        });
        if(!review) throw new Error("Error creating review");
        return review;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const updateReview = async (req:NextRequest, payload: {
    review: string,
    productId: string,
    rating: number,
    reviewId: string
}) => {
    try {
        const user = await getUserInfo(req);
        if(!user) throw new Error("User not found");
        if(!payload.review || !payload.productId || payload.rating === undefined) throw new Error("All fields are required");
        const product = await Product.findById(payload.productId);
        if(!product) throw new Error("Product not found");
        const updateData: any = {};
        if(payload.review) updateData.review = payload.review;
        if(payload.rating !== undefined) updateData.rating = payload.rating;
        const review = await Review.findOneAndUpdate(
            {
                _id: payload.reviewId,
                user: user._id,
                product: product._id
            },
            updateData,
            {
                new: true
            }
        );
        if(!review) throw new Error("Error while updating review");
        return review;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const removeReview = async (req:NextRequest, payload: {reviewId: string}) => {
    try {
        const user = await getUserInfo(req);
        if(!user) throw new Error("User not found");
        const review = await Review.findOneAndDelete({_id: payload.reviewId, user: user._id});
        if(!review) throw new Error("Error ocurred while deleting review");
        return true;
    } catch (error: any) {
        throw new Error(error.message)
    }
};

const getAllReviews = async () => {
    try {
        const reviews = await Review.find();
        return reviews;
    } catch (error: any) {
        throw new Error(error.message)
    }
};

const getUserReviews = async (req:NextRequest) => {
    try {
        const user = await getUserInfo(req);
        if(!user) throw new Error("User not found");
        const reviews = await Review.find({user: user._id});
        if(reviews.length === 0) throw new Error("No reviews found");
        return reviews;
    } catch (error: any) {
        throw new Error(error.message)
    }
};

const getReview = async (req:NextRequest, payload: {reviewId: string}) => {
    try {
        const user = await getUserInfo(req);
        if(!user) throw new Error("User not found");
        const review = await Review.findOne({_id: payload.reviewId, user: user._id});
        if(!review) throw new Error("No review found");
        return review;
    } catch (error: any) {
        throw new Error(error.message)
    }
};

export {
    addReview,
    updateReview,
    removeReview,
    getAllReviews,
    getUserReviews,
    getReview
}