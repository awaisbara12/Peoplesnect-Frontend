import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarLogo from "../../../public/images/logo.png";
import {
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  ChatAltIcon,
  BellIcon,
  NewspaperIcon,
} from "@heroicons/react/solid";
import ProfileSearch from "./ProfileSearch";

const ProfileNavbar = () => {
  return (
    <div className="bg-white px-5 rounded-xl flex justify-between items-center py-4">
      <div className="navbar-brand text-center">
        <Link href="/news-feed">
          <a>
            <Image
              src={NavbarLogo}
              width={234}
              height={45}
              placeholder="blur"
              alt=""
            />
          </a>
        </Link>
      </div>
      <ul>
        <div className="flex items-center gap-6">
          <Link href="/news-feed" className="">
            <a>
              <li className="flex font-normal text-xl items-center flex-col gap-1">
                <HomeIcon className="h-7 w-7" />
                <div className="text-sm">Home</div>
              </li>
            </a>
          </Link>
          <Link href="/jobs" className="">
            <a>
              <li className="flex font-normal text-xl items-center flex-col gap-1">
                <BriefcaseIcon className="h-7 w-7" />
                <div className="text-sm">Jobs</div>
              </li>
            </a>
          </Link>

          <Link href="/markeet-place" className="">
            <a>
              <li className="flex font-normal text-xl items-center flex-col gap-1">
                <BriefcaseIcon className="h-7 w-7" />
                <div className="text-sm">Marketplace</div>
              </li>
            </a>
          </Link>
          <Link href="/blog" className="">
            <a>
              <li className="flex font-normal text-xl items-center flex-col gap-1">
                <NewspaperIcon className="h-7 w-7" />
                <div className="text-sm">Articles</div>
              </li>
            </a>
          </Link>
          <Link href="/my-network" className="">
            <a>
              <li className="flex font-normal text-xl items-center flex-col gap-1">
                <UsersIcon className="h-7 w-7" />
                <div className="text-sm">My Network</div>
              </li>
            </a>
          </Link>
          <Link href="/messaging-design" className="">
            <a>
              <li className="flex font-normal text-xl items-center flex-col gap-1">
                <ChatAltIcon className="h-7 w-7" />
                <div className="text-sm">Messaging</div>
              </li>
            </a>
          </Link>
          <Link href="/notifications" className="">
            <a>
              <li className="flex font-normal text-xl items-center flex-col gap-1">
                <div className="relative">
                  <BellIcon className="h-7 w-7" />
                  <div className="bg-red-400 h-4 w-4 text-white -top-1 left-3 rounded-full flex justify-center items-center absolute">
                    <p className="text-[8px]">2</p>
                  </div>
                </div>
                <div className="text-sm">Notifications</div>
              </li>
            </a>
          </Link>
          <div className="">
            <ProfileSearch />
          </div>
        </div>
      </ul>
    </div>
  );
};

export default ProfileNavbar;
