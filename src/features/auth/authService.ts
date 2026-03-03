import axios from "axios";

interface UpdateUser {
    username ?: string;
    password ?: string;
    avatarFile?: File | null;
}

export const signup = async (data: FormData) => {
    const response = await axios.post("/api/auth/user/signup", data, {withCredentials: true});
    return response.data;
};

export const login = async (data:{email: string, password: string, username: string}) => {
    const response = await axios.post("/api/auth/user/login", data, {withCredentials: true});
    console.log("DATA: ", data);
    return response.data;
};

export const logout = async () => {
    const response = await axios.post("/api/auth/user/logout", {}, {withCredentials: true});
    return response.data;
};

export const edit = async (data: FormData) => {
    const response = await axios.put(`/api/auth/user/edit-user`, data, {
        withCredentials: true,
        headers: {
            'Content-Type' : undefined
        }
    });
    return response.data;
}