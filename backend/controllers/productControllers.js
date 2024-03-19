import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import APIFilters from "../utils/apiFilters.js";

// 獲取產品 -> POST /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res) => {
  const resPerPage = 8; // 每頁顯示 5 筆資料
  const apiFilters = new APIFilters(Product, req.query).search().filters(); // 過濾特定欄位
  let products = await apiFilters.query; // 獲取產品
  let filteredProductsCount = products.length; // 過濾產品數量
  apiFilters.pagination(resPerPage); // 分頁過濾
  products = await apiFilters.query.clone(); // 獲取產品 -> 複製查詢物件 -> 避免重複使用查詢物件
  // const products = await Product.find(); // 獲取所有產品
  res.status(200).json({
    resPerPage,
    filteredProductsCount,
    products,
  });
});

// 建立新產品 -> POST /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user._id; // 設定使用者 id
  const product = await Product.create(req.body); // 創建新產品
  res.status(200).json({
    product,
  });
});
// 獲取單一產品 -> GET /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req?.params?.id); // 獲取單一產品
  if (!product) {
    return next(new ErrorHandler('查無此產品', 404));
  }
  res.status(200).json({
    product,
  });
});

// 更新產品 -> PUT /api/v1/products/:id
export const updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req?.params?.id); // 獲取單一產品
  if (!product) {
    return next(new ErrorHandler('查無此產品', 404));
  }
  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  }); // 更新產品

  res.status(200).json({
    product,
  });
});

// 刪除產品 -> DELETE /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req?.params?.id); // 獲取單一產品
  if (!product) {
    return next(new ErrorHandler('查無此產品', 404));
  }

  await product.deleteOne(); // 刪除產品

  res.status(200).json({
    message: "刪除成功",
  });
});
