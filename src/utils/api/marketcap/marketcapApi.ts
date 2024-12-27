import {baseApi} from "../baseApi";
import {
    GetCsrfQueryResponseType,
    GetListingsQueryArrayElementResponseType,
} from "../../../types/responseTypes.ts";
import { RootState } from "../../../store/store.ts";
import { setCsrf } from "../../../store/csrf/csrfSlice.ts";

export const marketcapApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getCsrf: create.query<GetCsrfQueryResponseType, void>({
            query: () => ({
                url: `/auth/csrf`,
                method: "GET",
            }),
            keepUnusedDataFor: 5
        }),
        getCapitalization: create.query<any, string>({
            queryFn: async (_arg, _api, _extra, fetchWithBQ) => {
                const state = _api.getState() as RootState
                const key = state.csrf.csrf || 'noToken';
                let capitalization = await fetchWithBQ({url: `/marketcap/global-metrics`, 
                    method: "GET",
                    headers: {
                        "x-api-key": key
                    }})
                if(capitalization.error && capitalization.error.status === 403){
                    //@ts-ignore
                    const newToken = await _api.dispatch(marketcapApi.endpoints.getCsrf.initiate({}, {forceRefetch: true}));
                    if(newToken.data){
                        _api.dispatch(setCsrf(newToken.data.token))
                    }
                    capitalization = await fetchWithBQ({url: `/marketcap/global-metrics`, 
                        method: "GET",
                        headers: {
                            "x-api-key": newToken.data?.token
                        }})
                }
                return capitalization.data
                ? { data: capitalization.data  }
                : { error: capitalization.error }
            },

        }),
        getAllCoins: create.query<any, string>({
            queryFn: async (_arg, _api, _extra, fetchWithBQ) => {
                const state = _api.getState() as RootState
                const key = state.csrf.csrf || 'noToken';
                let coins = await fetchWithBQ({
                    url: `/marketcap/coins`,
                    method: "GET",
                    headers: {
                        "x-api-key": key
                    }
                })
                if(coins.error && coins.error.status === 403){
                    //@ts-ignore
                    const newToken = await _api.dispatch(marketcapApi.endpoints.getCsrf.initiate({}, {forceRefetch: true}));
                    if(newToken.data){
                        _api.dispatch(setCsrf(newToken.data.token))
                    }
                    coins = await fetchWithBQ({
                        url: `/marketcap/coins`,
                        method: "GET",
                        headers: {
                            "x-api-key": newToken.data?.token
                        }
                    })
                }
                return coins.data
                ? { data: coins.data  }
                : { error: coins.error }
            },

        }),
        getListings: create.query<{data: GetListingsQueryArrayElementResponseType[], total: number}, {queryParams:string}>({
            //тяжко.. с типами
            //@ts-ignore
            queryFn: async (_arg, _api, _extra, fetchWithBQ) => {
                const state = _api.getState() as RootState
                const key = state.csrf.csrf || 'noToken';
                let listings = await fetchWithBQ({
                    url: `/marketcap/coins${_arg.queryParams}`,
                    method: "GET",
                    headers: {
                        "x-api-key": key
                    }
                })
                if(listings.error && listings.error.status === 403){
                    //@ts-ignore
                    const newToken = await _api.dispatch(marketcapApi.endpoints.getCsrf.initiate({}, {forceRefetch: true}));
                    if(newToken.data){
                        _api.dispatch(setCsrf(newToken.data.token))
                    }
                    listings = await fetchWithBQ({
                        url: `/marketcap/coins${_arg.queryParams}`,
                        method: "GET",
                        headers: {
                            "x-api-key": newToken.data?.token
                        }
                    })
                }
                return listings.data
                ? { data: listings.data  }
                : { error: listings.error }
            },
            // @ts-ignore
            providesTags:(queryParams) => ["CoinsListing",{type:"CoinsListing",id:queryParams}]
        }),
    }),
    overrideExisting: true,
})