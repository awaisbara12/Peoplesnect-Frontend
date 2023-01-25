import React, { useEffect } from "react";
import Blog from "./Blog";
import Group from "./Group";
import Hashtag from "./Hashtag";
import Page from "./Page";
import People from "./People";

const Search = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const [userDetails, setUserDetails] = React.useState(1);  
  return (
    <>
      <div className="mt-8">
        <div className="flex bg-white rounded-t-xl px-8 mb-0 border-b flex-wrap">
          <div className="w-full">
            <div className="w-full md:w-full xl:w-5/6 pt-8 pb-4 text-sm">
              <ul className="flex gap-8" role="tablist">
                <li className="">
                  <a
                    className={
                      "" +
                      (openTab === 1
                        ? "border-b-3 font-bold pb-4 text-indigo-400 border-indigo-400"
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
                    People
                  </a>
                </li>
                <li className="">
                  <a
                    className={
                      "" +
                      (openTab === 2
                        ? "border-b-3 font-bold pb-4 text-indigo-400 border-indigo-400"
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
                   Group
                  </a>
                </li>
                <li className="">
                  <a
                    className={
                      "" +
                      (openTab === 3
                        ? "border-b-3 font-bold pb-4 text-indigo-400 border-indigo-400"
                        : "")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(3);
                    }}
                    data-toggle="tab"
                    href="#link3"
                    role="tablist"
                  >
                   Pages
                  </a>
                </li>
                <li className="">
                  <a
                    className={
                      "" +
                      (openTab === 4
                        ? "border-b-3 font-bold pb-4 text-indigo-400 border-indigo-400"
                        : "")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(4);
                    }}
                    data-toggle="tab"
                    href="#link4"
                    role="tablist"
                  >
                   Blog
                  </a>
                </li>
                <li className="">
                  <a
                    className={
                      "" +
                      (openTab === 5
                        ? "border-b-3 font-bold pb-4 text-indigo-400 border-indigo-400"
                        : "")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(5);
                    }}
                    data-toggle="tab"
                    href="#link5"
                    role="tablist"
                  >
                   Hashtag
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-auto">
          <div className="tab-content tab-space">
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              <People/>
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <Group/>
            </div>
            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
              <Page/>
            </div>
            <div className={openTab === 4 ? "block" : "hidden"} id="link4">
              <Blog/>
            </div>
            <div className={openTab === 5 ? "block" : "hidden"} id="link5">
              <Hashtag/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
