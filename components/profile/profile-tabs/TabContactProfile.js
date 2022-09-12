import React from "react";
import {
  CalendarIcon,
  MailIcon,
  PencilAltIcon,
  PencilIcon,
  PhoneIcon,
} from "@heroicons/react/outline";

const TabContactProfile = () => {
  return (
    <>
      <div className="bg-white rounded-xl  p-10">
        <div className="flex items-center justify-between">
          <div className="font-extrabold mb-5">Contect Information</div>
          <a href="" className="hover:text-indigo-400">
            <PencilAltIcon className="h-5 w-5 underline" />
          </a>
        </div>
        <div className="p-2 grid grid-cols-1">
          <div className="font-bold flex flex-col gap-4">
            <div className="flex items-center gap-3 my-4">
              <MailIcon className="h-5 w-5" />
              <div className="hover:underline">abc123@gmail.com</div>
            </div>
            <div className="border-1"></div>
            <div className="flex items-center gap-3 my-4">
              <PhoneIcon className="h-5 w-5" />
              <a href="" className="hover:underline">
                +1 844-962-2802
              </a>
            </div>
            <div className="border-1"></div>
            <div className="flex items-center gap-3 my-4">
              <CalendarIcon className="h-5 w-5" />
              <div className="">25-August-1998</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabContactProfile;
