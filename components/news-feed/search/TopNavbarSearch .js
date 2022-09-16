import React, { Fragment } from "react";
import Link from "next/link";
import { signout } from "../../auth/signout/SignOut";
import { CogIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";

const TopNavbarSearch = () => {
  return (
    <div className="flex items-center gap-2">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-7">
          <Link href="/">
            <a>
              <SearchIcon className="text-slate-400 h-5 w-5" />
            </a>
          </Link>
        </span>
        <input
          className="placeholder:text-slate-400 hover:shadow-xl bg-gray-100 w-62 md:w-56  rounded-xl border-none pl-14"
          placeholder="Search"
          type="text"
          name="search"
        />
      </label>
    </div>
  );
};

export default TopNavbarSearch;
