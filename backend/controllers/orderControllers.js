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
  for (const item of order?.orderItems) {
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      return next(new ErrorHandler("查無此商品", 404));
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false }); // 關閉驗證
  }
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

async function getSalesData(startDate, endDate) {
  const salesData = await Order.aggregate([
    {
      // 1) 過濾日期
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      // 2) 將資料分組
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
        totalSales: { $sum: "$totalAmount" },
        numOrders: { $sum: 1 }, // 計算訂單數量
      },
    },
  ]);
  // 建立一個Map來儲存銷售數據和訂單數量數據
  const salesMap = new Map();
  let totalSales = 0;
  let totalNumOrders = 0;

  salesData.forEach((entry) => {
    const date = entry?._id.date;
    const sales = entry?.totalSales;
    const numOrders = entry?.numOrders;

    salesMap.set(date, { sales, numOrders });
    totalSales += sales;
    totalNumOrders += numOrders;
  });

  // 產生開始日期和結束日期之間的日期數組
  const datesBetween = getDatesBetween(startDate, endDate);

  // 建立最終銷售資料數組，其中沒有銷售的日期為 0
  const finalSalesData = datesBetween.map((date) => ({
    date,
    sales: (salesMap.get(date) || { sales: 0 }).sales,
    numOrders: (salesMap.get(date) || { numOrders: 0 }).numOrders,
  }));

  return { salesData: finalSalesData, totalSales, totalNumOrders };
}

//
function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

// 管理員功能 => 取得訂單統計 => /api/v1/admin/get_sales
export const getSales = catchAsyncErrors(async (req, res, next) => {
  const startDate = new Date(req.query.startDate); // 從前端取得開始日期
  const endDate = new Date(req.query.endDate); // 從前端取得結束日期

  startDate.setHours(0, 0, 0, 0); // 設定開始日期時間
  endDate.setHours(23, 59, 59, 999); // 設定結束日期時間

  const { salesData, totalSales, totalNumOrders } = await getSalesData(
    startDate,
    endDate
  );

  res.status(200).json({
    totalSales,
    totalNumOrders,
    sales: salesData,
  });
});
