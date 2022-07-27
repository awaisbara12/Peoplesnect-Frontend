import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchIcon, DotsHorizontalIcon } from "@heroicons/react/outline";
import NavbarLogo from "../../../../public/images/logo-circle.png";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";

const MyNetWorkNav = () => {
  return (
    <div className="block lg:hidden md:hidden">
      <div className="flex sticky top-0 justify-between w-[625px] mx-auto h-14 items-center bg-white rounded-b-2xl px-4">
        <div className="">
          <label className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Link href="/news-feed">
                <a>
                  <SearchIcon className="text-slate-400 h-5 w-5" />
                </a>
              </Link>
            </span>
            <input
              className="placeholder:text-slate-400 bg-zinc-100 placeholder:text-xl w-52 h-7 rounded-full py-2 border-none pl-10"
              placeholder="Search by Name"
              type="text"
              name="search"
            />
          </label>
        </div>
        <div className="-ml-32">
          <Link href="/news-feed">
            <a>
              <Image src={NavbarLogo} width={35} height={35} alt="" />
            </a>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <DotsHorizontalIcon className="w-5 h-5" />
          <Link href="/news-feed">
            <a>
              <Image src={ProfileAvatar} width={35} height={35} alt="" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyNetWorkNav;
