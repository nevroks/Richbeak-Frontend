import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {appLanguages} from "../../types/types.ts";

type initialStatePropsType = {
    language: appLanguages
}

const initialState: initialStatePropsType = {language: "EN"}

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, {payload}: PayloadAction<appLanguages>) => {
            state.language = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {setLanguage} = languageSlice.actions

export default languageSlice.reducer