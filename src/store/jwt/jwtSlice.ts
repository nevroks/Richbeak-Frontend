import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type initialStatePropsType = {
    accessToken: undefined | string,
    refreshToken: undefined | string,
}

const initialState: initialStatePropsType = {accessToken: undefined, refreshToken: undefined}

export const jwtSlice = createSlice({
    name: 'jwt',
    initialState,
    reducers: {
        setJwt: (state, {payload}: PayloadAction<initialStatePropsType>) => {
            state.accessToken = payload.accessToken ? payload.accessToken : state.accessToken
            state.refreshToken = payload.refreshToken ? payload.refreshToken : state.refreshToken
        }
    }
})
// Action creators are generated for each case reducer function
export const {setJwt} = jwtSlice.actions


export default jwtSlice.reducer

