import React, { useContext, useEffect, useState } from 'react'
import gift from "../../../assets/gift.png";
import pic1 from "../../../assets/profile/pic-3.jpeg"; 
import ad from "../../../assets/ad.png";
import { Profile } from '../../../dummy';
import Online from '../online/Online';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Authcontext } from '../../context/authcontext';
import {Add, Remove} from '@material-ui/icons'

const PF="https://social-7tc4.onrender.com/images/"
function Rightbar({user}) {
  // console.log(user.city)
const [friends,setfriends]=useState([])
const {user:currentuser,dispatch}=useContext(Authcontext)

const [followed,setfollowed]=useState(false)

useEffect(()=>{
 setfollowed( currentuser.followings.includes(user?._id))
},[currentuser,user?._id])





const handelClick=async()=>{
  try {
    if(followed){
      await axios.put(`https://social-7tc4.onrender.com/api/users/${user._id}/unfollow`,{userId:currentuser._id})
      dispatch({type:"UNFOLLOW",payload:user._id})
    }
    else{
      await axios.put(`https://social-7tc4.onrender.com/api/users/${user._id}/follow`,{userId:currentuser._id})
      dispatch({type:"FOLLOW",payload:user._id})
    }
  } catch (error) {
    console.log(error)
  }
  setfollowed(!followed)
}
const handelLogout=()=>{
  localStorage.removeItem('user');
    window.location.href = "/login";
}
const handelDelete=async()=>{
    try{
      await axios.delete(`https://social-7tc4.onrender.com/api/users/delete/${user._id}`)
      localStorage.removeItem('user');
      window.location.href = "/login";
    }
    catch(err){
      console.log(err)
    }
}


useEffect(()=>{
  const getfriends=async()=>{
    try {
      const friendlist=await axios.get(`https://social-7tc4.onrender.com/api/users/friends/${user._id}`)
      setfriends(friendlist.data)
    } catch (error) {
      console.log(error)
    }
  }
  getfriends();
},[user])

const Homerightbar=()=>{
  return (
    <>
    
        <div className='flex items-center'>
        <img src={gift} className='w-10 h-10 mr-3' />
        <span className='font-medium text-base'><b>luci robert </b>and <b> 3 others friends </b> have a birthday today</span>

        </div>
        <img src={ad} className='w-full rounded-xl mt-7'/>
        <h4 className='mt-5 font-medium'>Online Friends</h4>
        <ul id="friendlist" className='p-0 m-0 list-none mt-5'>
          
        {Profile.map((u) => (
        <Online key={u.id} profile={u} />
        ))}

    </ul>
    </>
  )
}


const Profilerightbar=()=>{
  return (
  <>
  <center>
   { user.username=== currentuser.username &&( <button className='bg-[#1872f2]  text-white rounded-md px-1 py-2' onClick={handelLogout}>Logout</button>)}<br /><br />
   { user.username=== currentuser.username &&( <button className='bg-[#1872f2]  text-white rounded-md px-1 py-2' onClick={handelDelete}>Delete User</button>)}
  {user.username!== currentuser.username &&(
      <button id="rightbarfollowbutton" className='mt-8 mb-3 border-none bg-[#1872f2] text-white rounded-md px-1 py-2 flex items-center cursor-pointer font-medium' onClick={handelClick}>
        {!followed?"follow":"unfollow"}
        {!followed?<Add />:<Remove />}
        
        </button>
    )}


   <h4 className='text-lg font-medium mb-2'>User Information</h4>
   <div id="rightbarinfo" className='mb-8'>
     <div id="rightinfoitem" className='mb-2'>
                <span id="rightbarinfokey" className='font-medium mr-4 text-[#555]'>City:</span>
                <span id="rightbarinfovalue" className='font-light'>{user.city}</span>
     </div>
     <div id="rightinfoitem" className='mb-2'>
                <span id="rightbarinfokey" className='font-medium mr-4 text-[#555]'>From:</span>
                <span id="rightbarinfovalue" className='font-light'>{user.from}</span>
     </div>
     <div id="rightinfoitem" className='mb-2'>
                <span id="rightbarinfokey" className='font-medium mr-4 text-[#555]'>Relationship:</span>
                <span id="rightbarinfovalue" className='font-light'> {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}</span>
     </div>
   </div>

   <h4 className='text-lg font-medium mb-2'>User Friends</h4>
   <div id="rightbarfriend">
   <div id="friendlist" className=' flex flex-col'>
   {friends.map(friends=>(
            <Link to ={"/profile/"+friends.username}>
            <div>
              <img src={friends.profilePicture?PF+friends.profilePicture:""} className='rounded-full object-cover h-12 w-12' />
              <span>{friends.username}</span>
            </div>
            </Link>
          ))}
        

    </div>
   </div>
  </center>
  </>
  )
}




  return (
    <div style={{flex:4}} className='m-14'>
            <div className='pt-0 pr-5 pl-0 pb-0'>
              {user ?<Profilerightbar/>:<Homerightbar />}
          </div>
    </div>
  )
}

export default Rightbar