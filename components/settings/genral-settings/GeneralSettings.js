import React from "react";

const GeneralSettings = () => {
  return (
    <div className="mt-8">
      <div className="w-[600px] px-5 md:px-0 lg:px-0">
        <div className="font-bold text-lg mb-10">General Settings</div>
        <div className="bg-white rounded-xl px-10 pt-10">
          <div className="font-bold mb-5">Change Name</div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <input
                className="placeholder:text-md  bg-zinc-100 placeholder:rounded-full  border-none w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                placeholder="Frist Name"
                type="text"
                name="search"
              />
            </div>
            <div>
              <input
                className="placeholder:text-md  bg-zinc-100 placeholder:rounded-full  border-none w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                placeholder="Last Name"
                type="text"
                name="search"
              />
            </div>
            <div>
              <input
                className="placeholder:text-md  bg-zinc-100 placeholder:rounded-full  border-none w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                placeholder="Phone No"
                type="text"
                name="search"
              />
            </div>
            <div>
              <input
                className="placeholder:text-md  bg-zinc-100 placeholder:rounded-full  border-none w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                placeholder="Email Adress"
                type="text"
                name="search"
              />
            </div>
            <div>
              <input
                className="placeholder:text-md  bg-zinc-100 placeholder:rounded-full  border-none w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                placeholder="Your Country"
                type="text"
                name="search"
              />
            </div>
            <div>
              <input
                className="placeholder:text-md  bg-zinc-100 placeholder:rounded-full  border-none w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                placeholder="Your City"
                type="text"
                name="search"
              />
            </div>
            <div>
              <input
                className="placeholder:text-md  bg-zinc-100 placeholder:rounded-full  border-none w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                placeholder="Degree"
                type="text"
                name="search"
              />
            </div>
            <div>
              <input
                className="placeholder:text-md  bg-zinc-100 placeholder:rounded-full  border-none w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                placeholder="Specialization"
                type="text"
                name="search"
              />
            </div>
            <div>
              <input
                className="placeholder:text-md  bg-zinc-100 placeholder:rounded-full  border-none w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                placeholder="Start Year"
                type="text"
                name="search"
              />
            </div>
            <div>
              <input
                className="placeholder:text-md  bg-zinc-100 placeholder:rounded-full  border-none w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                placeholder="End Year"
                type="text"
                name="search"
              />
            </div>
            <div>
              <input
                className="placeholder:text-md  bg-zinc-100 placeholder:rounded-full  border-none w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                placeholder="Recent Job"
                type="text"
                name="search"
              />
            </div>
            <div>
              <input
                className="placeholder:text-md  bg-zinc-100 placeholder:rounded-full  border-none w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                placeholder="Recent Company"
                type="text"
                name="search"
              />
            </div>
          </div>
          <div className="flex justify-end mt-10 pb-5">
            <button className="border-2 border-blue-500 bg-blue-500 p-2 rounded-full text-white font-bold">
              Changes Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
