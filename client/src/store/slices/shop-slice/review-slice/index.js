import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading : false,
  reviews: [],
  error: null
}


export const addReview = createAsyncThunk("/shop/review/addReview", async ({productId, userId, userName, reviewMessage, reviewValue}, { rejectWithValue }) => {
  try{
    const response = await axios.post(`http://localhost:5000/api/shop/review/add`, {productId, userId, userName, reviewMessage, reviewValue});
    return response?.data;
  }catch(err){
    return rejectWithValue(err?.response?.data)
  }
})


export const getReviews = createAsyncThunk("/shop/review/getReviews", async (productId, {rejectWithValue}) => {
  try{
    const response = await axios.get(`http://localhost:5000/api/shop/review/${productId}`);
    return response?.data;
  }catch(err){
    return rejectWithValue(err?.response?.data);
  }
})




const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder


    // addReview
    .addCase(addReview.pending, (state) => {
      state.isLoading = true;
      state.error = null; // Clear previous errors
    })
    .addCase(addReview.fulfilled, (state, action) => {
      console.log('addReview.fulfilled: ', action?.payload?.data);
      
      state.isLoading = false;
      state.reviews = action?.payload?.data;
    })
    .addCase(addReview.rejected, (state, action) => {
      state.isLoading = false;
      state.reviews = [];
      state.error = action?.payload?.message || "Failed to add review";
    })


    // getReviews
    .addCase(getReviews.pending, (state) => {
      state.isLoading = true;
      state.error = null; // Clear previous errors
    })
    .addCase(getReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviews = action?.payload?.data;
    })
    .addCase(getReviews.rejected, (state, action) => {
      state.isLoading = false;
      state.reviews = [];
      state.error = action?.payload?.message || "Failed to get reviews"
    })
  }
})

export default reviewSlice.reducer;