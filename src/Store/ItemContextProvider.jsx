import React, { useContext, useState } from "react";
import itemContext, { jobContext } from "./store";
import jobs from "@/jobs";

export default function ItemContextProvider({ children }) {
  let { jobs } = useContext(jobContext);
  let [items, setItems] = useState(jobs);
  let [filteritems, setFilteritems] = useState(jobs);
  let [keyword, setKeyword] = useState([]);
  let [location, setLocation] = useState([]);
  let [jobtype, setJobtype] = useState([]);
  let [salary, setSalary] = useState("");
  let [user, setUser] = useState(null);

  function applyfilter(keyword, location) {
    console.log(keyword, location);
    let searchItem = jobs.filter((item) => {
      let title = item.title.toLowerCase().includes(keyword.toLowerCase());

      let loc = item.location.toLowerCase().includes(location.toLowerCase());

      return title && loc;
    });
    setFilteritems(searchItem);
  }

  function filterfunc() {
    let newitem = items.filter((item) => {
      console.log(item.employmentType);
      let jobtypeMatch = jobtype.length
        ? jobtype.includes(item.employmentType)
        : true;
      let locationMatch = location.length
        ? location.includes(item.location)
        : true;

      let salaryMatch = salary ? item.salary > salary : true;
      console.log(salary);
      console.log(keyword);
      console.log(items);

      let keywordMatch1 = keyword.length
        ? keyword.some((el) => item.keyword.includes(el))
        : true;
      return jobtypeMatch && salaryMatch && locationMatch && keywordMatch1;
    });
    setFilteritems(newitem);
  }

  return (
    <itemContext.Provider
      value={{
        user,
        setUser,
        items,
        setItems,
        filteritems,
        setFilteritems,
        applyfilter,
        keyword,
        setKeyword,
        location,
        setLocation,
        jobtype,
        setJobtype,
        salary,
        setSalary,
        filterfunc,
      }}
    >
      {children}
    </itemContext.Provider>
  );
}
