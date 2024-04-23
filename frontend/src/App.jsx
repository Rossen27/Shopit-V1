import { BrowserRouter, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import { Toaster } from "react-hot-toast";
import useUserRoutes from "./components/routes/userRoutes.jsx";
import useAdminRoutes from "./components/routes/adminRoutes.jsx";

function App() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Header />
        <Routes>
          {userRoutes}
          {adminRoutes}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
