import Navbar from "../Homepage/Navbar";
import Button from "../ReactComponent/Button";
import { BsThreeDots } from "react-icons/bs";
import React, { useContext, useRef, useState } from "react";
import CompanyModel from "./Companies";
import { useNavigate } from "react-router-dom";
import useGetAllCompany from "@/hooks/useGetAllCompany";
import { companyContext } from "@/Store/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CompaniesTable() {
  let { company, searchItem, setSearchItem, filterItem, setFilterItem } =
    useContext(companyContext);
  let navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="px-20 mt-20">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Filter by name"
            name="searchItem"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            id="search"
            className="h-8 w-42 px-3 border-slate-200 border-2 "
          ></input>
          <button
            className="h-12 w-48 bg-coral rounded-md font-semibold hover:bg-red-600"
            onClick={() => navigate("/admin/createcompany")}
          >
            New Company
          </button>
        </div>
        <div className="mt-10">
          <table>
            <tr className="border-b-2 ">
              <th className="w-[30rem] text-left">Logo</th>
              <th className="w-[30rem] text-left">Name</th>
              <th className="w-[30rem] text-left">Date</th>
              <th className="w-[4rem] text-left">Action</th>
            </tr>
            {filterItem.map((item) => {
              return (
                <>
                  <tr className="mt-4">
                    <td className="w-[30rem]">
                      <img
                        src={`${item.logo}`}
                        className="h-12 w-12 mt-1"
                      ></img>
                    </td>
                    <td className="w-[30rem]">{item.name}</td>
                    <td className="w-[30rem]">
                      {item.updatedAt} {item._id}
                    </td>
                    <td className="w-[4rem]">
                      <Popover>
                        <PopoverTrigger>
                          <BsThreeDots />
                        </PopoverTrigger>
                        <PopoverContent className="  bg-cyan">
                          <button
                            onClick={() =>
                              navigate(`/admin/companies/${item._id}`)
                            }
                          >
                            Edit
                          </button>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}
