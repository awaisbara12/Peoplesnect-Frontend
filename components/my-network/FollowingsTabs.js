import React, { useEffect } from "react";
import Followers from "./Followers";
import Followings from "./Followings";

const FollowingsTabs = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const [userDetails, setUserDetails] = React.useState(1);  //console.log("==>",userDetails);
  return (
    <>
      <div className="mt-8">
        <div className="flex bg-white rounded-t-xl px-8 mb-4 flex-wrap">
          <div className="w-full">
            <div className="w-full md:w-full xl:w-5/6 pt-8 pb-7 text-sm">
              <ul className="flex gap-8" role="tablist">
                <li className="">
                  <a
                    className={
                      "" +
                      (openTab === 1
                        ? "border-b-2 font-bold pb-6 text-indigo-400 border-indigo-400"
                        : "")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Total Followings
                  </a>
                </li>
                <li className="">
                  <a
                    className={
                      "" +
                      (openTab === 2
                        ? "border-b-2 font-bold pb-6 text-indigo-400 border-indigo-400"
                        : "")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                   Total Followers
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-auto">
          <div className="tab-content tab-space">
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              <Followings/>
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <Followers/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowingsTabs;
