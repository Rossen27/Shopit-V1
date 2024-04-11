import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartSlice = createSlice({
  initialState,
  name: "cartSlice",
  reducers: {
    setCartItem: (state, action) => {
      // 1) 如果購物車中已經有這個商品，則更新數量
      const item = action.payload;
      // 2) 如果購物車中沒有這個商品，則新增商品
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      // 3) 更新購物車
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItem: (state, action) => {
      state.cartItems = state?.cartItems?.filter(
        (i) => i.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export default cartSlice.reducer;

export const { setCartItem, removeCartItem } = cartSlice.actions;
