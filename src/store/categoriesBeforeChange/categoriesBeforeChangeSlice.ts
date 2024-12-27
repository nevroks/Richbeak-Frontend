import {createSlice} from "@reduxjs/toolkit";

type categoriesBeforeChangeState = {
    value: Array<string>;
};

const initialState: categoriesBeforeChangeState = {
    value: [],
};

const categoriesBeforeChangeSlice = createSlice({
    name: "categoriesBeforeChange",
    initialState,
    reducers: {
        addcategoriesBeforeChange: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const {
    addcategoriesBeforeChange,
} = categoriesBeforeChangeSlice.actions;

export default categoriesBeforeChangeSlice.reducer;