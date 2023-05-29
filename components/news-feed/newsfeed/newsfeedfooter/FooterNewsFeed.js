import React from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

const FooterNewsFeed = () => {
  return (
    <div className="bg-white mt-5 rounded-xl">
      <div className=" p-5 text-sm font-light">
        <div className="grid grid-cols-2">
          <Link href="/Contact-us">
            <a className="">Contact Us</a>
          </Link>
          <Link href="/About-us">
            <a className="">about Us</a>
          </Link>
          <Link href="/news-feed">
            <a className="">Privacy & Terms</a>
          </Link>
          <Link href="/Pages">
            <a className="">Pages</a>
          </Link>
          <Link href="/page">
            <a className="">Advertising</a>
          </Link>
      </div>
      </div>
    </div>
  );
};

export default FooterNewsFeed;
