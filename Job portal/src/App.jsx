import React, { useEffect } from "react";

import Hero from "./Homepage/Hero";
import Category from "./Homepage/Category";
import JobListing from "./Homepage/JobListing";
import Footer from "./Homepage/Footer";
import Navbar from "./Homepage/Navbar";
import { useNavigate } from "react-router-dom";
import useGetAlljob from "./hooks/useGetAlljob";

export default function App() {
  let navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/admin/companies");
  // });
  useGetAlljob();
  return (
    <>
      <Navbar />
      <Hero />
      <Category />
      <JobListing />

      <Footer />
    </>
  );
}
