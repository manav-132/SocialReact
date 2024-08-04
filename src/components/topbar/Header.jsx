import React, { useContext, useState } from 'react';
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import pic from "../../../assets/profile/pic2.jpeg"; // Import the image
import 'tailwindcss/tailwind.css';
import {Link}from "react-router-dom"
import {Authcontext} from "../../context/authcontext"
import axios from 'axios';
function Header() {
  const {user}=useContext(Authcontext)
  const [search,setsearch]=useState("");
  const PF="https://social-7tc4.onrender.com/images/"

  const handelSearch=async()=>{
    try {
     const responce= await axios.get(`https://social-7tc4.onrender.com/api/users/search/${search}`)
     if(responce.data.exists){
      console.log(responce.data.exists)
      window.location.href = `http://localhost:5173/profile/${search}`
     }
    } catch (e) {
      console.log(e)
    }
  }
  const handelChange=(e)=>{
    e.preventDefault()
    setsearch(e.target.value)
  }
  return (
    <div className='h-14 w-full bg-blue-600 flex items-center sticky top-0 z-[999]'>



      <div id="headerleft" className='flex flex-grow '>
        <Link to="/">
        <span id="logo" className="text-lg ml-5 font-bold text-white cursor-pointer">HappYial</span>
        </Link>
      </div>




      <div id="headercenter" className='flex flex-grow'>
        <div id="searchbar" className='w-full h-8 bg-white rounded-3xl flex items-center'>
          <Search className='text-lg ml-3' onClick={handelSearch}/>
          <input placeholder='search for friend, post, or video' className='border-none w-4/5 outline-none' onChange={handelChange}></input>
        </div>
      </div>



      <div id="headerright" className=' flex flex-grow items-center justify-around'>
                <div id="topbarlinks" className='mr-3 text-xs cursor-pointer'>
                <Link to="/">
                  <span id="topbarlink" className='mr-3 text-lg text-white cursor-pointer' >Homepage</span>
                  </Link>
                </div>

                <div id="topbaricon" className='flex '>
                      <div id="topbariconitem" className='mr-4 cursor-pointer relative'>
                        <Person />
                        <span id="topbaruiconbadge" className='flex items-center justify-center w-4 h-4 bg-red-500 rounded-full text-white absolute -top-1 -right-1 text-xs'>1</span>

                      </div>

                      <div id="topbariconitem" className='mr-4 cursor-pointer relative'>
                        <Chat />
                        <span id="topbaruiconbadge" className='flex items-center justify-center w-4 h-4 bg-red-500 rounded-full text-white absolute -top-1 -right-1 text-xs'>2</span>
                      </div>

                      <div id="topbariconitem" className='mr-4 cursor-pointer relative'>
                        <Notifications />
                        <span id="topbaruiconbadge" className='flex items-center justify-center w-4 h-4 bg-red-500 rounded-full text-white absolute -top-1 -right-1 text-xs'>1</span>
                      </div>
                </div>
                  <Link to={`/profile/${user.username }`}>
                 <img src={PF+user.profilePicture} alt="Profile Pic" id="topbarimg" className='w-8 h-8 rounded-full cursor-pointer' style={{objectFit:'cover'}}/> {/* Use imported image */}
                  </Link>
      </div>



    </div>
  );
}

export default Header;
