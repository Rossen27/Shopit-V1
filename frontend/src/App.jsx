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
        <Toaster position="top-center" />
        <Header />
        <div className="min-h-screen grid grid-rows-[auto,1fr,auto]">
          <Routes className="row-span-2">
            {userRoutes}
            {adminRoutes}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer className="row-span-1" />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
