import { configureStore } from "@reduxjs/toolkit";

import authReducer from './slices/auth-slice'
import adminProductsReducer from "./slices/admin-slice/products-slice";
import adminOrderReducer from './slices/admin-slice/order-slice';
import shopProductsReducer from './slices/shop-slice/product-slice';
import shopCartReducer from './slices/shop-slice/cart-slice';
import shopAddressReducer from './slices/shop-slice/address-slice';
import shopOrderReducer from './slices/shop-slice/order-slice';
import shopSearchReducer from './slices/shop-slice/search-slice';
import shopReviewReducer from './slices/shop-slice/review-slice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    shopProducts: shopProductsReducer,
    shopCart: shopCartReducer,
    shopAddress: shopAddressReducer,
    shopOrder: shopOrderReducer,
    shopSearch: shopSearchReducer,
    shopReview: shopReviewReducer,

    adminOrder: adminOrderReducer,
    adminOrder: shopSearchReducer,
  }
})


export default store;