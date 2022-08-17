import React from "react";
import Link from "next/link";
import Image from "next/image";
import Compnylogo from "../../public/images/compny-logo.png";
import Compnylogo1 from "../../public/images/logo1.jpeg";
import Compnylogo2 from "../../public/images/logo2.jpeg";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  BookmarkIcon,
  ClipboardCopyIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RecommendedJobs = () => {
  return (
    <div className="mt-8">
      <div className="w-[620px] px-5 md:px-0 lg:px-0">
        <div className="bg-white rounded-xl">
          <div className="border-b-1 p-4">
            <div className="heading font-bold">Recommended for you</div>
            <div className="font-extralight mt-1">
              Based on your profile
            </div>
          </div>
          <div className="border-b-1">
            <div className="jobs-profile px-4 py-10 ">
              <div className="flex  justify-between">
                <div className="flex items-center gap-5">
                  <Link href="/news-feed">
                    <a>
                      <Image src={Compnylogo} width={92} height={92} alt="" />
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm font-bold">
                        Software Development Engineer - Graduate 2021/2022,
                        Trilogy (Remote) - $60,000/year USD
                      </div>
                    </a>
                    <a href="">
                      <div className="userfield font-light">Company Type</div>
                    </a>
                    <a href="">
                      <div className="userfield font-extralight">
                        Company Location
                      </div>
                    </a>

                    <div className="mt-8 font-thin">job Posted 2days Ago</div>
                  </div>
                </div>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center">
                      <DotsHorizontalIcon
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
                    <Menu.Items className="absolute top-6 -left-12">
                      <div className="flex items-start flex-col gap-2 border-1 rounded-xl p-2">
                        <Menu.Item>
                          {({ active }) => (
                            <a href="#" className={classNames("text-sm flex")}>
                              <BookmarkIcon className="h-5 w-5" />
                              Save
                            </a>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "" : "",
                                "text-sm flex"
                              )}
                            >
                              <ClipboardCopyIcon className="h-5 w-5" />
                              Share
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
          <div className="border-b-1">
            <div className="jobs-profile px-4 py-10 ">
              <div className="flex  justify-between">
                <div className="flex items-center gap-5">
                  <Link href="/news-feed">
                    <a>
                      <Image src={Compnylogo1} width={92} height={92} alt="" />
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm font-bold">
                        Social Media Evaluation Project for Online Mystery
                        Shoppers for Punjabi Speakers in Pakistan
                      </div>
                    </a>
                    <a href="">
                      <div className="userfield font-light">Company Type</div>
                    </a>
                    <a href="">
                      <div className="userfield font-extralight">
                        Company Location
                      </div>
                    </a>

                    <div className="mt-8 font-thin">job Posted 2days Ago</div>
                  </div>
                </div>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center">
                      <DotsHorizontalIcon
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
                    <Menu.Items className="absolute top-6 -left-12">
                      <div className="flex items-start flex-col gap-2 border-1 rounded-xl p-2">
                        <Menu.Item>
                          {({ active }) => (
                            <a href="#" className={classNames("text-sm flex")}>
                              <BookmarkIcon className="h-5 w-5" />
                              Save
                            </a>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "" : "",
                                "text-sm flex"
                              )}
                            >
                              <ClipboardCopyIcon className="h-5 w-5" />
                              Share
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

          <div className="border-b-1">
            <div className="jobs-profile px-4 py-10 ">
              <div className="flex  justify-between">
                <div className="flex items-center gap-5">
                  <Link href="/news-feed">
                    <a>
                      <Image src={Compnylogo2} width={92} height={92} alt="" />
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm font-bold">
                        UI/UX Designer / Frontend Developer
                      </div>
                    </a>
                    <a href="">
                      <div className="userfield font-light">Company Type</div>
                    </a>
                    <a href="">
                      <div className="userfield font-extralight">
                        Company Location
                      </div>
                    </a>

                    <div className="mt-8 font-thin">job Posted 2days Ago</div>
                  </div>
                </div>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center">
                      <DotsHorizontalIcon
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
                    <Menu.Items className="absolute top-6 -left-12">
                      <div className="flex items-start flex-col gap-2 border-1 rounded-xl p-2">
                        <Menu.Item>
                          {({ active }) => (
                            <a href="#" className={classNames("text-sm flex")}>
                              <BookmarkIcon className="h-5 w-5" />
                              Save
                            </a>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "" : "",
                                "text-sm flex"
                              )}
                            >
                              <ClipboardCopyIcon className="h-5 w-5" />
                              Share
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
          <div className="border-b-1 py-4">
            <div className="text-center">
              <Link className="" href="">
                <a className="text-blue-500">Search For More Jobs</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedJobs;
