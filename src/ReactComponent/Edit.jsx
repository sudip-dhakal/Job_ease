import React, { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import itemContext from "@/Store/store";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const Edit = ({ setShowEdit }) => {
  let { user } = useContext(itemContext);
  let formData = new FormData();


  console.log(user)
  const skillSet = [
    "Python",
    "Ruby",
    "JavaScript",
    "HTML",
    "CSS",
    "Node JS",
    "Django",
    "React",
    "Angular",
    "Vue",
    "Flask",
  ];

  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    bio: user.profile.bio,
    skills: user.profile.skills,
    files: user.profile.resume,
    profilePic: user.profile.profilePic,
  });

  const handelEventChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handelFileChange = (e) => {
    setInput({ ...input, files: e.target.files?.[0] });
  };

  const handleSkillChange = (e) => {
    const selectedSkills = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSkills([...skills, ...selectedSkills]);
  };

  const handleSkillRemove = (skillToRemove) => {
    const updatedSkills = skills.filter((item) => item !== skillToRemove);
    setSkills(updatedSkills);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", skills);
    formData.append("resume", input.files);

    try {
      const res = await axios.put(
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
        toast.success(res.data.message);
        setShowEdit(false);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Full-Screen Container */}
      <div className="w-full h-full bg-white rounded-lg shadow-lg p-6 relative overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-xl font-bold">Update Profile</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setShowEdit(false)}
          >
            <ImCross />
          </button>
        </div>

        <form onSubmit={handelSubmit} className="space-y-6">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your name"
                value={input.fullName}
                onChange={handelEventChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={input.email}
                onChange={handelEventChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={input.phoneNumber}
                onChange={handelEventChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Bio</label>
              <input
                type="text"
                name="bio"
                placeholder="Tell us about yourself"
                value={input.bio}
                onChange={handelEventChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Your Skills
            </label>
            <select
              id="skills"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              multiple
              onChange={handleSkillChange}
              value={skills}
            >
              {skillSet.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="flex flex-wrap mt-3 gap-2">
              {skills.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-full"
                >
                  <span>{item}</span>
                  <ImCross
                    size={14}
                    className="cursor-pointer"
                    onClick={() => handleSkillRemove(item)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Resume
            </label>
            <input
              type="file"
              accept="application/pdf"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              onChange={handelFileChange}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
