import React, { useState } from 'react'
import {AppBar,Typography,Toolbar,Button,Box,Tabs,Tab,TextField} from "@mui/material"
import axios from "axios"
import { useHistory} from "react-router-dom"
function AddBlogs() {
  let history= useHistory();
  const[title,setTitle]=useState()
  const[description,setDescription]=useState()
  const[image,setImage]=useState()
  let userId=localStorage.getItem("userId")
  userId=""+userId;
  let blogData={
    title:title,
    description:description,
    image:image,
    user:userId
  }
  
  const handleSubmit=async ()=>{
   let res=await axios.post("https://devajithblog.herokuapp.com/api/blog/addblog",blogData)
       console.log(res.data)
      setTitle("")
      setDescription("")
      setImage("")
      history.push("/blogs")
    
    
  
  }
  return (
    <div  style={{marginTop:"50px"}}>
      <div >
      <Box width={300} margin={"auto"} padding={"auto"} marginTop={15} display={"flex"} flexDirection={"column"} >
        <Typography variant='h6' sx={{margin:"auto"}}>Title</Typography>
        <TextField onChange={(e)=>setTitle(e.target.value)}  ></TextField>
        <Typography variant='h6' sx={{margin:"auto"}}>Description</Typography>
        <TextField  onChange={(e)=>setDescription(e.target.value)}  ></TextField>
        <Typography variant='h6' sx={{margin:"auto"}}>Image url</Typography>
        <TextField  onChange={(e)=>setImage(e.target.value)} ></TextField>
        <Button style={{backgroundColor:"#861852"}} onClick={handleSubmit} sx={{marginTop:"20px"}} variant='contained'>Add blog</Button>
      </Box>
      </div>
    </div>
  )
}

export default AddBlogs
