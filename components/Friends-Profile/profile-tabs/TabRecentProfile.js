import React from "react";
import Link from "next/link";
import Image from "next/image";
import Post from "../../../public/images/product3.png";
import { ChevronRightIcon } from "@heroicons/react/outline";
const TabRecentProfile = () => {
  return (
    <>
      <div className="bg-white rounded-xl p-5">
        <div className="font-extrabold mb-5">Recent Activity</div>
        <div className="p-2">
          <div className="border-b-1 py-5">
            <div className="flex justify-between gap-3">
              <div className="flex flex-col gap-2">
                <a href="">
                  <div className="">You Like a post</div>
                </a>
                <Link href="">
                  <a href="">
                    <Image
                      src={Post}
                      width={95}
                      height={55}
                      className="object-cover rounded-xl"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="time font-light text-xs">12:11pm</div>
            </div>
          </div>
          <div className="border-b-1 py-5">
            <div className="flex justify-between gap-3">
              <div className="flex flex-col gap-2">
                <a href="">
                  <div className="">You Commented on a post</div>
                </a>
                <Link href="">
                  <a href="">
                    <Image
                      src={Post}
                      width={95}
                      height={55}
                      className="object-cover rounded-xl"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="time font-light text-xs">12:11pm</div>
            </div>
          </div>
          <div className="border-b-1 py-5">
            <div className="flex justify-between gap-3">
              <div className="flex flex-col gap-2">
                <a href="">
                  <div className="">You Shared a post</div>
                </a>
                <Link href="">
                  <a href="">
                    <Image
                      src={Post}
                      width={95}
                      height={55}
                      className="object-cover rounded-xl"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="time font-light text-xs">12:11pm</div>
            </div>
          </div>
          <Link href="">
            <a>
              <div className="flex justify-center font-bold items-center mt-10">
                Show All Activity
                <ChevronRightIcon className="h-5 w-5" />
              </div>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TabRecentProfile;
