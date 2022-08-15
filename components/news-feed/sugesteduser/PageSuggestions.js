import React from "react";
import Link from "next/link";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { ThumbUpIcon } from "@heroicons/react/solid";

const PageSuggesions = () => {
  return (
    <>
      <div className="text-base font-bold leading-5">Liked Pages</div>
      <Link href="liked-pages">
        <a href="">
          <div className="px-3 py-2 hover:bg-gray-300 rounded-xl flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center">
              <ThumbUpIcon className="w-5 h-5" />
              <p className="text-base font-semibold">Page Name</p>
            </div>
          </div>
        </a>
      </Link>
      <Link href="liked-pages">
        <a href="">
          <div className="px-3 py-2 hover:bg-gray-300 rounded-xl flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center">
              <ThumbUpIcon className="w-5 h-5" />
              <p className="text-base font-semibold">Page Name</p>
            </div>
          </div>
        </a>
      </Link>
      <Link href="liked-pages">
        <a href="">
          <div className="px-3 py-2 hover:bg-gray-300 rounded-xl flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center">
              <ThumbUpIcon className="w-5 h-5" />
              <p className="text-base font-semibold">Page Name</p>
            </div>
          </div>
        </a>
      </Link>
      <Link href="/">
        <a>
          <DotsHorizontalIcon className="h-5 w-5 mx-auto mt-5" />
        </a>
      </Link>
    </>
  );
};

export default PageSuggesions;
