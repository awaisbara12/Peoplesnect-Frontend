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
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 xl:px-0 lg:px-0">
        <div className="">
          <div className="bg-white rounded-xl p-3 mb-4">
            <div className="heading font-bold">Recommended for you</div>
            <div className="font-extralight mt-1">Based on your profile</div>
          </div>
          <div className="">
            <div className="grid grid-cols-2 gap-12">
            <div className="jobs-profile bg-white rounded-xl p-4">
              <div className="flex  justify-between">
                <div className="">
                  <Link href="/jobs/jobs-show">
                    <a>
                      <Image src={Compnylogo} width={65} height={65} alt="" />
                      <div className="userfield font-extrabold">Job title</div>
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm mt-2 font-light">
                        Software Development Engineer - Graduate 2021/2022,
                        Trilogy (Remote) - $60,000/year USD
                      </div>
                    </a>
                    <a href="">
                      <div className="userfield text-sm font-bold">
                        Company Location
                      </div>
                    </a>
                    <div className="mt-2 font-thin">job Posted 2days Ago</div>
                  </div>
                  <div className="flex gap-4 mt-5">
                  <button className="bg-indigo-400 p-2 text-white rounded-full">Apply Now</button>
                  <button className="border-indigo-400 border p-2 text-indigo-400 rounded-full">Message</button>
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
                  <Menu.Items className="absolute top-6 w-48 right-0">
                      <div className="flex items-start flex-col gap-2 border-1 rounded-xl p-2">
                        <Menu.Item>
                          {({ active }) => (
                            <a href="#" className={classNames("text-sm flex gap-2 py-2")}>
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
                                "text-sm flex gap-2"
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
            <div className="jobs-profile bg-white rounded-xl p-4">
              <div className="flex  justify-between">
                <div className="">
                  <Link href="/news-feed">
                    <a>
                      <Image src={Compnylogo1} width={65} height={65} alt="" />
                      <div className="userfield font-extrabold">Job title</div>
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm mt-2 font-light">
                      Social Media Evaluation Project for Online Mystery
                        Shoppers for Punjabi Speakers in Pakistan
                      </div>
                    </a>
                    <a href="">
                      <div className="userfield text-sm font-bold">
                        Company Location
                      </div>
                    </a>
                    <div className="mt-2 font-thin">job Posted 6days Ago</div>
                  </div>
                  <div className="flex gap-4 mt-5">
                  <button className="bg-indigo-400 p-2 text-white rounded-full">Apply Now</button>
                  <button className="border-indigo-400 border p-2 text-indigo-400 rounded-full">Message</button>
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
                  <Menu.Items className="absolute top-6 w-48 right-0">
                      <div className="flex items-start flex-col gap-2 border-1 rounded-xl p-2">
                        <Menu.Item>
                          {({ active }) => (
                            <a href="#" className={classNames("text-sm flex gap-2 py-2")}>
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
                                "text-sm flex gap-2"
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

            <div className="jobs-profile bg-white rounded-xl p-4">
              <div className="flex  justify-between">
                <div className="">
                  <Link href="/news-feed">
                    <a>
                      <Image src={Compnylogo2} width={65} height={65} alt="" />
                      <div className="userfield font-extrabold">Job title</div>
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm mt-2 font-light">
                      Social Media Evaluation Project for Online Mystery
                        Shoppers for Punjabi Speakers in Pakistan
                      </div>
                    </a>
                    <a href="">
                      <div className="userfield text-sm font-bold">
                        Company Location
                      </div>
                    </a>
                    <div className="mt-2 font-thin">job Posted 6days Ago</div>
                  </div>
                  <div className="flex gap-4 mt-5">
                  <button className="bg-indigo-400 p-2 text-white rounded-full">Apply Now</button>
                  <button className="border-indigo-400 border p-2 text-indigo-400 rounded-full">Message</button>
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
                  <Menu.Items className="absolute top-6 w-48 right-0">
                      <div className="flex items-start flex-col gap-2 border-1 rounded-xl p-2">
                        <Menu.Item>
                          {({ active }) => (
                            <a href="#" className={classNames("text-sm flex gap-2 py-2")}>
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
                                "text-sm flex gap-2"
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
            <div className="jobs-profile bg-white rounded-xl p-4">
              <div className="flex  justify-between">
                <div className="">
                  <Link href="/news-feed">
                    <a>
                      <Image src={Compnylogo} width={65} height={65} alt="" />
                      <div className="userfield font-extrabold">Job title</div>
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm mt-2 font-light">
                      Social Media Evaluation Project for Online Mystery
                        Shoppers for Punjabi Speakers in Pakistan
                      </div>
                    </a>
                    <a href="">
                      <div className="userfield text-sm font-bold">
                        Company Location
                      </div>
                    </a>
                    <div className="mt-2 font-thin">job Posted 6days Ago</div>
                  </div>
                  <div className="flex gap-4 mt-5">
                  <button className="bg-indigo-400 p-2 text-white rounded-full">Apply Now</button>
                  <button className="border-indigo-400 border p-2 text-indigo-400 rounded-full">Message</button>
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
                  <Menu.Items className="absolute top-6 w-48 right-0">
                      <div className="flex items-start flex-col gap-2 border-1 rounded-xl p-2">
                        <Menu.Item>
                          {({ active }) => (
                            <a href="#" className={classNames("text-sm flex gap-2 py-2")}>
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
                                "text-sm flex gap-2"
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
          </div>
          <div className="bg-white py-4 mt-2 rounded-xl">
            <div className="text-center">
              <Link className="" href="">
                <a className="text-indigo-400 underline">Search For More Jobs</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedJobs;
