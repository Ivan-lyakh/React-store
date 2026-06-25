import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/ProductTypes";

type ProductState = {
  products: Product[];
};

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },

    resetProducts(state) {
      state.products = [];
    },
  },
});

export const { setProducts, resetProducts } = productSlice.actions;

export default productSlice.reducer;