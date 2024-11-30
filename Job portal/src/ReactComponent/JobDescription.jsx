import React, { useContext, useState } from "react";
import Navbar from "../Homepage/Navbar";
import { useParams } from "react-router-dom";
import useGetJobById from "@/hooks/useGetJobById";
import { jobContext } from "@/Store/store";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

export default function JobDescription() {
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
  };
  return (
    <>
      <div className="pt-3 px-20">
        <h1 className="text-3xl font-semibold">{singleJob.title}</h1>
        <div className="space-x-4 mt-4 flex justify-between">
          <div>
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
          <div>
            <button
              disabled={isApplied}
              onClick={isApplied ? null : handelClick}
              className={`h-12 w-36 bg-green-300 rounded-md hover:bg-green-800 ${
                isApplied ? "bg-red cursor-not-allowed" : true
              }`}
            >
              {isApplied ? "Already applied" : "Apply"}
            </button>
          </div>
        </div>
        <h1 className="h-8 w-full  border-black border-b-2">Job Description</h1>
        <div>
          <h3 className="font-semibold text-xl">Role:</h3>
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
          <h3 className="font-semibold text-xl">Total Applicants:4</h3>
          <h3 className="font-semibold text-xl">
            posted Date:{singleJob.postedDate}
          </h3>
        </div>
      </div>
    </>
  );
}
