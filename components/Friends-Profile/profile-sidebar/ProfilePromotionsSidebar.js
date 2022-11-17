import React from "react";
import Image from "next/image";
import ProfileLogo from "../../../public/images/profile-avatar.png";
import { DotsHorizontalIcon } from "@heroicons/react/outline";

const ProfilePromotionsSidebar = () => {
  return (
    <div>
      <div className="">
        <div className="mt-8 mx-auto bg-white rounded-xl w-full h-auto p-4">
          <div className="flex justify-between">
            <div className="font-bold">Promotion</div>
            <DotsHorizontalIcon className="h-5 w-5 text-indigo-400" />
          </div>
          <div className="mt-4">
            <div className="flex items-start gap-4">
              <div className="">
                <Image
                  src={ProfileLogo}
                  width={70}
                  height={70}
                  placeholder="blur"
                  className="object-fit rounded-full"
                  alt=""
                />
              </div>
              <div className="">
                <div className="font-bold underline text-indigo-400 text-sm">
                  Grow Your Skils
                </div>
                <div className="text-xs mt-1">
                  Unlock Free Access to 16000+ Expert-led courses for One Month
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-start gap-4">
              <div className="">
                <Image
                  src={ProfileLogo}
                  width={70}
                  height={70}
                  placeholder="blur"
                  className="object-fit rounded-full"
                  alt=""
                />
              </div>
              <div className="">
                <div className="font-bold underline text-indigo-400 text-sm">
                  Grow Your Skils
                </div>
                <div className="text-xs mt-1">
                  Unlock Free Access to 16000+ Expert-led courses for One Month
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-start gap-4">
              <div className="">
                <Image
                  src={ProfileLogo}
                  width={70}
                  height={70}
                  placeholder="blur"
                  className="object-fit rounded-full"
                  alt=""
                />
              </div>
              <div className="">
                <div className="font-bold underline text-indigo-400 text-sm">
                  Grow Your Skils
                </div>
                <div className="text-xs mt-1">
                  Unlock Free Access to 16000+ Expert-led courses for One Month
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePromotionsSidebar;
