import React, { useContext, useState } from "react";
import Navbar from "../Homepage/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import useGetJobById from "@/hooks/useGetJobById";
import { jobContext } from "@/Store/store";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

export default function JobDescription() {
  let navigate = useNavigate();
  let params = useParams();
  let { singleJob, setSingleJob } = useContext(jobContext);
  let [isApplied, setIsApplied] = useState(false);
  console.log(singleJob);
  useGetJobById(params);
  let handelClick = async () => {
    try {
      let res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${params.id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsApplied(true);
  };
  return (
    <>
      <div className="pt-3 px-20">
        <h1 className="text-3xl font-semibold">{singleJob.title}</h1>
        <div className="space-x-4 mt-4 flex justify-between">
          <div className="flex gap-x-5 pb-5">
            <span className="inline-flex items-center bg-blue-200 text-blue-700 font-semibold text-xs px-3 py-1 rounded-full">
              {singleJob.salary}
            </span>

            <span className="inline-flex items-center bg-green-200 text-green-700 font-semibold text-xs px-3 py-1 rounded-full">
              Full Time
            </span>

            <span className="inline-flex items-center bg-yellow-200 text-yellow-700 font-semibold text-xs px-3 py-1 rounded-full">
              mid level
            </span>
          </div>
          <div className="flex gap-x-10">
            <button
              disabled={isApplied}
              onClick={isApplied ? null : handelClick}
              className={` text-white bg-gradient-to-r from-blue-600 to-blue-500 h-12 w-36 rounded-md hover:bg-green-800 ${
                isApplied ? "bg-red cursor-not-allowed" : true
              }`}
            >
              {isApplied ? "Applied" : "Apply"}
            </button>
            <button className="text-white bg-gradient-to-r from-blue-600 to-blue-500 h-12 w-36 rounded-md"
            
            onClick={()=>navigate('/job')}
            
            >
              Back
            </button>
          </div>
        </div>
        <h1 className="h-8 w-full  border-black border-b-2">Job Description</h1>
        <div>
          <h3 className="font-semibold text-xl">Role: {singleJob.title}</h3>
          <h3 className="font-semibold text-xl">
            Location:{singleJob.location}
          </h3>
          <h3 className="font-semibold text-xl">
            Description:{singleJob.description}
          </h3>
          <h3 className="font-semibold text-xl">
            Experience:{singleJob.experienceLevel}year
          </h3>
          <h3 className="font-semibold text-xl">Salary:{singleJob.salary}</h3>

          <h3 className="font-semibold text-xl">
            posted Date:{singleJob.postedDate}
          </h3>
        </div>
      </div>
    </>
  );
}
