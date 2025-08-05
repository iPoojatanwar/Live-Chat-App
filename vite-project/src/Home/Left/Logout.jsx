import axios from 'axios';
import React, { useState } from 'react'; 
import { BiLogOutCircle } from "react-icons/bi";
import Cookies from  'js-cookie'
import toast, { Toaster } from 'react-hot-toast'

const Logout = () => {
  const [loading, setLoading] = useState(false); 
const API_BASE_URL= import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
  const handleLogOut = () => {
  setLoading(true); 
  axios.post(`${API_BASE_URL}/api/user/logout`)
    .then((response) => {
      console.log("Logout successful:", response.data);
      localStorage.removeItem("Chatapp");
      Cookies.remove('jwt');

      toast.success("Logout successfully");

      setTimeout(() => {
        window.location.href = '/Login'; 
      }, 1000); 
      
    })
    .catch((error) => {
      console.log("Error: " + (error.response?.data?.message || error.message));
      toast.error("Logout failed");
    })
    .finally(() => {
      setLoading(false); 
    });

  };

  return (
    <>
    <Toaster/>
        <div className='text-[30px] m-2'>
      <BiLogOutCircle 
        onClick={handleLogOut} 
        className={`cursor-pointer ${loading ? 'opacity-50 pointer-events-none' : ''}`} 
      />
      {loading && <p>Logging out...</p>}
    </div>
    </>
  );
};

export default Logout;
