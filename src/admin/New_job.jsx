import Navbar from "@/Homepage/Navbar";
import useGetAllCompany from "@/hooks/useGetAllCompany";
import { companyContext, jobContext } from "@/Store/store";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const New_job = ({ setNewJobFlag }) => {
  let navigate = useNavigate();
  let { company, setCompany } = useContext(companyContext);
  let { jobs, setJobs } = useContext(jobContext);

  // Loading state for the submit button
  const [loading, setLoading] = useState(false);

  const [Input, setInput] = useState({
    title: "",
    description: "",
    companyId: "",
    location: "",
    requirements: "",
    salary: null,
    position: "",
    jobType: "",
    experience: null,
  });

  let handelEventChange = (e) => {
    setInput({ ...Input, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  let handelSelectChange = (e) => {
    let value = e.target.value.toLowerCase();
    const selectCompany = company.find(
      (item) => item.name.toLowerCase() === value
    );
    setInput({ ...Input, companyId: selectCompany._id });
    console.log(Input);
  };

  let handelSubmit = async (e) => {
    e.preventDefault();
    // Set loading to true to show spinner
    setLoading(true);

    try {
      let res = await axios.post(`${JOB_API_END_POINT}/post`, Input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/admin/job");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      // Set loading to false after the request is done
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-black backdrop-blur-sm fixed inset-0 flex justify-center items-center bg-opacity-50 transition-opacity duration-300 ease-linear opacity-100">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-2xl">Post a New Job!</h3>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setNewJobFlag(false)}
            >
              <ImCross size={20} />
            </button>
          </div>

          <form className="space-y-3" onSubmit={handelSubmit}>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="Job Title"
                  name="title"
                  value={Input.title}
                  onChange={handelEventChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={Input.description}
                  onChange={handelEventChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <input
                  type="number"
                  placeholder="Salary"
                  name="salary"
                  value={Input.salary}
                  onChange={handelEventChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <input
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={Input.location}
                  onChange={handelEventChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="Job Type"
                  name="jobType"
                  value={Input.jobType}
                  onChange={handelEventChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <input
                  type="number"
                  placeholder="Experience"
                  name="experience"
                  value={Input.experience}
                  onChange={handelEventChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="Position"
                  name="position"
                  value={Input.position}
                  onChange={handelEventChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label htmlFor="company"></label>
                <select
                  className="custom-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                  onChange={handelSelectChange}
                >
                  <option value="" disabled selected hidden>
                    Select a company
                  </option>
                  {company.map((item) => (
                    <option value={item.name} key={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="px-2">
              <input
                type="text"
                placeholder="Requirements"
                name="requirements"
                value={Input.requirements}
                onChange={handelEventChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="text-right mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200"
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200"
                    disabled={loading} // Disable button when loading
                  >
                    {loading ? (
                      <div className="flex justify-center items-center w-6 h-6 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin">
                        {/* Smaller spinner with smoother transition */}
                        <div className="w-4 h-4 border-4 border-t-4 border-transparent border-t-white rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      "Post"
                    )}
                  </button>
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default New_job;
