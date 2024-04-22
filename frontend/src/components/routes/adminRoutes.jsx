import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute.jsx";
import Dashboard from "../admin/Dashboard.jsx";

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
    </>
  );
};

export default adminRoutes;
