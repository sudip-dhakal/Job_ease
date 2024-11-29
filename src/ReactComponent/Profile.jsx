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
  console.log(user);
  useGetAppliedJob();

  return (
    <>
      <div className="w-[70%] mt-10 ml-auto mr-auto  p-4">
        <div className=" shadow-lg rounded-[10px] p-4 ">
          <div className="flex items-center ">
            <img
              src="../../Public/image/userProfile.png"
              className="w-[5%] h-[5%] ml-10"
            />

            <span className="ml-6">
              <h1 className="font-semibold text-xl ">{user.fullName}</h1>
              <p className=" text-[1rem]">{user.profile.bio}</p>
            </span>
            <MdEdit
              onClick={() => setShowEdit(true)}
              size={30}
              className="cursor-pointer ml-auto"
            />
          </div>

          <div className="ml-11 mt-4 flex-col gap-20">
            <p className="flex gap-5 mb-2">
              <span>
                <SiGmail size={20} className="relative top-[0.1rem]" />{" "}
              </span>
              <span>{user.email}</span>
            </p>

            <p className="flex gap-5">
              <span>
                <FaPhoneAlt size={20} />
              </span>{" "}
              <span> {user.phoneNumber}</span>
            </p>
          </div>

          <div className="ml-11 mt-10">
            <h3
              className="font-semibold
           text-[1rem]"
            >
              Skills
            </h3>
            <div className="flex gap-5">
              {user.profile.skills.map((item) => (
                <Skillset name={item} />
              ))}
            </div>
            <h1 className="font-semibold">Resume</h1>
            <a
              href="resumeOriginalName
"
            >
              {user.profile.resume}
            </a>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="font-bold">Applied Jobs</h1>
          <table className="mt-4 w-[70%] p-4  text-center">
            <thead>
              <tr>
                <th>Date</th>
                <th>Job Role</th>
                <th>Company</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="">
              {appliedJob.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-dashed border-black"
                  >
                    <td className="px-4 py-2">{item.job.createdAt}</td>
                    <td className="px-4 py-2">{item.job.title}</td>
                    <td className="px-4 py-2">{item.job.company.name}</td>
                    <td className="p-1">
                      <Skillset name={item.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>{showEdit && <Edit setShowEdit={setShowEdit} />}</div>
    </>
  );
};

export default Profile;
