import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute.jsx";
import Dashboard from "../admin/Dashboard.jsx";
import ListProducts from "../admin/ListProducts.jsx";
import NewProduct from "../admin/NewProduct.jsx";
import UpdateProduct from "../admin/UpdateProduct.jsx";

const adminRoutes = () => {
  return (
    <>
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute admin={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute admin={true}>
            <ListProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product/new"
        element={
          <ProtectedRoute admin={true}>
            <NewProduct />
          </ProtectedRoute>
        }
      />
            <Route
        path="/admin/products/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateProduct />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default adminRoutes;
