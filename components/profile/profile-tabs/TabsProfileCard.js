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
          <div className="w-full -mt-7">
            <ul className="flex gap-6 ml-56" role="tablist">
              <li className="">
                <a
                  className={
                    "flex items-center justify-center gap-1 text-xs font-bold uppercase" +
                    (openTab === 1
                      ? "text-white border-b-1 border-blue-500 pb-2"
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
              <li className="">
                <a
                  className={
                    "flex items-center justify-center gap-1 text-xs font-bold uppercase" +
                    (openTab === 2
                      ? "text-white border-b-1 border-blue-500 pb-2"
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
              <li className="">
                <a
                  className={
                    "flex items-center justify-center gap-1 text-xs font-bold uppercase" +
                    (openTab === 3
                      ? "text-white border-b-1 border-blue-500 pb-2"
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
            <div className="relative flex flex-col min-w-0 break-words w-full rounded-b-xl">
              <div className="flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <TabAboutProfile />
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <TabRecentProfile />
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <SkillsTabProfile />
                  </div>
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
