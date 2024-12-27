import {baseApi} from "../baseApi.ts";
import {parseSourceType} from "../../../types/types.ts";
import {RootState} from "../../../store/store.ts";
import {authApi} from "../auth/authApi.ts";


export const parsersApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getAllParsers: create.query<parseSourceType[], void>({
            //@ts-ignore
            queryFn: async (_arg, _api, _extra, fetchWithBQ) => {
                const state = _api.getState() as RootState;

                const jwtToken = state.jwt.accessToken || "";

                let response = await fetchWithBQ({
                    url: `/daemon/parsers`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                if (
                    response.error &&
                    (response.error.status === 403 || response.error.status === 400)
                ) {
                    const newAuthTokens = await _api.dispatch(
                        //@ts-ignore
                        authApi.endpoints.refresh.initiate({}, {forceRefetch: true})
                    );

                    if (newAuthTokens.data) {
                        response = await fetchWithBQ({
                            url: `/daemon/parsers`,
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${newAuthTokens.data.accessToken}`,
                            },
                        });
                    } else {
                        return {
                            error: newAuthTokens.error || {
                                status: 403,
                                message: "Unauthorized",
                            },
                        };
                    }
                }

                return response.data
                    ? { data: response.data }
                    : { error: response.error };
            },
            providesTags: ["Parsers"]
        }),
        patchAllParsers: create.mutation<void, parseSourceType[]>({
            //@ts-ignore
            queryFn: async (parseSources, _api, _extra, fetchWithBQ) => {
                const state = _api.getState() as RootState;

                const jwtToken = state.jwt.accessToken || "";

                let response = await fetchWithBQ({
                    url: `/daemon/parsers/toggle`,
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    body: JSON.stringify([
                        ...parseSources
                    ])
                });

                if (
                    response.error &&
                    (response.error.status === 403 || response.error.status === 400)
                ) {
                    const newAuthTokens = await _api.dispatch(
                        //@ts-ignore
                        authApi.endpoints.refresh.initiate({}, {forceRefetch: true})
                    );

                    if (newAuthTokens.data) {
                        response = await fetchWithBQ({
                            url: `/daemon/parsers/toggle`,
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${newAuthTokens.data.accessToken}`,
                            },
                            body: JSON.stringify([
                                ...parseSources
                            ])
                        });
                    } else {
                        return {
                            error: newAuthTokens.error || {
                                status: 403,
                                message: "Unauthorized",
                            },
                        };
                    }
                }

                return response.data
                    ? { data: response.data }
                    : { error: response.error };
            },
            invalidatesTags: ["Parsers"]
        }),

    }),
    overrideExisting: true,
})