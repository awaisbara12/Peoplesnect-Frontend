import React from "react";
import Link from "next/link";
import NavbarLogo from "../../../public/images/logo.png";
import {
  UserGroupIcon,
  UserAddIcon,
  UsersIcon,
  ChatAltIcon,
  BellIcon,
  NewspaperIcon,
} from "@heroicons/react/solid";

const MyConnections = () => {
  return (
    <div>
      <Link href="/my-network" className="">
        <a>
          <div className="flex font-normal text-xl items-center gap-3 mt-2">
            <UserGroupIcon className="h-5 w-5" />
            <div className="">Connections</div>
          </div>
        </a>
      </Link>
      <Link href="/my-network/Peending-Request" className="">
        <a>
          <div className="flex font-normal text-xl items-center gap-3 mt-2">
            <UserAddIcon className="h-5 w-5" />
            <div className="">Pending Requests</div>
          </div>
        </a>
      </Link>
      <Link href="/my-network/Followings" className="">
        <a>
          <div className="flex font-normal text-xl items-center gap-3 mt-2">
            <UsersIcon className="h-5 w-5" />
            <div className="">Followings</div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default MyConnections;
