import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Homepage/Navbar";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

// Replace this with your actual logo file path

export default function SignupForm() {
  let navigate = useNavigate();
  let [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    profilePic: "",
  });

  function handelEventChange(e) {
    console.log(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  function handelFileChange(e) {
    console.log(e.target.value);
    setInput({ ...input, file: e.target.files?.[0] });
  }
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    let formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("profilePic", input.file);
    }
    console.log(formData);

    try {
      let res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        console.log(res);
        navigate("/login");

        toast.success(res.data.message);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error();
    }
  };
  return (
    <>
      <Navbar />
      <div className="mt-20 h-auto w-[40%] border-2 m-auto px-8 shadow-lg p-8 bg-white rounded-lg">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img src="./image/logo.png" alt="Logo" className="h-16 w-16" />
        </div>

        <h1 className="text-center font-bold text-3xl mb-6">SIGNUP</h1>

        <form onSubmit={handelSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold text-md">
              Full Name:
            </label>
            <input
              className="block h-10 w-full border-slate-400 border-2 rounded-md p-3"
              type="text"
              placeholder="Enter your full name"
              value={input.fullName}
              onChange={handelEventChange}
              id="name"
              name="fullName"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="Email" className="block font-semibold text-md">
              Email:
            </label>
            <input
              className="block h-10 w-full border-slate-400 border-2 rounded-md pl-3"
              type="email"
              placeholder="Enter your email"
              id="Email"
              name="email"
              value={input.email}
              onChange={handelEventChange}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="ph" className="block font-semibold text-md">
              Phone Number:
            </label>
            <input
              className="block h-10 w-full border-slate-400 border-2 rounded-md pl-3"
              type="tel"
              placeholder="Enter your phone number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handelEventChange}
              id="ph"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="pwd" className="block font-semibold text-md">
              Password:
            </label>
            <input
              className="block h-10 w-full border-slate-400 border-2 rounded-md pl-3"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={input.password}
              onChange={handelEventChange}
              id="pwd"
              required
            />
          </div>

          {/* Profile Picture */}
          <div className="mb-4">
            <label htmlFor="picture" className="block font-semibold text-md">
              Profile Picture:
            </label>
            <input
              className="block h-10 w-full border-slate-400 border-2 rounded-md pl-3"
              type="file"
              accept="image/*"
              onChange={handelFileChange}
              id="picture"
            />
          </div>

          {/* Role Selection */}
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
            <label htmlFor="recruiter" className="font-semibold text-md">
              Recruiter
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="h-12 w-full bg-coral text-white rounded-md font-semibold hover:bg-orange-500 active:bg-orange-800 transition-all"
          >
            SIGNUP
          </button>
        </form>
      </div>
    </>
  );
}
