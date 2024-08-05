import React, { useState ,useEffect, useContext} from 'react'
import { GiFlowerPot } from 'react-icons/gi';
import { MdMoreVert } from 'react-icons/md';
import pic from "../../../assets/profile/pic2.jpeg"; 
import post1 from "../../../assets/post/post-1.jpeg";
import Like from "../../../assets/like.png";
import heart from "../../../assets/heart .png";
import {format} from 'timeago.js'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Authcontext } from '../../context/authcontext';
function Post({post}) {
   const [like,setlike]=useState(post.likes.length)
   const [islike,setislike]=useState(false)
   const [user,setUser]=useState({})
    const{user:currentuser}=useContext(Authcontext)
   const likeHandler=()=>{
      try{
        axios.put(`https://social-7tc4.onrender.com/api/post/${post._id}/like`,{userId:currentuser._id})
      }catch(err){

      }
            setlike(islike ? like-1:like+1)
            setislike(!islike);
   }
  const PF="https://social-7tc4.onrender.com/images/"
  const AF="https://social-7tc4.onrender.com/images/"

  useEffect(()=>{
    setislike(post.likes.includes(currentuser._id))
  },[currentuser._id,post.likes])
  useEffect(() => {
    axios.get(`https://social-7tc4.onrender.com/api/users?userId=${post.userId}`)
  .then(response => setUser(response.data))
  .catch(error => console.error('Error fetching data:', error));
  }, [post.userId]);






  return (
    <>
    <div id="post" className='w-full rounded-xl shadow-xl shadow-gray-400 m-5 p-3'>
         <div id="posttop" className='flex items-center justify-between'>
            <div id="posttopleft" className='flex items-center'>
                <Link to={`profile/${user.username}`}>
                <img src={user.profilePicture?AF+user.profilePicture:""} className='w-8 h-8 rounded-full object-cover'/>
                </Link>
                <span id="name" className='text-sm font-medium m-3'>{user.username}</span>
                <span id="date" className='text-xs'>{format(post.createdAt)}</span>
            </div>
            <div id="posttopright">
                <MdMoreVert />
            </div>
         </div>
                <div id="postcenter" className='m-5 '>
                            <span id="posttext">
                                {post?.desc}
                            </span>
                            <img src={PF+post.img} className='w-full mt-5 max-h-96 object-contain' />
                </div>
         <div id="postbottom" className='flex items-center justify-between'>
                <div id="postBottomLeft" className='flex items-center'>
                    <img src={Like} className='w-6 h-6 mr-1 cursor-pointer' onClick={likeHandler}/>
                    <img src={heart} className='w-6 h-6 mr-1 cursor-pointer' onClick={likeHandler}/>
                    <span className='text-xs'>{like} people liked</span>
                </div>
                <div id="postBottomright">
                    <span className='cursor-pointer border-b border-dashed border-gray-400 text-sm'>{post.comment} comments</span>
                </div>
         </div>
    </div>
    </>
  )
}

export default Post