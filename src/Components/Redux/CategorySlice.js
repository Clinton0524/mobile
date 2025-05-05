import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategory = createAsyncThunk("get/categories", async () => {
  const response = await fetch(
    "https://newback-aold.onrender.com/api/categories?page=1&limit=8"
  );
  if (!response.ok) {
    throw new Error("error while fetching products");
  }
  return response.json();
});
export const getCategorySecond = createAsyncThunk(
  "get/categories2nd",
  async () => {
    const response = await fetch(
      "https://newback-aold.onrender.com/api/categories?page=2&limit=8"
    );
    if (!response.ok) {
      throw new Error("error while fetching products");
    }
    return response.json();
  }
);
export const getCategoryThird = createAsyncThunk(
  "get/categories3rd",
  async () => {
    const response = await fetch(
      "https://newback-aold.onrender.com/api/categories?page=3&limit=8"
    );
    if (!response.ok) {
      throw new Error("error while fetching products");
    }
    return response.json();
  }
);

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    categorysecond: [],
    categorythird: [],
    statusFirst: "idle",
    statusSecond: "idle",
    statusThird: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.statusFirst = "loading";
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.statusFirst = "succeeded";
        state.category = action.payload.categories;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.statusFirst = "failed";
        state.error = action.error.message;
      })

      .addCase(getCategorySecond.fulfilled, (state, action) => {
        state.statusSecond = "succeeded";
        state.categorysecond = action.payload.categories;
      })

      .addCase(getCategoryThird.fulfilled, (state, action) => {
        state.statusThird = "succeeded";
        state.categorythird = action.payload.categories;
      });
  },
});
export default CategorySlice.reducer;
