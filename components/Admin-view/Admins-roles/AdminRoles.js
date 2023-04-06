import React, { Component, Fragment } from 'react';
import Link from "next/link";
import Image from "next/image";
import { CogIcon, SearchIcon } from '@heroicons/react/solid';
import ProfileLogo from "../../../public/images/profile-avatar.png";
import { DotsHorizontalIcon, TrashIcon } from '@heroicons/react/outline';
import { Popover, Transition } from '@headlessui/react';
class AdminRoles extends Component {
  render() {
    return (
      <div className="mt-8">
        <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="mt-8">
            <div>
              <div className="text-center">
                <div className="heading text-4xl font-semibold text-indigo-400">Admin Roles</div>
                <div className="relative w-1/2 mx-auto mt-4">
                  <input
                    className="placeholder:text-md placeholder:text-indigo-500 pl-12  hover:shadow-lg bg-white placeholder:rounded-full  border-indigo-400 w-full rounded-full"
                    placeholder="Search User Name"
                    type="text"
                    name="search"
                  />
                  <div className="absolute top-3 left-6">
                    <SearchIcon className="h-5 w-5 text-indigo-400" />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <div className="">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="hover:shadow-2xl shadow-lg bg-white flex items-center justify-between rounded-xl p-2">
                      <Link href="/User-Profile">
                        <a>
                          <div className="flex gap-2 items-center">
                            <Image
                              src={ProfileLogo}
                              width={40}
                              height={40}
                              placeholder="blur"
                              className="object-fit rounded-full"
                              alt=""
                            />
                            <div className="text-sm">
                              <div className="font-bold text-indigo-400">User Name</div>
                              <div className="font-extralight">User Location</div>
                            </div>
                          </div>
                        </a>
                      </Link>
                      <Link href="">
                        <a>
                          <div className="">
                            <Popover className="relative">
                              {({ open }) => (
                                <>
                                  <Popover.Button
                                    className={` ${open
                                      ? ""
                                      : "text-opacity-90 focus-visible:outline-none"
                                      }`}
                                  >
                                    <DotsHorizontalIcon className="h-5 w-5 text-indigo-400" />
                                  </Popover.Button>
                                  <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                  >
                                    <Popover.Panel className="absolute left-3 z-50 mt-2 w-36 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-xl">
                                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="relative bg-white py-2">
                                          <Link href="/news-feed">
                                            <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                              <div className="flex text-gray-900 gap-2">
                                                <a href="">
                                                  <div className="">Make Admin</div>
                                                </a>
                                              </div>
                                            </a>
                                          </Link>
                                          <Link href="/settings">
                                            <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                              <div className="flex text-gray-900 gap-2">
                                                <a href="">
                                                  <div className="">Make Manager</div>
                                                </a>
                                              </div>
                                            </a>
                                          </Link>
                                          <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                            <div className="flex text-gray-900 gap-2">
                                              <div className="flex text-gray-900 gap-2">
                                                <a
                                                  className="cursor-pointer"
                                                >
                                                  <div className="">Delet User</div>
                                                </a>
                                              </div>
                                            </div>
                                          </a>
                                        </div>
                                      </div>
                                    </Popover.Panel>
                                  </Transition>
                                </>
                              )}
                            </Popover>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="mt-8 text-center">
                <Button className="border-indigo-400 border text-indigo-400 rounded-full">Show More </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminRoles;