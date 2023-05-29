import React from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

const ProfileFooter = () => {
  return (
    <div className="bg-white sticky top-5 w-full mt-5 rounded-xl">
      <div className=" p-5 font-light text-base">
        <div className=" flex gap-3 flex-wrap">
          <Link href="/">
            <a>about Us</a>
          </Link>
          <Link href="/">
            <a>Privacy & Terms</a>
          </Link>
          <Link href="/page-design">
            <a>Pages</a>
          </Link>
          <Link href="/">
            <a>Advertising</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileFooter;
