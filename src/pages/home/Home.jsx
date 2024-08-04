import React from 'react'
import Header from '../../components/topbar/Header'
import Leftbar from '../../components/leftbar/Leftbar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Share from '../../components/share/Share'


const Home = () => {
  return (
    <>
    <Header />
    <div className='flex w-full'>
    <Leftbar /> 
   
    <Feed/>
    <Rightbar />
    </div>
    </>
  )
}

export default Home