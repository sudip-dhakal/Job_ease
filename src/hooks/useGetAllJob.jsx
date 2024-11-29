import { jobContext } from "@/Store/store";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { toast } from "sonner";

export default function useGetAlljob() {
  let { jobs, setJobs } = useContext(jobContext);
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
