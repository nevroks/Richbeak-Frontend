import {baseApi} from "../baseApi.ts";
import {ICoin} from "../../../types/types.ts";

export const publicationsCoinsApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getAllPublicationsCoins: create.query<ICoin[], void>({
            query: () => ({
                url: `/coins`,
                method: "GET",
            }),
            providesTags: ["Coins"]
        }),
        deleteCoin: create.mutation<void, number>({
            query: (id) => ({
                url: `/coins/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tags"]
        }),
        updateCoin: create.mutation<void, Omit<ICoin, 'ticker'> & Partial<Pick<ICoin, 'ticker'>>>({
            query: (coin) => ({
                url: `/coins/${coin.id}`,
                method: "PATCH",
                body: {
                    name: coin.name
                }
            })
        }),
    }),
    overrideExisting: true
})