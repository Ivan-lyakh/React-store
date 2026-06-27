import { configureStore } from "@reduxjs/toolkit";
import selectedProductReducer from "../sliceStore/selectedProduct"
import usersReducer from '../sliceStore/user'
import cartReducer from '../sliceStore/cart'
import productsReducer from "../sliceStore/product";
import infoReducer from '../sliceStore/info'


export const store = configureStore({
  reducer: {
    selectedProduct: selectedProductReducer,
    user: usersReducer,
    cart: cartReducer,
    products: productsReducer,
    info: infoReducer
  }
});

export type RootState =
  ReturnType<
    typeof store.getState
  >