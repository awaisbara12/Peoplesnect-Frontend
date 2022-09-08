import {
  CalendarIcon,
  HashtagIcon,
  UserGroupIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import React from "react";

const ProfileUserSidebar = () => {
  return (
    <div>
      <div className="">
        <div className="mt-8 mx-auto bg-white rounded-xl w-full h-auto p-4">
          <div className="flex justify-between font-light text-sm  border-b-1 pb-4">
            <div className="">Groups</div>
            <UserGroupIcon className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
            <div className="">Event</div>
            <CalendarIcon className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
            <div className="">Pages</div>
            <VideoCameraIcon className="w-5 h-5 text-indigo-400" />
          </div>

          <div className="flex justify-between font-light text-sm mt-4">
            <div className="">Explore Hashtags</div>
            <HashtagIcon className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserSidebar;
