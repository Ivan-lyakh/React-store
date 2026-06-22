import { configureStore } from "@reduxjs/toolkit";
import selectedProductReducer from "../sliceStore/selectedProduct"
import usersReducer from '../sliceStore/user'


export const store = configureStore({
  reducer: {
    selectedProduct: selectedProductReducer,
    user: usersReducer
  }
});

export type RootState =
  ReturnType<
    typeof store.getState
  >