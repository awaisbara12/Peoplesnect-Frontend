import {
  AtSymbolIcon,
  BellIcon,
  KeyIcon,
  LockClosedIcon,
  LockOpenIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import React from "react";

const MainSettings = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="w-[600px] px-5 md:px-0 lg:px-0">
          <div className="mb-4">
            <div className="heading font-bold">Account Settings</div>
          </div>
          <div className="border hover:bg-gray-50 mt-4 p-4 bg-white hover:shadow-lg rounded-xl">
            <a href="/settings/general-settings">
              <div className="username flex gap-2 text-lg font-medium">
                <AtSymbolIcon className="h-7 w-7" />
                Genral Settings
              </div>
            </a>
          </div>
          <div className="border hover:bg-gray-50 mt-4 p-4 bg-white hover:shadow-lg rounded-xl">
            <a href="">
              <div className="username flex gap-2 text-lg font-medium">
                <BellIcon className="h-7 w-7" />
                Notifications Settings
              </div>
            </a>
          </div>
          <div className="border hover:bg-gray-50 mt-4 p-4 bg-white hover:shadow-lg rounded-xl">
            <a href="">
              <div className="username flex gap-2 text-lg font-medium">
                <UserCircleIcon className="h-7 w-7" />
                Profile Settings
              </div>
            </a>
          </div>
          <div className="border hover:bg-gray-50 mt-4 p-4 bg-white hover:shadow-lg rounded-xl">
            <a href="">
              <div className="username flex gap-2 text-lg font-medium">
                <KeyIcon className="h-7 w-7" />
                Security Settings
              </div>
            </a>
          </div>
          <div className="border hover:bg-gray-50 mt-4 p-4 bg-white hover:shadow-lg rounded-xl">
            <a href="">
              <div className="username flex gap-2 text-lg font-medium">
                <LockClosedIcon className="w-7 h-7" />
                Privacy Settings
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSettings;
