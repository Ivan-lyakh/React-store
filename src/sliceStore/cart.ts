import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  product_id: number;
  user_id: string;
  quantity: number;
  price: number,
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },

    resetCart(state) {
      state.items = [];
    },
  },
});

export const { setCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;