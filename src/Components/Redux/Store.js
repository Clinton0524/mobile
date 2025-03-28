import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./CategorySlice";
import ProductReducer from './ProductsSlice'
const Store = configureStore({
  reducer: {
    category: CategoryReducer,
    products:ProductReducer
  },
});
export default Store;
