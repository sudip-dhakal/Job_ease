import Navbar from "@/Homepage/Navbar";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CompanyModel from "./Companies";
import useGetAllCompany from "@/hooks/useGetAllCompany";

export default function CreateCompany() {
  let [companyModel, setcompanyModel] = useState(false);
  function closemodel() {
    setcompanyModel(false);
  }
  function handleCompanyModel() {
    setcompanyModel(true);
  }

  let navigate = useNavigate();
  let [companyName, setCompanyName] = useState("");
  function handelEventChange(e) {
    setCompanyName(e.target.value);
  }
  let handelSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${ADMIN_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        let company_id = res.data.company._id;
        navigate(`/admin/companies/${company_id}`);
        toast.success(res.data.message);
      }
    } catch (error) {}
  };
  useGetAllCompany();
  return (
    <>
      <Navbar />
      <div className="px-36 mt-20 ">
        <h1 className="text-2xl font-bold">Your Company Name</h1>
        <h3>
          What you would like to Give your company name?you can chnage this
          later.
        </h3>
        <div className="mt-6">
          <form onSubmit={handelSubmit}>
            <label for="companyName" className="block font-semibold">
              Company Name
            </label>
            <input
              type="text"
              placeholder="jobHunt,Google etc"
              value={companyName}
              onChange={handelEventChange}
              name="companyName"
              id="companyName"
              className="h-10 w-full border-2 border-black rounded-md p-3 block"
              required
            ></input>
            <div className="mt-4">
              <button className="h-8 w-24 bg-slate-500 rounded-md ">
                Cancel
              </button>
              <button
                type="submit"
                className="h-8 w-24 bg-coral ml-5 rounded-md"
              >
                Continue
              </button>
            </div>
          </form>
          {companyModel && <CompanyModel closemodel={closemodel} />}
        </div>
      </div>
    </>
  );
}
