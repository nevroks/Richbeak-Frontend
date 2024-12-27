import {AppThunk} from "../../../../store/store.ts";
import {authApi} from "../authApi.ts";
import {APP_PAGES_PATHS_CONSTS} from "../../../consts/appConsts.ts";
import { setAuthorized } from "../../../../store/authorized/authorizedSlice.ts";
import { signInResponse } from "../../../../types/responseTypes.ts";
import { setIsAdmin } from "../../../../store/isAdmin/isAdminSlice.ts";

export const loginThunk =
    ({password, email}: { password: string, email: string }): AppThunk<Promise<signInResponse>> =>
        async (dispatch, _, {router}) => {
                const loginResponse = await dispatch(authApi.endpoints.login.initiate({password, email}))
                if (loginResponse.data) {
                    dispatch(setAuthorized(true))
                    dispatch(setIsAdmin(true))
                    await router.navigate(APP_PAGES_PATHS_CONSTS.NEWS_PAGE, {replace: true})
                }
                return loginResponse;
        };