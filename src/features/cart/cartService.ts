import axios from "axios";

export const addItem = async (data: {productId: string, quantity: number}) => {
    const response = await axios.post("/api/cart/addtocart", JSON.stringify(data), {
        withCredentials: true,
        headers: {"Content-Type" : "application/json"}
    });
    return response.data;
};

export const removeItem = async (id:string) => {
    const response = await axios.delete(`/api/cart/removefromcart/${id}`, {withCredentials: true});
    return response.data;
};

export const getItem = async (id:string) => {
    const response = await axios.get(`/api/cart/get-item/${id}`, {withCredentials: true});
    return response.data;
};

export const getAllItems = async () => {
    const response = await axios.get("/api/cart/get-items", {withCredentials: true});
    return response.data;
};

export const clearCart = async (id: string) => {
    const response = await axios.put(`/api/cart/clear-cart/${id}`, {}, {withCredentials: true});
    return response.data;
}