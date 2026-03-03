import { getUserInfo } from "@/helpers/getUserInfo";
import { Product } from "@/models/product.model.js";
import { Cart } from "@/models/cart.model.js";
import { NextRequest } from "next/server";

interface cartPayload {
  productId: string;
  quantity: number;
}

const addToCart = async (payload: cartPayload, req: NextRequest) => {
  try {
    const { productId, quantity } = payload;

    if (!productId || quantity <= 0) {
      throw new Error("All fields are required");
    }

    const user = await getUserInfo(req);
    if (!user) throw new Error("User does not exist");

    const product = await Product.findById(productId);
    if (!product) throw new Error("Product does not exist");

    let cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      cart = await Cart.create({
        user: user._id,
        items: [{ product: product._id, quantity }],
      });
      return cart;
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item.product.toString() === product._id.toString(),
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: product._id, quantity });
    }

    await cart.save();
    return cart;
  } catch (error: any) {
    throw error;
  }
};

const removeFromCart = async (cartId: string, productId: string) => {
  try {
    const item = await Cart.updateOne(
      { _id: cartId },
      { $pull: { items: { product: productId } } },
    );
    if (!item) throw new Error("Couln't remove from cart.");
    return true;
  } catch (error: any) {
    throw error;
  }
};

const getItem = async (id: string) => {
  try {
    const item = await Cart.findById(id);
    if (!item) throw new Error("Couldn't find item");
    return item;
  } catch (error: any) {
    throw error;
  }
};

const getAllItems = async (req: NextRequest) => {
  try {
    const user = await getUserInfo(req);
    const items = await Cart.find({ user: user._id });
    if (items.length === 0) throw new Error("Cart empty");
    return items;
  } catch (error: any) {
    throw error;
  }
};

const clearCart = async (cartId: string, req: NextRequest) => {
  try {
    const user = await getUserInfo(req);
    const cart = await Cart.findOneAndUpdate(
      {
        _id: cartId,
        user: user._id
      },
      {items: []},
      {new: true}
    );
    if(cart.items.length === 0) throw new Error("Cart empty")
    if(!cart) throw new Error("Cannot clear cart")
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}


export { addToCart, removeFromCart, getItem, getAllItems, clearCart };
