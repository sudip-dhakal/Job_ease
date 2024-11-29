import { jobContext } from "@/Store/store";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useContext, useEffect } from "react";

export default function useGetJobById(params) {
  let { singleJob, setSingleJob } = useContext(jobContext);
  useEffect(() => {
    let fetcedJobById = async () => {
      try {
        let res = await axios.get(`${JOB_API_END_POINT}/get/${params.id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setSingleJob(res.data.job);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetcedJobById();
  }, [params.id]);
  return <></>;
}
