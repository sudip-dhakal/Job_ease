import Navbar from "@/Homepage/Navbar";
import React, { useContext, useState } from "react";
import DummyAdminData from "./DummyAdminData";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import New_job from "./New_job";
import useGetAlljob from "@/hooks/useGetAlljob";
import { jobContext } from "@/Store/store";
import useGetAdminJob from "@/hooks/useGetAdminJob";

const Admin_jobs = () => {
  useGetAdminJob();
  let navigate = useNavigate();
  const [dummyData] = useState(DummyAdminData);
  const [newJobFlag, setNewJobFlag] = useState(false);
  let { jobs, setJobs } = useContext(jobContext);
  let { searchName, setSearchName, filter, adminjob, setAdminJob } =
    useContext(jobContext);

  let handleEdit = () => {};

  return (
    <>
      <Navbar />
      <div className="ml-20 mr-20">
        <div className="mt-24 flex justify-between items-center">
          <input
            type="text"
            placeholder="Filter by name"
            className="border border-black border-solid focus:w-[50%] rounded-sm px-2 py-1"
            name="searchName"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Link to="/admin/jobs/create">
            <button
              type="button"
              className="bg-black text-white px-4 py-2 rounded-sm"
              onClick={() => setNewJobFlag(true)}
            >
              New Job
            </button>
          </Link>
        </div>
        <div>
          <table className="mt-8 w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 py-2">
                  {" "}
                  Company Name
                </th>
                <th className="border-b-2 border-gray-300 py-2">Role</th>
                <th className="border-b-2 border-gray-300 py-2">Date</th>
                <th className="border-b-2 border-gray-300 py-2">Action </th>
              </tr>
            </thead>
            <tbody>
              {filter.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="py-4">{item.company.name}</td>
                  <td className="py-4">{item.title}</td>
                  <td className="py-4">{item.updatedAt}</td>
                  <td>
                    <div className="flex justify-center p-3">
                      <button
                        type="button"
                        className="mr-6"
                        onClick={() => navigate("/admin/jobs/create")}
                      >
                        <MdModeEdit size={30} title="Edit" />
                      </button>
                      {/* <button type="button">
                        <MdDeleteForever size={30} />
                      </button> */}
                      <button type="button">
                        <FaEye
                          size={30}
                          title="Applicants"
                          onClick={() =>
                            navigate(`/admin/jobs/${item._id}/apllicants`)
                          }
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {newJobFlag && <New_job setNewJobFlag={setNewJobFlag} />}
      </div>
    </>
  );
};

export default Admin_jobs;
