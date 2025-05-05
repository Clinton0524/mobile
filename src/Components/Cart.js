import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { fetchCart, removeFromCart, clearCart, updateQuantity } from "./Redux/CartSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import "./Cart.css";

const Cart = ({ userId }) => {
  const dispatch = useDispatch();
  const [noBag, setNoBag] = useState(false);
  const { items, status, error } = useSelector((state) => state.cart);
const handleRemove = async (productId) => {
  await dispatch(removeFromCart(productId));
  dispatch(fetchCart());
};  const handleClearCart = () => dispatch(clearCart());
const handleIncrease = (productId) => 
  dispatch(updateQuantity({ productId, action: "increase" }));

const handleDecrease = (productId) => 
  dispatch(updateQuantity({ productId, action: "decrease" }));

useEffect(() => {
    dispatch(fetchCart());
}, [dispatch]);
  const calculateTotal = () => {
    return (
      items.reduce(
        (total, item) => total + item.quantity * item.productId.price,
        0
      ) || 0
    );
  };

  return (
    <div className="container-fluid">
      <div className="container my-3">
        <div
          className="card text-start shadow-lg"
          style={{
            background:
              "linear-gradient(93.24deg, #ecfff7 26.13%, #b0ebd3 95.94%)",
            borderRadius: "10px",
            color: "green",
            fontWeight: 600,
            fontSize: "12px",
          }}
        >
          <p className="my-2 ms-2">
            $68 saved! FREE DELIVERY applied on this order
          </p>
        </div>

        <div
          className="card text-start shadow-lg my-3"
          style={{ borderRadius: "10px" }}
        >
          <span
            className="mt-2 ms-2"
            style={{ fontWeight: 600, fontSize: "14px" }}
          >
            Apply Coupon
          </span>
          <span
            className="mb-2 ms-2"
            style={{ color: "grey", fontSize: "12px" }}
          >
            Save more with coupon available for you
          </span>
        </div>
      </div>
      <div className="container">
        <p
          className="my-2  text-start "
          style={{ fontWeight: 600, fontSize: "14px" }}
        >
          Review your Order
        </p>
      </div>

      <div className="container my-3">
        <div
          className="card text-start shadow-lg"
          style={{ borderRadius: "10px", padding: "10px" }}
        >
        {items.length > 0 ? (
  items.map((item) => (
    <div
      className="d-flex align-items-center justify-content-between gap-2 my-1  border-bottom pb-1"
      key={item.productId._id}
    >
      <img
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          objectFit: "cover",
        }}
        src={item.productId.imageUrl}
        alt={item.productId.name}
      />
      <div style={{ flex: 1 }}>
        <p className="mb-0 fw-semibold pro-name">
          {item.productId.name}
        </p>
        <small className="text-muted" style={{ fontSize: "12px" }}>
          {item.productId.weight}
        </small>
      </div>

      <div  className="qty-controls">
      <DeleteIcon 
  onClick={(e) => {
    e.preventDefault(); // 💥 Stop any default page reload
    handleRemove(item.productId._id);
}} 
className="delete" 
/>        <button
          onClick={() => handleDecrease(item.productId._id)}
          className="qty-btn ms-4"
        >
          -
        </button>
        <span className="qty-count">{item.quantity}</span>
        <button
          onClick={() => handleIncrease(item.productId._id)}
          className="qty-btn"
        >
          +
        </button>
        <p className="fw-bold price ms-3" >
        ${(item.quantity * item.productId.price).toFixed(2)}
      </p>
      </div>
      
    </div>
  ))
) : (
  <p className="text-center py-3">Your cart is empty.</p>
)}

        </div>

        <div
          className="card my-2 shadow-lg"
          style={{ borderRadius: "10px", fontWeight: 600, fontSize: "12px" }}
        >
          <p className="my-2 ms-2">
            Missed Something?
            <Link to="/" style={{ color: "red", textDecoration: "none" }}>
              <span>Add more items</span>
            </Link>
          </p>
        </div>

        {/* <h6 className="text-start mt-3">Exclusive Products</h6>
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
                  <div
                    type="button"
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(e, item._id)}
                  >
                    Add to Cart
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper> */}

        <div className="card text-start shadow-lg d-flex flex-column p-2 my-4">
          <div className="d-flex justify-content-between align-items-center w-100">
            <span className="ms-2 flex-grow-1 bag">I don't need a bag</span>
            <div className="form-check form-switch check">
              <input
                type="checkbox"
                className="form-check-input "
                role="switch"
                checked={noBag}
                onChange={() => setNoBag(!noBag)}
              />
            </div>
          </div>
          <div className="ms-2">
            <span className="bag-1">
              Take the pledge for a greater future - opt for a no bag delivery
            </span>
          </div>
        </div>

        <p
          className="my-2 text-start ms-2"
          style={{ fontSize: "14px", fontWeight: 600 }}
        >
          Say thanks with a tip
        </p>
        <div
          className="card my-2 shadow-lg"
          style={{ borderRadius: "10px", fontWeight: 600, fontSize: "12px" }}
        >
          <div className="row d-flex p-1">
            <div className="col-12 text-start" style={{ fontSize: "12px" }}>
              <p className="my-2 ms-2 bag-1">
                A small tip, a big gesture! Tip your delivery partner to show
                your appreciation for their hard work.
              </p>
            </div>
          </div>

          {/* ✅ Visible on Small Screens (Hidden on Large Screens) */}
          <div className="d-flex justify-content-center align-items-center gap-1 mb-2 d-md-none">
            {[10, 20, 30, 40].map((amount) => (
              <div className="col-auto" key={amount}>
                <div className="btn custom-btn">${amount}</div>
              </div>
            ))}
          </div>

          {/* ✅ Visible on Large Screens (Hidden on Small Screens) */}
          <div className="d-flex justify-content-start ms-2 align-items-center gap-1 mb-2 d-none d-md-flex">
            {[10, 20, 30, 40, 50, 60].map((amount) => (
              <div className="col-auto" key={amount}>
                <div className="btn custom-btn">${amount}</div>
              </div>
            ))}
          </div>
        </div>

        {items.length > 0 ? (
          <div
            className="card shadow-lg p-3 mt-4"
            style={{ backgroundColor: "#fff", borderRadius: "13px" }}
          >
            <span
              className="text-start mb-3"
              style={{ fontWeight: "bold", color: "#333" }}
            >
              Bill Details
            </span>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold">Item total</span>
              <span className="fw-bold text-muted">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold">Delivery Fee</span>
              <span className="fw-bold text-muted">$5.00</span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold">Gst</span>
              <span className="fw-bold text-muted">$2.00</span>
            </div>
            <hr className="my-2" />

            <div
              className="d-flex justify-content-between align-items-center fw-bold"
              style={{ fontSize: "1.1rem" }}
            >
              <span>Total</span>
              <span>${(calculateTotal() + 5 + 2).toFixed(2)}</span>
            </div>

            <button
              className="checkout-btn w-100 mt-3 p-2 fw-bold"
              style={{
                backgroundColor: "#28a745",
                color: "white",
                borderRadius: "8px",
                border: "none",
                fontSize: "1rem",
                transition: "0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
            >
              Proceed to Pay
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Cart;
