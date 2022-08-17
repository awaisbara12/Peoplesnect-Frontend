import React, { Fragment } from "react";
import Link from "next/link";
import { signout } from "../../auth/signout/SignOut";
import { CogIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";
import Spinner from "../../common/Spinner";

const PageSearch = () => {
  return (
    <div className="sticky top-7 z-50 flex items-center w-full mt-7 gap-2">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-7">
          <Link href="/">
            <a>
              <SearchIcon className="text-slate-400 h-5 w-5" />
            </a>
          </Link>
        </span>
        <input
          className="placeholder:text-slate-400 hover:shadow-xl bg-white placeholder:text-xl w-60 rounded-full py-2 border-none pl-14"
          placeholder="Search Pages"
          type="text"
          name="search"
        />
      </label>
      <div className="">
        <div className="">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={` ${
                    open ? "" : "text-opacity-90 focus-visible:outline-none"
                  }`}
                >
                  <div className="">
                    <CogIcon className="w-7 h-7 text-blue-500" />
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
                  <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-36 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative bg-white py-2">
                        <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                          <div className="flex text-gray-900 gap-2">
                            <a href="">
                              <div className="">My Profile</div>
                            </a>
                          </div>
                        </a>
                        <Link href="/settings">
                          <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                            <div className="flex text-gray-900 gap-2">
                              <a href="">
                                <div className="">Settings</div>
                              </a>
                            </div>
                          </a>
                        </Link>
                        <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                          <div className="flex text-gray-900 gap-2">
                            <div className="flex text-gray-900 gap-2">
                              {signout ? (
                                <a
                                  onClick={() => signout()}
                                  className="w-5 h-5 cursor-pointer"
                                >
                                  <div className="">SignOut</div>
                                </a>
                              ) : (
                                <Spinner />
                              )}
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
  );
};

export default PageSearch;
