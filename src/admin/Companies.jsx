import Navbar from "@/Homepage/Navbar";
import useGetCOmpanyById from "@/hooks/useGetCOmpanyById";
import { companyContext } from "@/Store/store";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function Companies({ closemodel }) {
  let navigate = useNavigate();
  let { singlecompany, setSingleCompany } = useContext(companyContext);
  let params = useParams();
  useGetCOmpanyById(params.id);
  let [company, setCompany] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: "",
  });
  let [loading, setLoading] = useState(false); // Manage loading state

  function handelClick() {
    closemodel();
  }

  function handelEventChange(e) {
    setCompany({ ...company, [e.target.name]: e.target.value });
  }

  function handelFileChange(e) {
    setCompany({ ...company, file: e.target.files?.[0] });
  }

  let handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form

    let formData = new FormData();
    formData.append("name", company.name);
    formData.append("description", company.description);
    formData.append("website", company.website);
    formData.append("location", company.location);
    formData.append("profilePic", company.file);

    try {
      let res = await axios.put(
        `${ADMIN_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companytable");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the company.");
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  useEffect(() => {
    setCompany({
      name: singlecompany.name,
      description: singlecompany.description,
      website: singlecompany.description,
      location: singlecompany.location,
      file: singlecompany.logo,
    });
  }, [params.id, singlecompany]);

  return (
    <>
      <Navbar />
      <div
        className="right-0 left-0 top-0 bottom-0 fixed bg-grayCustom"
        onClick={handelClick}
      ></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[35rem] h-[24rem] rounded-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Company Setup</h1>
          <RxCross2
            style={{ color: "black", fontSize: "25px", fontWeight: "bold" }}
            onClick={handelClick}
          />
        </div>
        <form onSubmit={handelSubmit}>
          <div className="flex flex-wrap px-6">
            <div className="mt-4">
              <label for="company" className="block font-semibold">
                Company Name
              </label>
              <input
                type="text"
                placeholder="company name "
                name="name"
                value={company.name}
                onChange={handelEventChange}
                id="company"
                className="border-2 rounded-md h-10 px-3 mt-1 w-[14rem]"
              />
            </div>

            <div className="mt-4 ml-6">
              <label for="des" className="block font-semibold">
                Description
              </label>
              <input
                type="text"
                placeholder="Description "
                name="description"
                value={company.description}
                onChange={handelEventChange}
                id="des"
                className="border-2 rounded-md h-10 px-3 mt-1 w-[14rem]"
              />
            </div>

            <div className="mt-4">
              <label for="Web" className="block font-semibold">
                Website
              </label>
              <input
                type="text"
                placeholder="Enter url "
                name="website"
                value={company.website}
                onChange={handelEventChange}
                id="Web"
                className="border-2 rounded-md h-10 px-3 mt-1 w-[14rem]"
              />
            </div>

            <div className="mt-4 ml-6">
              <label for="location" className="block font-semibold">
                Location
              </label>
              <input
                type="text"
                placeholder="company name "
                name="location"
                id="location"
                value={company.location}
                onChange={handelEventChange}
                className="border-2 rounded-md h-10 px-3 mt-1 w-[14rem]"
              />
            </div>

            <div className="mt-4">
              <label for="company" className="block font-semibold">
                Logo
              </label>
              <input
                type="file"
                accept="image/*"
                placeholder="company name "
                name="file"
                onChange={handelFileChange}
                id="logo"
                className="border-2 rounded-md h-10 px-3 mt-1 w-[14rem]"
              />
            </div>
            <button
              type="submit"
              disabled={loading} // Disable the button while loading
              className={`w-full h-12 mt-4 rounded-md font-bold flex justify-center items-center transition-all duration-300 ease-in-out ${
                loading ? "bg-gray-400" : "bg-coral hover:bg-coral-dark"
              } `}
            >
              {loading ? (
                <svg
                  className="w-6 h-6 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="none"
                    d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
                  ></path>
                </svg>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
