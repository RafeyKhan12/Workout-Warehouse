import axios from "axios";

export const getAllUsers = async () => {
    const response = await axios.get("/api/auth/admin/getAllUsers", {withCredentials: true});
    return response.data;
};