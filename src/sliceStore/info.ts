import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Info = {
  id: number;
  text: string;
  success: boolean;
};

type InfoState = {
  info: Info[];
};

const initialState: InfoState = {
  info: [],
};

const infoSlice = createSlice({
  name: "info",
  initialState,

  reducers: {
    setInfo(
      state,
      action: PayloadAction<Info>
    ) {
      state.info.push(action.payload);
    },

    removeInfo(
      state,
      action: PayloadAction<number>
    ) {
      state.info = state.info.filter(
        item => item.id !== action.payload
      );
    },

    resetInfo(state) {
      state.info = [];
    },
  },
});

export const {
  setInfo,
  removeInfo,
  resetInfo,
} = infoSlice.actions;

export default infoSlice.reducer;