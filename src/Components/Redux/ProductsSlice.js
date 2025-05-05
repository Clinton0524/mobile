import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "get/products1",
  async (searchQuery = "") => {
    const response = await fetch(
      `https://newback-aold.onrender.com/api/products?name=${searchQuery}&category=${searchQuery}`
    );
    if (!response.ok) {
      throw new Error("error while fetching products");
    }
    return response.json();
  }
);
export const getExclusiveProducts = createAsyncThunk(
  "get/exclusive",
  async () => {
    const response = await fetch(
      `https://newback-aold.onrender.com/api/products/exclusive`
    );
    if (!response.ok) {
      throw new Error("error while fetching products");
    }
    return response.json();
  }
);

export const fetchProductsByCategoryId = createAsyncThunk(
  "get/catProducts",
  async (categoryId) => {
    const response = await fetch(
      `https://newback-aold.onrender.com/api/products?category=${categoryId}`
    );
    if (!response.ok) {
      throw new Error("error wile fetching product");
    }
    return response.json();
  }
);

export const fetchProductById = createAsyncThunk(
  "get/Productsid",
  async (productId) => {
    const response = await fetch(
      `https://newback-aold.onrender.com/api/products/${productId}`
    );
    if (!response.ok) {
      throw new Error("error wile fetching product");
    }
    return response.json();
  }
);


const ProductSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productCat: [],
    product: null,
    exclusiveProducts:[],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductsByCategoryId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productCat = action.payload.products;
      })
      .addCase(fetchProductsByCategoryId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload.product;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getExclusiveProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExclusiveProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exclusiveProducts = action.payload.products;
      })
      .addCase(getExclusiveProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default ProductSlice.reducer;
