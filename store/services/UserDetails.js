import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL } from "../../pages/config";

const authKey = localStorage.getItem("keyStore");

const UserDetails = createApi({
  reducerPath: "UserDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (builder) => {
    return {
      userDetail: builder.query({
        query: () => {
          return {
            url: "api/v1/members/details",
            method: "GET",
            headers: {
              Authorization: `${authKey}`,
            },
          };
        },
      }),
    };
  },
});

export const { useUserDetailQuery } = UserDetails;

export default UserDetails;
