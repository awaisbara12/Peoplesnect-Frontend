import React from "react";

const Edit = () => {
  return (
    <div className="mt-8">
      <div className="w-[620px]px-5 md:px-0 lg:px-0">
        <div className="">
          <div className="heading text-lg font-bold">Stop Subscription</div>
          <div className="flex items-center justify-between border bg-white mt-4 px-4 py-5 rounded-xl">
            <div className="">Stop Subscription</div>
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
          <div className="flex justify-end mt-10">
            <button className="border-2 border-indigo-400 bg-indigo-400 p-2 rounded-full text-white font-bold">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
