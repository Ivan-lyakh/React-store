import { configureStore } from "@reduxjs/toolkit";
import selectedProductReducer from "../sliceStore/selectedProduct"


export const store = configureStore({
  reducer: {
    selectedProduct: selectedProductReducer
  }
});

export type RootState =
  ReturnType<
    typeof store.getState
  >