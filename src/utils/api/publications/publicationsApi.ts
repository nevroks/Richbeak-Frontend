import {baseApi} from "../baseApi.ts";
import {AllPublicationsQueryResponseType, IGetPublicationByIdQueryResponse} from "../../../types/responseTypes.ts";
import {appLanguages} from "../../../types/types.ts";
import { RootState } from "../../../store/store.ts";
import { setCsrf } from "../../../store/csrf/csrfSlice.ts";
import { marketcapApi } from "../marketcap/marketcapApi.ts";


export const publicationsApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getAllPublications: create.query<AllPublicationsQueryResponseType, string>({
            //@ts-ignore
            queryFn: async (_arg, _api, _extra, fetchWithBQ) => {
                const state = _api.getState() as RootState
                const key = state.csrf.csrf
                const modifiedQueryParams = _arg.replace('UA', 'uk');
                let allPublications = await fetchWithBQ({
                    url: `/publications?${modifiedQueryParams}`,
                    method: "GET",
                    headers: {
                        "x-api-key": key,
                    },
                })
                if(allPublications.error && allPublications.error.status === 403 || allPublications.error && allPublications.error.status === 400){
                    //@ts-ignore
                    const newToken = await _api.dispatch(marketcapApi.endpoints.getCsrf.initiate({}, {forceRefetch: true}))
                    if(newToken.data){
                        _api.dispatch(setCsrf(newToken.data.token))
                    }
                    allPublications = await fetchWithBQ({
                        url: `/publications?${_arg}`,
                        method: "GET",
                        headers: {
                        "x-api-key": newToken.data?.token,
                        },
                    })
                }
                return allPublications.data 
                ? { data: allPublications.data }
                : { error: allPublications.error }
            },
            // @ts-ignore
            providesTags: (queryParams) => ["Publications", {type: "Publications", id: queryParams}]
        }),
        getPublicationById: create.query<IGetPublicationByIdQueryResponse, {newsId:string|number,language:appLanguages}>({
            //@ts-ignore
            queryFn: async (_arg, _api, _extra, fetchWithBQ) => {
                const state = _api.getState() as RootState
                const key = state.csrf.csrf
                const modifiedQueryParams = _arg.language.replace('UA', 'UK');
                let publication = await fetchWithBQ({
                    url: `/publications/${_arg.newsId}?lang=${modifiedQueryParams.toLowerCase()}`,
                    method: "GET",
                    headers: {
                        "x-api-key": key,
                    },
                })
                if(publication.error && publication.error.status === 403 || publication.error && publication.error.status === 400){
                    //@ts-ignore
                    const newToken = await _api.dispatch(marketcapApi.endpoints.getCsrf.initiate({}, {forceRefetch: true}));
                    if(newToken.data){
                        _api.dispatch(setCsrf(newToken.data.token))
                    }
                    publication = await fetchWithBQ({
                        url: `/publications/${_arg.newsId}?lang=${modifiedQueryParams.toLowerCase()}`,
                        method: "GET",
                        headers: {
                        "x-api-key": newToken.data?.token,
                        },
                    })
                }
                return publication.data 
                ? { data: publication.data }
                : { error: publication.error }
            },
            // @ts-ignore
            providesTags: (newsId) => ["Publications", {type: "Publications", id: newsId}]
        }),
    }),
    overrideExisting: true
})