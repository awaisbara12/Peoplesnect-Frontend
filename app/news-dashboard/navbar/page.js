import React from "react";
import Image from "next/image";
import NavbarLogo from "../../../public/images/logo.png";
import {
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  ChatAltIcon,
  BellIcon,
} from "@heroicons/react/solid";

const NewsFeedNav = () => {
  return (
    <div className="navbar w-full">
      <div className="navbar-header text-center">
        <a href="/">
          <Image src={NavbarLogo} width={234} height={45} placeholder="blur" />
        </a>
      </div>
      <div className="navbar-body mt-6">
        <ul>
          <a href="/" className="">
            <li className="flex font-normal text-xl items-center gap-3">
              <HomeIcon className="h-5 w-5" />
              <div className="">Home</div>
            </li>
          </a>
          <a href="/" className="">
            <li className="flex font-normal text-xl items-center my-5 gap-3">
              <BriefcaseIcon className="h-5 w-5" />
              <div className="">Jobs</div>
            </li>
          </a>
          <a href="/" className="">
            <li className="flex font-normal text-xl items-center gap-3">
              <UsersIcon className="h-5 w-5" />
              <div className="">My Network</div>
            </li>
          </a>
          <a href="/" className="">
            <li className="flex font-normal text-xl items-center my-5 gap-3">
              <ChatAltIcon className="h-5 w-5" />
              <div className="">Messaging</div>
            </li>
          </a>
          <a href="/" className="">
            <li className="flex font-normal text-xl items-center gap-3">
              <div className="relative">
                <BellIcon className="h-5 w-5" />
                <div className="bg-red-400 h-4 w-4 text-white -top-1 left-3 rounded-full flex justify-center items-center absolute">
                  <p className="text-[8px]">2</p>
                </div>
              </div>
              <div className="">Notifications</div>
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default NewsFeedNav;
