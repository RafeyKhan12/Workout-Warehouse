import { signup, login, logout, edit } from "./authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
    user: any | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
};

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false
};

interface UpdateUser {
    username ?: string;
    password ?: string;
    avatarFile?: File | null;
}

export const signupUser = createAsyncThunk("auth/signup", async (data:FormData, thunkAPI) => {
    try {
        return await signup(data);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "SignUp failed");
    }
});

export const loginUser = createAsyncThunk("auth/login", async (data: {username: string, email: string, password: string}, thunkAPI) => {
    try {
        return await login(data);
    } catch (error: any) {
        console.log("Error logging in: ", error.message);
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Log In failed");
    }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        return await logout();
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "SignUp failed");
    }
});

export const updateUser = createAsyncThunk("auth/update", async ({data}: {data: FormData}, thunkAPI) => {
    try {
        return await edit(data);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "User update failed");
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signupUser.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
        })
        .addCase(signupUser.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })

        // LOGIN
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            console.log("User: ", action.payload);
            state.loading = false;
            state.user = action.payload.loggedInUser;
            state.isAuthenticated=true;
        })
        .addCase(loginUser.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })

        // LOGOUT
        .addCase(logoutUser.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(logoutUser.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // UPDATE USER
        .addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload);
        })
        .addCase(updateUser.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })
        
    }
});

export default authSlice.reducer;