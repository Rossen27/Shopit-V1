import express from "express";
import {
  getProducts,
  newProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview 
} from "../controllers/productControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router(); // 創建一個 router 實例

router.route("/products").get(getProducts); // 這裡的 getProducts 是從 backend/controllers/productControllers.js 引入的函數
router
  .route("/admin/products")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct); // 這裡的 newProduct
router.route("/products/:id").get(getProductDetails); // 這裡的 getProductDetails
router
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct); // 這裡的 updateProduct
router
  .route("/admin/products/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct); // 這裡的 deleteProduct
router
  .route("/reviews")
  .put(isAuthenticatedUser, createProductReview) // 這裡的 createProductReview
  .get(isAuthenticatedUser, getProductReviews); // 這裡的 getProductReviews
router
  .route("/admin/reviews")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview); // 這裡的 deleteReview
export default router;
