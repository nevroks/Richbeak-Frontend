import { baseApi } from "../baseApi.ts";
import {
  IUniqueUserCountry,
  IUniqueUser,
  IRequestPerSecond,
} from "../../../types/statisticsTypes.ts";
import { RootState } from "../../../store/store.ts";
import { authApi } from "../auth/authApi.ts";

export const statisticsApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUniqueUsersCountries: create.query<IUniqueUserCountry[], void>({
      //@ts-ignore
      queryFn: async (_arg, _api, _extra, fetchWithBQ) => {
        const state = _api.getState() as RootState;

        const jwtToken = state.jwt.accessToken || "";

        let response = await fetchWithBQ({
          url: "/statistic/requests/countries",
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
              url: "/statistic/requests/countries",
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
    }),
    getUniqueUsers: create.query<IUniqueUser[], void>({
      //@ts-ignore
      queryFn: async (_arg, _api, _extra, fetchWithBQ) => {
        const state = _api.getState() as RootState;

        const jwtToken = state.jwt.accessToken || "";

        let response = await fetchWithBQ({
          url: "/statistic/requests/unique-users",
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
              url: "/statistic/requests/unique-users",
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
    }),
    getRequestsPerSecond: create.query<IRequestPerSecond[], void>({
      //@ts-ignore
      queryFn: async (_arg, _api, _extra, fetchWithBQ) => {
        const state = _api.getState() as RootState;

        const jwtToken = state.jwt.accessToken || "";

        let response = await fetchWithBQ({
          url: "/statistic/requests/rps",
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
              url: "/statistic/requests/rps",
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
    }),
  }),
  overrideExisting: true,
});
