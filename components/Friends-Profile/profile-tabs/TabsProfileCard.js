import React from "react";
import SkillsTabProfile from "./SkillsTabProfile";
import TabExperienceProfile from "./TabExperienceProfile";
import TabEducationProfile from "./TabEducationProfile";
import TabProfile from "./TabProfile";

const TabsProfileCard = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="">
        <div className="flex bg-white rounded-b-xl px-8 mb-8 flex-wrap">
          <div className="border-t-1 w-full">
            <div className="w-full md:w-full xl:w-5/6 pt-8 pb-7 text-sm">
              <ul className="flex gap-10" role="tablist">
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
                    Profile
                  </a>
                </li>
                <li className="">
                  <a
                    className={
                      "" +
                      (openTab === 3
                        ? "border-b-2 font-bold pb-6 text-indigo-400 border-indigo-400"
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
                    Skills
                  </a>
                </li>
                <li className="">
                  <a
                    className={
                      "" +
                      (openTab === 4
                        ? "border-b-2 font-bold pb-6 text-indigo-400 border-indigo-400"
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
                    Eduction
                  </a>
                </li>
                <li className="">
                  <a
                    className={
                      "" +
                      (openTab === 5
                        ? "border-b-2 font-bold pb-6 text-indigo-400 border-indigo-400"
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
                    Professional Experience
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-auto">
          <div className="tab-content tab-space">
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              <TabProfile />
            </div>
            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
              <SkillsTabProfile />
            </div>
            <div className={openTab === 4 ? "block" : "hidden"} id="link4">
              <TabEducationProfile />
            </div>
            <div className={openTab === 5 ? "block" : "hidden"} id="link5">
              <TabExperienceProfile />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabsProfileCard;