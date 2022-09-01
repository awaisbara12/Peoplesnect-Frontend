import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import Cover from "../../public/images/main-banner.jpg";
import { ViewGridIcon, XCircleIcon } from "@heroicons/react/solid";
import {
  CalendarIcon,
  LocationMarkerIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";

const MainEvents = () => {
  return (
    <div className="w-[620px] mt-8 px-5 md:px-0 lg:px-0">
      <div className="bg-white rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div className="heading font-semibold">Events</div>
          <div className="all-button">
            <button className="bg-indigo-400 text-white p-2 rounded-full">
              See All
            </button>
          </div>
        </div>
        <div className="">
          <div className="profile p-5 mt-5 bg-gray-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Link href="/news-feed">
                <a>
                  <Image
                    className="object-cover"
                    src={ProfileAvatar}
                    width={45}
                    height={45}
                    alt=""
                  />
                </a>
              </Link>
              <div className="">
                <div className="User-Name font-bold ">
                  Advanced Microsoft Teams Webinar for Assistants and Admins
                </div>
                <div className="Locations mt-2 font-light">
                  Event organized by{" "}
                  <span className="text-indigo-400 cursor-pointer font-bold">
                    Compny Name
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold">
                    <CalendarIcon className="h-5 w-5" />
                    Date & Time Of Event
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold mt-1">
                    <VideoCameraIcon className="h-5 w-5" />
                    Online/Offline?
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center mt-1 font-bold">
                    <LocationMarkerIcon className="h-5 w-5" />
                    Location Of Event
                  </div>
                </a>
              </Link>
            </div>
            <div className="">
              <div className="flex justify-end gap-3">
                <Link href="">
                  <a>
                    <div className="border border-indigo-400 font-bold px-4 py-2 bg-indigo-400 text-white hover:bg-transparent hover:text-indigo-400 rounded-full">
                      Join
                    </div>
                  </a>
                </Link>
                <Link href="/events-design/event-view">
                  <a>
                    <div className="border border-indigo-400 font-bold px-3 py-2 hover:bg-indigo-400 hover:text-white text-indigo-400 rounded-full">
                      Details
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="profile p-5 mt-10 bg-gray-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Link href="/news-feed">
                <a>
                  <Image
                    className="object-cover"
                    src={ProfileAvatar}
                    width={45}
                    height={45}
                    alt=""
                  />
                </a>
              </Link>
              <div className="">
                <div className="User-Name font-bold ">
                  Advanced Microsoft Teams Webinar for Assistants and Admins
                </div>
                <div className="Locations mt-2 font-light">
                  Event organized by{" "}
                  <span className="text-indigo-400 cursor-pointer font-bold">
                    Compny Name
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold">
                    <CalendarIcon className="h-5 w-5" />
                    Date & Time Of Event
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold mt-1">
                    <VideoCameraIcon className="h-5 w-5" />
                    Online/Offline?
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center mt-1 font-bold">
                    <LocationMarkerIcon className="h-5 w-5" />
                    Location Of Event
                  </div>
                </a>
              </Link>
            </div>
            <div className="">
              <div className="flex justify-end gap-3">
                <Link href="">
                  <a>
                    <div className="border border-indigo-400 font-bold px-4 py-2 bg-indigo-400 text-white hover:bg-transparent hover:text-indigo-400 rounded-full">
                      Join
                    </div>
                  </a>
                </Link>
                <Link href="/events-design/event-view">
                  <a>
                    <div className="border border-indigo-400 font-bold px-3 py-2 hover:bg-indigo-400 hover:text-white text-indigo-400 rounded-full">
                      Details
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="profile p-5 mt-10 bg-gray-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Link href="/news-feed">
                <a>
                  <Image
                    className="object-cover"
                    src={ProfileAvatar}
                    width={45}
                    height={45}
                    alt=""
                  />
                </a>
              </Link>
              <div className="">
                <div className="User-Name font-bold ">
                  Advanced Microsoft Teams Webinar for Assistants and Admins
                </div>
                <div className="Locations mt-2 font-light">
                  Event organized by{" "}
                  <span className="text-indigo-400 cursor-pointer font-bold">
                    Compny Name
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold">
                    <CalendarIcon className="h-5 w-5" />
                    Date & Time Of Event
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold mt-1">
                    <VideoCameraIcon className="h-5 w-5" />
                    Online/Offline?
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center mt-1 font-bold">
                    <LocationMarkerIcon className="h-5 w-5" />
                    Location Of Event
                  </div>
                </a>
              </Link>
            </div>
            <div className="">
              <div className="flex justify-end gap-3">
                <Link href="">
                  <a>
                    <div className="border border-indigo-400 font-bold px-4 py-2 bg-indigo-400 text-white hover:bg-transparent hover:text-indigo-400 rounded-full">
                      Join
                    </div>
                  </a>
                </Link>
                <Link href="/events-design/event-view">
                  <a>
                    <div className="border border-indigo-400 font-bold px-3 py-2 hover:bg-indigo-400 hover:text-white text-indigo-400 rounded-full">
                      Details
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="profile p-5 mt-10 bg-gray-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Link href="/news-feed">
                <a>
                  <Image
                    className="object-cover"
                    src={ProfileAvatar}
                    width={45}
                    height={45}
                    alt=""
                  />
                </a>
              </Link>
              <div className="">
                <div className="User-Name font-bold ">
                  Advanced Microsoft Teams Webinar for Assistants and Admins
                </div>
                <div className="Locations mt-2 font-light">
                  Event organized by{" "}
                  <span className="text-indigo-400 cursor-pointer font-bold">
                    Compny Name
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold">
                    <CalendarIcon className="h-5 w-5" />
                    Date & Time Of Event
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold mt-1">
                    <VideoCameraIcon className="h-5 w-5" />
                    Online/Offline?
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center mt-1 font-bold">
                    <LocationMarkerIcon className="h-5 w-5" />
                    Location Of Event
                  </div>
                </a>
              </Link>
            </div>
            <div className="">
              <div className="flex justify-end gap-3">
                <Link href="">
                  <a>
                    <div className="border border-indigo-400 font-bold px-4 py-2 bg-indigo-400 text-white hover:bg-transparent hover:text-indigo-400 rounded-full">
                      Join
                    </div>
                  </a>
                </Link>
                <Link href="/events-design/event-view">
                  <a>
                    <div className="border border-indigo-400 font-bold px-3 py-2 hover:bg-indigo-400 hover:text-white text-indigo-400 rounded-full">
                      Details
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="profile p-5 mt-10 bg-gray-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Link href="/news-feed">
                <a>
                  <Image
                    className="object-cover"
                    src={ProfileAvatar}
                    width={45}
                    height={45}
                    alt=""
                  />
                </a>
              </Link>
              <div className="">
                <div className="User-Name font-bold ">
                  Advanced Microsoft Teams Webinar for Assistants and Admins
                </div>
                <div className="Locations mt-2 font-light">
                  Event organized by{" "}
                  <span className="text-indigo-400 cursor-pointer font-bold">
                    Compny Name
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold">
                    <CalendarIcon className="h-5 w-5" />
                    Date & Time Of Event
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold mt-1">
                    <VideoCameraIcon className="h-5 w-5" />
                    Online/Offline?
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center mt-1 font-bold">
                    <LocationMarkerIcon className="h-5 w-5" />
                    Location Of Event
                  </div>
                </a>
              </Link>
            </div>
            <div className="">
              <div className="flex justify-end gap-3">
                <Link href="">
                  <a>
                    <div className="border border-indigo-400 font-bold px-4 py-2 bg-indigo-400 text-white hover:bg-transparent hover:text-indigo-400 rounded-full">
                      Join
                    </div>
                  </a>
                </Link>
                <Link href="/events-design/event-view">
                  <a>
                    <div className="border border-indigo-400 font-bold px-3 py-2 hover:bg-indigo-400 hover:text-white text-indigo-400 rounded-full">
                      Details
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="profile p-5 mt-10 bg-gray-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Link href="/news-feed">
                <a>
                  <Image
                    className="object-cover"
                    src={ProfileAvatar}
                    width={45}
                    height={45}
                    alt=""
                  />
                </a>
              </Link>
              <div className="">
                <div className="User-Name font-bold ">
                  Advanced Microsoft Teams Webinar for Assistants and Admins
                </div>
                <div className="Locations mt-2 font-light">
                  Event organized by{" "}
                  <span className="text-indigo-400 cursor-pointer font-bold">
                    Compny Name
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold">
                    <CalendarIcon className="h-5 w-5" />
                    Date & Time Of Event
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold mt-1">
                    <VideoCameraIcon className="h-5 w-5" />
                    Online/Offline?
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center mt-1 font-bold">
                    <LocationMarkerIcon className="h-5 w-5" />
                    Location Of Event
                  </div>
                </a>
              </Link>
            </div>
            <div className="">
              <div className="flex justify-end gap-3">
                <Link href="">
                  <a>
                    <div className="border border-indigo-400 font-bold px-4 py-2 bg-indigo-400 text-white hover:bg-transparent hover:text-indigo-400 rounded-full">
                      Join
                    </div>
                  </a>
                </Link>
                <Link href="/events-design/event-view">
                  <a>
                    <div className="border border-indigo-400 font-bold px-3 py-2 hover:bg-indigo-400 hover:text-white text-indigo-400 rounded-full">
                      Details
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainEvents;
