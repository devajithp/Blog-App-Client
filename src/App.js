
import './App.css';
import Header from "./Components/Header"
import Login from "./Components/Login"
import {Route} from "react-router-dom"
import Signup from './Components/Signup'
import Blogs from "./Components/Blogs"
import UserBlogs from "./Components/UserBlogs"
import AddBlogs from "./Components/AddBlogs"
import BlogDetails from "./Components/BlogDetails"
import EditBlog from './Components/EditBlog';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store';

function App() {

  const dispatch=useDispatch();
 const isLoggedIn= useSelector(state=>state.isLoggedIn)
 console.log(isLoggedIn)
 useEffect(()=>{
   if(localStorage.getItem("userId"))
   {
       dispatch(authActions.login())
   }
 },[dispatch])
  return (
    <div >
      <header>
     <Header></Header>
     </header>
     <main>
     {!isLoggedIn && <Route exact path="/"><Login></Login></Route>}
     {!isLoggedIn && <Route path="/signup"><Signup></Signup></Route>}
     {isLoggedIn && <Route path="/blogs"><Blogs></Blogs></Route>}
     {isLoggedIn && <Route path="/myblogs"><UserBlogs></UserBlogs></Route>}
     {isLoggedIn &&<Route path="/myblogs/:id"><BlogDetails></BlogDetails></Route>}
     {isLoggedIn &&<Route path="/addblog"><AddBlogs></AddBlogs></Route>}
     {isLoggedIn &&<Route path="/editblog/:id"><EditBlog></EditBlog></Route>}
     
     </main>
    </div>
  );
}

export default App;
