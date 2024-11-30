import Navbar from "@/Homepage/Navbar";
import { ApplicationContext } from "@/Store/store";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { GiCheckMark } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useParams } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDots } from "react-icons/bs";
let shortListingStatus = ["Accepted", "Rejected"];

const Applicants = () => {
  let params = useParams();
  let { applicants, setApplicants } = useContext(ApplicationContext);
  useEffect(() => {
    let FetchedApplicants = async () => {
      try {
        let res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setApplicants(res.data.job.applications);
          console.log(res.data.job.applications);
        }
      } catch (error) {
        console.log(error);
      }
    };
    FetchedApplicants();
  }, []);

  let handleStatus = async (status, id) => {
    try {
      let res = await axios.put(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="">
        <Navbar />
        <div className="mt-24 w-[80%] ml-auto mr-auto">
          <h2 className="font-bold text-xl">
            Applicants ( {applicants.length} )
          </h2>
          <div className="">
            <table className="p-1 text-center mt-10 w-full">
              <thead>
                <tr>
                  <th className="border-b border-black border-solid">ID</th>
                  <th className="border-b border-black border-solid">
                    Full Name
                  </th>
                  <th className="border-b border-black border-solid">Email</th>
                  <th className="border-b border-black border-solid">
                    Contact
                  </th>
                  <th className="border-b border-black border-solid">Resume</th>
                  <th className="border-b border-black border-solid">Date</th>
                  <th className="border-b border-black border-solid">Action</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((items, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b-[0.5px] border-dotted border-black"
                    >
                      <td className="p-1">{items._id}</td>
                      <td className="p-1">{items.applicant.fullName}</td>
                      <td className="p-1">{items.applicant.email}</td>
                      <td className="p-1">9845344218</td>
                      <td className="p-1">resume</td>
                      <td className="p-1">{items.applicant.createdAt}</td>
                      <td className="p-1">
                        <div>
                          <Popover>
                            <PopoverTrigger>
                              <BsThreeDots />
                            </PopoverTrigger>
                            <PopoverContent className="w-24 mt-2">
                              {shortListingStatus.map((status, index) => {
                                return (
                                  <>
                                    <button
                                      value={status}
                                      onClick={() =>
                                        handleStatus(status, items._id)
                                      }
                                    >
                                      {status}
                                    </button>
                                  </>
                                );
                              })}
                            </PopoverContent>
                          </Popover>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Applicants;
