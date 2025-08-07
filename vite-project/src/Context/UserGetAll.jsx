
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const useAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
const API_BASE_URL= import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const token = Cookies.get('jwt') ;

        const response = await axios.get(`${API_BASE_URL}/api/user/allUsers`, {
          withCredentials:true,
          headers: { Authorization: `Bearer ${token}` },
        });

        setAllUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      } 
    };

    getAllUsers();
  }, []);

  return [allUsers, loading];
};


export default useAllUsers;
