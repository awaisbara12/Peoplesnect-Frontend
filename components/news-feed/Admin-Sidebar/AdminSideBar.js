import {
  CalendarIcon,
  HashtagIcon,
  LightBulbIcon,
  UserCircleIcon,
  UserGroupIcon,
  VideoCameraIcon,
  BriefcaseIcon, ExclamationCircleIcon, FlagIcon, AdjustmentsIcon
  } from "@heroicons/react/outline";
  import Link from "next/link";
  import React from "react";
  
  const AdminSideBAr = () => {
  return (
  <div>
   <div className="w-64 lg:w-auto">
      <div className="mt-8 mx-auto bg-white rounded-xl w-full h-auto p-4">
        <Link href="/Admin">
        <a href="">
          <div className="flex justify-between font-light text-sm  border-b-1 pb-4">
            <div className="">Users List</div>
            <UserCircleIcon className="w-5 h-5 text-indigo-400" />
          </div>
        </a>
        </Link>
        <Link href="/Admin/Reports-list">
        <a>
          <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
            <div className="">Reports</div>
            <ExclamationCircleIcon className="w-5 h-5 text-indigo-400" />
          </div>
        </a>
        </Link>
        <Link href="/Admin/Jobs-list">
        <a>
          <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
            <div className="">Jobs List</div>
            <BriefcaseIcon className="w-5 h-5 text-indigo-400" />
          </div>
        </a>
        </Link>
        <Link href="/Admin/Products-list">
        <a>
          <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
            <div className="">Product List</div>
            <LightBulbIcon className="w-5 h-5 text-indigo-400" />
          </div>
        </a>
        </Link>
        <Link href="/Admin/groups-list">
        <a>
          <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
            <div className="">Groups</div>
            <UserGroupIcon className="w-5 h-5 text-indigo-400" />
          </div>
        </a>
        </Link>
        <Link href="/Admin/pages-list">
        <a>
          <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
            <div className="">Pages</div>
            <VideoCameraIcon className="w-5 h-5 text-indigo-400" />
          </div>
        </a>
        </Link>
        <Link href="/Admin/hashtags-list">
        <a href="">
          <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
            <div className="">Hashtags</div>
            <HashtagIcon className="w-5 h-5 text-indigo-400" />
          </div>
        </a>
        </Link>
        <Link href="/Admin/admin-roles">
        <a href="">
          <div className="flex justify-between font-light text-sm mt-4">
            <div className="">Admin Roles</div>
            <AdjustmentsIcon className="w-5 h-5 text-indigo-400" />
          </div>
        </a>
        </Link>
      </div>
    </div> 
  </div>
  );
  };
  
  export default AdminSideBAr;