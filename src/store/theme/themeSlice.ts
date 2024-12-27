import {createSlice} from '@reduxjs/toolkit'

type initialStatePropsType = {
    isDarkMode: boolean | undefined
}

const initialState: initialStatePropsType = {isDarkMode: undefined}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state, action) => {
            state.isDarkMode = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {toggleTheme} = themeSlice.actions

export default themeSlice.reducer