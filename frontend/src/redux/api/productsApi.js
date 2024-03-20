import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi", // 設定 reducer 的名稱
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }), // 設定 API 的基本路徑
  endpoints: (builder) => ({
    // 1) 定義一個名為 getProducts 的 endpoint
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params: {
          page: params?.page,
          keyword: params?.keyword,
          category: params?.category,
          "price[gte]": params.min,
          "price[lte]": params.max,
          "ratings[gte]": params?.ratings,
        },
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi; // 2) 將 getProducts endpoint 的 hook 匯出