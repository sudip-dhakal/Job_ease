import React, { useContext, useState } from "react";
import { MdEdit } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import Skillset from "./Skillset";
import lists from "./UserJobAppliedDetails";
import Edit from "./Edit";
import itemContext, { ApplicationContext } from "@/Store/store";
import useGetAppliedJob from "@/hooks/useGetAppliedJob";

const Profile = () => {
  const [userAppliedList, setUserAppliedList] = useState(lists);
  const [showEdit, setShowEdit] = useState(false);
  let { user } = useContext(itemContext);
  let { appliedJob, setAppliedJob } = useContext(ApplicationContext);
  useGetAppliedJob();

  console.log(user);

  return (
    <>
      <div className="w-[70%] mt-10 mx-auto p-6 bg-white shadow-xl rounded-lg">
        <div className="flex items-center mb-6">
          <img
            src="../../Public/image/userProfile.png"
            className="w-16 h-16 rounded-full shadow-md"
            alt="User Profile"
          />
          <div className="ml-6">
            <h1 className="font-bold text-2xl text-gray-800">
              {user.fullName}
            </h1>
            <p className="text-sm text-gray-600">{user.profile.bio}</p>
          </div>
          <MdEdit
            onClick={() => setShowEdit(true)}
            size={30}
            className="cursor-pointer ml-auto text-gray-600 hover:text-blue-500"
          />
        </div>

        <div className="ml-6">
          <p className="flex items-center gap-4 mb-4 text-gray-700">
            <SiGmail size={20} className="text-blue-500" />
            <span>{user.email}</span>
          </p>
          <p className="flex items-center gap-4 text-gray-700">
            <FaPhoneAlt size={20} className="text-green-500" />
            <span>{user.phoneNumber}</span>
          </p>
        </div>

        <div className="mt-6 ml-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {user.profile.skills.map((item) => (
              <Skillset name={item} key={item} />
            ))}
          </div>
          <h3 className="font-semibold mt-4">Resume</h3>
          <a
            href="resumeOriginalName"
            className="text-blue-500 hover:underline"
          >
            {user.profile.resume}
          </a>
        </div>

        <div className="mt-10">
          <h1 className="font-bold text-xl text-gray-800">Applied Jobs</h1>
          <table className="mt-4 w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="p-3">Date</th>
                <th className="p-3">Job Role</th>
                <th className="p-3">Company</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {appliedJob.map((item, index) => (
                <tr key={index} className="bg-gray-50">
                  <td className="p-3 border-b">{item.job.createdAt}</td>
                  <td className="p-3 border-b">{item.job.title}</td>
                  <td className="p-3 border-b">{item.job.company.name}</td>
                  <td className="p-3 border-b">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <Edit setShowEdit={setShowEdit} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
