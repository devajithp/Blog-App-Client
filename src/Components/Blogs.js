import React,{useState,useEffect} from 'react'
import {CardMedia,Typography,CardContent,Button,Card,Box} from "@mui/material"
import axios from "axios"
function Blogs() {
  const[blogs,setBlogs]= useState()
 useEffect(()=>
 {
    axios.get("https://devajithblog.herokuapp.com/api/blog").then((res)=>
    {
      
      setBlogs(res.data.blogs)
     
      
    })
   
 },[])
 let blogArray=blogs;



  return (
    <div style={{marginTop:"50px"}}>
   <Box display={"flex"} flexDirection={"column"}>
   {
    blogs && blogArray.map((blog)=>
   {
    return(
      <Card sx={{ width: 700, margin:"auto",marginTop:"50px",boxShadow:"5px 5px 10px #0d0c0c",}}>
      <Typography sx={{marginLeft:"20px",marginTop:"10px"}} variant={"h6"}>
  {blog.user.name}
</Typography><br></br>
<hr></hr>
<CardMedia sx={{ marginTop:"30px",maxWidth:400,maxHeight:400, marginLeft:"auto", marginRight:"auto"}}
component="img"
marginTop="50px"
image={blog.image}
alt="green iguana"

/>
<CardContent>
<Typography color={"#660066"} gutterBottom variant="h5" component="div">
  {blog.title}
</Typography>
<Typography variant="body2" color="text.secondary">
  {blog.description}
</Typography>
</CardContent>

</Card>
    )
   })
     } 
    </Box>
    </div>
  )
}

export default Blogs
