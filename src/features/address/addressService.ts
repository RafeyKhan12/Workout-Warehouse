import axios from "axios";

interface AddressPayload {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}

interface EditAddressPayload {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    isDefault ?: boolean;
}

export const createAddress = async (data: AddressPayload) => {
    const response = await axios.post("/api/address/add-address", data, {withCredentials: true});
    return response.data;
}

export const editAddress = async (data:EditAddressPayload, id: string) => {
    const response = await axios.put(`/api/address/update-address/${id}`, data, {withCredentials: true});
    return response.data;
}

export const deleteAddress = async (id:string) => {
    const response = await axios.delete(`/api/address/remove-address/${id}`, {withCredentials: true});
    return response.data;
}

export const fetchAddress = async (id:string) => {
    const response = await axios.get(`/api/address/get-address/${id}`, {withCredentials: true});
    return response.data;
}

export const fetchAddresses = async () => {
    const response = await axios.get("/api/address/get-addresses", {withCredentials: true});
    return response.data;
}