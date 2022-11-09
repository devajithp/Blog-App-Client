import React,{useState} from 'react'
import {AppBar,Typography,Toolbar,Button,Box,Tabs,Tab} from "@mui/material"
import { useHistory} from "react-router-dom"
import "./Header.css"
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../store';
function Header() {
    let history=useHistory();
    let dispatch =useDispatch()
    const[value,setValue]=useState();
    const isLoggedIn= useSelector(state=>state.isLoggedIn)
    
  return (
    <AppBar position='fixed' sx={{background:"linear-gradient(90deg, rgba(64,3,44,1) 10%, rgba(130,88,116,1) 29%, rgba(198,176,194,1) 100%)"}}>
       <Toolbar display={"flex"}>
        <Typography variant='h5'>
              D-Blogs
        </Typography>
       {isLoggedIn &&<Box marginLeft="auto" marginRight="auto" display={"flex"}>
          <Tabs  value={value} onChange={(e,value)=>setValue(value)}>
           <Tab onClick={()=>history.push("/blogs")} mouse style={{color:"black"}}label="ALL BLOGS"></Tab>
           <Tab onClick={()=>history.push("/myblogs")} style={{color:"black"}} label="MY BLOGS"></Tab>
           <Tab onClick={()=>history.push("/addblog")} style={{color:"black"}} label="ADD BLOG"></Tab>
          </Tabs>
        </Box>}
        <Box display={"flex"} marginLeft="auto"  >
       {!isLoggedIn && <Button className='buttons'   style={{backgroundColor:"black",color:"white", borderRadius:"8px"}} variant='contained' onClick={()=>
        {
            history.push('/')
        }} sx={{color:"black"}}>Login</Button> }
       {!isLoggedIn && <Button className='buttons' style={{backgroundColor:"black",color:"white",marginLeft:"10px",borderRadius:"8px"}} variant='contained'onClick={()=>
        {
            history.push('/signup')
        }} sx={{color:"black"}}>Signup</Button> }
        {isLoggedIn && <Button  className='buttons' style={{backgroundColor:"black",color:"white",marginLeft:"10px",borderRadius:"8px"}} variant='contained'onClick={()=>
        {
          dispatch(authActions.logout())
          localStorage.removeItem("userId")
          history.push("/")
        }} sx={{color:"black"}}>Log out</Button>}
        </Box>
       </Toolbar>
    </AppBar>
  )
}

export default Header
