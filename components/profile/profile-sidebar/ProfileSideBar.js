import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import React from "react";

const ProfileSideBar = () => {
  return (
    <div>
      <div className="">
        <div className="mt-8 mx-auto bg-white rounded-xl w-full h-auto p-4">
          <div className="flex justify-between font-light text-sm  border-b-1 pb-4">
            <div className="">Edit Public Profile & URL</div>
            <QuestionMarkCircleIcon className="w-7 h-7 text-indigo-400" />
          </div>
          <div className="flex justify-between font-light text-sm mt-4">
            <div className="">Add profile in another Language</div>
            <QuestionMarkCircleIcon className="w-7 h-7 text-indigo-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
