import React from 'react'
import Search from './Search'
import AllUsers from './AllUsers'
import Logout from './Logout'


export const Left = () => {
  return (
   <>
    <div className='bg-black w-full'>
    <AllUsers/>
    <Logout/>
    
    </div>
    </> 
  )
}
