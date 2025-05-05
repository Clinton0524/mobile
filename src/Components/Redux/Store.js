import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./CategorySlice";
import ProductReducer from './ProductsSlice'
import BannerReducer from './BannerSlice'
import CartReducer from './CartSlice'
import AuthReducer from './AuthSlice'

const Store = configureStore({
  reducer: {
    category: CategoryReducer,
    products:ProductReducer,
    banners:BannerReducer,
    cart:CartReducer,
    auth: AuthReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default Store;
