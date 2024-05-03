import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import { Toaster } from "react-hot-toast";
import useUserRoutes from "./components/routes/userRoutes.jsx";
import useAdminRoutes from "./components/routes/adminRoutes.jsx";
import NotFound from "./components/layout/NotFound.jsx";

function App() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();

  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              {userRoutes}
              {adminRoutes}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <Toaster position="top-center" />
      </BrowserRouter>
    </>
  );
}

export default App;
