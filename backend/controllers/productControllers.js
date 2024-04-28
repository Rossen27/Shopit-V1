import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";

// 獲取產品 -> POST /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res) => {
  const resPerPage = 4; // 每頁顯示 5 筆資料
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
  const product = await Product.findById(req?.params?.id).populate(
    "reviews.user"
  ); // 獲取單一產品
  if (!product) {
    return next(new ErrorHandler("查無此產品", 404));
  }
  res.status(200).json({
    product,
  });
});

// 獲取產品 - ADMIN   =>  /api/v1/admin/products
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    products,
  });
});

// 更新產品 -> PUT /api/v1/products/:id
export const updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req?.params?.id); // 獲取單一產品
  if (!product) {
    return next(new ErrorHandler("查無此產品", 404));
  }
  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  }); // 更新產品

  res.status(200).json({
    product,
  });
});

// 更新產品圖片 -> PUT /api/v1/admin/products/:id/upload_images
export const uploadProductImages = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req?.params?.id); // 獲取單一產品
  // 如果沒有產品，則返回錯誤
  if (!product) {
    return next(new ErrorHandler("查無此產品", 404));
  }
  // 上傳圖片
  const uploader = async (image) => upload_file(image, "shopit/products");

  // 獲取所有圖片的 URL
  const urls = await Promise.all((req?.body?.images).map(uploader));

  // 更新產品圖片
  product?.images?.push(...urls);
  await product?.save();

  res.status(200).json({
    product,
  });
});

// 刪除產品圖片 -> DELETE /api/v1/admin/products/:id/delete_image
export const deleteProductImage = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req?.params?.id); // 獲取單一產品
  // 如果沒有產品，則返回錯誤
  if (!product) {
    return next(new ErrorHandler("查無此產品", 404));
  }
  // 刪除圖片
  const isDeleted = await delete_file(req.body.imgId);

  // 更新產品圖片
  if (isDeleted) {
    product.images = product?.images?.filter(
      (img) => img.public_id !== req.body.imgId
    );

    await product?.save();
  }

  res.status(200).json({
    product,
  });
});

// 刪除產品 -> DELETE /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req?.params?.id); // 獲取單一產品
  if (!product) {
    return next(new ErrorHandler("查無此產品", 404));
  }
  // 刪除所有圖片
  for (let i = 0; i < product?.images?.length; i++) {
    await delete_file(product?.images[i].public_id);
  }

  await product.deleteOne(); // 刪除產品

  res.status(200).json({
    message: "刪除成功",
  });
});

// 新增/更新產品評論 -> POST /api/v1/reviews
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body; // 評分、評論、產品 id
  const review = {
    user: req?.user?._id, // 使用者 id
    // name: req.user.name, // 使用者名稱
    rating: Number(rating), // 評分
    comment, // 評論
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("查無此產品", 404));
  }

  const isReviewed = product?.reviews?.find(
    // (review) => review.user.toString() === req.user._id.toString()
    (r) => r.user.toString() === req?.user?._id.toString()
  ); // 是否已評論
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  // 計算產品評分
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save({ validateBeforeSave: false }); // 儲存產品
  res.status(200).json({
    success: true,
  });
});

// 獲取產品評論 -> GET /api/v1/reviews
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate('reviews.user');
  if (!product) {
    return next(new ErrorHandler("查無此產品", 404));
  }
  res.status(200).json({
    reviews: product.reviews,
  });
});

// 刪除產品評論 -> DELETE /api/v1/admin/reviews
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("查無此產品", 404));
  }
  const reviews = product?.reviews?.filter(
    // (review) => review.user.toString() === req.user._id.toString()
    (review) => review._id.toString() !== req?.query?.id.toString()
  ); // 過濾評論
  const numOfReviews = reviews.length; // 評論數量
  // 計算產品評分，product.numOfReviews = product.reviews.length;
  const ratings =
    numOfReviews === 0
      ? 0
      : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;
  product = await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, numOfReviews, ratings },
    { new: true }
  ); // 儲存產品
  res.status(200).json({
    success: true,
    product,
  });
});

// 獲取用戶產品評論 -> GET /api/v1/can_review
export const canUserReview = catchAsyncErrors(async (req, res) => {
  // 獲取用戶訂單
  const orders = await Order.find({
    user: req.user._id,
    "orderItems.product": req.query.productId,
  });
  // 如果用戶沒有訂單，則不能評論
  if (orders.length === 0) {
    return res.status(200).json({ canReview: false });
  }
  // 如果用戶有訂單，則可以評論
  res.status(200).json({
    canReview: true,
  });
});
