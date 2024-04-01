import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setUser, setLoading } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/me`,
      transformResponse: (result) => result.user, // 回傳 user 物件
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
          console.log(error);
        }
      },
      providesTags: ["User"], // 提供 user 快取 tag
    }),
    updateProfile: builder.mutation({
      query: (body) => {
        return {
          url: `/me/update`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"], // 更新 user 資料時，清除快取
    }),
  }),
});

export const { useGetMeQuery, useUpdateProfileMutation } = userApi;
