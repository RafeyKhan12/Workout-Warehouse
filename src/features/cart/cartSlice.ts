import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addItem, removeItem, getItem, getAllItems, clearCart} from "./cartService"

interface CartItem {
    _id: string;
    product: string;
    quantity: number;
}

interface Cart {
    _id: string;
    user: string;
    items: CartItem[];
}

interface CartState {
    items: Cart[];
    item: Cart | null;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    item: null,
    loading: false,
    error: null
}

export const addItemToCart = createAsyncThunk("cart/addItem", async (data: {productId: string, quantity: number}, thunkAPI) => {
    try {
        return await addItem(data);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create product",
      );
    }
})

export const removeFromCart = createAsyncThunk("cart/removeItem", async (id: string, thunkAPI) => {
    try {
        return await removeItem(id);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove product",
      );
    }
})

export const getItemFromCart = createAsyncThunk("cart/getItem", async (id:string, thunkAPI) => {
    try {
        return await getItem(id);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product",
      );
    }
})

export const getItems = createAsyncThunk("cart/getItems", async (_, thunkAPI) => {
    try {
        return await getAllItems();
    } catch (error: any) {
        return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Cart is empty",
      );
    }
})

export const cartClear = createAsyncThunk("cart/clearCart", async (id: string, thunkAPI) => {
    try {
        return await clearCart(id);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Cart cannot be cleared",
      );
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addItemToCart.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(addItemToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.item = action.payload.item;
            state.items.push(action.payload.item);
        })
        .addCase(addItemToCart.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload
        })

        // REMOVE FROM CART
        .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            const deleteItem = action.payload.deletedItem;
            state.items = state.items?.filter((i) => i._id !== deleteItem._id);
        })
        .addCase(removeFromCart.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload
        })

        // GET ITEM
        .addCase(getItemFromCart.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(getItemFromCart.fulfilled, (state, action) => {
            state.loading = false;
            state.item = action.payload.item;
        })
        .addCase(getItemFromCart.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload
        })

        // GET ITEMS
        .addCase(getItems.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(getItems.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.items;
        })
        .addCase(getItems.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })

        // CLEAR CART
        .addCase(cartClear.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(cartClear.fulfilled, (state, action) => {
            state.loading = false;
            state.items = []
        })
        .addCase(cartClear.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default cartSlice.reducer;