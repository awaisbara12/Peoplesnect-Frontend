import React from "react";
import { UsersIcon, CalendarIcon, HashtagIcon } from "@heroicons/react/outline";
import { NewspaperIcon } from "@heroicons/react/solid";

import Link from "next/link";

const EventsCard = () => {
  return (
    <div className="bg-white top-[90px] text-sm font-light w-full h-auto mt-6 pt-4 rounded-xl">
      <Link href="/group-page">
        <a>
          <div className="flex justify-between items-center px-4 ">
            <div className="">Group</div>
            <div className="">
              <UsersIcon className="h-5 w-5" />
            </div>
          </div>
        </a>
      </Link>
      <Link href="/events-design">
        <a>
          <div className="flex justify-between items-center px-4 my-4 ">
            <div className="">Events</div>
            <div className="">
              <CalendarIcon className="h-5 w-5" />
            </div>
          </div>
        </a>
      </Link>
      <Link href="/page-design">
        <a>
          <div className="flex justify-between items-center px-4 mb-4 ">
            <div className="">Pages</div>
            <div className="">
              <NewspaperIcon className="h-5 w-5" />
            </div>
          </div>
        </a>
      </Link>
      <Link href="/hashtag-design">
        <a>
          <div className="flex justify-between items-center px-4 mb-4 ">
            <div className="">Explore Hashtags</div>
            <div className="">
              <HashtagIcon className="h-5 w-5" />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default EventsCard;
