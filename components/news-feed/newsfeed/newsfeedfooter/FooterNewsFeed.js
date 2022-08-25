import React from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

const FooterNewsFeed = () => {
  return (
    <div className="bg-white sticky top-5 w-full mt-5 rounded-xl">
      <div className=" p-5 font-light text-base">
        <div className=" flex gap-4">
          <Link href="/">
            <a className="">about Us</a>
          </Link>
          <Link href="/">
            <a className="">Privacy & Terms</a>
          </Link>
        </div>
        <div className="flex mt-2 gap-5">
          <Link href="/">
            <a className="">Pages</a>
          </Link>
          <Link href="/">
            <a className="">Advertising</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterNewsFeed;
