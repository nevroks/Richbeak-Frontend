import {AppThunk} from "../../../../store/store.ts";
import { signInResponse } from "../../../../types/responseTypes.ts";
import {authApi} from "../authApi.ts";
import {loginThunk} from "./loginThunk.tsx";

export const registerThunk =
    ({password, userName, email}: { password: string, userName: string, email: string }): AppThunk<Promise<signInResponse>> =>
        async (dispatch, _,) => {
            const registerResponse = await dispatch(authApi.endpoints.register.initiate({password, userName, email}))
            if (registerResponse.data === null) {
                return await dispatch(loginThunk({password: password, email: email}))
            }
            return registerResponse;
        };