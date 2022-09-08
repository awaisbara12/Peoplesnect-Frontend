import React from "react";
import {
  CalendarIcon,
  MailIcon,
  PencilIcon,
  PhoneIcon,
} from "@heroicons/react/outline";

const TabContactProfile = () => {
  return (
    <>
      <div className="bg-white rounded-xl  px-5 pb-5">
        <div className="flex gap-10">
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
          <a
            href=""
            className="flex ml-auto gap-1 p-5 text-indigo-400 underline"
          >
            Edit
            <PencilIcon className="h-4 w-4 underline" />
          </a>
        </div>
      </div>
    </>
  );
};

export default TabContactProfile;
