import { createSlice } from "@reduxjs/toolkit";

type currencyState = {
  value: string;
};

const initialState: currencyState = {
  value: 'USD',
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeCurrency } = currencySlice.actions;

export default currencySlice.reducer;