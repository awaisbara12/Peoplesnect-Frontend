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
import TabAboutProfile from "./TabAboutProfile";
import TabRecentProfile from "./TabRecentProfile";
import SkillsTabProfile from "./SkillsTabProfile";

const TabsProfileCard = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div>
      <div className="">
        <div className="flex flex-wrap">
          <div className="flex w-full">
            <ul
              className="flex items-center bg-white rounded-l-xl flex-col border-r-1 w-44"
              role="tablist"
            >
              <li className="border-b border-gray-100 bg-white rounded-t-xl w-full">
                <a
                  className={
                    "flex items-center justify-center gap-1 text-xs font-bold uppercase  w-full h-12 rounded-t-xl" +
                    (openTab === 1
                      ? "text-white border-b-1 border-white bg-indigo-400 h-full rounded-tl-xl"
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
                  <UserIcon className="w-4 h-4" /> About
                </a>
              </li>
              <li className="border-b border-gray-100 w-full">
                <a
                  className={
                    "flex items-center justify-center gap-1 text-xs font-bold uppercase  w-full h-12 " +
                    (openTab === 2
                      ? "text-white border-b-1 border-white bg-indigo-400 h-full"
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
                  <BookmarkIcon className="h-4 w-4" /> Recent Activity
                </a>
              </li>
              <li className="border-b border-gray-100 w-full">
                <a
                  className={
                    "flex items-center justify-center gap-1 text-xs font-bold uppercase  w-full h-12 " +
                    (openTab === 3
                      ? "text-white border-b-1 border-white bg-indigo-400 h-full"
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
                  <StarIcon className="h-4 w-4" />
                  Skills
                </a>
              </li>
            </ul>
            <div className="flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <TabAboutProfile />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <TabRecentProfile />
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <SkillsTabProfile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsProfileCard;
