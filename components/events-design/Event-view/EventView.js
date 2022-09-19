import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import post from "../../../public/images/main-banner.jpg";
import {
  BookmarkIcon,
  CalendarIcon,
  SaveAsIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { DotsHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";

const EventView = () => {
  return (
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
    <div className="blogs bg-white rounded-xl my-8 ">
        <div className="px-10 py-4 flex justify-between">
          <div className="font-bold">Title Of Event</div>
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
                          <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                            <div className="flex text-gray-900 gap-2">
                              <BookmarkIcon className="h-6 w-6 " />
                              <div className="">Save</div>
                            </div>
                          </a>
                          <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                            <div className="flex text-gray-900 gap-2">
                              <ShareIcon className=" h-5 w-5" />
                              <div className="">Share</div>
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
        <div className="image">
          <div className="">
            <Link href="/">
              <a>
                <Image src={post} width={1000} height={500} alt="" />
              </a>
            </Link>
          </div>
        </div>
        <div className=" details p-10">
          <div className="heading text-2xl font-bold">Event Type Here</div>
          <div className="caption text-lg font-extralight">
            Event Organizer{" "}
            <b>
              <a href="">Name</a>
            </b>
          </div>
          <div className="flex gap-3 mt-2">
            <CalendarIcon className="h-5 w-5" />
            <div className="event-time flex gap-2 font-extralight">
              <div className="day">Monday,</div>
              <div className="date">25 July 2022,</div>
              <div className="time">21:00 (Your Local time )</div>
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <VideoCameraIcon className="w-5 h-5" />
            <div className="font-extralight">Online</div>
          </div>
          <div className="flex justify-end">
            <button className="bg-indigo-400 text-white p-3 rounded-full font-bold">
              Reserve Your Seat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;
