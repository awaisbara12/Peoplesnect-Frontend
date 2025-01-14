import React, { Fragment } from "react";
import Link from "next/link";
import { signout } from "../../auth/signout/SignOut";
import { AdjustmentsIcon, CogIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";
import Spinner from "../../common/Spinner";

const NewsSearch = () => {
  return (
    <div className="sticky top-7 z-50 flex items-center w-full mt-7 gap-2">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-7">
          <Link href="/">
            <a>
              <SearchIcon className="text-slate-400 h-5 w-5" />
            </a>
          </Link>
        </span>
        <input
          className="placeholder:text-slate-400 hover:shadow-xl bg-white placeholder:text-xl w-60 rounded-full py-2 border-none pl-14"
          placeholder="Search"
          type="text"
          name="search"
        />
      </label>
    </div>
  );
};

export default NewsSearch;
