import React from "react";
import {
  POST_NEWSFEED_API_KEY,
  BOOKMARK_NEWSFEED_API_KEY,
  REACTION_NEWSFEED_API_KEY,
  COMMENT_API_KEY,
  NEWSFEED_COMMENT_POST_KEY,
} from "../../../pages/config";
const ContectInfo = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="w-[600px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">Contact Information</div>
            <div className="border bg-white mt-4 p-10 rounded-xl">
              <div className="flex username items-center gap-14 text-lg font-medium justify-center">
                Email:
                <div className="">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Email Adress"
                    type="Email"
                    name="search"
                  />
                </div>
              </div>
              <div className="mt-5 ">
                <div className="flex username items-center gap-8 text-lg font-medium justify-center">
                  Number:
                  <div className="">
                    <input
                      className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 placeholder:pl-2 rounded-full placeholder:py-2"
                      placeholder="Change Your Number"
                      type="Number"
                      name="search"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex username items-center gap-11 text-lg font-medium justify-center">
                  Adress:
                  <div className="">
                    <input
                      className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 placeholder:pl-2 rounded-full placeholder:py-2"
                      placeholder="Change Your Adress"
                      type="text"
                      name="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-5">
                <button className="border-2 border-indigo-400 bg-indigo-400 p-2 rounded-full text-white font-bold">
                  Changes Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContectInfo;
