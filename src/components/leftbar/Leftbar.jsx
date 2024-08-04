import React from 'react'
 import "../../index.css"
import friend1 from "../../../assets/profile/pic-3.jpeg"
import { Profile } from '../../../dummy'
import { RssFeed,Chat,Duo,Group,Bookmark,Help,Work,Event,School }from '@material-ui/icons'
import Friend from '../friend/Friend'
function Leftbar() {
  return (
    <div style={{flex:3 }} className='h-screen mb-[-60px] overflow-y-scroll sticky top-14' >
            <div className='p-5'>
                  <ul className='p-0 m-0 list-none'>
                    <li className='flex items-center mb-5'>
                        <RssFeed className='mr-4'/>
                        <span>Feed</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <Chat className='mr-4'/>
                        <span>Chat</span>
                    </li>

                    <li className='flex items-center mb-5'>
                        <Duo className='mr-4'/>
                        <span>video</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <Group className='mr-4'/>
                        <span>Groups</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <Bookmark className='mr-4'/>
                        <span>Bookmarks</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <Help className='mr-4'/>
                        <span>Questions</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <Work className='mr-4'/>
                        <span>jobs</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <Event className='mr-4'/>
                        <span>Events</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <School className='mr-4'/>
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