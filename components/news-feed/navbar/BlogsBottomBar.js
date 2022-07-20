import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  ChatAltIcon,
  BellIcon,
  LibraryIcon,
  PlusSmIcon,
} from "@heroicons/react/solid";

const BlogsBottomBar = () => {
  return (
    <div className="fixed bottom-0 block lg:hidden md:hidden bg-white w-full rounded-t-2xl">
      <div className="h-14 px-4 flex justify-between items-center">
        <div className="">
          <Link href="/news-feed">
            <a className="flex flex-col items-center">
              <HomeIcon className="text-gray-900 h-7 w-7" />
              <div className="">Home</div>
            </a>
          </Link>
        </div>
        <div className="">
          <Link href="/news-feed">
            <a className="flex flex-col items-center">
              <BriefcaseIcon className="h-7 w-7" />
              <div className="">Jobs</div>
            </a>
          </Link>
        </div>
        <div className="">
          <Link href="/blog">
            <a className="flex flex-col items-center">
              <LibraryIcon className="h-7 w-7" />
              <div className="">Articles</div>
            </a>
          </Link>
        </div>
        <div className="">
          <Link href="/news-feed">
            <a className="flex flex-col items-center">
              <UsersIcon className="h-7 w-7" />
              <div className="">My Network</div>
            </a>
          </Link>
        </div>
        <div className="">
          <Link href="/news-feed">
            <a className="flex flex-col items-center">
              <ChatAltIcon className="h-7 w-7" />
              <div className="">Chat</div>
            </a>
          </Link>
        </div>
        <div className="">
          <Link href="/news-feed">
            <a className="flex flex-col items-center">
              <BellIcon className="h-7 w-7" />
              <div className="">Notifications</div>
            </a>
          </Link>
        </div>
        <div className="">
          <Link href="/blog/new-blog">
            <a className="flex flex-col items-center">
              <PlusSmIcon className="h-7 w-7" />
              <div className="">Add Blog</div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BlogsBottomBar;