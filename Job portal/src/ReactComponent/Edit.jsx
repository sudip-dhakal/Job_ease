import React, { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import Button from "./Button1";
import itemContext from "@/Store/store";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Edit = ({ setShowEdit }) => {
  let navigate = useNavigate();
  let { user } = useContext(itemContext);

  let [input, setInput] = useState({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    bio: user.profile.bio,
    skills: user.profile.skills,
    files: user.profile.resume,
  });
  let handelEventChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  let handelFileChange = (e) => {
    setInput({ ...input, files: e.target.files?.[0] });
  };
  let handelSubmit = async (e) => {
    console.log(input);
    e.preventDefault();
    let formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    formData.append("resume", input.files);
    try {
      let res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log(res);
        toast.success(res.data.message);
        setShowEdit(false);
      }
    } catch (error) {
      toast.error(res.data.message);
    }
  };

  let handleUpdate = (e) => {
    e.preventDefault();
    if (validate()) {
      handleClear();
      setShowEdit(false);
    }
  };

  return (
    <>
      <div className="bg-black backdrop-blur-sm fixed inset-0 flex justify-center items-center bg-opacity-30 transition-opacity duration-300 ease-linear opacity-100">
        <div className="w-[50%] ml-auto mr-auto text-black bg-white rounded-[20px] p-8 shadow-lg">
          <div className="flex justify-between mb-6">
            <h1 className="font-bold text-2xl">Update Profile</h1>
            <p className="cursor-pointer">
              <ImCross onClick={() => setShowEdit(false)} />
            </p>
          </div>

          <p className="text-red-700 text-center mb-4">message</p>
          <form onSubmit={handelSubmit}>
            <div className="flex flex-col gap-8">
              <div className="flex justify-between gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-[48%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="fullName"
                  value={input.fullName}
                  onChange={handelEventChange}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-[48%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="email"
                  value={input.email}
                  onChange={handelEventChange}
                />
              </div>
              <div className="flex justify-between gap-4">
                <input
                  type="text"
                  placeholder="Your Phone Number"
                  className="w-[48%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={handelEventChange}
                />
                <input
                  type="text"
                  placeholder="Your Bio"
                  className="w-[48%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="bio"
                  value={input.bio}
                  onChange={handelEventChange}
                />
              </div>

              <input
                type="text"
                placeholder="Your Skills"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="skills"
                value={input.skills}
                onChange={handelEventChange}
              />

              <div className="flex flex-col">
                <label className="font-semibold mb-2">Upload Resume</label>
                <input
                  type="file"
                  accept="image/*"
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={handelFileChange}
                />
              </div>
              <div className="flex justify-between">
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
