import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL } from "../../pages/config";

import { getCookie } from "cookies-next";

const authKey = getCookie("authKey");

export const UserDetailsApi = createApi({
  reducerPath: "UserDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),

  endpoints: (build) => ({
    getUserDetails: build.query({
      query: () => ({
        url: "api/v1/members/details",
        method: "GET",
        // headers: {
        //   Authorization: `${authKey}`,
        // },
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = UserDetailsApi;
