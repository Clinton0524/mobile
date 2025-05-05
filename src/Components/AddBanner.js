import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBanner } from './Redux/BannerSlice'

const AddBanner = () => {
    const dispatch=useDispatch()
    const [bannerData,setBannerData]=useState({
        title:'',
        imageUrl:'',
        description:''
        
    })
    const handleChange =(e)=>{
        setBannerData({...bannerData,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(addBanner(bannerData))
        setBannerData({title:'',imageUrl:'',description:''})
    }
  return (

    <div>
    <h2>Add New Banner</h2>
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={bannerData.title} onChange={handleChange} placeholder="Title" required />
      <input type="text" name="imageUrl" value={bannerData.imageUrl} onChange={handleChange} placeholder="Image URL" required />
      <input type="text" name="description" value={bannerData.description} onChange={handleChange} placeholder="Description" required />
      <button type="submit">Add Banner</button>
    </form>
  </div>
  )
}

export default AddBanner
