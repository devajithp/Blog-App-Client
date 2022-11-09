import React,{useEffect, useState} from 'react'
import {AppBar,Typography,Toolbar,Button,Box,Tabs,Tab,TextField} from "@mui/material"
import axios from "axios"
import { useHistory, useParams } from 'react-router-dom'

function EditBlog() {
    let history=useHistory()
    const[title,setTitle]=useState()
    const[description,setDescription]=useState()
    
    const blogId=useParams().id
    
    useEffect(()=>
    {
      
       
       axios.get(`https://devajithblog.herokuapp.com/api/blog/blogbyid/${blogId}`).then((res)=>
       {
          
          setTitle(res.data.blog.title)
          setDescription(res.data.blog.description)
       })
    },[blogId])
    
    const handleSubmit=()=>
    {
        let updateData={
            title:title,
            description:description
          }
          
          
      axios.put(`https://devajithblog.herokuapp.com/api/blog/update/${blogId}`,updateData).then((res)=>
      {
        console.log(res.data)
        history.push("/myblogs")
        
      })
    }
  return (
    <div>
       <div >
      <Box width={300} margin={"auto"} padding={"auto"} marginTop={15} display={"flex"} flexDirection={"column"} >
        <Typography variant='h6' sx={{margin:"auto"}}>Title</Typography>
        <TextField value={title} onChange={(e)=>setTitle(e.target.value)}  ></TextField>
        <Typography variant='h6' sx={{margin:"auto"}}>Description</Typography>
        <TextField value={description}  onChange={(e)=>setDescription(e.target.value)}  ></TextField>
        
        <Button onClick={handleSubmit} sx={{marginTop:"20px"}} variant='contained'>Add blog</Button>
      </Box>
      </div>
    </div>
  )
}

export default EditBlog
