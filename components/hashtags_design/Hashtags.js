import { CogIcon } from "@heroicons/react/outline";
import { HashtagIcon } from "@heroicons/react/solid";
import React from "react";

const Hashtags = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="w-[600px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="relative">
              <input
                className="placeholder:text-md text-gray-500 pl-12  hover:shadow-lg bg-white placeholder:rounded-full  border-none w-full rounded-full py-3"
                placeholder="Hashtags Search"
                type="text"
                name="search"
              />
              <div className="absolute top-3.5 left-6">
                <HashtagIcon className="h-5 w-5 opacity-40" />
              </div>
              <div className="absolute top-3.5 right-4">
                <CogIcon className="h-5 w-5 opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hashtags;
