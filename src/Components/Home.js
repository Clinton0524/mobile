import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay, Pagination } from "swiper/modules";
import { ClipLoader } from "react-spinners";
import { logoutUser, fetchCurrentUser } from "./Redux/AuthSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import "swiper/css";
import "swiper/css/pagination";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  getCategory,
  getCategorySecond,
  getCategoryThird,
} from "./Redux/CategorySlice";
import { fetchProducts } from "./Redux/ProductsSlice";

import { getBanners } from "./Redux/BannerSlice";
import { getExclusiveProducts } from "./Redux/ProductsSlice";
import "./Home.css";
import "swiper/css";
import { addToCart } from "./Redux/CartSlice"; // Import actions
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.reload(); // Refresh to clear state
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const {
    category,
    statusFirst,
    categorysecond,
    statusSecond,
    categorythird,
    statusThird,
    error,
  } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);
  const { banners } = useSelector((state) => state.banners);
  const { products, exclusiveProducts } = useSelector(
    (state) => state.products
  );

  const handleAddToCart = (productId, quantity = 1) => {
    dispatch(addToCart({ productId, quantity }));
  };
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getBanners());
    dispatch(getCategorySecond());
    dispatch(getCategoryThird());
    dispatch(getExclusiveProducts());
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      dispatch(fetchProducts(searchTerm));
    }
  }, [dispatch, searchTerm]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const filteredCats = category.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filteredCats);
    } else {
      setFilteredCategories([]);
    }
  }, [searchTerm, category]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const matchedCategory = category.find((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (matchedCategory) {
        navigate(`/category/${matchedCategory._id}`); // Navigate to category page
      } else {
        navigate(`/search/${searchTerm}`); // Navigate to search results page
      }
    }
  };

  // Display loading message if data is still being fetched
  if (
    statusFirst === "loading" ||
    statusSecond === "loading" ||
    statusThird === "loading"
  ) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#3498db" size={40} />
      </div>
    );
  }

  // Display error message if fetching data fails
  if (statusFirst === "failed") return <h1>{error}</h1>;

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          {/* 🔍 Search Bar Section */}
          <div className="col-12 nav-top">
            <div className="col-11">
              <div className="search-bar position-relative">
                {/* Search Input with Icon Inside */}
                <input
                  type="text"
                  className="form-control ps-4 pe-5 input-box mx-2" // Adjust padding for icon spacing
                  placeholder="What are you looking for"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Search Icon Inside Input */}
                <FaSearch
                  size={15}
                  className="position-absolute search-icon"
                  onClick={handleSearch}
                />
              </div>
              <div>
                <FaEllipsisV
                  size={16}
                  className="cursor-pointer position-absolute icn"
                  onClick={() => setMenuOpen(!menuOpen)}
                />
              </div>
              {menuOpen && (
                <div className="dropdown-menu show position-absolute end-0 mt-2 p-2 shadow open-menu">
                  <div className="dropdown-item d-flex align-items-center">
                    {user && (
                      <div key={user._id}>
                        <span style={{ fontWeight: 600, color: "green" }}>
                          {user.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <Link
                    to="/cart"
                    className="dropdown-item d-flex align-items-center"
                  >
                    <AccountCircleRoundedIcon
                      className="me-2 ms-1"
                      style={{ fontSize: "16px" }}
                    />
                    <span>Profile</span>{" "}
                  </Link>

                  <Link
                    to="/cart"
                    className="dropdown-item d-flex align-items-center"
                  >
                    <ShoppingCartIcon
                      className="me-2 ms-1"
                      style={{ fontSize: "16px" }}
                    />
                    <span>Cart</span>{" "}
                  </Link>
                  <Link
                    to="/cart"
                    className="dropdown-item d-flex align-items-center"
                  >
                    <LocalShippingRoundedIcon
                      className="me-2 ms-1"
                      style={{ fontSize: "16px" }}
                    />
                    <span>Orders</span>{" "}
                  </Link>
                  {token ? (
                    <Link
                      to="/cart"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <LogoutRoundedIcon
                        className="me-2 ms-1"
                        style={{ fontSize: "16px" }}
                      />
                      <span onClick={handleLogout}>Logout</span>
                    </Link>
                  ) : (
                    <Link
                      to="/cart"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <LogoutRoundedIcon
                        className="me-2 ms-1"
                        style={{ fontSize: "16px" }}
                      />
                      <span onClick={handleLogin}>Login</span>
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* 🔽 Combined Search Dropdown (Appears when user types) */}
            {(filteredProducts.length > 0 || filteredCategories.length > 0) && (
              <div className="search-dropdown">
                {[...filteredProducts, ...filteredCategories].map((item) => (
                  <Link
                    to={
                      item.price
                        ? `/products/${item._id}`
                        : `/category/${item._id}`
                    }
                    key={item._id}
                    className="search-item"
                  >
                    {/* Image */}
                    <img
                      src={item.imageUrl || item.image}
                      alt={item.name}
                      className="search-item-img"
                    />
                    {/* Name & Optional Price */}
                    <div className="search-item-details">
                      <span className="search-item-name">{item.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          
          <div className="container row-2">
            <div className="row">
              <div className="col-12 d-flex align-items-center text-start deliver">
                <LocationOnIcon className="me-1" style={{ fontSize: "13px" }} />
                <span style={{ fontSize: "12px" }}>
                  Deliver to Antony - Kochi 682006
                </span>
              </div>{" "}
            </div>
          </div>
        </div>

        {/* 🛒 Grocery & Kitchen Categories */}

        <div className="col my-3">
          <p className="text-start" style={{ fontSize: "12px" }}>
            <strong>Grocery</strong>
          </p>
          <div className="row">
            {category.map((cat) => (
              <div
                className="col col-sm-4 col-md-3 col-lg-1 mt-2"
                key={cat._id}
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/category/${cat._id}`}
                >
                  <div>
                    <img
                      style={{ width: "60px" }}
                      src={cat.image}
                      alt={cat.name}
                    />
                    <span style={{ fontSize: "11px" }}>{cat.name}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="no-padding">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          spaceBetween={8}
          slidesPerView={2}
          pagination={{ clickable: true }}
          breakpoints={{
            350: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 3 },
          }}
        >
          {banners.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="col-12 my-1">
                <img
                  style={{ width: "100%", borderRadius: "10px" }}
                  src={item.imageUrl}
                  alt="hello"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
        {/* 🛒 Snacks Categories */}
        <div className="col mt-3">
          <p className="text-start" style={{ fontSize: "12px" }}>
            <strong>SNACKS</strong>
          </p>
          <div className="row">
            {categorysecond.map((cat) => (
              <div
                className="col-3 col-sm-4 col-md-3 col-lg-1 mt-2"
                key={cat._id}
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/category/${cat._id}`}
                >
                  <div>
                    <img
                      style={{ width: "60px" }}
                      src={cat.image}
                      alt={cat.name}
                    />
                    <span style={{ fontSize: "11px" }}>{cat.name}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* 🛒 Beauty Categories */}
        <div className="col mt-3">
          <p className="text-start" style={{ fontSize: "12px" }}>
            <strong>BEAUTY & WELLNESS</strong>
          </p>
          <div className="row">
            {categorythird.map((cat) => (
              <div
                className="col-3 col-sm-4 col-md-3 col-lg-1 mt-2"
                key={cat._id}
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/category/${cat._id}`}
                >
                  <div>
                    <img
                      style={{ width: "60px" }}
                      src={cat.image}
                      alt={cat.name}
                    />
                    <span style={{ fontSize: "11px" }}>{cat.name}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <h6 className="text-start mt-3">Exclusive Products</h6>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          spaceBetween={8}
          slidesPerView={2}
          breakpoints={{
            350: { slidesPerView: 3 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 7.5 },
          }}
        >
          {exclusiveProducts.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="exclusive-product-card mb-2">
                <div className="exclusive-product-image">
                  <img src={item.imageUrl} alt={item.name} />
                  <button className="wishlist-btn">❤️</button>
                </div>
                <div className="exclusive-product-info">
                  <h6 className="exclusive-product-name text-start">
                    {item.name}
                  </h6>
                  <p className="exclusive-product-description text-start">
                    {item.description}
                  </p>
                  <div className="exclusive-product-pricing">
                    <span className="old-price">${item.oldprice}</span>
                    <span className="new-price">${item.price}</span>
                  </div>

                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
