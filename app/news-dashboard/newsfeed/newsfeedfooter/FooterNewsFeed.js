import React from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

const FooterNewsFeed = () => {
  return (
    <div className="bg-white w-full mt-5 rounded-xl">
      <div className=" p-5 font-light text-base">
        <div className=" flex gap-4">
          <a href="/">
            <div className="">about Us</div>
          </a>
          <a href="/">
            <div className="">Privacy & Terms</div>
          </a>
        </div>
        <div className="flex mt-2 gap-5">
          <a href="/">
            <div className="">Pages</div>
          </a>
          <a href="/">
            <div className="">Advertising</div>
          </a>
        </div>
      </div>
      <a href="">
      <div className="bg-gray-100 border border-white w-full rounded-b-xl flex py-3 justify-center items-center">
        See More
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      </a>
    </div>
  );
};

export default FooterNewsFeed;
