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
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState(false)
  
  let userData={
    name:name,
    email:email,
    password:password
  }
  const handleSubmit=()=>
  {
    let name=document.getElementById("name").value
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    if(name.trim()===""||email.trim()===""||password.trim()==="")
    {
     alert("enter all details")
    }
    {
      setError(false)
      setLoading(true)
   axios.post("https://upset-pocket-hen.cyclic.app/api/user/signup",userData).then((res)=>
   {
    
    console.log(res)
    localStorage.setItem("userId",res.data.user._id)
      let id= localStorage.getItem("userId")
      console.log(id)
      setName("")
      setEmail("")
      setPassword("")

   }).then(()=>
   {
    setLoading(false)
      setError(false)
    dispatch(authActions.login())
   }).then(()=>
   {
    history.push("/blogs")
   }).catch((err)=>
   {
    if(err)
    { setName("")
      setEmail("")
      setPassword("")
      setLoading(false)
      setError(true)
    }
   })

    }
   
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
       <TextField value={name} id='name' onChange={(e)=>setName(e.target.value)}  placeholder='enter name' type={"text"} margin='normal'/>
       {name.trim()===""&& <small style={{color:"red"}}>enter name</small>}
       <TextField value={email} id='email' onChange={(e)=>setEmail(e.target.value)}  placeholder='enter email' type={"email"} margin='normal'/>
       {email.trim()===""&& <small style={{color:"red"}}>enter email</small>}
       <TextField value={password} id='password' onChange={(e)=>setPassword(e.target.value)}  placeholder='enter password' type={"password"} margin='normal'/>
       {password.trim().length<5 && <small style={{color:"red"}} >password must have more than 4 character</small>}
       <Button onClick={handleSubmit} marginTop={5}>Submit</Button>
       <p>Already have account?</p>
       <Button onClick={()=>history.push("/")}  marginTop={3} >login</Button>
       {loading &&  <h5 >loading...please wait</h5>}
       {error && <h5>Account already exists </h5>}<br></br>
      </Box>
      
      
    </div>
  )
}

export default Signup
