import {baseApi} from "../baseApi.ts";
import {ITag} from "../../../types/types.ts";
import {RootState} from "../../../store/store.ts";
import {authApi} from "../auth/authApi.ts";

export const publicationsTagsApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getAllPublicationsTags: create.query<ITag[], void>({
            query: () => ({
                url: `/tags`,
                method: "GET",
            }),
            providesTags: ["Tags"]
        }),
        // deleteTag: create.mutation<void, number>({
        //     query: (id) => ({
        //         url: `/tags/${id}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: ["Tags"]
        // }),
        // updateTag: create.mutation<void, ITag>({
        //     query: (tag) => ({
        //         url: `/tags/${tag.id}`,
        //         method: "PATCH",
        //         body: {
        //             name: tag.name
        //         }
        //     })
        // }),
        createTag: create.mutation<void, Omit<ITag, 'id'>>({
            //@ts-ignore
            queryFn: async (tag, _api, _extra, fetchWithBQ) => {
                const state = _api.getState() as RootState;

                const jwtToken = state.jwt.accessToken || "";

                let response = await fetchWithBQ({
                    url: `/tags`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    body: [{
                        name: tag.name,
                    }]
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
                            url: `/tags`,
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${newAuthTokens.data.accessToken}`,
                            },
                            body: [{
                                name: tag.name,
                            }]
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
        }),
    }),

    overrideExisting: true
})