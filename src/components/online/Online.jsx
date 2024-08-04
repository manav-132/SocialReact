import React from 'react'

export default function Online({profile}) {
  const PF="https://social-7tc4.onrender.com/images/"
  return (
    <li id="friend" className='flex items-center mb-4'>
      <div id="imgcontainer" className='mr-10 relative'>
        <img src={PF+profile.profilePicture} className='w-10 h-10 rounded-full object-cover'/>
            <span className='w-3 h-3 rounded-full bg-green-500 absolute -top-1'>

            </span>
        </div>
        <span className='font-medium'>{profile.username}</span>

     </li>
  )
}

