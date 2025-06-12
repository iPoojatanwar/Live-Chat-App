import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Left } from './Home/Left/Left'
import Right from './Home/Right/Right'
import Sinup from './Component/Sinup'
import Login from './Component/Login'
import { useAuth } from './Context/AuthProvider'
 import  { Navigate, Route, Routes } from 'react-router-dom'



function App() {
  
const [userAuth, setUserAuth]=useAuth();
console.log(userAuth)
  return (

  <>


  <Routes>
  <Route
    path="/"
    element={
      userAuth ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <Right />
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay" />
            <ul className="menu w-80 text-base-content min-h-full">
              <Left />
            </ul>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )
    }
  />
  <Route path="/login" element={userAuth ? <Navigate to="/" /> : <Login />} />
  <Route path="/signup" element={userAuth ? <Navigate to="/" /> : <Sinup />} />
</Routes>


  
    </>
  )
}

export default App
