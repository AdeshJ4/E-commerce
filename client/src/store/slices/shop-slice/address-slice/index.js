import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
    isLoading: false,
    addressList: []
}

const baseURL= "http://localhost:5000/api/shop/address";


export const addNewAddress = createAsyncThunk("/shop/address/addNewAddress", async (formData, {rejectWithValue}) => {
    try{
        const response = await axios.post(`http://localhost:5000/api/shop/address/add`, formData);
        return response?.data;
    }catch(err){
        return rejectWithValue(err?.response?.data);
    }
});


export const editAddress = createAsyncThunk("/shop/address/editAddress", async ({userId, addressId}, {rejectWithValue}) => {
    try{
        const response = await axios.put(`http://localhost:5000/api/shop/address/update/${userId}/${addressId}`, formData);
        return response?.data;
    }catch(err){
        return rejectWithValue(err?.response?.data);
    }
})


export const fetchAllAddresses  = createAsyncThunk("/shop/address/fetchAllAddresses", async ({ userId }, {rejectWithValue}) => {
    try{
        const response = await axios.get(`api/shop/address/get/${userId}`);
        return response?.data;
    }catch(err){
        return rejectWithValue(err?.response?.data);
    }
});


export const deleteAddress = createAsyncThunk("/shop/address/deleteAddress", async ({userId, addressId}, { rejectWithValue}) => {
    try{
        const response = await axios.delete(`api/shop/address/delete/${userId}/${addressId}`);
        return response?.data;
    }catch(err){
        return rejectWithValue(err?.response?.data);
    }
})


const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

        // addNewAddress
        .addCase(addNewAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addNewAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action?.payload?.data;
        })
        .addCase(addNewAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.addressList = [];
        })


        //editAddress
        .addCase(editAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(editAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action?.payload?.data;
        })
        .addCase(editAddress.rejected, (state) => {
            state.isLoading = false;
            state.addressList = [];
        })

        //fetchAllAddresses
        .addCase(fetchAllAddresses.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchAllAddresses.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action?.payload?.data;
        })
        .addCase(fetchAllAddresses.rejected, (state) => {
            state.isLoading = false;
            state.addressList = [];
        })


        //deleteAddress
        .addCase(deleteAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action?.payload?.data;
        })
        .addCase(deleteAddress.rejected, (state) => {
            state.isLoading = false;
            state.addressList = [];
        })

    }
})


export default addressSlice.reducer;