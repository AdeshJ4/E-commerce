import { createSlice } from "@reduxjs/toolkit";


// Whether user is authenticated or not 
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null 
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    }
  }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
