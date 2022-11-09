import React,{useState,useEffect} from 'react'
import axios from "axios"
import {CardMedia,Typography,CardContent,Button,Card,Box} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useHistory} from "react-router-dom"

function UserBlogs() {
  let history=useHistory();
  const[blogs,setBlogs]= useState()
  const[blogId,setBlogId]=useState()
  
  
 useEffect(()=>
 {
    let userId=localStorage.getItem("userId")
    
    axios.get(`https://devajithblog.herokuapp.com/api/blog/userblog/${userId}`).then((res)=>
    {
      
      
      setBlogs(res.data.blogs)
      
    })
   
 },[blogs])
 let blogArray=blogs;
 

  return (
    <div  style={{marginTop:"50px"}}>
      <Box display={"flex"} flexDirection={"column"}>
   {
    blogs && blogArray.map((blog)=>
   {
    return(
      <Card sx={{ width: 700, margin:"auto",marginTop:"50px",boxShadow:"5px 5px 10px #ccc",}}>
        <Box marginTop={"20px"}>
        <EditIcon onClick={()=>{setBlogId(blog.id)
    history.push(`/editblog/${blog._id}`)}} sx={{cursor:"pointer",marginLeft:"600px"}}></EditIcon>
        <DeleteIcon onClick={()=>
        {
          console.log(blog._id)
          if(window.confirm("Are you sure you want to delete this blog ?"))
          {
           axios.delete(`https://devajithblog.herokuapp.com/api/blog/delete/${blog._id}`).then((res)=>
           {
            console.log(res.data)
            history.push("/myblogs")
           })
          }
        }} sx={{cursor:"pointer",marginLeft:"10px" }}></DeleteIcon>
        </Box>
        
      
<CardMedia sx={{ marginTop:"30px",maxWidth:400,maxHeight:400, marginLeft:"auto", marginRight:"auto"}}
component="img"
marginTop="50px"
image={blog.image}
alt="green iguana"

/>
<CardContent>
<Typography gutterBottom variant="h5" component="div">
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

export default UserBlogs
