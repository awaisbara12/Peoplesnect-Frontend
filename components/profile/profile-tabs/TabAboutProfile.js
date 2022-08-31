import React from "react";
import {
  CalendarIcon,
  MailIcon,
  PencilIcon,
  PhoneIcon,
} from "@heroicons/react/outline";

const TabAboutProfile = () => {
  return (
    <div className="bg-white rounded-b-xl mt-3">
      <div className="flex gap-10">
        <div className="border-x h-40 rounded-b-full w-36 ml-10 mb-5"></div>
        <div className="grid grid-cols-1">
          <div className="">
            <div className="flex items-center gap-3 my-4">
              <MailIcon className="h-5 w-5" />
              <div className="hover:underline">abc123@gmail.com</div>
            </div>
            <hr />
            <div className="flex items-center gap-3 my-4">
              <PhoneIcon className="h-5 w-5" />
              <a href="" className="hover:underline">
                +1 844-962-2802
              </a>
            </div>
            <hr />
            <div className="flex items-center gap-3 my-4">
              <CalendarIcon className="h-5 w-5" />
              <div className="">25-August-1998</div>
            </div>
          </div>
        </div>
        <a href="" className="flex ml-auto gap-1 p-5 text-blue-500 underline">
          Edit
          <PencilIcon className="h-4 w-4 underline" />
        </a>
      </div>
    </div>
  );
};

export default TabAboutProfile;
