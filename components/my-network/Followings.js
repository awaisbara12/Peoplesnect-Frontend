import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import { SearchIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Followings = () => {
  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[1020px] lg:w-[720px] md:w-[760px] px-5 md:px-0 lg:px-0">
        <div className="bg-white rounded-xl">
          <div className="flex justify-between items-center border-b-1 p-4">
            <div className="heading">Total Followings</div>
            <div className="">15</div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
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
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                          >
                            Unfollow
                          </a>
                        )}
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
  );
};

export default Followings;
