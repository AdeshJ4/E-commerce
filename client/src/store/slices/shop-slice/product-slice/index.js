import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null
}


export const fetchAllProducts = createAsyncThunk( "/shop/products/fetchAllProducts",  async({filterParams, sortParams}) => {// filterParams: { "category": ["men", "women"], "brand": ["nike", "adidas"]}, sortParams: price-lowtohigh  
  const query = new URLSearchParams({  // query : URLSearchParams { 'category' => 'men,women', 'brand'=> 'nike,adidas', 'sortBy'=> 'price-lowtohigh'} 
    ...filterParams, 
    sortBy: sortParams
  });
  
    const response = await axios.get(`http://localhost:5000/api/shop/products/get?${query}`);  // /api/shop/products/get?category=men%2Cwomen&brand=nike%2Cadidas&sortBy=price-lowtohigh
    return response?.data;
})


export const fetchProductDetails = createAsyncThunk("/shop/products/fetchProductDetails", async(id) => {
  
  const response = await axios.get(`http://localhost:5000/api/shop/products/get/${id}`);
  return response?.data;
})








const shopProductSlice =  createSlice({
  name: 'shoppingProductsSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetchAllProducts
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

      // fetchProductDetails
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action?.payload?.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      })
  }
})


export default shopProductSlice.reducer;