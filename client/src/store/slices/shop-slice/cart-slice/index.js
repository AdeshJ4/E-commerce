import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartItems: [],
    isLoadingAdd: false,
    isLoadingFetch: false,
    isLoadingUpdate: false,
    isLoadingDelete: false,
}


export const addToCart = createAsyncThunk("/shop/cart/addToCart", async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/shop/cart/add`, { userId, productId, quantity });
        return response?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});



export const fetchCartItems = createAsyncThunk("/shop/cart/fetchCartItems", async (userId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});


export const updateCartItems = createAsyncThunk("/shop/cart/updateCartItems", async ({ userId, productId, quantity }, { rejectWithValue }) => {
    console.log('updateCartItems quantity ', quantity);

    try {
        const response = await axios.put("http://localhost:5000/api/shop/cart/update-cart", { userId, productId, quantity });
        return response?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})


export const deleteCartItem = createAsyncThunk("/shop/cart/cartDeleteCartItem", async ({ userId, productId }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/shop/cart/${userId}/${productId}`);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
})



const shopCartSlice = createSlice({
    name: 'shopCartSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder


            // addToCart
            .addCase(addToCart.pending, (state) => {
                state.isLoadingAdd = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoadingAdd = false;
                state.cartItems = action?.payload?.data?.items;
            })
            .addCase(addToCart.rejected, (state) => {
                state.isLoadingAdd = false;
            })



            // fetchCartItems
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoadingFetch = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoadingFetch = false;
                state.cartItems = action?.payload?.data?.items;
            })
            .addCase(fetchCartItems.rejected, (state) => {
                state.isLoadingFetch = false;
            })


            // updateCartItems
            .addCase(updateCartItems.pending, (state) => {
                state.isLoadingUpdate = true;
            })
            .addCase(updateCartItems.fulfilled, (state, action) => {
                state.isLoadingUpdate = false;
                state.cartItems = action?.payload?.data?.items;
            })
            .addCase(updateCartItems.rejected, (state) => {
                state.isLoadingUpdate = false;
            })


            // deleteCartItem
            .addCase(deleteCartItem.pending, (state) => {
                state.isLoadingDelete = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.isLoadingDelete = false;
                state.cartItems = action?.payload?.data?.items;
            })
            .addCase(deleteCartItem.rejected, (state) => {
                state.isLoadingDelete = false;
            });
    }
});


export default shopCartSlice.reducer;