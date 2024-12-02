import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoading: false,
  error: null,
  orderList: [],
  orderDetails: null,
}


export const getAllOrdersForAdmin = createAsyncThunk("admin/order/getAllOrdersForAdmin", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/admin/order/get`);
    return response?.data;
  } catch (error) {
    console.error("Error in getAllOrdersForAdmin thunk:", error?.response); 
    return rejectWithValue(error?.response?.data);
  }
})


export const getOrderDetailsForAdmin = createAsyncThunk("admin/order/getOrderDetailsForAdmin", async (orderId, { rejectWithValue }) => {
  try {    
    const response = await axios.get(`http://localhost:5000/api/admin/order/details/${orderId}`)
    return response?.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


export const updateOrderStatusForAdmin = createAsyncThunk("admin/order/updateOrderStatusForAdmin", async ({orderId, orderStatus}, { rejectWithValue }) => {
  try {        
    const response = await axios.put(`http://localhost:5000/api/admin/order/update/${orderId}`, { orderStatus })
    return response?.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


const adminOrderSlice = createSlice({
  name: "adminOrderSlice", 
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder
      // getAllOrdersForAdmin
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action?.payload?.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {        
        state.isLoading = false;
        state.orderList = [];
        state.error = action?.payload?.message || "Failed to fetch orders";
      })


      // getOrderDetailsForAdmin
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action?.payload?.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
        state.error = action?.payload?.message || "Failed to fetch orders";
      })


      // updateOrderStatusForAdmin

      // .addCase(updateOrderStatusForAdmin.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;// Clear previous errors
      // })
      // .addCase(updateOrderStatusForAdmin.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.
      // })

  }

})


export default adminOrderSlice.reducer