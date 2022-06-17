import React from "react";
import Image from "next/image";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import {
  PhotographIcon,
  VideoCameraIcon,
  CalendarIcon,
  EmojiHappyIcon,
  NewspaperIcon,
  GlobeAltIcon,
} from "@heroicons/react/outline";

const NewsPost = () => {
  return (
    <div className="mt-7">
      <div className="w-[600px] rounded-xl bg-white p-[22px]">
        <div className="flex gap-[22px]">
          <Image
            src={ProfileAvatar}
            width={42}
            height={42}
            placeholder="empty"
            alt=""
          />
          <form>
            <input
              type="text"
              className="border-0 px-0 text-xl outline-none focus:outline focus:ring-0"
              placeholder="Start a post?"
            />
          </form>
        </div>
        <div className="flex justify-between pt-[80px]">
          <div className="flex gap-6">
            <PhotographIcon
              width={22}
              height={22}
              className="text-indigo-400 cursor-pointer"
            />

            <VideoCameraIcon
              width={22}
              height={22}
              className="text-indigo-400 cursor-pointer"
            />

            <CalendarIcon
              width={22}
              height={22}
              className="text-indigo-400 cursor-pointer"
            />

            <EmojiHappyIcon
              width={22}
              height={22}
              className="text-indigo-400 cursor-pointer"
            />

            <NewspaperIcon
              width={22}
              height={22}
              className="text-indigo-400 cursor-pointer"
            />
          </div>
          <div className="w-[100px] h-8 rounded-full flex gap-1 items-center justify-center bg-indigo-400 text-white cursor-pointer">
            <GlobeAltIcon width={16} height={16} /> Public
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPost;
