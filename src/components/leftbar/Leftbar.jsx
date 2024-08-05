import React from 'react'
 import "../../index.css"
import friend1 from "../../../assets/profile/pic-3.jpeg"
import { Profile } from '../../../dummy'
import { FaRss, FaComments, FaVideo, FaUsers, FaBookmark, FaQuestionCircle, FaBriefcase, FaCalendarAlt, FaSchool } from 'react-icons/fa';import Friend from '../friend/Friend'
function Leftbar() {
  return (
    <div style={{flex:3 }} className='h-screen mb-[-60px] overflow-y-scroll sticky top-14' >
            <div className='p-5'>
                  <ul className='p-0 m-0 list-none'>
                    <li className='flex items-center mb-5'>
                        <FaRss className='mr-4'/>
                        <span>Feed</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <FaComments className='mr-4'/>
                        <span>Chat</span>
                    </li>

                    <li className='flex items-center mb-5'>
                        <FaVideo className='mr-4'/>
                        <span>video</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <FaUsers className='mr-4'/>
                        <span>Groups</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <FaBookmark className='mr-4'/>
                        <span>Bookmarks</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <FaQuestionCircle className='mr-4'/>
                        <span>Questions</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <FaBriefcase className='mr-4'/>
                        <span>jobs</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <FaCalendarAlt className='mr-4'/>
                        <span>Events</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <FaSchool className='mr-4'/>
                        <span>Courses</span>
                    </li>

                  </ul>
                  <button className='w-36 border-none p-2 rounded-md font-medium shadow-xl'>Show More</button>
                  <hr className='m-5' />
                  <ul className='p-0 m-0 list-none mb-4'>
                    
                     { Profile.map(u=>(
                          <Friend key={u.id} profile={u}/>
                      ))}
                  </ul>
            </div>
      
      </div>
  )
}

export default Leftbar