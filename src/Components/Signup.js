import React,{useState} from 'react'
import {AppBar,Typography,Toolbar,Button,Box,Tabs,Tab,TextField} from "@mui/material"
import { useHistory} from "react-router-dom"
import axios from "axios"
import {useDispatch} from "react-redux"
import { authActions } from '../store'
function Signup() {
  let dispatch= useDispatch()
  let history= useHistory();
  const[name, setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  
  let userData={
    name:name,
    email:email,
    password:password
  }
  const handleSubmit=()=>
  {
   
   axios.post("https://devajithblog.herokuapp.com/api/user/signup",userData).then((res)=>
   {
    console.log(res)
    localStorage.setItem("userId",res.data.user._id)
      let id= localStorage.getItem("userId")
      console.log(id)

   }).then(()=>
   {
    dispatch(authActions.login())
   }).then(()=>
   {
    history.push("/blogs")
   })

  
   
  }

  return (
    <div  style={{marginTop:"150px"}}>
      <Box sx={{backgroundColor:"white" , opacity:0.9, borderRadius:"10px"}} maxWidth={500} 
       paddingTop={4}
       display={"flex"} 
       flexDirection={"column"}
       alignItems={"center"} 
       margin={"auto"} 
       marginTop={5}
       boxShadow="10px 10px 20px #0d0c0c">
       <Typography variant='h4'>Signup</Typography>
       <TextField onChange={(e)=>setName(e.target.value)}  placeholder='enter name' type={"text"} margin='normal'/>
       <TextField onChange={(e)=>setEmail(e.target.value)}  placeholder='enter email' type={"email"} margin='normal'/>
       <TextField onChange={(e)=>setPassword(e.target.value)}  placeholder='enter password' type={"password"} margin='normal'/>
       <Button onClick={handleSubmit} marginTop={5}>Submit</Button>
       <p>Already have account?</p>
       <Button onClick={()=>history.push("/")}  marginTop={3} >login</Button>
      </Box>
    </div>
  )
}

export default Signup
