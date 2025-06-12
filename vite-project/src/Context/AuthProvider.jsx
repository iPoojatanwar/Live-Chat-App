import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialUserInfo = Cookies.get('jwt') || localStorage.getItem('Chatapp');
  const [userAuth, setUserAuth] = useState(initialUserInfo ? JSON.parse(initialUserInfo) : undefined);

  return (
    <AuthContext.Provider value={[userAuth , setUserAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
