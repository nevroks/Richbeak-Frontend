import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type initialStatePropsType = {
    csrf: undefined | string
}

const initialState: initialStatePropsType = {csrf: undefined}

export const csrfSlice = createSlice({
    name: 'csrf',
    initialState,
    reducers: {
        setCsrf: (state, {payload}: PayloadAction<string>) => {
            state.csrf = payload
        }
    }
})
// Action creators are generated for each case reducer function
export const {setCsrf} = csrfSlice.actions


export default csrfSlice.reducer

