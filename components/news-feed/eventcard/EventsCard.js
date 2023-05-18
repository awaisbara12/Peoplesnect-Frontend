import {
CalendarIcon,
HashtagIcon,
UserGroupIcon,
VideoCameraIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";

const EventsCard = () => {
return (
<div>
 <div className="w-64 lg:w-auto">
    <div className="mt-8 mx-auto bg-white rounded-xl w-full h-auto p-4">
      <Link href="/group-page">
      <a>
        <div className="flex justify-between font-light text-sm  border-b-1 pb-4">
          <div className="">Groups</div>
          <UserGroupIcon className="w-5 h-5 text-indigo-400" />
        </div>
      </a>
      </Link>
      <Link href="/events-design">
      <a>
        <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
          <div className="">Event</div>
          <CalendarIcon className="w-5 h-5 text-indigo-400" />
        </div>
      </a>
      </Link>
      <Link href="/page-design">
      <a>
        <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
          <div className="">Pages</div>
          <VideoCameraIcon className="w-5 h-5 text-indigo-400" />
        </div>
      </a>
      </Link>
      <Link href="/hashtag-design">
      <a>
        <div className="flex justify-between font-light text-sm mt-4">
          <div className="">Explore Hashtags</div>
          <HashtagIcon className="w-5 h-5 text-indigo-400" />
        </div>
      </a>
      </Link>
    </div>
  </div> 
</div>
);
};

export default EventsCard;