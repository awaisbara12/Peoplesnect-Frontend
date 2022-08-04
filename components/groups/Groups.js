import React, { Fragment } from "react";
import Image from "next/image";
import post from "../../public/images/groupcover.jpg";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { BellIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { signout } from "../auth/signout/SignOut";
import { Popover, Transition } from "@headlessui/react";
import Spinner from "../common/Spinner";
const Groups = () => {
  return (
    <div className="mt-8">
      <div className="px-10 w-[620px] xl:w-full">
        <div className="bg-white rounded-xl">
          <Image
            src={post}
            width={900}
            height={300}
            alt=""
            className="object-cover rounded-t-xl"
          />
          <div className="p-5">
            <div className="flex justify-between">
              <div className="heading text-2xl font-bold">Group Name</div>
              <div className="">
                <div className="">
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={` ${
                            open
                              ? ""
                              : "text-opacity-90 focus-visible:outline-none"
                          }`}
                        >
                          <div className="">
                            <DotsHorizontalIcon className="h-7 w-7" />
                          </div>
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
                          <Popover.Panel className="absolute left-5 z-10 top-6 w-36 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative bg-white py-2">
                                <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                  <div className="flex text-gray-900 gap-2">
                                    <a href="">
                                      <div className="">Notifications</div>
                                    </a>
                                  </div>
                                </a>
                                <Link href="">
                                  <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                    <div className="flex text-gray-900 gap-2">
                                      <a href="">
                                        <div className="">Report</div>
                                      </a>
                                    </div>
                                  </a>
                                </Link>
                                <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                  <div className="flex text-gray-900 gap-2">
                                    <div className="flex text-gray-900 gap-2">
                                      <div className="">Leave Group</div>
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
              </div>
            </div>
            <div className="my-5">
              <div className="group-discription text-lg font-extralight w-3/4">
                You Can Right Here Group Discription And Rules For Your Brand
                and products You Can Right Here Group Discription And Rules For
                Your Brand and products.....
              </div>
            </div>
            <div className="border py-2 flex justify-center items-center rounded-xl  border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
              Join The Group
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
