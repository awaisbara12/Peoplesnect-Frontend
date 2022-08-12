import React from "react";

const GroupSettings = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="w-[600px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">Group Settings</div>
            <div className="border items-center bg-white mt-4 p-10 rounded-xl">
              <div className="flex items-center justify-center gap-7">
                <div className="text-lg font-medium">Group Title:</div>
                <input
                  className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 xs:w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                  placeholder="Change Group Name"
                  type="text"
                  name="search"
                />
              </div>
              <div className="flex justify-center gap-7 mt-10 ">
                <div className="text-lg font-medium">Description:</div>
                <div className="">
                  <textarea
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 rounded-xl"
                    placeholder="Write Group Description Here....."
                    type="textarea"
                    name="search"
                    rows={5}
                    cols={10}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-5 mr-10">
                <button className="border-2 border-blue-500 bg-blue-500 p-2 rounded-full text-white font-bold">
                  Save Changes
                </button>
              </div>
            </div>
            <div className=" border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="heading text-lg font-bold">Group Type</div>
              <div className="border hover:bg-gray-100 mt-4 p-4 bg-gray-50 hover:shadow-lg rounded-xl">
                <div className="flex items-center justify-between ">
                  <div className="">Group Type</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        checked
                        id="default-radio-1"
                        type="radio"
                        value=""
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Public
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="default-radio-2"
                        type="radio"
                        value=""
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Private
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="heading mt-4 text-lg font-bold">
                Post Authorization
              </div>
              <div className="border hover:bg-gray-100 mt-4 p-4 bg-gray-50 hover:shadow-lg rounded-xl">
                <div className="flex items-center justify-between ">
                  <div className="">Who Can post</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        checked
                        id="default-radio-1"
                        type="radio"
                        value=""
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        All Members
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="default-radio-2"
                        type="radio"
                        value=""
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Only Admins
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="heading text-lg font-bold">
                Permanent Delet Your Group
              </div>
              <div className="border hover:bg-gray-100 mt-4 p-4 bg-gray-50 hover:shadow-lg rounded-xl">
                <div className="flex items-center justify-between ">
                  <div className="">Delet Your Group</div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  sd;
};

export default GroupSettings;
