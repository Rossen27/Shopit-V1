import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./components/product/ProductDetails";
import Filters from "./components/Filters.jsx";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register.jsx";



function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
