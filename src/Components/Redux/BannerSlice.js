import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'


export const getBanners = createAsyncThunk('get/banners',async()=>{
    const response = await fetch('https://newback-aold.onrender.com/api/banners')
    if(!response.ok){
        throw new Error('banner not fetched')
    }
    return response.json()
})


export const addBanner = createAsyncThunk('add/banner',async(bannerData)=>{
    const response = await fetch('https://newback-aold.onrender.com/api/banners',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(bannerData)
    })
    if(!response.ok){
        throw new Error('error while adding data')
    }
    return response.json()
})


const BannerSlice = createSlice({
  name:'banners',
  initialState:{
    banners:[],
    status:'idle',
    error:null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(getBanners.pending,(state)=>{
        state.status='loading'
    })
    .addCase(getBanners.fulfilled,(state,action)=>{
        state.status='succeeded'
        state.banners=action.payload.banners
    })
    .addCase(getBanners.rejected,(state,action)=>{
        state.status='failed'
        state.error=action.error.message
    })
    .addCase(addBanner.fulfilled,(state,action)=>{
        state.status='succeeded'
        state.banners.push(action.payload)
    })
  }
})

export default BannerSlice.reducer