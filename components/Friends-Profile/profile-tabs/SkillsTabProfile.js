import React from "react";
import { ChevronRightIcon, PencilAltIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";

const SkillsTabProfile = () => {
  return (
    <div className="bg-white rounded-xl p-10">
      <div className="flex items-center justify-between mb-5">
        <div className="font-extrabold ">Skills</div>
        <div className="flex ml-auto gap-2">
          <a href="">
            <PlusCircleIcon className="h-5 w-5 hover:text-indigo-400" />
          </a>
          <a href="">
            <PencilAltIcon className="h-5 w-5 hover:text-indigo-400" />
          </a>
        </div>
      </div>
      <div className="font-bold uppercase px-2">
        <div className="flex flex-col">
          <div className="border-b-1 py-5">HTML</div>
          <div className="border-b-1 py-5 ">Css</div>
          <div className="border-b-1 py-5">Tailwind</div>
          <div className="border-b-1 py-5">Bootstrap</div>
          <div className="border-b-1 py-5">Ruby On Rails</div>
        </div>
        <div className="flex justify-center items-center mt-10">
          Show All Skills
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default SkillsTabProfile;
