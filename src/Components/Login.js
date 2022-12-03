import React,{useState} from 'react'
import {AppBar,Typography,Toolbar,Button,Box,Tabs,Tab,TextField, FormControl} from "@mui/material"
import { useHistory} from "react-router-dom";
import axios from "axios"
import {useDispatch} from "react-redux"
import { authActions } from '../store';
function Login() {
  let history= useHistory();
  let dispatch=useDispatch();
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[valid,setValid]=useState(false)
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState(false)
  let userData={
    email:email,
    password:password
  }
  const handleSubmit=()=>
  {
    setError(false)
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    if(email.trim()===""||password.trim()==="")
    {
      alert("enter email and password")
    }
    else
    {
      setLoading(true)
      
      
    axios.post("https://upset-pocket-hen.cyclic.app/api/user/login ",userData).then((res)=>
    {
     
     console.log(res.message)
      console.log(res.data)
      localStorage.setItem("userId",res.data._id)
      let id= localStorage.getItem("userId")
      console.log(id)

    }).then(()=>
    {
      setEmail("")
      setPassword("")
      setLoading(false)
      setError(false)
    }).then(()=>{
        dispatch(authActions.login())
    }).then(()=>
    {
      history.push("/blogs")
      
    }).catch((err)=>
    { 
      if(err)
      { setLoading(false)
        setEmail("")
        setPassword("")
        setError(true)
        
      }
      console.log(err)
    })
    
  }
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
       
       <TextField value={email} id='email' required="true" 
       label="Enter Email" 
       onChange={(e)=>setEmail(e.target.value) } 
       
       placeholder='enter email'  
       type="email"
       margin='normal' 
       />
       {email.trim()===""&& <small style={{color:"red"}}>enter email</small>}
       <TextField value={password} required="true" id='password' label="Enter Password" onChange={(e)=>setPassword(e.target.value)} placeholder='enter password'  type={"password"} margin='normal'/>
       {password.trim()===""&& <small style={{color:"red"}} >enter password</small>}
       <Button onClick={handleSubmit} marginTop={5}>Submit</Button>
       
       <p>new user?</p>
       <Button onClick={()=>history.push("/signup")} marginTop={3} >Signup</Button>
       {loading &&  <h5 >loading...please wait</h5>}
      {error && <h5 >Incorrect email or password</h5>}<br></br>
      </Box>
      
    </div>
  )
}

export default Login
