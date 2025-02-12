import React, { useEffect, useState } from "react";
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
import TabSavedProfile from "./TabSavedProfile";
import {    
  CURENT_USER_LOGIN_API, GET_USER_BOOKMARKS
} from "../../../pages/config";
import { RECENT_ACTIVITY_API } from "../../../pages/config";

const TabsProfileCard = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const [userDetails, setUserDetails] = React.useState(1);
  const [bookmarks, setBookmarks] = useState([]);
  const [recentactivity, setRecentActivity] = useState([]);
 
  // Bareer Key
  if (typeof window !== "undefined") {
    // Bareer Key
    var authKey = window.localStorage.getItem("keyStore"); 
  }
  const UserBookmarks=async()=>{    //current User
  
    await fetch(GET_USER_BOOKMARKS, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        setBookmarks(result.data);

      }
    })
    .catch((err) => console.log(err)); 
  }

  const RecentActivity=async()=>{    //current User
  
    await fetch(RECENT_ACTIVITY_API, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        setRecentActivity(result.data);
      }
    })
    .catch((err) => console.log(err)); 
  }

  //current User
  const Current_User=async()=>{    
   
    await fetch(CURENT_USER_LOGIN_API, {
      method: "GET",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setUserDetails(result.data);
        }
      })
      .catch((err) => console.log(err)); 
  }
  useEffect(()=>{
    Current_User(); 
    UserBookmarks();
    RecentActivity();
  },[])
  
  return (
    <>
      <div className="">
        <div className="flex bg-white rounded-b-xl px-8 mb-8 flex-wrap">
          <div className="border-t-1 w-full mt-36 md:mt-0">
            <div className="w-[670px] md:w-full xl:w-full pt-4 pb-7 text-sm">
              <ul className="flex justify-between" role="tablist">
                <li className="text-xs md:text-base">
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
                <li className="text-xs md:text-base">
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
                <li className="text-xs md:text-base">
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
                <li className="text-xs md:text-base">
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
                    Education
                  </a>
                </li>
                <li className="text-xs md:text-base">
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
                <li className="text-xs md:text-base">
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
                <li className="text-xs md:text-base">
                  <a
                    className={
                      "" +
                      (openTab === 7
                        ? "border-b-2 font-bold pb-6 text-indigo-400 border-indigo-400"
                        : "")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(7);
                    }}
                    data-toggle="tab"
                    href="#link7"
                    role="tablist"
                  >
                    Saved Items
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-auto">
          <div className="tab-content tab-space">
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              <TabProfile bookmarks={bookmarks} setBookmarks={setBookmarks} recentactivity={recentactivity} setRecentActivity={setRecentActivity}/>
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
              <TabRecentProfile recentactivity={recentactivity} setRecentActivity={setRecentActivity}/>
            </div>
            <div className={openTab === 7 ? "block" : "hidden"} id="link7">
              <TabSavedProfile  bookmarks={bookmarks} setBookmarks={setBookmarks}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabsProfileCard;
