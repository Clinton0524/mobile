import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("get/products1", async () => {
  const response = await fetch("https://dummyjson.com/products?limit=100&skip=20");
  if (!response.ok) {
    throw new Error("error while fetching products");
  }
  const data = await response.json();
  return data.products;
});
export const topPicks = createAsyncThunk("get/products2", async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100&skip=60");
    if (!response.ok) {
      throw new Error("error while fetching products");
    }
    const data = await response.json();
    return data.products;
  });



const ProductSlice = createSlice({
name:'products',
initialState:{
    products:[],
    top:[],
    status:'idle',
    error:null
},
reducers:{},
extraReducers:(builder)=>{
builder.addCase(fetchProducts.pending,(state)=>{
    state.status='loading'
})
.addCase(fetchProducts.fulfilled,(state,action)=>{
    state.status='succeeded'
    state.products = action.payload;
})
.addCase(fetchProducts.rejected,(state,action)=>{
    state.status='failed'
    state.error =action.error.message
})
.addCase(topPicks.pending,(state)=>{
    state.status='loading'
})
.addCase(topPicks.fulfilled,(state,action)=>{
    state.status='succeeded'
    state.top = action.payload;
})
.addCase(topPicks.rejected,(state,action)=>{
    state.status='failed'
    state.error =action.error.message
})
}
})
export default ProductSlice.reducer