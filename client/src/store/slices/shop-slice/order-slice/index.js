import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null
}


export const createNewOrder = createAsyncThunk("shop/order/createNewOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/shop/order/create`, orderData);
    return response?.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})


export const capturePayment = createAsyncThunk("shop/order/capturePayment", async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/shop/order/capture`, { paymentId, payerId, orderId });
    return response?.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})


export const getAllOrders = createAsyncThunk("shop/order/getAllOrders", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/shop/order/list/${userId}`);
    return response?.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


export const getOrderDetails = createAsyncThunk("shop/order/getOrderDetails", async (orderId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`api/shop/order/details/${orderId}`)
    return response?.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


const shoppingOrderSlice = createSlice({
  name: 'shoppingOrderSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    // createNewOrder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action?.payload?.approvalURL;
        state.orderId = action?.payload?.orderId;
        sessionStorage.setItem('currentOrderId', JSON.stringify(action?.payload?.orderId))
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })


      // getAllOrders
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action?.payload?.data;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
      })


      // getOrderDetails
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action?.payload?.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
  }
})


export default shoppingOrderSlice.reducer;