import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./Redux/ProductsSlice";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { searchTerm } = useParams(); // Get search term from URL

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchProducts(searchTerm)); // Fetch products based on search
    }
  }, [dispatch, searchTerm]);

  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "failed") return <h1>{error}</h1>;

  return (
    <div className="container mt-4">
      <h3>Search Results for: "{searchTerm}"</h3>
      {products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-3 mt-2 mx-2">
              <div>
                <img style={{ width: "100px" }} src={product.imageUrl} alt={product.name} />
                <p>{product.name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
