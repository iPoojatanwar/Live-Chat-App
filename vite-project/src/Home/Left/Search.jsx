import React, { use, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import useAllUsers from '../../Context/UserGetAll';
import { all } from 'axios';


const Search = () => {
  const [allUsers, loading] = useAllUsers();
  const [search ,setSearch]= useState([])
  const usersArray = allUsers?.allUsers || [];

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(search)
    search==usersArray?(console.log("jhjhk")):(console.log("jkjk"))
}
  return (
    <>
<form  onSubmit={handleSubmit}>
<div className="join w-[100%] m-2">
  <div className='w-[100%] flex space-x-3  m-2 '>
      <input 
     
         onChange={(e)=>setSearch(e.target.value)}
          value={search}
      className="input join-item text-[20px]  hover:border focus:outline-hidden  p-6 bg-gray-900 "
       placeholder="Search" />
        
       
      <button className='text-[30px]  hover:border px-4 hover:border-white rounded-sm '><IoSearch /></button>
    </div>

  </div>
  
</form>
    </>
  )
}

export default Search