import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  isLoading: false,
  productList: []
}


export const fetchAllProducts = createAsyncThunk(
  "/shop/products/fetchAllProducts", 
  async() => {
    const response = await axios.get("http://localhost:5000/api/shop/products/get");
    return response?.data;
})

const shopProductSlice =  createSlice({
  name: 'shoppingProductsSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {        
        state.isLoading = false;
        state.productList = action?.payload?.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = []
      })
  }
})


export default shopProductSlice.reducer;