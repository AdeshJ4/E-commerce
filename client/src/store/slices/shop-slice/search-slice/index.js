import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState =  {
  isLoading : false,
  searchResults : [],
  error: null,
}

export const getSearchResults = createAsyncThunk("/shop/search/getSearchResults", async (searchText, {rejectWithValue}) => {
  try{   
    const response = await axios.get(`http://localhost:5000/api/shop/search/${searchText}`);
    return response?.data;
  }catch(error){
    console.error("Error in getSearchResults thunk:", error?.response); 
    return rejectWithValue(error?.response?.data);
  }
})



const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = []
    }
  } ,
  extraReducers: (builder) => {

    builder

    .addCase(getSearchResults.pending,  (state) => {
      state.isLoading = true;
      state.error = null; // Clear previous errors
    })
    .addCase(getSearchResults.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searchResults = action?.payload?.data;
    })
    .addCase(getSearchResults.rejected, (state, action) => {
      state.isLoading = false;
      state.searchResults = [];
      state.error = action?.payload?.message || "Failed to get Search Results"
    })
  }
})

export const { resetSearchResults }  = searchSlice.actions;
export default searchSlice.reducer;