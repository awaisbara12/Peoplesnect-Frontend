import React from "react";
import {
  BookmarkAltIcon,
  PhotographIcon,
  ChatAlt2Icon,
  CogIcon,
  LocationMarkerIcon,
  PencilIcon,
  PhoneIcon,
  UserIcon,
  XIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/solid";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import TabRecentProfile from "./TabRecentProfile";
import SkillsTabProfile from "./SkillsTabProfile";
import TabContactProfile from "./TabContactProfile";
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
            <div className="w-full md:w-4/5  lg:w-4/5  pt-8 pb-7">
              <ul className="flex justify-between" role="tablist">
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
                    Contact Info
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
                <li className="">
                  <a
                    className={
                      "" +
                      (openTab === 6
                        ? "border-b-2 font-bold pb-6 text-indigo-400 border-indigo-400"
                        : "")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(6);
                    }}
                    data-toggle="tab"
                    href="#link6"
                    role="tablist"
                  >
                    Recent Activity
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
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <TabContactProfile />
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
            <div className={openTab === 6 ? "block" : "hidden"} id="link6">
              <TabRecentProfile />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabsProfileCard;
