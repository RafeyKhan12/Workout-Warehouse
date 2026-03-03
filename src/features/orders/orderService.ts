import axios from "axios";

// USER SERVICES

interface createPayload {
  items: {productId: string, quantity: number}[],
  addressId: string;
  paymentType: "online" | "cash";
}

interface updatePayload {
    addressId?: string;
    paymentType?: "online" | "cash";
    orderId: string;
}

interface updateStatusPayload {
    status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
}

export const createOrder = async (data: createPayload) => {
    const response = await axios.post("/api/orders/createorder", data, {withCredentials: true});
    return response.data;
}

export const getUserOrder = async (id:string) => {
    const response = await axios.get(`/api/orders/get-order/${id}`, {withCredentials: true});
    return response.data;
}

export const getUserOrders = async () => {
    const response = await axios.get("/api/orders/get-orders", {withCredentials: true});
    return response.data;
}

export const updateOrder = async (id: string, data: updatePayload) => {
    const response = await axios.put(`/api/orders/updateorder/${id}`, data, {withCredentials: true});
    return response.data;
}

// ADMIN SERVICES

export const deleteOrder = async (id:string) => {
    const response = await axios.delete(`/api/orders/admin/delete-order/${id}`, {withCredentials: true});
    return response.data;
};

export const getAllOrders = async () => {
    const response = await axios.get("/api/orders/admin/get-all-orders", {withCredentials: true});
    return response.data;
};

export const getOrder = async (id: string) => {
    const response = await axios.get(`/api/orders/admin/get-order/${id}`, {withCredentials: true});
    return response.data;
};

export const updateOrderStatus = async (id:string, data: string) => {
    const response = await axios.put(`/api/orders/admin/update-order-status/${id}`, data, {withCredentials: true});
    return response.data;
}