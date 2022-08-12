import React from "react";
import Image from "next/image";
import Link from "next/link";
import SugestionProfile from "../../../public/images/profile-avatar.png";
import MariaProfile from "../../../public/images/mariamomo.png";
import MiraProfile from "../../../public/images/mira.png";
import {
  PlusIcon,
  DotsHorizontalIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

const GroupsSuggesions = () => {
  return (
    <>
      <div className="text-base font-bold leading-5">My Joind Group</div>
      <Link href="/">
        <a href="">
          <div className="px-3 py-2 hover:bg-gray-300 rounded-xl flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center">
              <UserGroupIcon className="w-5 h-5" />
              <p className="text-base font-semibold">Group Name</p>
            </div>
          </div>
        </a>
      </Link>
      <Link href="/">
        <a href="">
          <div className="px-3 py-2 hover:bg-gray-300 rounded-xl flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center">
              <UserGroupIcon className="w-5 h-5" />
              <p className="text-base font-semibold">Group Name</p>
            </div>
          </div>
        </a>
      </Link>
      <Link href="/">
        <a href="">
          <div className="px-3 py-2 hover:bg-gray-300 rounded-xl flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center">
              <UserGroupIcon className="w-5 h-5" />
              <p className="text-base font-semibold">Group Name</p>
            </div>
          </div>
        </a>
      </Link>
      <Link href="/">
        <a>
          <DotsHorizontalIcon className="h-5 w-5 mx-auto mt-5" />
        </a>
      </Link>
    </>
  );
};

export default GroupsSuggesions;
