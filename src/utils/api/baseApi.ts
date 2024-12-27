import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BACKEND_URL}),
    tagTypes: ["Publications", "Tags", "Coins", "Language","CoinsListing","Parsers"],
    endpoints: () => ({})
})