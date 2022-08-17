import React from "react";
import Link from "next/link";
import { DotsHorizontalIcon, PlusIcon } from "@heroicons/react/outline";
import { ThumbUpIcon } from "@heroicons/react/solid";

const PageSuggesions = () => {
  return (
    <>
      <div className="text-base font-bold leading-5">Liked Pages</div>
      <Link href="/page-design/liked-pages">
        <a href="">
          <div className="px-3 py-2 hover:bg-gray-100 rounded-xl flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center">
              <ThumbUpIcon className="w-5 h-5" />
              <p className="text-base font-semibold">Page Name</p>
            </div>
          </div>
        </a>
      </Link>
      <Link href="/page-design/liked-pages">
        <a href="">
          <div className="px-3 py-2 hover:bg-gray-100 rounded-xl flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center">
              <ThumbUpIcon className="w-5 h-5" />
              <p className="text-base font-semibold">Page Name</p>
            </div>
          </div>
        </a>
      </Link>
      <Link href="/page-design/liked-pages">
        <a href="">
          <div className="px-3 py-2 hover:bg-gray-100 rounded-xl flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center">
              <ThumbUpIcon className="w-5 h-5" />
              <p className="text-base font-semibold">Page Name</p>
            </div>
          </div>
        </a>
      </Link>
      <Link href="/page-design/new-page">
        <a className="mt-2 flex gap-1 border bg-gray-100 justify-center rounded-full p-2">
          <PlusIcon className="h-5 w-5" />
          Creat New Page
        </a>
      </Link>
    </>
  );
};

export default PageSuggesions;
