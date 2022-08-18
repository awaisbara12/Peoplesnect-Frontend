import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import profile from "../../../public/images/profile-avatar.png";
import {
  SearchIcon,
  AdjustmentsIcon,
  BellIcon,
} from "@heroicons/react/outline";
import { ShoppingBagIcon, LockOpenIcon } from "@heroicons/react/solid";

const MarkeetplaceNavbar = () => {
  return (
    <div className="w-[720px]">
      <div className="bg-white rounded-b-xl navbar flex items-center justify-between p-3">
        <div className="navbar-header">
          <Link href="/">
            <a>
              <Image src={logo} width={234} height={45} placeholder="blur" />
            </a>
          </Link>
        </div>
        <div className="">
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-7">
              <Link href="">
                <a>
                  <SearchIcon className="text-slate-400 h-5 w-5" />
                </a>
              </Link>
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-5">
              <Link href="">
                <a>
                  <AdjustmentsIcon className="text-slate-400 h-5 w-5 rotate-90" />
                </a>
              </Link>
            </span>
            <input
              className="placeholder:text-slate-400 bg-white placeholder:text-xl w-72 rounded-full py-2 border-none pl-14"
              placeholder="Search Products"
              type="text"
              name="search"
            />
          </label>
        </div>
        <div className="bg-white p-1 w-44 h-11 flex justify-between items-center rounded-full">
          <Link href="">
            <a>
              <div className="relative">
                <ShoppingBagIcon className="text-slate-400 ml-4 h-5 w-5" />
                <div className="flex items-center justify-center absolute -top-1 -right-2 text-white w-4 h-4  text-xs bg-indigo-400 rounded-full">
                  0
                </div>
              </div>
            </a>
          </Link>
          <Link href="">
            <a>
              <div className="relative">
                <BellIcon className="text-slate-400 h-5 w-5" />
                <div className="flex items-center justify-center absolute top-0 right-0 text-white p-1  text-xs bg-red-400 rounded-full"></div>
              </div>
            </a>
          </Link>
          <Link href="">
            <a>
              <LockOpenIcon className="text-slate-400 h-5 w-5" />
            </a>
          </Link>
          <Link href="/">
            <a>
              <Image src={profile} width={35} height={35} placeholder="blur" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarkeetplaceNavbar;
