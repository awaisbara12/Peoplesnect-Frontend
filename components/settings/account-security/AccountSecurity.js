import { EyeIcon } from "@heroicons/react/outline";
import React from "react";

const AccountSecurity = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="w-[600px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">Account Security</div>
            <div className="border bg-white mt-4 p-10 rounded-xl">
              <div className="grid  relative  items-center grid-cols-3 mt-5 ">
                <div className="text-lg font-medium">Current Password:</div>
                <div className="">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Enter Current Your Password"
                    type="Password"
                    name="search"
                  />
                </div>
                <EyeIcon className="absolute right-6 top-2 h-5 w-5" />
              </div>
              <div className="grid  relative items-center  grid-cols-3 mt-5 ">
                <div className="text-lg font-medium">Update Password:</div>
                <div className="">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Enter New Password"
                    type="Password"
                    name="search"
                  />
                </div>
                <EyeIcon className="absolute right-6 top-2 h-5 w-5" />
              </div>
              <div className="grid  relative items-center grid-cols-3 mt-5 ">
                <div className="text-lg font-medium">Cofirm Password:</div>
                <div className="">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Confirm Your Password"
                    type="Password"
                    name="search"
                  />
                </div>
                <EyeIcon className="absolute right-6 top-2 h-5 w-5" />
              </div>
              <div className="mt-10">
                <div className="flex items-center justify-between border bg-white mt-4 px-4 py-4 rounded-xl">
                  <div className="">Two Step Verification</div>
                  <div className="">
                    <label
                      htmlFor="default-toggle"
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
              </div>
              <div className="flex justify-end mt-10">
                <button className="border-2 border-blue-500 bg-blue-500 p-2 rounded-full text-white font-bold">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;
