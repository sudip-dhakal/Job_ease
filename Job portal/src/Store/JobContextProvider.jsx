import React, { useEffect, useState } from "react";
import { jobContext } from "./store";

export default function JobContextProvider({ children }) {
  let [jobs, setJobs] = useState([]);
  let [singleJob, setSingleJob] = useState([]);
  let [searchName, setSearchName] = useState("");
  let [filter, setFilter] = useState([]);
  let [adminjob, setAdminJob] = useState([]);
  console.log(adminjob);
  useEffect(() => {
    let newarray = adminjob.filter((item) => {
      let newitem = item.title.toLowerCase().includes(searchName);
      return newitem;
    });
    setFilter(newarray);
  }, [searchName, adminjob]);

  return (
    <jobContext.Provider
      value={{
        adminjob,
        setAdminJob,
        jobs,
        setJobs,
        singleJob,
        setSingleJob,
        searchName,
        setSearchName,
        filter,
      }}
    >
      {children}
    </jobContext.Provider>
  );
}
