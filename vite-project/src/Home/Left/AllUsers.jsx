import React from 'react';
import useAllUsers from '../../Context/UserGetAll';
import Users from './Users';

const AllUsers = () => {
  const [allUsers, loading] = useAllUsers();
  

  const usersArray = allUsers?.allUsers || [];

  return (
    <> 
      <div className='bg-gray-900 p-4 m-2 border rounded-sm border-gray-900'>Message</div>
      <div className='flex-1 h-[72%] overflow-y-scroll'>
      {usersArray.map((user, key) => (
  <Users  users={user} index={key} key={key} />
  
))}

      </div>
      
    </>
  );
};

export default AllUsers;
