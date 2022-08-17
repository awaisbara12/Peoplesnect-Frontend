import React from "react";

const PersonalInfo = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="w-[600px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">
              Personal Information
            </div>
            <div className="border items-center bg-white mt-4 p-10 rounded-xl">
              <div className="grid grid-cols-3 mt-5">
                <div className="text-lg font-medium">Name:</div>
                <div className="flex gap-7">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-44 xs:w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="First Name"
                    type="text"
                    name="search"
                  />
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-44 xs:w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Last Name"
                    type="text"
                    name="search"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 mt-5">
                <div className="text-lg font-medium">Location:</div>
                <div className="flex gap-7">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-44 xs:w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Country Name"
                    type="text"
                    name="search"
                  />
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-44 xs:w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="City Name"
                    type="text"
                    name="search"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 mt-5 ">
                <div className="text-lg font-medium">Current Position:</div>
                <div className="">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Current Position"
                    type="text"
                    name="search"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 mt-5 ">
                <div className="text-lg font-medium">Industry:</div>
                <div className="">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Current Industry"
                    type="text"
                    name="search"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 mt-5 ">
                <div className="text-lg font-medium">Last Degree:</div>
                <div className="">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Last Degree"
                    type="text"
                    name="search"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 mt-5 ">
                <div className="text-lg font-medium">Description:</div>
                <div className="">
                  <textarea
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 rounded-xl"
                    placeholder="Write Your Description Here....."
                    type="textarea"
                    name="search"
                    rows={5}
                    cols={10}
                  />
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

export default PersonalInfo;
