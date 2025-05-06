import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Footer from "./Components/Footer";

// Lazy-loaded components
const Home = lazy(() => import("./Components/Home"));
const ProductDetails = lazy(() => import("./Components/ProductDetails"));
const AddBanner = lazy(() => import("./Components/AddBanner"));
const SearchResults = lazy(() => import("./Components/SearchResults"));
const Cart = lazy(() => import("./Components/Cart"));
const Register = lazy(() => import("./Components/Register"));
const Login = lazy(() => import("./Components/Login"));
const ProtectedRoutes = lazy(() => import("./Components/ProtectedRoutes"));
const CategoryProducts = lazy(() => import("./Components/CategoryProducts"));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/addbanner" element={<AddBanner />} />
            <Route path="/cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search/:searchTerm" element={<SearchResults />} />
            <Route path="/category/:categoryId" element={<CategoryProducts />} />
          </Routes>
        </Suspense>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
