import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null
}


export const createNewOrder = createAsyncThunk("shop/order/createNewOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/shop/order/create`, orderData);
    return response?.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})


const shoppingOrderSlice = createSlice({
  name: 'shoppingOrderSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action?.payload?.approvalURL;
        state.orderId = action?.payload?.orderId;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
  }
})


export default shoppingOrderSlice.reducer;