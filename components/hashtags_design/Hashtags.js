import React from "react";
import Link from "next/link";
import { CogIcon, DotsHorizontalIcon } from "@heroicons/react/outline";
import { HashtagIcon } from "@heroicons/react/solid";

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
            <div className=" border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="text-lg font-bold">Top Trending Hashtags</div>
              <div className="mt-4">
                <div className="flex justify-between items-center ">
                  <a className="py-2 px-4 rounded-full hover:bg-gray-100">
                    <div className="font-bold">#ImranKhanZindabad</div>
                    <div className="mt-1">324.1k tags</div>
                  </a>
                  <a href="">
                    <DotsHorizontalIcon className="h-5 w-5" />
                  </a>
                </div>

                <div className="flex justify-between items-center ">
                  <a className="py-2 px-4 rounded-full hover:bg-gray-100">
                    <div className="font-bold">#HinaParvezButt</div>
                    <div className="mt-1">32.4k tags</div>
                  </a>
                  <a href="">
                    <DotsHorizontalIcon className="h-5 w-5" />
                  </a>
                </div>
                <div className="flex justify-between items-center ">
                  <a className="py-2 px-4 rounded-full hover:bg-gray-100">
                    <div className="font-bold">#pti</div>
                    <div className="mt-1">34.2k tags</div>
                  </a>
                  <a href="">
                    <DotsHorizontalIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hashtags;
