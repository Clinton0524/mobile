import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategory = createAsyncThunk("get/categories", async () => {
  const response = await fetch("http://localhost:5000/categories");
  if (!response.ok) {
    throw new Error("error while fetching products");
  }
  return response.json();
});
export const getSnacks = createAsyncThunk("get/snacks", async () => {
  const response = await fetch("http://localhost:5000/snacks");
  if (!response.ok) {
    throw new Error("error while fetching snacks");
  }
  return response.json();
});
export const getBeauty = createAsyncThunk("get/beauty", async () => {
  const response = await fetch("http://localhost:5000/beauty");
  if (!response.ok) {
    throw new Error("error while beauty snacks");
  }
  return response.json();
});
export const gethousehold = createAsyncThunk("get/household", async () => {
  const response = await fetch("http://localhost:5000/household");
  if (!response.ok) {
    throw new Error("error while beauty household");
  }
  return response.json();
});
export const getShopStore = createAsyncThunk("get/shopstore", async () => {
  const response = await fetch("http://localhost:5000/shopstore");
  if (!response.ok) {
    throw new Error("error while beauty shopstore");
  }
  return response.json();
});
export const getFeaturedFav = createAsyncThunk("get/featuredfav", async () => {
  const response = await fetch("http://localhost:5000/featuredfav");
  if (!response.ok) {
    throw new Error("error while beauty featuredfav");
  }
  return response.json();
});


const CategorySlice = createSlice({
    name:'category',
    initialState:{
        category:[],
        snacks:[],
        featuredfav:[],
        household:[],
        beauty:[],
        shopstore:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
   builder.addCase(getCategory.pending,(state)=>{
    state.status='loading'
    })
   .addCase(getCategory.fulfilled,(state,action)=>{
    state.status='succeeded'
    state.category=action.payload
   })
   .addCase(getCategory.rejected,(state,action)=>{
    state.status='failed'
    state.error=action.error.message
   })
   .addCase(getSnacks.pending,(state)=>{
    state.status='loading'
    })
   .addCase(getSnacks.fulfilled,(state,action)=>{
    state.status='succeeded'
    state.snacks=action.payload
   })
   .addCase(getSnacks.rejected,(state,action)=>{
    state.status='failed'
    state.error=action.error.message
   })
   .addCase(getBeauty.pending,(state)=>{
    state.status='loading'
    })
   .addCase(getBeauty.fulfilled,(state,action)=>{
    state.status='succeeded'
    state.beauty=action.payload
   })
   .addCase(getBeauty.rejected,(state,action)=>{
    state.status='failed'
    state.error=action.error.message
   })
   .addCase(gethousehold.pending,(state)=>{
    state.status='loading'
    })
   .addCase(gethousehold.fulfilled,(state,action)=>{
    state.status='succeeded'
    state.household=action.payload
   })
   .addCase(gethousehold.rejected,(state,action)=>{
    state.status='failed'
    state.error=action.error.message
   })
   .addCase(getShopStore.pending,(state)=>{
    state.status='loading'
    })
   .addCase(getShopStore.fulfilled,(state,action)=>{
    state.status='succeeded'
    state.shopstore=action.payload
   })
   .addCase(getShopStore.rejected,(state,action)=>{
    state.status='failed'
    state.error=action.error.message
   })
   .addCase(getFeaturedFav.pending,(state)=>{
    state.status='loading'
    })
   .addCase(getFeaturedFav.fulfilled,(state,action)=>{
    state.status='succeeded'
    state.featuredfav=action.payload
   })
   .addCase(getFeaturedFav.rejected,(state,action)=>{
    state.status='failed'
    state.error=action.error.message
   })
    }
    
});
export default CategorySlice.reducer
