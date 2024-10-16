import { configureStore } from "@reduxjs/toolkit";

import authReducer from './slices/auth-slice'
import adminProductsReducer from "./slices/admin-slice";
import shopProductsReducer from './slices/shop-slice/product-slice';
import shopCartReducer from './slices/shop-slice/cart-slice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    shopProducts: shopProductsReducer,
    shopCart: shopCartReducer
  }
})


export default store;