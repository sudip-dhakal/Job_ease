import React, { useContext, useState } from "react";
import Navbar from "../Homepage/Navbar";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import itemContext from "../Store/store";

export default function Login() {
  let { user, setUser } = useContext(itemContext);
  let navigate = useNavigate();
  let [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  function handelEventChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  let handelSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      let res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        console.log(res);
        setUser(res.data.user);
        console.log(res);

        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="mt-20 h-auto w-[35%] border-2 m-auto px-8 shadow-lg p-8 rounded-lg bg-white">
        {/* Logo Section */}
        <div className="flex justify-center">
          <img src="./image/logo.png" alt="Logo" className="h-16 w-16 mb-4" />
        </div>

        {/* Heading Section */}
        <h1 className="text-center font-bold text-4xl mb-6 text-navy">Login</h1>

        <form onSubmit={handelSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-semibold text-md text-gray-700"
            >
              Email:
            </label>
            <input
              className="block h-10 w-full border-slate-300 border-2 rounded-md px-4"
              type="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={handelEventChange}
              id="email"
              name="email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block font-semibold text-md text-gray-700"
            >
              Password:
            </label>
            <input
              className="block h-10 w-full border-slate-300 border-2 rounded-md px-4"
              type="password"
              placeholder="Enter your password"
              value={input.password}
              onChange={handelEventChange}
              id="password"
              name="password"
              required
            />
          </div>
          <div className="mb-6 space-x-4">
            <label htmlFor="role" className="block font-semibold text-md mb-2">
              Role:
            </label>
            <input
              type="radio"
              name="role"
              value="user"
              onChange={handelEventChange}
              id="user"
              className="mr-2"
            />
            <label htmlFor="user" className="font-semibold text-md">
              user
            </label>
            <input
              type="radio"
              name="role"
              value="recruiter"
              onChange={handelEventChange}
              id="recruiter"
              className="ml-4 mr-2"
            />
            <label htmlFor="Recruiter" className="font-semibold text-md">
              Recruiter
            </label>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right mb-6">
            <a
              href="#"
              className="text-sm text-navy font-semibold hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="h-12 w-full bg-coral text-white rounded-md font-semibold hover:bg-orange-500 active:bg-orange-600 transition-all duration-200"
          >
            LOGIN
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-700">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-navy font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
