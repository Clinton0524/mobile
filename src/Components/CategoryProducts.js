import React, { useEffect, useState } from "react";
import { fetchProductsByCategoryId } from "./Redux/ProductsSlice";
import { getCategory } from "./Redux/CategorySlice"; // ✅ Fetch all categories
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import "swiper/css";
import AddToCartButton from "./AddToCartButton";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const { productCat, status } = useSelector((state) => state.products);
  const { category } = useSelector((state) => state.category); // ✅ Get categories

  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategoryId(categoryId));
      dispatch(getCategory()); // ✅ Fetch all categories
    }
  }, [dispatch, categoryId]);

  useEffect(() => {
    // ✅ Find the category name correctly
    const foundCategory = category.find((cat) => cat._id === categoryId);
    if (foundCategory) {
      setCategoryName(foundCategory.name);
    }
  }, [category, categoryId]);

  if (status === "loading") return <h2>Loading...</h2>;
  if (status === "failed") return <h2>Error loading products</h2>;

  return (
    <>
      <div className="container mt-4">
        <h5 className="text-start">Showing results of "{categoryName || "Loading..."}"</h5>
  <p className="text-start">  {productCat?.length || 0} items in "{categoryName || "Loading..."}"</p>
        <div className="row">
          {productCat?.map((item) => (
            <div className="col-6 g-1" key={item._id}>
              <div className="card h-100 d-flex flex-column" style={{ borderRadius: "2px", border: "1px solid rgba(40, 44, 63, .05)", minHeight: "300px" }}>
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-center">
                    <img style={{ width: "120px", height: "120px", objectFit: "cover" }} src={item.imageUrl} alt={item.name} />
                  </div>

                  <Link style={{ textDecoration: "none" }} to={`/products/${item._id}`}>
                    <div className="text-start mt-2" style={{ fontWeight: 750, fontSize: "14px", color: "rgba(2, 6, 12, 0.75)" }}>
                      {item.name}
                    </div>
                  </Link>

                  <span className="text-start mt-1" style={{ fontSize: "11px", color: "grey", fontWeight: 600, height: "35px", overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>
                    {item.description}
                  </span>

                  <p className="text-start mb-0" style={{ fontWeight: 600, color: "grey", fontSize: "12px" }}>
                    {item.weight}
                  </p>

                  <div className="d-flex align-items-center">
                    <p className="mb-1" style={{ fontWeight: 600, fontSize: "14px", marginRight: "3px", color: "green" }}>
                      ₹{item.price}
                    </p>
                    <p className="mb-1" style={{ fontWeight: 600, color: "red", fontSize: "12px", textDecoration: "line-through" }}>
                      ₹{item.oldprice}
                    </p>
                  </div>

                 <AddToCartButton productId={item._id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;
