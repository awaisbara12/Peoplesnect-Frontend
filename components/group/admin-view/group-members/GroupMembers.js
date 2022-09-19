import React from "react";
import { Fragment } from "react";

import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import { Menu, Transition } from "@headlessui/react";
import {
  DotsCircleHorizontalIcon,
  SearchCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { DotsHorizontalIcon } from "@heroicons/react/solid";

const GroupMembers = () => {
  return (
    <div className="mt-8">
    <div className="w-[600px] xl:w-[980px] lg:w-[710px] md:w-[780px] px-5 md:px-0 lg:px-0 xl:px-0">
        <div className="bg-white p-5 hover:bg-gray-100 border rounded-xl">
          <Link href="/group-page/admin-view/group-members/group-admins">
            <a>
              <div className="flex items-center justify-between ">
                <div className="">Group Members</div>
                <div className="">5</div>
              </div>
            </a>
          </Link>
        </div>
        <div className="bg-white rounded-xl mt-8">
          <div className="flex justify-between items-center border-b-1 p-4">
            <div className="heading">Group Members</div>
            <div className=""> 148</div>
          </div>
          <div className="relative text-gray-500 flex justify-end mt-5 mr-5">
            <input
              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-48 xs:w-auto placeholder:pl-2 rounded-full placeholder:py-2"
              placeholder="Search by Name"
              type="text"
              name="search"
            />
            <Link href="">
              <a>
                <SearchIcon className="w-5 h-5 absolute top-3 right-3" />
              </a>
            </Link>
          </div>
          <div className="border-b-1">
            <div className="request-profile flex  px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <Link href="/news-feed">
                  <a>
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                  </a>
                </Link>
                <div className="">
                  <a href="">
                    <div className="username text-sm font-bold">User Name</div>
                  </a>
                  <a href="">
                    <div className="userfield text-xs">User Added by</div>
                  </a>
                  <a href="">
                    <div className="mutual-followers text-xs">
                      Friends Add in Group
                    </div>
                  </a>
                </div>
              </div>
              <div className="">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="">
                      <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                        <DotsHorizontalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Menu.Items className="absolute left-1/2 z-10 mt-3 w-48 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                      <div className="flex items-start flex-col gap-2 border-1 bg-white rounded-xl p-3">
                        <Menu.Item className="flex gap-1">
                          <a href="">Remove This Member</a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">Block This Member</a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">Make Admin</a>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <div className="border-b-1">
            <div className="request-profile flex  px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <Link href="/news-feed">
                  <a>
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                  </a>
                </Link>
                <div className="">
                  <a href="">
                    <div className="username text-sm font-bold">User Name</div>
                  </a>
                  <a href="">
                    <div className="userfield text-xs">User Added by</div>
                  </a>
                  <a href="">
                    <div className="mutual-followers text-xs">
                      Friends Add in Group
                    </div>
                  </a>
                </div>
              </div>
              <div className="">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="">
                      <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                        <DotsHorizontalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Menu.Items className="absolute left-1/2 z-10 mt-3 w-48 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                      <div className="flex items-start flex-col gap-2 border-1 bg-white rounded-xl p-3">
                        <Menu.Item className="flex gap-1">
                          <a href="">Remove This Member</a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">Block This Member</a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">Make Admin</a>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <div className="border-b-1">
            <div className="request-profile flex  px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <Link href="/news-feed">
                  <a>
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                  </a>
                </Link>
                <div className="">
                  <a href="">
                    <div className="username text-sm font-bold">User Name</div>
                  </a>
                  <a href="">
                    <div className="userfield text-xs">User Added by</div>
                  </a>
                  <a href="">
                    <div className="mutual-followers text-xs">
                      Friends Add in Group
                    </div>
                  </a>
                </div>
              </div>
              <div className="">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="">
                      <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                        <DotsHorizontalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Menu.Items className="absolute left-1/2 z-10 mt-3 w-48 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                      <div className="flex items-start flex-col gap-2 border-1 bg-white rounded-xl p-3">
                        <Menu.Item className="flex gap-1">
                          <a href="">Remove This Member</a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">Block This Member</a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">Make Admin</a>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <div className="border-b-1">
            <div className="request-profile flex  px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <Link href="/news-feed">
                  <a>
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                  </a>
                </Link>
                <div className="">
                  <a href="">
                    <div className="username text-sm font-bold">User Name</div>
                  </a>
                  <a href="">
                    <div className="userfield text-xs">User Added by</div>
                  </a>
                  <a href="">
                    <div className="mutual-followers text-xs">
                      Friends Add in Group
                    </div>
                  </a>
                </div>
              </div>
              <div className="">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="">
                      <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                        <DotsHorizontalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Menu.Items className="absolute left-1/2 z-10 mt-3 w-48 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                      <div className="flex items-start flex-col gap-2 border-1 bg-white rounded-xl p-3">
                        <Menu.Item className="flex gap-1">
                          <a href="">Remove This Member</a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">Block This Member</a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">Make Admin</a>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <div className="border-b-1">
            <div className="request-profile flex  px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <Link href="/news-feed">
                  <a>
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                  </a>
                </Link>
                <div className="">
                  <a href="">
                    <div className="username text-sm font-bold">User Name</div>
                  </a>
                  <a href="">
                    <div className="userfield text-xs">User Added by</div>
                  </a>
                  <a href="">
                    <div className="mutual-followers text-xs">
                      Friends Add in Group
                    </div>
                  </a>
                </div>
              </div>
              <div className="">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="">
                      <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                        <DotsHorizontalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Menu.Items className="absolute left-1/2 z-10 mt-3 w-48 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                      <div className="flex items-start flex-col gap-2 border-1 bg-white rounded-xl p-3">
                        <Menu.Item className="flex gap-1">
                          <a href="">Remove This Member</a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">Block This Member</a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">Make Admin</a>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMembers;
