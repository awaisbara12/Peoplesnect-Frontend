import React from "react";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import {
  BookmarkIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";

const JobsSideBar = () => {
  return (
    <div>
      <div className="bg-white p-5 mt-5 rounded-xl">
        <div className="">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex font-normal text-xl items-center gap-3 mt-2">
                <BookmarkIcon className="h-5 w-5" aria-hidden="true" />
                <div className="">My Jobs</div>
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
              <Menu.Items className="absolute w-40 top-3 left-40 rounded-xl bg-white border-2 p-2 z-50">
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/jobs/posted-jobs" className="">
                        <a>
                          <div className="flex items-center gap-2 py-2 border-b-1">
                            <div className="">Posted Jobs</div>
                          </div>
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/jobs/saved-jobs" className="">
                        <a>
                          <div className="flex items-center gap-2 my-2">
                            <div className="">Saved Jobs</div>
                          </div>
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <Link href="/jobs/applied-jobs" className="">
          <a>
            <div className="flex font-normal text-xl items-center gap-3 mt-2">
              <ShieldCheckIcon className="h-5 w-5" />
              <div className="">Applied Jobs</div>
            </div>
          </a>
        </Link>
        {/* <Link href="/jobs" className="">
          <a>
            <div className="flex font-normal text-xl items-center gap-3 mt-2">
              <AcademicCapIcon className="h-5 w-5" />
              <div className="">New Jobs</div>
            </div>
          </a>
        </Link> */}
      </div>
    </div>
  );
};

export default JobsSideBar;
