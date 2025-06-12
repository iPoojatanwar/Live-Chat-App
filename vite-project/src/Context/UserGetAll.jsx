
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const useAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const token = Cookies.get('jwt') ;

        const response = await axios.get('/api/user/allUsers', {
          withCredentials:'include',
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
