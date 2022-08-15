import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PageNotifications = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="w-[620px] px-5 md:px-0 lg:px-0">
          <div className="bg-white rounded-xl">
            <div className="border-b-1 p-4">
              <div className="heading">PageNotifications</div>
            </div>
            <div className="like-on-article border-b-1">
              <div className="request-profile flex  px-4 py-3 justify-between items-center">
                <div className="flex items-center gap-3">
                  <Link href="/news-feed">
                    <a>
                      <Image
                        src={ProfileAvatar}
                        width={35}
                        height={35}
                        alt=""
                      />
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm font-bold">
                        User Name
                      </div>
                    </a>
                    <Link href="">
                      <div className="userfield text-xs">
                        <a href="" className="font-bold text-blue-500">
                          User Name
                        </a>{" "}
                        Likes your{" "}
                        <a className="font-bold text-blue-500" href="">
                          Post
                        </a>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="time font-light text-xs">12:11pm</div>
              </div>
            </div>
            <div className="Comment-on-post border-b-1">
              <div className="request-profile flex  px-4 py-3 justify-between items-center">
                <div className="flex items-center gap-3">
                  <Link href="/news-feed">
                    <a>
                      <Image
                        src={ProfileAvatar}
                        width={35}
                        height={35}
                        alt=""
                      />
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm font-bold">
                        User Name
                      </div>
                    </a>
                    <Link href="">
                      <div className="userfield text-xs">
                        <a href="" className="font-bold text-blue-500">
                          User Name
                        </a>{" "}
                        Commented on ur{" "}
                        <a className="font-bold text-blue-500 " href="">
                          Post
                        </a>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="time font-light text-xs">12:11pm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotifications;
