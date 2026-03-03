import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAddress, deleteAddress, editAddress, fetchAddress, fetchAddresses } from "./addressService";

interface AddressPayload {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    isDefault ?: boolean;
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

interface AddressState {
    addresses: AddressPayload[];
    address: AddressPayload | null;
    loading: boolean;
    error: string | null;
}

const initialState: AddressState = {
    addresses: [],
    address: null,
    loading: false,
    error: null
}

export const addAddress = createAsyncThunk("address/add", async (data:AddressPayload, thunkAPI) => {
    try {
        return await createAddress(data);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Couldn't create address");
    }
});

export const updateAddress = createAsyncThunk("address/update", async ({data, id} : {data:EditAddressPayload, id: string}, thunkAPI) => {
    try {
        return await editAddress(data, id);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Update failed");
    }
});

export const removeAddress = createAsyncThunk("address/remove", async (id:string, thunkAPI) => {
    try {
        return await deleteAddress(id);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to remove address");
    }
});

export const getAddress = createAsyncThunk("address/get-address", async (id:string, thunkAPI) => {
    try {
        return await fetchAddress(id);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Log In failed");
    }
});

export const getAddresses = createAsyncThunk("address/get-addresses", async (_, thunkAPI) => {
    try {
        return await fetchAddresses();
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Log In failed");
    }
})

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addAddress.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.address = action.payload.address;
            state.addresses?.push(action.payload.address)
        })
        .addCase(addAddress.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })

        // UPDATE ADDRESS
        .addCase(updateAddress.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateAddress.fulfilled, (state, action) => {
            state.loading = false;
            const updatedAddress = action.payload.address;
            state.addresses = state.addresses.map((address: any) => address._id === updatedAddress._id ? updatedAddress : address);
        })
        .addCase(updateAddress.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })

        // REMOVE ADDRESS
        .addCase(removeAddress.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeAddress.fulfilled, (state, action) => {
            state.loading = false;
            const deletedAddress = action.payload.address;
            state.addresses = state.addresses.filter((address: any) => address._id !== deletedAddress._id);
        })
        .addCase(removeAddress.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })

        // GET ADDRESS
        .addCase(getAddress.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.address = action.payload.address;
        })
        .addCase(getAddress.rejected, (state, action: any) => {
            state.loading = true;
            state.error = action.payload;
        })

        // GET ADDRESSES
        .addCase(getAddresses.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAddresses.fulfilled, (state, action) => {
            state.loading = false;
            state.addresses = action.payload.addresses;
        })
        .addCase(getAddresses.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default addressSlice.reducer;