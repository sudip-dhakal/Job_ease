import itemContext from "@/Store/store";
import React, { useContext, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  let { filter, setFilter, applyfilter } = useContext(itemContext);
  let location = useRef("");
  let keyword = useRef("");
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    let loc = location.current.value;
    let keyw = keyword.current.value;
    applyfilter(keyw, loc);
    navigate("/browse");
  }

  return (
    <>
      <div className="min-h-screen w-[100%] bg-hero-pattern bg-cover relative flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

        <div className="ml-24 z-10 p-10 text-offWhite space-y-6 max-w-2xl">
          <h1 className="text-6xl font-bold leading-tight">
            Find Your Dream Job
          </h1>
          <h2 className="text-2xl font-light">
            Thousands of jobs are available for you
          </h2>

          <div className="flex mt-6 w-auto outline-black">
            <form className="flex" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter keyword"
                className="h-16 w-72 rounded-l-lg bg-darkGray text-black pl-4 border-r-2 border-solid border-gray-700 outline-none   text-[20px]"
                name="keyword"
                ref={keyword}
              />
              <input
                type="text"
                placeholder="Enter location"
                className="h-16 w-72 bg-white pl-4 border-none outline-none  text-black text-[20px]"
                name="location"
                ref={location}
              />
              <button
                type="submit"
                className="h-16 w-16 flex items-center justify-center bg-gray-500 rounded-r-lg hover:bg-slate-400 "
              >
                <FaSearch className="text-white text-xl" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
