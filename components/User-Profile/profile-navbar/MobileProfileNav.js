import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavbarLogo from "../../../public/images/logo-circle.png";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import { signout } from "../../auth/signout/SignOut";
import {
  BookmarkIcon,
  CogIcon,
  HashtagIcon,
  LogoutIcon,
  UserIcon,
} from "@heroicons/react/outline";
import {
  SearchIcon,
  UserGroupIcon,
  VideoCameraIcon,
  StarIcon,
} from "@heroicons/react/outline";
import Spinner from "../../common/Spinner";

const MobileProfileNav = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="fixed top-0 block lg:hidden md:hidden bg-white w-full rounded-b-2xl">
      <div className="h-14 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="">
            <Link href="/news-feed">
              <a>
                <Image src={NavbarLogo} width={35} height={35} alt="" />
              </a>
            </Link>
          </div>
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Link href="/news-feed">
                <a>
                  <SearchIcon className="text-slate-400 h-5 w-5" />
                </a>
              </Link>
            </span>
            <input
              className="placeholder:text-slate-400 bg-zinc-100 placeholder:text-xl w-48 h-7 rounded-full py-2 border-none pl-10"
              placeholder="Search"
              type="text"
              name="search"
            />
          </label>
        </div>
        <div className="relative">
          <Image
            src={ProfileAvatar}
            width={35}
            height={35}
            alt=""
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          <div
            className={`${open ? "w-0" : "w-96"
              } absolute h-screen z-50 right-0 overflow-hidden duration-500 rounded-xl bg-white`}
          >
            <div className="p-5">
              <div>
                <Link href="/profile">
                  <a className="flex items-center mb-8 gap-2">
                    <UserIcon className="h-7 w-7" />
                    <div className="font-bold">Profile</div>
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/news-feed">
                  <a className="flex items-center mb-8 gap-2">
                    <BookmarkIcon className="h-7 w-7" />
                    <div className="font-bold">Saved Items</div>
                  </a>
                </Link>
              </div>

              <div>
                <Link href="/markeet-place">
                  <a className="flex items-center mb-8 gap-2">
                    <StarIcon className="h-7 w-7" />
                    <div className="font-bold">MarketPlace</div>
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/group-page">
                  <a className="flex items-center mb-8 gap-2">
                    <UserGroupIcon className="h-7 w-7" />
                    <div className="font-bold">Groups</div>
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/page-design">
                  <a className="flex items-center mb-8 gap-2">
                    <VideoCameraIcon className="h-7 w-7" />
                    <div className="font-bold">Pages</div>
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/hashtag-design">
                  <a className="flex items-center mb-8 gap-2">
                    <HashtagIcon className="h-7 w-7" />
                    <div className="font-bold">Hashtags</div>
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/settings">
                  <a className="flex items-center mb-8 gap-2">
                    <CogIcon className="h-7 w-7" />
                    <div className="font-bold">Setting</div>
                  </a>
                </Link>
              </div>
              <div className="flex gap-2">
                {signout ? (
                  <a
                    onClick={() => signout()}
                    className="flex gap-2 cursor-pointer"
                  >
                    <LogoutIcon className="h-5 w-5" />
                    <div className="font-bold">SignOut</div>
                  </a>
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileProfileNav;
