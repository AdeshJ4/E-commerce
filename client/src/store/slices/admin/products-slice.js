import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk("/products/addNeProduct", async (formData) => {
  console.log('createAsyncThunk("/products/addNeProduct', formData);
  
  const result = await axios.post("http://localhost:5000/api/admin/products/add", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  }
  );

  return result?.data;
}
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/api/admin/products/get");

    return response?.data;
  }
)

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);


export const deleteProduct = createAsyncThunk("/products/deleteProduct", async (id) => {
  const result = axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);

  return result?.data;
})


const adminProductsSlice = createSlice({
  name: "adminProductsSlice",
  initialState,
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
        state.productList = [];
      })


    // 
  },
});


// export const { } = adminProductsSlice.actions;
export default adminProductsSlice.reducer;