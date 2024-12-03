import React, { useEffect } from "react";

import Hero from "./Homepage/Hero";
import Category from "./Homepage/Category";
import JobListing from "./Homepage/JobListing";
import Footer from "./Homepage/Footer";
import Navbar from "./Homepage/Navbar";
import { useNavigate } from "react-router-dom";
import useGetAlljob from "./hooks/useGetAlljob.jsx";
import Additional_Information from "./ReactComponent/Additional_Information";

export default function App() {
  useGetAlljob();
  return (
    <>
      {/* <Navbar />
      <Hero /> */}
      
      <Additional_Information/>
      
      {/*Exit from here*/}
      {/* <Category /> */}
      {/* <JobListing /> */}

      {/* <Footer /> */}
    </>
  );
}
