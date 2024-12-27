import { createSlice } from "@reduxjs/toolkit";

type selectedCategoriesState = {
  value: Array<{ name: string; id: string }>;
};

const initialState: selectedCategoriesState = {
  value: [],
};

const selectedCategoriesPopupSlice = createSlice({
  name: "selectedCategoriesPopup",
  initialState,
  reducers: {
    addCategoryPopup: (state, action) => {
      state.value.push(action.payload);
    },
    addCategoryPopupBeforeChange: (state, action) => {
      state.value = action.payload;
    },
    deleteCategoryPopup: (state, action) => {
      const newArr = state.value.filter((el) => action.payload.id !== el.id);
      state.value = newArr;
    },
    changeCategoryPopup: (state, { payload }) => {
      const currentCategory = payload.currentCategory;
      const card = payload.card;
      state.value = state.value.map((c) => {
        if (c.id === card.id) {
          return { ...c, name: currentCategory.name };
        }
        if (c.id === currentCategory.id) {
          return { ...c, name: card.name };
        }
        return c;
      });
      // const currentCategory = payload.currentCategory;
      // const card = payload.card;
      // const index1 = state.value.indexOf(card);
      // const index2 = state.value.indexOf(currentCategory);
      // state.value.splice(index1, 1, currentCategory);
      // state.value.splice(index2, 1, card);
    },
    getInitialState: (state) => {
      state.value = [
        { name: "marcetCap.ColumnOneHour", id: "percent_change_1h" },
        { name: "marcetCap.ColumnTwentyFourHour", id: "percent_change_24h" },
        { name: "marcetCap.ColumnSevenDays", id: "percent_change_7d" },
        { name: "marcetCap.title", id: "market_cap" },
        { name: "marcetCap.volume", id: "volume_24h" },
        { name: "marcetCap.ColumnCirculation", id: "circulating_supply" },
      ];
    },
  },
});

export const {
  addCategoryPopup,
  addCategoryPopupBeforeChange,
  deleteCategoryPopup,
  changeCategoryPopup,
  getInitialState,
} = selectedCategoriesPopupSlice.actions;

export default selectedCategoriesPopupSlice.reducer;
