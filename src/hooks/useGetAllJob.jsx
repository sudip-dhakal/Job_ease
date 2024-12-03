import { jobContext } from "@/Store/store";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useContext, useEffect } from "react";

export default function useGetAlljob() {
  let { setJobs } = useContext(jobContext);
  useEffect(() => {
    let fetchAllJob = async () => {
      try {
        let res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setJobs(res.data.jobs);
        }
      } catch (error) {}
    };
    fetchAllJob();
  }, []);
  return <></>;
}
