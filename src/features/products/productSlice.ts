import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  create,
  edit,
  deleteProduct,
  getProduct,
  getAllProducts,
} from "./productService";

interface ProductState {
  products: any[];
  product: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const addProduct = createAsyncThunk(
  "product/add",
  async (data: FormData, thunkAPI) => {
    try {
      return await create(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create product",
      );
    }
  },
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ data, id }: { data: FormData; id: string }, thunkAPI) => {
    try {
      return await edit(data, id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Update Product",
      );
    }
  },
);

export const removeProduct = createAsyncThunk(
  "product/delete",
  async (id: string, thunkAPI) => {
    try {
      console.log("Slice: ", id)
      return await deleteProduct(id);

    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove product",
      );
    }
  },
);

export const fetchProduct = createAsyncThunk(
  "product/get-product",
  async (id: string, thunkAPI) => {
    try {
      return await getProduct(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Product",
      );
    }
  },
);

export const getProducts = createAsyncThunk(
  "product/get-all-products",
  async (_, thunkAPI) => {
    try {
      return await getAllProducts();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Products",
      );
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ADD
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action: any) => {
        state.loading = false;
        state.products?.push(action.payload.product);
      })
      .addCase(addProduct.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload.product;
        state.products = state.products.map((p: any) =>
          p._id === updatedProduct._id ? updatedProduct : p,
        );
      })
      .addCase(updateProduct.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deleted = action.payload.product;

        state.products = state.products?.filter(
          (p: any) => p._id !== deleted._id,
        );
      })

      .addCase(removeProduct.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET PRODUCT
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        const productInfo = action.payload.product;
        const exists = state.products.find((p) => p._id === productInfo._id);
        if(!exists){
          state.products.push(productInfo);
        }
        state.product = productInfo;
      })
      .addCase(fetchProduct.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL PRODUCTS
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
