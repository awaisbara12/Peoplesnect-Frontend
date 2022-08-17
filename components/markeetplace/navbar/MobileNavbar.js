import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/mobile-logo.png";
import profile from "../../../public/images/profile-avatar.png";
import {
  SearchIcon,
  AdjustmentsIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

const MobileNavbar = () => {
  return (
    <div>
      <div className="bg-white w-full rounded-b-xl p-2">
        <div className="flex justify-between items-center">
          <div className="search-input-bar">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Link href="">
                  <a>
                    <SearchIcon className="text-slate-400 h-5 w-5" />
                  </a>
                </Link>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Link href="">
                  <a>
                    <AdjustmentsIcon className="text-slate-400 h-5 w-5 rotate-90" />
                  </a>
                </Link>
              </span>
              <input
                className="placeholder:text-slate-400 bg-zinc-100 placeholder:text-xl w-36 rounded-full py-2 border-none pl-8"
                placeholder="Search"
                type="text"
                name="search"
              />
            </label>
          </div>
          <div className="navbar-logo">
            <Link href="/">
              <a>
                <Image src={logo} width={26} height={26} />
              </a>
            </Link>
          </div>
          <div className="flex items-center porfile gap-3">
            <Link href="">
              <a>
                <DotsHorizontalIcon className="h-5 w-5" />
              </a>
            </Link>
            <Link href="/">
              <a>
                <Image
                  src={profile}
                  width={35}
                  height={35}
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
