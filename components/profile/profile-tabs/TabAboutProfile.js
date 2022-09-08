import { PencilIcon } from "@heroicons/react/outline";
import React from "react";

const TabAboutProfile = () => {
  return (
    <>
      <div className="bg-white rounded-xl  px-5">
        <div className="flex gap-10">
          <div className="w-[775px]">
            <div className="my-4 leading-8 font-light">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries....
              <span className="text-indigo-400 cursor-pointer ml-2 font-bold">
                Read More
              </span>
            </div>
          </div>
          <a
            href=""
            className="flex ml-auto gap-1 p-5 text-indigo-400 underline"
          >
            Edit
            <PencilIcon className="h-4 w-4 underline" />
          </a>
        </div>
      </div>
    </>
  );
};

export default TabAboutProfile;
