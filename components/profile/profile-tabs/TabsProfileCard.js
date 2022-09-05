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
        <div className="flex bg-white rounded-b-xl mb-20 flex-wrap">
          <div className="w-full pt-10 border-t-1">
            <ul className="flex gap-4" role="tablist">
              <li className=" border-gray-100 bg-white w-full">
                <a
                  className={
                    "" + (openTab === 1 ? "border-b-1 border-indigo-400" : "")
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
              <li className="w-full">
                <a
                  className={
                    "" + (openTab === 2 ? "border-b-1 border-indigo-400" : "")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Discription
                </a>
              </li>
              <li className="w-full">
                <a
                  className={
                    "" + (openTab === 3 ? "border-b-1 border-indigo-400" : "")
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
              <li className="w-full">
                <a
                  className={
                    "" + (openTab === 4 ? "border-b-1 border-indigo-400" : "")
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

              <li className="w-full">
                <a
                  className={
                    "" + (openTab === 5 ? "border-b-1 border-indigo-400" : "")
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

              <li className="w-full">
                <a
                  className={
                    "" + (openTab === 6 ? "border-b-1 border-indigo-400" : "")
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
  );
};

export default TabsProfileCard;
