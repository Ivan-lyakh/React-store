import { configureStore } from "@reduxjs/toolkit";
import selectedProductReducer from "../sliceStore/selectedProduct"
import usersReducer from '../sliceStore/user'
import cartReducer from '../sliceStore/Cart'
import productsReducer from "../sliceStore/product";


export const store = configureStore({
  reducer: {
    selectedProduct: selectedProductReducer,
    user: usersReducer,
    cart: cartReducer,
    products: productsReducer,
  }
});

export type RootState =
  ReturnType<
    typeof store.getState
  >