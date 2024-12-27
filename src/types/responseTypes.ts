import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {appLanguages, IPublication, IPublicationImgParagraph, IPublicationTextParagraph} from "./types.ts";
import { SerializedError } from "@reduxjs/toolkit";

export type AllPublicationsQueryResponseType = {
    data: IPublication[],
    total: number
}

export interface IGetPublicationByIdQueryResponse extends IPublication {
    paragraphs: IPublicationTextParagraph[] & IPublicationImgParagraph[]
}

export type GetCsrfQueryResponseType = {
    token: string
}
export type GetListingsQueryResponseType = {}
export type GetListingsQueryArrayElementResponseType = {
    name: string,
    symbol: string,
    id: number,
    logo: string,
    cmc_rank: number,
    quote: GetListingsQueryArrayElementQuoteType,
    max_supply: number,
    total_supply: number,
    circulating_supply: number,
}
type GetListingsQueryArrayElementQuoteType = {
    USD: {
        price: number,
        percent_change_1h: number,
        percent_change_7d: number,
        percent_change_24h: number,
        percent_change_30d: number,
        percent_change_60d: number,
        percent_change_90d: number,
        fully_diluted_market_cap: number,
        market_cap: number,
        market_cap_dominance: number,
        volume_24h: number,
        volume_7d: number,
        volume_30d: number,
        tvl: number,
    }
}
export type GetPriorityLanguageResponseType = {
    language: appLanguages
}
export type getAllLanguagesResponseType = {
    languages: appLanguages[]
}

export type authResponse = {
    accessToken: string,
    refreshToken: string,
}

export type signInResponse = {
    data: authResponse;
    error?: undefined;
} | {
    data?: undefined;
    error: FetchBaseQueryError | SerializedError;
}

