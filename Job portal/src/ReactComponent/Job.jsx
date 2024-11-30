import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../Homepage/Navbar";
import { FaSearch } from "react-icons/fa";

import Joblist from "./Jobcard";
import { Slider } from "../components/ui/slider";
import itemContext, { jobContext } from "@/Store/store";

export default function Job() {
  let {
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
  } = useContext(itemContext);
  let { jobs } = useContext(jobContext);

  let [rangeValue, setRangevalue] = useState(0);
  function handleRange(event) {
    setRangevalue(event.target.value);
    setSalary(event.target.value);
  }
  function handleJtypeFilter(event) {
    setJobtype((prevTypes) =>
      prevTypes.includes(event.target.value)
        ? prevTypes.filter((type) => type != event.target.value)
        : [...prevTypes, event.target.value]
    );

    console.log(jobtype);
  }

  function handleLocationFilter(event) {
    setLocation((prevTypes) =>
      prevTypes.includes(event.target.value)
        ? prevTypes.filter((type) => type != event.target.value)
        : [...prevTypes, event.target.value]
    );

    console.log(jobtype);
  }
  function handleKeywordFilter(event) {
    setKeyword((prevTypes) =>
      prevTypes.includes(event.target.value)
        ? prevTypes.filter((type) => type != event.target.value)
        : [...prevTypes, event.target.value]
    );

    console.log(jobtype);
  }

  function handleClear() {
    setKeyword([]);
    setLocation([]);
    setJobtype([]);
    setSalary(0);
  }

  useEffect(() => filterfunc(), [location, keyword, jobtype, salary]);

  return (
    <>
      <Navbar />

      <div className="px-20 mt-20  flex">
        <h1 className="text-2xl font-bold mb-2  fixed ">Find Job</h1>
        <div className="h-screen w-48 mt-8  shadow-md p-6 fixed ">
          <div>
            <h1 className="text-xl font-semibold">Keyword</h1>
            <input
              type="checkbox"
              name="keyword"
              checked={keyword.includes("Python")}
              value="Python"
              id="Python"
              onChange={handleKeywordFilter}
            ></input>
            <label for="Python">Python</label>
          </div>

          <div>
            <input
              type="checkbox"
              name="keyword"
              checked={keyword.includes("AWS")}
              value="AWS"
              id="AWS"
              onChange={handleKeywordFilter}
            ></input>
            <label for="AWS">AWS</label>
          </div>

          <div>
            <input
              type="checkbox"
              name="keyword"
              value="Flutter"
              checked={keyword.includes("Flutter")}
              id="Flutter"
              onChange={handleKeywordFilter}
            ></input>
            <label for="Flutter">Flutter</label>
          </div>

          <div>
            <input
              type="checkbox"
              name="keyword"
              value="SQL"
              checked={keyword.includes("SQL")}
              id="SQL"
              onChange={handleKeywordFilter}
            ></input>
            <label for="SQL">SQL</label>
          </div>

          <h1 className="text-xl font-semibold">Location</h1>

          <div>
            <input
              type="checkbox"
              name="location"
              checked={location.includes("Kathmandu")}
              value="Kathmandu"
              id="Kathmandu"
              onChange={handleLocationFilter}
            ></input>
            <label for="Kathmandu">Kathmandu</label>
          </div>

          <div>
            <input
              type="checkbox"
              name="location"
              checked={location.includes("Bhaktapur")}
              value="Bhaktapur"
              id="Bhaktapur"
              onChange={handleLocationFilter}
            ></input>
            <label for="Bhaktapur">Bhaktapur</label>
          </div>

          <div>
            <input
              type="checkbox"
              name="location"
              value="Chitwan"
              checked={location.includes("Chitwan")}
              id="Chitwan"
              onChange={handleLocationFilter}
            ></input>
            <label for="Chitwan">Chitwan</label>
          </div>

          <h1 className="text-xl mt-2 font-semibold">Job type</h1>
          <div>
            <input
              type="checkbox"
              name="jtype"
              checked={jobtype.includes("Full-time")}
              value="Full-time"
              id="fulltime"
              onChange={handleJtypeFilter}
            ></input>
            <label for="fulltime">Full time</label>
          </div>

          <div>
            <input
              type="checkbox"
              name="jtype"
              checked={jobtype.includes("Part-time")}
              value="Part-time"
              id="parttime"
              onChange={handleJtypeFilter}
            ></input>
            <label for="parttime">Part time</label>
          </div>

          <div>
            <input
              type="checkbox"
              name="jtype"
              checked={jobtype.includes("Remote")}
              value="Remote "
              id="remote"
              onChange={handleJtypeFilter}
            ></input>
            <label for="remote">Remote</label>
          </div>

          <div>
            <input
              type="checkbox"
              name="jtype"
              checked={jobtype.includes("Freelance")}
              value="Freelance"
              id="freelance"
              onChange={handleJtypeFilter}
            ></input>
            <label for="freelance">Freelance</label>
          </div>
          <h1 className="block text-xl font-semibold mt-4">Salary</h1>
          <div className="mt-4">
            <h1 className="h-5 text-xl ">{rangeValue}</h1>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="1000"
              value={rangeValue}
              onChange={handleRange}
              className="h-10 w-full bg-black text-2xl"
            />
          </div>
          <div>
            <button
              className="text-center bg-coral h-10 w-24 rounded-md hover:bg-orange-400"
              onClick={handleClear}
            >
              Clear Filter
            </button>
          </div>
        </div>

        <div className="ml-48 flex flex-wrap">
          {jobs.map((item) => (
            <Joblist item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
