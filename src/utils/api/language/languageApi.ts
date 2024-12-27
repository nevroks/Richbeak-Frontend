import { baseApi } from "../baseApi";
import {getAllLanguagesResponseType, GetPriorityLanguageResponseType} from "../../../types/responseTypes.ts";

export const languageApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getAllLanguages: create.query<getAllLanguagesResponseType, void>({
      query: () => ({
        url: `/auth/languages`,
        method: "GET",
      }),
      providesTags: ["Language"]
    }),
    getPriorityLanguage: create.query<GetPriorityLanguageResponseType, void>({
      query: () => ({
        url: `/auth/languages`,
        method: "POST",
      }),
      providesTags: ["Language"],
    })
  }),
  overrideExisting: true,
})