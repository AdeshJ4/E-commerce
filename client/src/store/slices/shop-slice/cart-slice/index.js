import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    cartItems: [],
    isLoading: false,
    error: null
}


export const addToCart = createAsyncThunk("/shop/cart/addToCart", async ({ userId, productId, quantity }) => {
    const response = await axios.post(`http://localhost:5000/api/shop/cart/add`, { userId, productId, quantity })
    return response?.data;
})

export const fetchCartItems = createAsyncThunk("/shop/cart/fetchCartItems", async(userId) => {
    const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`);
    return response?.data;
})

export const updateCartItems = createAsyncThunk("/shop/cart/updateCartItems", async({ userId, productId, quantity}) => {
    const response = await axios.put("http://localhost:5000/api/shop/cart/update-cart", {userId, productId, quantity});
    return response?.data;
})

export const deleteCartItem = createAsyncThunk("/shop/cart/cartDeleteCartItem", async({userId, productId}) => {
    const response = await axios.delete(`http://localhost:5000/api/shop/cart/${userId}/${productId}`);
    return response?.data;
})



const shopCartSlice = createSlice({
    name: 'shopCartSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder


        // addToCart
        .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action?.payload?.data?.items;
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.cartItems = [];
            state.error = action?.payload?.message;
        })



        // fetchCartItems
        .addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action?.payload?.data?.items;
        })
        .addCase(fetchCartItems.rejected, (state, action) => {
            state.isLoading = false;
            state.cartItems = [];
            state.error = action?.payload?.message;
        })



        // updateCartItems
        .addCase(updateCartItems.pending, (state, action) => {
            state.isLoading = true;
            state.cartItems = action?.payload?.data;
        })
        .addCase(updateCartItems.rejected, (state, action) => {
            state.isLoading = false;
            state.cartItems = [];
            state.error = action?.payload?.message;
        })


        // deleteCartItem
        .addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action?.payload?.data;
        })
        .addCase(deleteCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.cartItems = [];
            state.error = action?.payload?.message;
        })
    }
});


export default shopCartSlice.reducer;