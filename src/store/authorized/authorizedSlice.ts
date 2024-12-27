import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type initialStatePropsType = {
    authorized: boolean,
}

const initialState: initialStatePropsType = {authorized: false}

export const authorizedSlice = createSlice({
    name: 'authorized',
    initialState,
    reducers: {
        setAuthorized: (state, {payload}: PayloadAction<boolean>) => {
            state.authorized = payload
        }
    }
})
// Action creators are generated for each case reducer function
export const {setAuthorized} = authorizedSlice.actions


export default authorizedSlice.reducer

