import React, { useContext, useRef, useState } from 'react'
import {PermMedia,Label,Room, EmojiEmotions, Cancel} from '@mui/icons-material'
import pic from "../../../assets/profile/pic2.jpeg"; 
import {Authcontext} from "../../context/authcontext"
import axios from  'axios'
function Share() {
  const {user}=useContext(Authcontext)
  const desc=useRef()
  const [file,setfile]=useState(null)
  const submitHandler=async (e)=>{
    e.preventDefault()
    const newpost={
      userId:user._id,
      desc:desc.current.value
    }
    if(file){
      const data=new FormData()
      const filename=file.name
      data.append("file",file)
      data.append("name",filename)
      newpost.img=filename;
      try {
        await axios.post("https://social-7tc4.onrender.com/api/upload",data)
      } catch (error) {
        console.log(error)
      }
    }
    try{
      await axios.post("https://social-7tc4.onrender.com/api/post",newpost)
      window.location.reload()
    }catch(err){

    }
  }
 const PF="https://social-7tc4.onrender.com/images/"
  return (
    <div className='w-full rounded-xl shadow-xl shadow-gray-400 m-5'>
        <div className='p-3'>
            <div id="sharetop" className='flex items-center'>
                <img src={user.profilePicture?PF+user.profilePicture:""} alt='profile' className='w-12 h-12 rounded-full object-cover mr-3 '/> 
                <input placeholder={'Whats in your mind'+user.username} className='border-none w-4/5 outline-none ' ref={desc}/>
            </div>
            <hr className='m-5'/>
            {file && (
              <div id="shareimage" className='pt-0 pr-5 pb-3 pl-5 relative'>
                <img src={URL.createObjectURL(file)} className='w-full object-cover'/>
                <Cancel onClick={()=>setfile(null)} className='absolute top-0 right-5 cursor-pointer opacity-70'/>
              </div>
            )}
            <form id="sharebottom" className='flex items-center justify-between' onSubmit={submitHandler}>
                <div id="options" className='flex ml-5'>
                      <label htmlFor="file" className='flex items-center mr-4 cursor-pointer'>
                        <PermMedia htmlColor="tomato" className='size-5 mr-1' />
                        <span className='text-sm font-medium'>Photo or Video</span>
                        <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>{
                          setfile(e.target.files[0])
                        }} />
                      </label>
                      <div className='flex items-center mr-4 cursor-pointer'>
                        <Label htmlColor="blue" className='size-5 mr-1' />
                        <span className='text-sm font-medium'>Tag</span>
                      </div>
                      <div className='flex items-center mr-4 cursor-pointer'>
                        <Room htmlColor="green" className='size-5 mr-1'/>
                        <span className='text-sm font-medium'>Location</span>
                      </div>
                      <div className='flex items-center mr-4 cursor-pointer'>
                        <EmojiEmotions htmlColor="goldenrod" className='size-5 mr-1'/>
                        <span className='text-sm font-medium'>Feelings</span>
                      </div>
                </div>
                <button className='border-none p-2 rounded bg-green-500 font-medium mr-5 cursor-pointer text-white' type="submit">Share</button>
            </form>
        </div>
    </div>
  )
}

export default Share