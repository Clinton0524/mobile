import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "./Redux/ProductsSlice";
import AddToCartButton from "./AddToCartButton";
const ProductDetails = () => {
  const { productId } = useParams(); // ✅ Use "id" instead of "_id"
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  if (status === "loading") return <h2>Loading product details...</h2>;
  if (status === "failed")
    return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  if (!product) return <h2>No product found</h2>;

  return (
    <div>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <div className="card shadow-lg">
              <div className="card-body">
                <img
                  style={{ borderRadius: "3px" }}
                  src={product.imageUrl}
                  alt={product.name}
                  width="100%"
                />
                <hr />
                <h5 className="text-start" style={{ marginBottom: "4px" }}>
                  {product.name}
                </h5>
                <p
                  className="text-start"
                  style={{
                    fontWeight: 500,
                    color: "grey",
                    marginBottom: "4px",
                  }}
                >
                  {product.weight}
                </p>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ marginBottom: "4px" }}
                >
                  <div className="d-flex">
                    <p style={{ fontWeight: 500, marginBottom: "2px" }}>
                      ₹{product.price}
                    </p>
                    <p
                      className="ms-1"
                      style={{
                        textDecoration: "line-through",
                        fontWeight: 500,
                        color: "grey",
                        marginBottom: "0px",
                      }}
                    >
                      {product.oldprice}
                    </p>
                  </div>
                  <AddToCartButton productId={product._id} />
                </div>
              </div>
            </div>
            
            
            <div className="card mt-3 shadow-lg">
              <div
                className="card-title text-start mt-3 ms-3 mb-0"
                style={{ fontWeight: 600 }}
              >
                Storage Instructions
              </div>
              <div className="card-body text-start">
                <p>{product.description}</p>
                <div className="text-start" style={{color:'orange'}}>+Show more</div>
                <hr />
                <div className="card-title" style={{ fontWeight: 600 }}>
                  Nutritional information
                </div>
                <p>{product.description}</p>
                <div className="text-start" style={{color:'orange'}}>+Show more</div>
                <hr />
                <div className="card-title" style={{ fontWeight: 600 }}>
                  Description
                </div>
                <p>{product.description}</p>
                <div className="text-start" style={{color:'orange'}}>+Show more</div>
              </div>
            </div>
            <div className="card mt-3 shadow-lg">
              <div className="card-title text-start ms-3 mt-2 mb-0 "style={{ fontWeight: 600 }}>
                Seller Details
              </div>
              <div className="card-body text-start">
                <p>{product.description}</p>
                <div className="text-start" style={{color:'orange'}}>+Show more</div>
              </div>
            </div>
            <div className="card mt-3 shadow-lg">
              <div className="card-title text-start ms-3 mt-2 mb-0 "style={{ fontWeight: 600 }}>
                Important Details
              </div>
              <div className="card-body text-start">
                <p>{product.description}</p>
                <div className="text-start" style={{color:'orange'}}>+Show more</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
