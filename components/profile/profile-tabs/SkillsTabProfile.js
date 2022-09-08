import React from "react";
import {
  CalendarIcon,
  MailIcon,
  PencilIcon,
  PhoneIcon,
} from "@heroicons/react/outline";

const SkillsTabProfile = () => {
  return (
    <div className="bg-white rounded-xl  px-5 pb-5">
      <div className="flex gap-10">
        <div className="grid grid-cols-3 gap-12 font-bold p-5">
          <div className="">HTML</div>
          <div className="">Css</div>
          <div className="">Tailwind</div>
          <div className="">Bootstrap</div>
          <div className="">Ruby On Rails</div>
          <div className="">React js</div>
          <div className="">React Native</div>
        </div>
        <a href="" className="flex ml-auto gap-1 p-5 text-indigo-400 underline">
          Edit
          <PencilIcon className="h-4 w-4 underline" />
        </a>
      </div>
    </div>
  );
};

export default SkillsTabProfile;
