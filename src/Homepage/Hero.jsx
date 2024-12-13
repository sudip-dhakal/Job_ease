import React from "react";
import Login from "../ReactComponent/Login";
import SignupForm from "../ReactComponent/SignupForm";
import { useNavigate } from "react-router-dom";
import { Navigation } from "lucide-react";

const Hero = () => {
  let Navigate = useNavigate();
  return (
    <div className="bg-[#EAEAEA] w-full h-screen  flex items-center p-2">
      <div className="mx-auto flex  justify-between ">
        <div>
          <img
            src="./image/search.png"
            alt="Search Icon"
            className="relative left-[-200px] w-[80%]"
          />
        </div>
        <div className="text-center mt-[100px] relative left-[-110px]">
          <h1 className="text-5xl font-bold mb-4 text-left">
            Find your dream job
          </h1>
          <p className="text-lg mb-6">Thousands of Jobs are around YOU</p>
          <p>You are just away from one click !!!</p>
          <div className="flex space-x-6 mt-10 justify-center">
            <button
              onClick={() => Navigate("/login")}
              className="bg-blue-500 hover:bg-blue-700 w-[30%] text-white font-semibold py-3 px-6 rounded hover:scale-125 hover:transition-all hover:duration-300"
            >
              Login
            </button>
            <button
              onClick={() => Navigate("./signup")}
              className="border border-blue-500 w-[30%] hover:bg-blue-500 hover:text-white text-blue-500 font-semibold py-3 px-6 rounded hover:scale-125 hover:transition-all hover:duration-300"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
