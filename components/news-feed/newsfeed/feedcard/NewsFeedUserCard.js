import React, { Fragment, useState } from "react";
import Image from "next/image";
import {
  BadgeCheckIcon,
  PlusIcon,
  GlobeIcon,
  HeartIcon,
  ChatAltIcon,
  DownloadIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  ShareIcon,
  DocumentReportIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { Popover, Transition } from "@headlessui/react";

import ProfileAvatar from "../../../../public/images/profile-avatar-2.png";
import PostImage from "../../../../public/images/post-image.png";
import PostComments from "../comments/PostComments";
import FilterComments from "../comments/FilterComments";
import ReplyComments from "../comments/ReplyComments";

const cardDropdown = [
  {
    name: "Save",
    href: "##",
    icon: BookmarkIcon,
  },
  {
    name: "Share",
    href: "##",
    icon: ShareIcon,
  },
  {
    name: "Report",
    href: "##",
    icon: DocumentReportIcon,
  },
  {
    name: "Unfollow",
    href: "##",
    icon: XCircleIcon,
  },
];

const NewsFeedUserCard = () => {
  return (
    <div className="w-[600px] pb-4 mt-[14px] bg-white rounded-xl">
      <div className="flex gap-2 justify-between items-center px-[22px] py-[14px]">
        <div className="flex gap-2">
          <Image src={ProfileAvatar} width={45} height={45} />
          <div>
            <h4 className="flex gap-[6px] items-center font-medium text-gray-900">
              Maria Momo{" "}
              <BadgeCheckIcon
                width={14}
                height={14}
                className="text-indigo-400"
              />
            </h4>
            <div className="font-light text-gray-900 opacity-[0.8]">
              Mern Stack Team Lead
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-[88px] h-[30px] flex gap-1 items-center rounded-full justify-center bg-gray-900 text-white font-light cursor-pointer">
            <PlusIcon
              width={16}
              height={16}
              className="text-white opacity-100"
            />
            Follow
          </div>
          <div className="">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={` ${
                      open ? "" : "text-opacity-90 focus-visible:outline-none"
                    }`}
                  >
                    <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                      <DotsHorizontalIcon className="w-5 h-5" />
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
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-72 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative bg-white py-2">
                          {cardDropdown.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12 pl-2">
                                <item.icon className="h-6 w-6 text-gray-900" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </p>
                              </div>
                            </a>
                          ))}
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
      <div className="border-1 border-gray-100"></div>
      <div className="px-[22px] py-[14px]">
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour.
        </p>
        <div className="flex gap-1 items-center mt-3">
          <GlobeIcon width={14} height={14} className="text-slate-400" />
          <div className="w-1 h-1 rounded-full bg-slate-400"></div>
          <div className="text-slate-400 text-sm">1d</div>
          <a href="#" className="text-indigo-400 text-[15px] ml-3">
            seemore...
          </a>
        </div>
        <div className="mt-[14px]">
          <Image src={PostImage} width={552} height={240} placeholder="blur" />
        </div>
        <div className="flex justify-between mt-[14px]">
          <div className="flex gap-2 items-center">
            <HeartIcon
              width={24}
              height={24}
              className="text-gray-900 cursor-pointer"
            />
            <span className="font-light text-gray-900">14.2k</span>
          </div>
          <div className="flex gap-2 items-center">
            <ChatAltIcon
              width={24}
              height={24}
              className="text-gray-900 cursor-pointer"
            />
            <span className="font-light text-gray-900">14.2k</span>
          </div>
          <div className="flex gap-2 items-center">
            <DownloadIcon
              width={24}
              height={24}
              className="text-gray-900 cursor-pointer rotate-180"
            />
            <span className="font-light text-gray-900">14.2k</span>
          </div>
          <div className="flex gap-2 items-center">
            <BookmarkIcon
              width={24}
              height={24}
              className="text-gray-900 cursor-pointer"
            />
            <span className="font-light text-gray-900">14.2k</span>
          </div>
        </div>
        <Fragment>
          <PostComments />
          <FilterComments />
          <ReplyComments />
        </Fragment>
      </div>
    </div>
  );
};

export default NewsFeedUserCard;
