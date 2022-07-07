import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  ChatAltIcon,
  BellIcon,
} from "@heroicons/react/solid";

const MobileBottomBar = () => {
  return (
    <div className="fixed bottom-0 block lg:hidden md:hidden bg-white w-full rounded-t-2xl">
      <div className="h-14 px-4 flex justify-between items-center">
        <div className="">
          <Link href="/">
            <a>
              <HomeIcon className="text-gray-900 h-7 w-7" />
            </a>
          </Link>
        </div>
        <div className="">
          <Link href="/">
            <a>
              <BriefcaseIcon className="h-7 w-7" />
            </a>
          </Link>
        </div>
        <div className="">
          <Link href="/">
            <a>
              <UsersIcon className="h-7 w-7" />
            </a>
          </Link>
        </div>
        <div className="">
          <Link href="/">
            <a>
              <ChatAltIcon className="h-7 w-7" />
            </a>
          </Link>
        </div>
        <div className="">
          <Link href="/">
            <a>
              <BellIcon className="h-7 w-7" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileBottomBar;
