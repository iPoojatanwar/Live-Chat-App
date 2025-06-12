import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    axios.post('/api/user/login', userInfo)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("Chatapp", JSON.stringify(response.data));
        toast.success("Login Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Login failed");
      });
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-center items-center h-screen w-full px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border shadow-md  rounded-lg flex flex-col gap-4 p-6 w-full max-w-md"
        >
          <div className="text-center text-2xl font-bold">
            Text<span className="text-green-700">Box</span>
          </div>
          <h3 className="text-lg font-semibold">Login</h3>

        
          <label className="input input-bordered flex items-center gap-2">
            <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              {...register("email", { required: "Email Address is required" })}
              className="grow"
              aria-invalid={errors.email ? "true" : "false"}
            />
          </label>
          {errors.email && <p className="text-sm text-red-500">{errors.email?.message}</p>}

        
          <label className="input input-bordered flex items-center gap-2">
            <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="grow"
              aria-invalid={errors.password ? "true" : "false"}
            />
          </label>
          {errors.password && <p className="text-sm text-red-500">{errors.password?.message}</p>}

        
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <p className="text-sm">
              Don’t have an account?
              <Link to="/signup" className="text-green-700 font-semibold underline ml-1">Signup</Link>
            </p>
            <button type="submit" className="btn btn-success w-full sm:w-auto">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
