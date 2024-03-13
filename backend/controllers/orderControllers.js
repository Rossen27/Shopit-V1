import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHandler.js";

// 建立訂單 => /api/v1/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  // 1) 取得訂單資料
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;
  // 2) 建立訂單
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });
  res.status(200).json({
    message: "訂單建立成功",
    order,
  });
});

// 取得使用者訂單 => /api/v1/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  // 1) 從資料庫取得使用者訂單
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    orders,
  });
});

// 取得訂單明細 => /api/v1/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  // 1) 從資料庫取得訂單
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("查無此筆訂單", 404));
  }
  res.status(200).json({
    order,
  });
});

// 管理員功能 => 取得所有訂單 => /api/v1/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
  // 1) 從資料庫取得使用者訂單
  const orders = await Order.find();
  res.status(200).json({
    orders,
  });
});

// 管理員功能 => 更新訂單狀態 => /api/v1/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  // 1) 從資料庫取得訂單
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("查無此筆訂單", 404));
  }
  // 2) 更新訂單狀態
  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("此筆訂單已送達，無法變更狀態", 400));
  }
  // 3) 商品庫存更新
  order?.orderItems?.forEach(async (item) => {
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      return next(new ErrorHandler("查無此商品", 404));
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false }); // 關閉驗證
  });
  order.orderStatus = req.body.status; // 已付款、已送達
  order.deliveredAt = Date.now(); // 送達時間
  await order.save();

  res.status(200).json({
    success: true,
  });
});

// 管理員功能 => 刪除訂單 => /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  // 1) 從資料庫取得訂單
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("查無此筆訂單", 404));
  }
  // 2) 刪除訂單
  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});
