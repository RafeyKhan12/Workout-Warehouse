import axios from "axios";

export const create = async (data:FormData) => {
    const response = await axios.post("/api/admin/products/add-product", data, {withCredentials: true});
    return response.data
};

export const edit = async (data: FormData, id: string) => {
    const response = await axios.put(`/api/admin/products/update-product/${id}`, data, {withCredentials: true});
    return response.data;
};

export const deleteProduct = async (id: string) => {
    const response = await axios.delete(`/api/admin/products/delete-product/${id}`, {withCredentials: true});
    return response.data;
};

export const getProduct = async (id: string) => {
    const response = await axios.get(`/api/admin/products/get-product/${id}`, {withCredentials: true});
    return response.data;
};

export const getAllProducts = async () => {
    const response = await axios.get("/api/admin/products/get-all-products", {withCredentials: true});
    return response.data;
}