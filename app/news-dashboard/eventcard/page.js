import React from "react";
import { UsersIcon, CalendarIcon, HashtagIcon } from "@heroicons/react/outline";
import { NewspaperIcon } from "@heroicons/react/solid";

const EventsCard = () => {
  return (
    <div className="bg-white text-sm font-light w-full h-auto mt-6 pt-4 rounded-xl">
      <div className="flex justify-between items-center px-4 ">
        <div className="">Group</div>
        <div className="">
          <UsersIcon className="h-5 w-5" />
        </div>
      </div>
      <div className="flex justify-between items-center px-4 my-4 ">
        <div className="">Events</div>
        <div className="">
          <CalendarIcon className="h-5 w-5" />
        </div>
      </div>
      <div className="flex justify-between items-center px-4 mb-4 ">
        <div className="">Pages</div>
        <div className="">
          <NewspaperIcon className="h-5 w-5" />
        </div>
      </div>
      <div className="bg-gray-100 border border-white w-full rounded-b-xl flex px-4 py-3 justify-between items-center">
        <div className="">Explore Hashtags</div>
        <div className="">
          <HashtagIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default EventsCard;
