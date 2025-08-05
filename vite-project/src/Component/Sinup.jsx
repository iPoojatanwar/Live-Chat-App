import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../Context/AuthProvider';
import { Link } from 'react-router-dom';

const Sinup = () => {
  const [userAuth, setUserAuth] = useAuth();
  const { register, formState: { errors }, handleSubmit } = useForm();
const API_BASE_URL= import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
  const onSubmit = (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmpassword,
    };

    axios.post(`${API_BASE_URL}/api/user/signup`, userInfo, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("Chatapp", JSON.stringify(response.data));
        setUserAuth(response.data);
        toast.success("Signup Successfully");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Signup failed");
      });
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-center items-center h-screen w-full ">
        <form onSubmit={handleSubmit(onSubmit)} className="shadow-md border p-6 rounded-lg w-full max-w-md flex flex-col gap-4">
          <div className="text-center text-2xl font-bold">
            Text<span className="text-green-700">Box</span>
          </div>
          <h3 className="text-lg font-semibold">Signup</h3>

        
          <label className="input input-bordered flex items-center gap-2">
            <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullname", { required: "Fullname is required" })}
              className="grow"
            />
          </label>
          {errors.fullname && <p className="text-sm text-red-500">{errors.fullname.message}</p>}

      
          <label className="input input-bordered flex items-center gap-2">
            <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              {...register("email", { required: "Email Address is required" })}
              className="grow"
            />
          </label>
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

      
          <label className="input input-bordered flex items-center gap-2">
            <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
            </svg>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="grow"
            />
          </label>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

        
          <label className="input input-bordered flex items-center gap-2">
            <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
            </svg>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmpassword", { required: "Confirm Password is required" })}
              className="grow"
            />
          </label>
          {errors.confirmpassword && <p className="text-sm text-red-500">{errors.confirmpassword.message}</p>}

          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <p className="text-sm">
              Already have an account?
              <Link to="/login" className="text-green-700 font-semibold underline ml-1">Login</Link>
            </p>
            <button type="submit" className="btn btn-success w-full sm:w-auto">
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Sinup;
