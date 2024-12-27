import { setJwt } from "../../../store/jwt/jwtSlice";
import {authResponse} from "../../../types/responseTypes";
import {baseApi} from "../baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        register: create.mutation<authResponse, { password: string, userName: string, email: string }>({
            //@ts-ignore
            queryFn: async (_args, _api, _extra, fetchWithBQ) => {
                const tokens = await fetchWithBQ({
                    url: `auth/register`,
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        password: _args.password,
                        username: _args.userName,
                        email: _args.email
                    })
                })
                if(tokens.error){
                    return tokens
                }
                return tokens
            }
        }),
        login: create.mutation<authResponse, { password: string, email: string }>({
            //@ts-ignore
            queryFn: async (_args, _api, _extra, fetchWithBQ) => {
                const tokens = await fetchWithBQ({
                    url: `auth/login`,
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        password: _args.password,
                        email: _args.email
                    })
                })
                if(tokens.error){
                    return tokens
                }
                //@ts-ignore
                _api.dispatch(setJwt(tokens.data));
                return tokens
            }
        }),
        refresh: create.query<authResponse, void>({
            //@ts-ignore
            queryFn: async (_args, _api, _extra, fetchWithBQ) => {
                const state = _api.getState()
                const tokens = await fetchWithBQ({
                    url: `auth/refresh`,
                    method: "GET",
                    headers:{
                        "Content-Type":"application/json",
                        //@ts-ignore
                        "Authorization": "Bearer " + state.jwt.refreshToken
                    },
                })
                if(tokens.error){
                    return tokens
                }
                //@ts-ignore
                _api.dispatch(setJwt(tokens.data));
                return tokens
            }
        }),
        logout: create.query<void, string>({
            query: (refreshToken) => ({
                url: `auth/logout`,
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + refreshToken
                },
            }),
        }),
    }),
    overrideExisting: true,
})