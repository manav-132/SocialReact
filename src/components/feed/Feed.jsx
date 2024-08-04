import React, { useContext, useEffect, useState } from 'react'
import Share from '../share/Share'
import Post from '../post/Post'
import { Posts } from '../../../dummy'
// import {Profile}from '../../../dummy'
import axios from 'axios'
import { Authcontext } from '../../context/authcontext'


function Feed({username}) {
  const [posts,setposts]=useState([]);
  const {user}=useContext(Authcontext)

console.log(username )
console.log("from main page")
  useEffect(() => {

    // Use ternary operator to conditionally call axios.get()
    const fetchData = () => {
      return username
        ? axios.get('https://social-7tc4.onrender.com/api/post/profile/'+username)
        : axios.get('https://social-7tc4.onrender.com/api/post/timeline/hello/'+user._id);
    };
  
    fetchData()
      .then(response => setposts(response.data.sort((p1,p2)=>{
        return new Date(p2.createdAt)-new Date(p1.createdAt)
      })))
      .catch(error => console.error('Error fetching data:', error));
  }, [username,user._id]);


  return (
    <div style={{flex:5}}>
         <div>
         {(!username||username === user.username) && <Share />}
          {posts.map((p)=>(
            <Post key={p._id} post={p} />
          ))}
          
         </div>
    </div>
  )
}

export default Feed
