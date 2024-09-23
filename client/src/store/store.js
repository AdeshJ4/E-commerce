import { configureStore } from "@reduxjs/toolkit";


import authReducer from './slices/auth-slice'
import adminProductsReducer from "./slices/admin/products-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer
  }
})


export default store;