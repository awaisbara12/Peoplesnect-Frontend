import React from "react";
import { SearchIcon, LockOpenIcon } from "@heroicons/react/outline";
import Link from "next/link";

const NewsSearch = () => {
  return (
    <div className="flex items-center w-full mt-7 gap-4">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-7">
          <Link href="/">
            <a>
              <SearchIcon className="text-slate-400 h-5 w-5" />
            </a>
          </Link>
        </span>
        <input
          className="placeholder:text-slate-400 bg-white placeholder:text-xl w-60 rounded-full py-2 border-none pl-14"
          placeholder="Search"
          type="text"
          name="search"
        />
      </label>
      <div className="bg-blue-500 flex items-center justify-center rounded-full w-8 h-8 p-2">
        <LockOpenIcon className="text-white w-5 h-5" />
      </div>
    </div>
  );
};

export default NewsSearch;
