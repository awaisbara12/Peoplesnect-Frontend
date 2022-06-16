import React from "react";
import Image from "next/image";
import {
  BadgeCheckIcon,
  PlusIcon,
  GlobeIcon,
  HeartIcon,
  ChatAltIcon,
  DownloadIcon,
  BookmarkIcon,
} from "@heroicons/react/outline";
import ProfileAvatar from "../../../../public/images/profile-avatar-2.png";
import PostImage from "../../../../public/images/post-image.png";

const NewsFeedUserCard = () => {
  return (
    <div className="w-[600px] mt-[14px] bg-white rounded-xl">
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
        <div className="flex justify-end">
          <div className="w-[88px] h-[30px] flex gap-1 items-center rounded-full justify-center bg-gray-900 text-white font-light cursor-pointer">
            <PlusIcon
              width={16}
              height={16}
              className="text-white opacity-100"
            />
            Follow
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
      </div>
    </div>
  );
};

export default NewsFeedUserCard;
