import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type initialStatePropsType = {
    isAdmin: boolean
}

const initialState: initialStatePropsType = {isAdmin: false}

export const isAdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setIsAdmin: (state, {payload}: PayloadAction<boolean>) => {
            state.isAdmin = payload
        }
    }
})
// Action creators are generated for each case reducer function
export const {setIsAdmin} = isAdminSlice.actions


export default isAdminSlice.reducer

