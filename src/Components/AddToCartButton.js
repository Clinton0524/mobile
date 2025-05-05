import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity, removeFromCart } from "./Redux/CartSlice";

const AddToCartButton = ({ productId }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Get existing quantity from cart if available
  const existingItem = cartItems.find((item) => item.product?._id === productId);
  const initialQty = existingItem?.quantity || 0;

  const [quantity, setQuantity] = useState(initialQty);

  useEffect(() => {
    setQuantity(initialQty);
  }, [initialQty]);

  const handleAdd = () => {
    setQuantity(1);
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    dispatch(updateQuantity({ productId, action: "increase" }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      dispatch(updateQuantity({ productId, action: "decrease" }));
    } else {
      setQuantity(0);
      dispatch(removeFromCart(productId));
    }
  };

  return (
    <div
      className="btn shadow-sm w-100 mt-auto text-center"
      style={{ border: "1px solid rgba(2, 6, 12, .15)" }}
    >
      {quantity === 0 ? (
        <span
          style={{ fontWeight: 700, color: "green", cursor: "pointer" }}
          onClick={handleAdd}
        >
          ADD
        </span>
      ) : (
        <div className="d-flex justify-content-between align-items-center px-2">
          <button className="btn btn-sm" onClick={handleDecrease}>
            −
          </button>
          <span>{quantity}</span>
          <button className="btn btn-sm" onClick={handleIncrease}>
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
