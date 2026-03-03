import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  getUserOrder,
  getUserOrders,
  updateOrder,
  updateOrderStatus,
} from "./orderService";

interface OrderItems {
  product: string;
  name: string;
  price: number;
  quantity: number;
}

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

interface Order {
  _id: string;
  items: OrderItems[];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  address: AddressPayload;
  payment: string;
  paymentStatus: "unpaid" | "paid";
  paymentType: "online" | "cash";
}

interface orderState {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: orderState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

// USER SLICE

interface createPayload {
  items: {productId: string, quantity: number}[],
  addressId: string;
  paymentType: "online" | "cash";
}

interface updatePayload {
  addressId?: string;
  paymentType?: "online" | "cash";
  orderId: string;
}

interface updateStatusPayload {
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
}

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (data: createPayload, thunkAPI) => {
    try {
      return await createOrder(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create order",
      );
    }
  },
);

export const getOrderUser = createAsyncThunk(
  "order/getUserOrder",
  async (id: string, thunkAPI) => {
    try {
      return await getUserOrder(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch order",
      );
    }
  },
);

export const getOrdersUser = createAsyncThunk(
  "order/getUserOrders",
  async (_, thunkAPI) => {
    try {
      return await getUserOrders();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

export const orderUpdate = createAsyncThunk(
  "order/update-order",
  async ({ id, data }: { id: string; data: updatePayload }, thunkAPI) => {
    try {
      return await updateOrder(id, data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order",
      );
    }
  },
);

// ADMIN SLICES

export const removeOrder = createAsyncThunk(
  "order/delete-order",
  async (id: string, thunkAPI) => {
    try {
      return await deleteOrder(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order",
      );
    }
  },
);

export const fetchOrder = createAsyncThunk(
  "order/get-order",
  async (id: string, thunkAPI) => {
    try {
      return await getOrder(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order",
      );
    }
  },
);

export const fetchOrders = createAsyncThunk(
  "order/get-orders",
  async (_, thunkAPI) => {
    try {
      return await getAllOrders();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order",
      );
    }
  },
);

export const orderStatusUpdate = createAsyncThunk(
  "order/update-order-status",
  async ({ id, data }: { id: string; data: string }, thunkAPI) => {
    try {
      return await updateOrderStatus(id, data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ADD ORDER
      // USER
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.orders.push(action.payload?.order);
      })
      .addCase(addOrder.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET USER ORDER -SINGLE
      .addCase(getOrderUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderUser.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload?.order;
      })
      .addCase(getOrderUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET USER ORDERS - ALL (FOR A SPECIFIC USER)
      .addCase(getOrdersUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.orders;
      })
      .addCase(getOrdersUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE ORDER
      .addCase(orderUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderUpdate.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload.updatedOrder;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order,
        );
      })
      .addCase(orderUpdate.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADMIN
      // DELETE ORDER
      .addCase(removeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.loading = false;
        const deletedOrder = action.payload.deletedOrder;
        state.orders = state.orders.filter(
          (order) => order._id !== deletedOrder._id,
        );
      })
      .addCase(removeOrder.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL ORDERS
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchOrders.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ONE ORDER
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload?.order;
      })
      .addCase(fetchOrder.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE STATUS
      .addCase(orderStatusUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderStatusUpdate.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload.updatedStatusOrder;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order,
        );
      })
      .addCase(orderStatusUpdate.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
