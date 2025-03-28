import React, { useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay } from "swiper/modules"; // Import Autoplay module
import {
  getBeauty,
  getCategory,
  getFeaturedFav,
  gethousehold,
  getShopStore,
  getSnacks,
} from "./Redux/CategorySlice";
import { Swiper, SwiperSlide } from "swiper/react"; // ✅ Import Swiper components
import "swiper/css"; // ✅ Import Swiper styles
import { fetchProducts, topPicks } from "./Redux/ProductsSlice";
const Home = () => {
  const dispatch = useDispatch();
  const { category, status, error } = useSelector((state) => state.category);
  const snacks = useSelector((state) => state.category.snacks);
  const beauty = useSelector((state) => state.category.beauty);
  const featuredfav = useSelector((state) => state.category.featuredfav);
  const shopstore = useSelector((state) => state.category.shopstore);
  const household = useSelector((state) => state.category.household);
  const top = useSelector((state) => state.products.top);
  const products = useSelector((state) => state.products.products);
  useEffect(() => {
    dispatch(getCategory());
    dispatch(fetchProducts());
    dispatch(topPicks());
    dispatch(getSnacks());
    dispatch(getBeauty());
    dispatch(gethousehold());
    dispatch(getShopStore());
    dispatch(getFeaturedFav());
  }, [dispatch]);
  if (status === "loading") {
    <h1>loading....</h1>;
  }
  if (status === "failed") {
    <h1>{error}</h1>;
  }
  return (
    <div className="home">
      <div className="container">
        <div className="row">
          <div className="col-12" style={{ backgroundColor: "#FF7518" }}>
            <div>
              <input
                type="text"
                className="form-control mt-2 text-center"
                placeholder="What are you looking for?"
              />

              <div className="mt-4 mb-3">
                <Swiper slidesPerView={5} spaceBetween={20}>
                  {category.map((cat) => (
                    <SwiperSlide>
                      <div key={cat.id}>
                        <img style={{ width: "50px" }} src={cat.image}></img>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        <div className="col text-start mt-3">
          <h6>Exclusive deals for you!</h6>
          <Swiper slidesPerView={4} spaceBetween={20}>
            {products.map((item) => (
              <SwiperSlide>
                <div key={item.id}>
                  <div className="card mt-2">
                    <img
                      style={{ width: "80px", objectFit: "contain" }}
                      src={item.thumbnail}
                      alt="hello"
                    ></img>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100px",
                    }}
                  >
                    <span
                      className="mt-2"
                      style={{ fontSize: "11px", height: "50px" }}
                    >
                      <strong>{item.title}</strong>
                    </span>
                    <span style={{ fontSize: "11px" }}>{item.weight} g</span>
                    <span style={{ fontSize: "11px" }}>
                      <strong>${item.price}</strong>
                    </span>
                    <div
                      className="btn btn-outline-success w-100 mt-2"
                      style={{
                        padding: "2px 8px",
                        fontSize: "11px",
                        lineHeight: "1",
                      }}
                    >
                      ADD
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col text-start mt-3">
          <h6>Top picks for you</h6>
          <Swiper slidesPerView={4} spaceBetween={20}>
            {top.map((item) => (
              <SwiperSlide>
                <div key={item.id}>
                  <div className="card mt-2">
                    <img
                      style={{ width: "80px", objectFit: "contain" }}
                      src={item.thumbnail}
                      alt="hello"
                    ></img>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100px",
                    }}
                  >
                    <span
                      className="mt-2"
                      style={{ fontSize: "11px", height: "50px" }}
                    >
                      <strong>{item.title}</strong>
                    </span>
                    <span style={{ fontSize: "11px" }}>{item.weight} g</span>
                    <span style={{ fontSize: "11px" }}>
                      <strong>${item.price}</strong>
                    </span>
                    <div
                      className="btn btn-outline-success w-100 mt-2"
                      style={{
                        padding: "2px 8px",
                        fontSize: "11px",
                        lineHeight: "1",
                      }}
                    >
                      ADD
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col mt-3">
          <p className="text-start" style={{ fontSize: "12px" }}>
            <strong>GROCERY & KITCHEN</strong>
          </p>
          <div className="row">
            {category.map((cat) => (
              <div className="col-3 mt-2">
                <div key={cat.id}>
                  <img style={{ width: "60px" }} src={cat.image}></img>
                  <span style={{ fontSize: "11px" }}>{cat.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col mt-3">
          <p className="text-start" style={{ fontSize: "12px" }}>
            <strong>SNACKS & DRINKS</strong>
          </p>
          <div className="row">
            {snacks.map((cat) => (
              <div className="col-3 mt-2">
                <div key={cat.id}>
                  <img style={{ width: "60px" }} src={cat.image}></img>
                  <span style={{ fontSize: "11px" }}>{cat.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col mt-3">
          <p className="text-start" style={{ fontSize: "12px" }}>
            <strong>BEAUTY & WELLNESS</strong>
          </p>
          <div className="row">
            {beauty.map((cat) => (
              <div className="col-3 mt-2">
                <div key={cat.id}>
                  <img style={{ width: "60px" }} src={cat.image}></img>
                  <span style={{ fontSize: "11px" }}>{cat.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col mt-3">
          <p className="text-start" style={{ fontSize: "12px" }}>
            <strong>HOUSEHOLD & LIFESTYLE</strong>
          </p>
          <div className="row">
            {household.map((cat) => (
              <div className="col-3 mt-2">
                <div key={cat.id}>
                  <img style={{ width: "60px" }} src={cat.image}></img>
                  <span style={{ fontSize: "11px" }}>{cat.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col mt-3">
          <p className="text-start" style={{ fontSize: "12px" }}>
            <strong>SHOP BY STORE</strong>
          </p>
          <div className="row">
            {shopstore.map((cat) => (
              <div className="col-4 mt-2">
                <div key={cat.id}>
                  <img style={{ width: "80px" }} src={cat.image}></img>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col mt-3">
         
          <Swiper
            slidesPerView={1.2}
            spaceBetween={10}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay]}
          >
            <div className="row">
              {featuredfav.map((item) => (
                <SwiperSlide>
                  <div className="col-12 mt-2">
                    <div key={item.id}>
                      <img style={{ width: "100%" }} src={item.image}></img>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
