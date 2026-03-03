import { Order } from "@/models/order.model.js";
import { Product } from "@/models/product.model.js";
import { Address } from "@/models/address.model.js";
import { getUserInfo } from "@/helpers/getUserInfo";
import { NextRequest } from "next/server";

// Add payment functionality

const createOrder = async (
  req: NextRequest,
  payload: {
    items: { productId: string; quantity: number }[];
    addressId: string;
    paymentType: "online" | "cash";
  },
) => {
  try {
    const user = await getUserInfo(req);
    if (!user) throw new Error("User not found");
    let totalAmount = 0;
    const orderItems: any = [];
    for (const item of payload.items) {
      const product = await Product.findById(item.productId);
      if (!product) throw new Error("Product not found");

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.name}`);
      }
      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });

      product.stock -= item.quantity;
      await product.save();
    }
    const address = await Address.findOne({
      _id: payload.addressId,
      user: user._id,
    });

    if (!address) throw new Error("Invalid Address");

    const order = await Order.create({
      user: user._id,
      items: orderItems,
      totalAmount,
      address: address._id,
      status: "pending",
      paymentStatus: "unpaid",
      paymentType: payload.paymentType,
      payment: null,
    });
    if (!order) throw new Error("Error creating order");
    console.log("This is running");
    return order;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateOrder = async (
  req: NextRequest,
  payload: {
    addressId?: string;
    paymentType?: "online" | "cash";
    orderId: string;
  },
) => {
  try {
    const user = await getUserInfo(req);
    if (!user) throw new Error("User not found");

    const order = await Order.findOne({
      _id: payload.orderId,
      user: user._id,
    });

    if (!order) throw new Error("Order does not exist");
    if (order.status !== "pending")
      throw new Error("Order cannot be updated after processing");
    const updateData: any = {};
    if (payload.addressId) {
      const address = await Address.findOne({
        _id: payload.addressId,
        user: user._id,
      });
      if (!address) throw new Error("Invalid Address");
      updateData.address = address._id;
    }
    if (payload.paymentType) updateData.paymentType = payload.paymentType;
    const updatedOrder = await Order.findByIdAndUpdate(order._id, updateData, {
      new: true,
    });
    return updatedOrder;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getUserOrders = async (req: NextRequest) => {
  try {
    const user = await getUserInfo(req);
    const orders = await Order.find({ user: user._id }).populate("address");
    return orders;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getUserOrder = async (payload: { orderId: string }) => {
  try {
    const order = await Order.findById(payload.orderId);
    if (!order) throw new Error("No orders exist with the given details");
    return order;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Only for Admin
const updateOrderStatus = async (
  req: NextRequest,
  payload: {
    status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
    orderId: string;
  },
) => {
  try {
    const admin = await getUserInfo(req);
    if (!admin || admin.role !== "admin") {
      throw new Error("Unauthorized");
    }
    const order = await Order.findById(payload.orderId);
    order.status = payload.status;
    await order.save();
    return order;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteOrder = async (payload: { orderId: string }) => {
  try {
    const order = await Order.findByIdAndDelete(payload.orderId);
    if (!order) throw new Error("Couldn't delete order");
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getOrders = async () => {
  try {
    const orders = await Order.find().populate("address");
    if (orders.length === 0) throw new Error("No orders exist");
    return orders;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getOrder = async (payload: { orderId: string }) => {
  try {
    const order = await Order.findById(payload.orderId);
    if (!order) throw new Error("Order not found");
    return order;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export {
  createOrder,
  updateOrder,
  getUserOrders,
  getUserOrder,
  updateOrderStatus,
  deleteOrder,
  getOrders,
  getOrder,
};
