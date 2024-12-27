import { createSlice } from "@reduxjs/toolkit";

type selectedCategoriesState = {
  value: Array<{ name: string; id: string }>;
};

const initialState: selectedCategoriesState = {
  value: [
    { name: "marcetCap.ColumnOneHour", id: "percent_change_1h" },
    { name: "marcetCap.ColumnTwentyFourHour", id: "percent_change_24h" },
    { name: "marcetCap.ColumnSevenDays", id: "percent_change_7d" },
    { name: "marcetCap.title", id: "market_cap" },
    { name: "marcetCap.volume", id: "volume_24h" },
    { name: "marcetCap.ColumnCirculation", id: "circulating_supply" },
  ],
};

const selectedCategoriesSlice = createSlice({
  name: "selectedCategories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addCategory } = selectedCategoriesSlice.actions;

export default selectedCategoriesSlice.reducer;
