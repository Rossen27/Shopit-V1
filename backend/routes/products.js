import express from 'express';
import {
  getProducts,
  newProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
} from '../controllers/productControllers.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router(); // 創建一個 router 實例

router.route('/products').get(getProducts); // 這裡的 getProducts 是從 backend/controllers/productControllers.js 引入的函數
router
  .route('/admin/products')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newProduct); // 這裡的 newProduct
router.route('/products/:id').get(getProductDetails); // 這裡的 getProductDetails
router
  .route('/admin/products/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct); // 這裡的 updateProduct
router
  .route('/admin/products/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct); // 這裡的 deleteProduct

export default router;