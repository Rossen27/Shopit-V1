export const getPriceQueryParams = (searchParams, key, value) => {
  const hasValueInParam = searchParams.has(key);

  if (value && hasValueInParam) {
    searchParams.set(key, value);
  } else if (value) {
    searchParams.append(key, value);
  } else if (hasValueInParam) {
    searchParams.delete(key);
  }

  return searchParams;
};

// 購物車金額計算
export const caluclateOrderCost = (cartItems) => {
  // 1) 計算商品總價 = 商品價格 * 商品數量
  const itemsPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // 2) 計算運費，如果商品總價大於 2000，運費為 0，否則為 100
  const shippingPrice = itemsPrice > 2000 ? 0 : 100;
  // 3) 計算稅金，商品總價 * 5%
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  // 4) 計算總價
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  return {
    itemsPrice: Number(itemsPrice).toFixed(2),
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
