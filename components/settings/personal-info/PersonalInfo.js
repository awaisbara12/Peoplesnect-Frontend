import React from "react";

const PersonalInfo = () => {
  return (
    <div>
      <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">
              Personal Information
            </div>
            <div className="border bg-white mt-4 p-10 rounded-xl">
              <div className="grid grid-cols-3 mt-5">
                <div className="text-lg font-medium">Name:</div>
                <div className="flex gap-7">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-40 lg:w-54 xs:w-auto md:w-52 placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="First Name"
                    type="text"
                    name="search"
                  />
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-40 lg:w-54 xs:w-auto md:w-52 placeholder:pl-2 rounded-full placeholder:py-2"
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
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-40 lg:w-54 xs:w-auto md:w-52 placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Country Name"
                    type="text"
                    name="search"
                  />
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-40 lg:w-54 xs:w-auto md:w-52 placeholder:pl-2 rounded-full placeholder:py-2"
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
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-[350px] lg:w-[450px] md:w-[450px] placeholder:pl-2 rounded-full placeholder:py-2"
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
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-[350px] lg:w-[450px] md:w-[450px] placeholder:pl-2 rounded-full placeholder:py-2"
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
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-[350px] lg:w-[450px] md:w-[450px] placeholder:pl-2 rounded-full placeholder:py-2"
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
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-[350px] lg:w-[450px] md:w-[450px] rounded-xl"
                    placeholder="Write Your Description Here....."
                    type="textarea"
                    name="search"
                    rows={5}
                    cols={10}
                  />
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
      </div>
    </div>
  );
};

export default PersonalInfo;
