import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "./userService";

export const getUsers = createAsyncThunk("auth/getUsers", async (_, thunkAPI) => {
    try {
        return await getAllUsers()
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "SignUp failed");
    }
})