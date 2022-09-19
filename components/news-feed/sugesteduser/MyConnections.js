import React from "react";
import Link from "next/link";
import { UserGroupIcon, UserAddIcon, UsersIcon } from "@heroicons/react/solid";

const MyConnections = () => {
  return (
    <div className="bg-white w-72 xl:w-72 lg:w-64 md:w-auto p-3 mt-5 rounded-xl">
      <Link href="/my-network" className="">
        <a>
          <div className="flex justify-between items-center mt-2 border-b pb-3 font-light text-sm">
            <div className="">Connections</div>
            <UserGroupIcon className="h-5 w-5 text-indigo-400" />
          </div>
        </a>
      </Link>
      <Link href="/my-network/Peending-Request" className="">
        <a>
          <div className="flex justify-between items-center mt-4 border-b pb-3 font-light text-sm">
            <div className="">Pending Requests</div>
            <UserAddIcon className="h-5 w-5 text-indigo-400" />
          </div>
        </a>
      </Link>
      <Link href="/my-network/Followings" className="">
        <a>
          <div className="flex justify-between items-center mt-2 font-light text-sm">
            <div className="">Followings</div>
            <UsersIcon className="h-5 w-5 text-indigo-400" />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default MyConnections;
