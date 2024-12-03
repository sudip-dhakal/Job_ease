import React, { useState } from "react";
import Skillset from "./Skillset";

const AdditionalInformation = () => {
  const [skills, setSkills] = useState([]);
  const [resume, setResume] = useState(null);
  const formData = new FormData();

  let skillSet = [
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

  let handleFileUpload = (e) => {
    setResume(e.target?.files[0]);
  };

  let handleSubmit = () => {
    formData.append("selectedSkills", skills);
    if (resume) {
      formData.append("resume", resume);
    }
  };

  let handleSkillChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    let skillSelection = [...selectedOptions, ...skills];
    let newSkills = [...new Set(skillSelection)];
    setSkills(newSkills);
  };

  let handleSkip = () => {};

  return (
    <div>
      <div className="bg-gray-100 p-8 rounded-md shadow-lg max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Additional Information
        </h1>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="Skills"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Enter Skill
            </label>
            <select
              className="border border-gray-700 w-[50%] text-center p-2 border-none overflow-visible"
              id="skill"
              onChange={handleSkillChange}
              multiple
              value={skills}
            >
              {skillSet.map((item, index) => (
                <option
                  key={index}
                  value={item}
                  className=" border-b-2 border-dotted border-gray-700 mb-2"
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h1 className="font-bold text-lg mb-4">Your Skills </h1>
            {skills.map((skill) => {
              return (
                <div className="bg-gray-500 text-white inline px-4 py-2 rounded-md mr-4 cursor-default">
                  {skill}
                </div>
              );
            })}
          </div>

          <div>
            <label
              htmlFor="resume"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Upload Your Resume
            </label>
            <input
              onChange={handleFileUpload}
              type="file"
              id="resume"
              className="block w-full text-gray-800 border border-gray-300 rounded-md p-3 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </form>

        <div className="mt-8">
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-blue-700 px-4 py-2 rounded-md text-white"
              onClick={handleSkip}
            >
              Skip for Now
            </button>
            <button
              type="submit"
              className="bg-blue-700 px-4 py-2 rounded-md text-white"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformation;
