import React from "react";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import {
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  ChatAltIcon,
  BellIcon,
  LibraryIcon,
  UserGroupIcon,
  UserAddIcon,
  BookmarkIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
} from "@heroicons/react/solid";

const MobileBottomBar = () => {
  return (
    <div className="fixed bottom-0 block lg:hidden md:hidden bg-white w-full rounded-t-2xl">
      <div className="h-14 px-4 flex justify-between items-center">
        <div className="">
          <Link href="/news-feed">
            <a className="flex flex-col items-center">
              <HomeIcon className="text-gray-900 h-7 w-7" />
              <div className="">Home</div>
            </a>
          </Link>
        </div>
        <div className="">
          <Link href="/blog">
            <a className="flex flex-col items-center">
              <LibraryIcon className="h-7 w-7" />
              <div className="">Articles</div>
            </a>
          </Link>
        </div>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex flex-col items-center">
              <BriefcaseIcon className="h-7 w-7" aria-hidden="true" />
              <div className="">Jobs</div>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute -top-24 w-96 -left-36 bg-white border-2 border-indigo-400 rounded-full py-3 px-4 text-indigo-400">
              <div className="flex justify-between items-center">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/jobs" className="">
                      <a>
                        <div className="flex flex-col items-center">
                          <BookmarkIcon className="h-7 w-7" />
                          <div className="">My Jobs</div>
                        </div>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/jobs" className="">
                      <a>
                        <div className="flex flex-col items-center">
                          <ShieldCheckIcon className="h-7 w-7" />
                          <div className="">Applied Jobs</div>
                        </div>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/jobs" className="">
                      <a>
                        <div className="flex flex-col items-center">
                          <AcademicCapIcon className="h-7 w-7" />
                          <div className="">Find Jobs</div>
                        </div>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex flex-col items-center">
              <UsersIcon className="h-7 w-7" aria-hidden="true" />
              <div className="">My Network</div>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute -top-24 w-96 -left-36 bg-white border-2 border-indigo-400 rounded-full p-3 text-indigo-400">
              <div className="flex gap-3 justify-between items-center">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/my-network/Peending-Request" className="">
                      <a>
                        <div className="flex flex-col items-center">
                          <UserAddIcon className="h-7 w-7" />
                          <div className="">Pending Requests</div>
                        </div>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/my-network" className="">
                      <a>
                        <div className="flex flex-col items-center">
                          <UserGroupIcon className="h-7 w-7" />
                          <div className="">Connections</div>
                        </div>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/my-network/Followings" className="">
                      <a>
                        <div className="flex flex-col items-center">
                          <UsersIcon className="h-7 w-7" />
                          <div className="">Followings</div>
                        </div>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="">
          <Link href="/news-feed">
            <a className="flex flex-col items-center">
              <ChatAltIcon className="h-7 w-7" />
              <div className="">Chat</div>
            </a>
          </Link>
        </div>
        <div className="">
          <Link href="/notifications">
            <a className="flex flex-col items-center">
            <div className="relative">
                  <BellIcon className="h-7 w-7" />
                  <div className="bg-red-400 h-4 w-4 text-white -top-1 left-3 rounded-full flex justify-center items-center absolute">
                    <p className="text-[8px]">2</p>
                  </div>
                </div>
              <div className="">Notifications</div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileBottomBar;
