import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import { productApi } from "./api/productsApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";

export const store = configureStore({
  reducer: {
    auth: userReducer, // userReducer 是我們自己寫的 reducer
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer, // productApi.reducer 是由 createApi 產生的 reducer
    [authApi.reducerPath]: authApi.reducer, // authApi.reducer 是由 createApi 產生的 reducer
    [userApi.reducerPath]: userApi.reducer, // userApi.reducer 是由 createApi 產生的 reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware, // productApi.middleware 是由 createApi 產生的 middleware
      authApi.middleware,
      userApi.middleware,
    ]),
});