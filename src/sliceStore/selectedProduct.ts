import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../types/ProductTypes";

type SelectedProduct = Product | null

const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState: {
    selectedProduct: null
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    resetSelectedProduct: (state) => {
      state.selectedProduct = null
    }
  }
})

export const { setSelectedProduct, resetSelectedProduct } = selectedProductSlice.actions

export default selectedProductSlice.reducer