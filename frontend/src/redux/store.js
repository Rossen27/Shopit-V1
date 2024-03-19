import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productsApi";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer, // 將 productsApi 的 reducer 加入 store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware]), // 將 productsApi 的 middleware 加入 store
});
