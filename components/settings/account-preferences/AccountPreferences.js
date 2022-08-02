import { ChevronDownIcon } from "@heroicons/react/outline";
import React from "react";

const AccountPreferences = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="w-[600px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">Account Preference</div>
            <div className="flex items-center justify-between border bg-white mt-4 p-4 rounded-xl">
              <div className="">Language</div>
              <div className="border flex gap-1 rounded-full py-2 px-4">
                English
                <ChevronDownIcon className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center justify-between border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="">Autoplay Videos</div>
              <div className="">
                <label
                  for="default-toggle"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value=""
                    id="default-toggle"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="">Cover Photo</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value=""
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Public
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Private
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <button className="border-2 border-blue-500 bg-blue-500 p-2 rounded-full text-white font-bold">
                Changes Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPreferences;
