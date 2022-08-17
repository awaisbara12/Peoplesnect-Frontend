import React from "react";

const NewPAge = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="w-[600px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">Creat New Page</div>
            <div className="border items-center bg-white mt-4 p-10 rounded-xl">
              <div className="flex items-center justify-center gap-7">
                <div className="text-lg font-medium">Page Title:</div>
                <input
                  className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 xs:w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                  placeholder="Change Page Name"
                  type="text"
                  name="search"
                />
              </div>
              <div className="flex justify-center gap-7 mt-10 ">
                <div className="text-lg font-medium">Description:</div>
                <div className="">
                  <textarea
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 rounded-xl"
                    placeholder="Write Page Description Here....."
                    type="textarea"
                    name="search"
                    rows={5}
                    cols={10}
                  />
                </div>
              </div>
            </div>
            <div className=" border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="heading mt-4 text-lg font-bold">
                Profile & Cover
              </div>
              <div className="flex items-center justify-center gap-10 mt-10">
                <div className="text-lg font-medium">Select Profile Photo:</div>
                <input className="" type="file" name="search" />
              </div>
              <div className="flex items-center justify-center gap-10 mt-10">
                <div className="text-lg font-medium">Select Cover Photo:</div>
                <input className="" type="file" name="search" />
              </div>
            </div>
            <div className=" border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="heading mt-4 text-lg font-bold">
                Comments Authorization
              </div>
              <div className="border hover:bg-gray-100 mt-4 p-4 bg-gray-50 hover:shadow-lg rounded-xl">
                <div className="flex items-center justify-between ">
                  <div className="">Who Can Comment</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        checked
                        id="default-radio-1"
                        type="radio"
                        value=""
                        name="default-radio[1]"
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
                        name="default-radio[1]"
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

              <div className="heading text-lg font-bold mt-4">
                Who Can Message
              </div>
              <div className="border hover:bg-gray-100 mt-4 p-4 bg-gray-50 hover:shadow-lg rounded-xl">
                <div className="flex items-center justify-between ">
                  <div className="">Who Can Message</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        checked
                        id="default-radio-1"
                        type="radio"
                        value=""
                        name="default-radio[2]"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        EveryOne
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="default-radio-2"
                        type="radio"
                        value=""
                        name="default-radio[2]"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        No One
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <button className="border-2 border-blue-500 bg-blue-500 p-2 rounded-full text-white font-bold">
              Creat New Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  sd;
};

export default NewPAge;
