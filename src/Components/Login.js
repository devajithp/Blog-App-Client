import React,{useState} from 'react'
import {AppBar,Typography,Toolbar,Button,Box,Tabs,Tab,TextField} from "@mui/material"
import { useHistory} from "react-router-dom";
import axios from "axios"
import {useDispatch} from "react-redux"
import { authActions } from '../store';
function Login() {
  let history= useHistory();
  let dispatch=useDispatch();
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  let userData={
    email:email,
    password:password
  }
  const handleSubmit=()=>
  {
    axios.post("https://upset-pocket-hen.cyclic.app/api/user/login ",userData).then((res)=>
    {
    
      console.log(res.data)
      localStorage.setItem("userId",res.data._id)
      let id= localStorage.getItem("userId")
      console.log(id)

    }).then(()=>
    {
      setEmail("")
      setPassword("")
    }).then(()=>{
        dispatch(authActions.login())
    }).then(()=>
    {
      history.push("/blogs")
    }).catch((err)=>
    {
      console.log(err)
    })
  }
  return (
    <div  style={{marginTop:"150px"}}>
      <Box sx={{backgroundColor:"white" , opacity:0.9,borderRadius:"10px"}}  maxWidth={500} 
       paddingTop={4}
       display={"flex"} 
       flexDirection={"column"}
       alignItems={"center"} 
       margin={"auto"} 
       
       
       boxShadow="10px 10px 20px #0d0c0c">
       <Typography variant='h4'>Login</Typography>
       <TextField onChange={(e)=>setEmail(e.target.value)} placeholder='enter email' type={"email"} margin='normal'/>
       <TextField onChange={(e)=>setPassword(e.target.value)} placeholder='enter password' type={"password"} margin='normal'/>
       
       <Button onClick={handleSubmit} marginTop={5}>Submit</Button>
       <p>new user?</p>
       <Button onClick={()=>history.push("/signup")} marginTop={3} >Signup</Button>
      </Box>
    </div>
  )
}

export default Login
