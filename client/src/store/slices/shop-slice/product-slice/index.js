import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/shop/products/fetchAllFilteredProducts",
  async ({ filterParams, sortParams }, { rejectWithValue }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    try {
      // /api/shop/products/get?category=men%2Cwomen&brand=nike%2Cadidas&sortBy=price-lowtohigh
      const response = await axios.get(
        `http://localhost:5000/api/shop/products/get?${query}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/shop/products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/products/get/${id}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const shopProductSlice = createSlice({
  name: "shoppingProductsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetchAllFilteredProducts
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action?.payload?.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
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
      });
  },
});

export const { setProductDetails } = shopProductSlice.actions;
export default shopProductSlice.reducer;
