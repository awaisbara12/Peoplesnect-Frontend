import React from "react";
import Link from "next/link";
import Image from "next/image";
import Post from "../../../public/images/product3.png";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/solid";
const TabSavedProfile = () => {
  return (
    <>
      <div className="bg-white rounded-xl p-5">
        <div className="font-extrabold mb-5">Saved Items</div>
        <div className="p-2 border-b-1">
          <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2  gap-12">
          <div className="py-5">
            <div className="flex flex-col justify-between gap-3">
              <div className="">
                <Link href="">
                  <a href="">
                    <Image
                      src={Post}
                      width={725}
                      height={305}
                      className="object-cover rounded-xl"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="flex justify-between items-center">
                <div className="time font-light text-xs">12:11pm</div>
                <div className="flex gap-2 font-light text-sm">
                  <div>Saved</div>
                  <BookmarkIcon className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="flex flex-col justify-between gap-3">
              <div className="">
                <Link href="">
                  <a href="">
                    <Image
                      src={Post}
                      width={725}
                      height={305}
                      className="object-cover rounded-xl"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="flex justify-between items-center">
                <div className="time font-light text-xs">12:11pm</div>
                <div className="flex gap-2 font-light text-sm">
                  <div>Saved</div>
                  <BookmarkIcon className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
          <Link href="">
            <a>
              <div className="flex justify-center font-bold items-center mt-10">
                Show All Saved Items
                <ChevronRightIcon className="h-5 w-5" />
              </div>
            </a>
          </Link>
        </div>
    </>
  );
};

export default TabSavedProfile;
