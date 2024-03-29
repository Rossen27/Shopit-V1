import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setUser } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/me`,
      transformResponse: (result) => result.user, // 回傳 user 物件
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateProfile: builder.mutation({
      query: (body) => {
        return {
          url: `/me/update`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const { useGetMeQuery, useUpdateProfileMutation } = userApi;
