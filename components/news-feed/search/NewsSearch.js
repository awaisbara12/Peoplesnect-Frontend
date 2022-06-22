import React from "react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { SearchIcon, LockOpenIcon } from "@heroicons/react/outline";

import { SIGN_OUT_API_KEY } from "../../../pages/config";

const NewsSearch = () => {
  const router = useRouter();

  const authKey = getCookie("authKey", { maxAge: 60 * 6 * 24 });

  const signOutData = () => {
    const signout = async () => {
      const res = await fetch(SIGN_OUT_API_KEY, {
        method: "DELETE",
        headers: {
          Authorization: `${authKey}`,
        },
      });

      const result = await res.json();

      try {
        if (result && 200) {
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    signout();
  };
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
        <LockOpenIcon
          onClick={() => signOutData()}
          className="text-white w-5 h-5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default NewsSearch;
