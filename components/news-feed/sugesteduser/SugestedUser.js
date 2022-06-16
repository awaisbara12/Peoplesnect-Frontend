import React from "react";
import Image from "next/image";
import SugestionProfile from "../../../public/images/profile-avatar.png";
import MariaProfile from "../../../public/images/mariamomo.png";
import MiraProfile from "../../../public/images/mira.png";
import { PlusIcon, DotsHorizontalIcon } from "@heroicons/react/outline";

const SugestedUser = () => {
  return (
    <div className="">
      <div className="text-base font-normal leading-5">Start feed with</div>
      <div className="flex items-start mt-4">
        <Image
          src={SugestionProfile}
          width={35}
          height={35}
          placeholder="blur"
        />
        <div className="flex items-center justify-between ">
          <div className="ml-2">
            <a href="/">
              <p className="text-base font-normal leading-5">Jonson kia</p>
            </a>
            <p className="text-xs font-extralight text-gray-900">
              Node.js developer at agency.
            </p>
          </div>
          <a href="/">
            <div className="flex h- items-center text-gray-900 gap-1.5">
              <PlusIcon className="h-5 w-5" />
              Follow
            </div>
          </a>
        </div>
      </div>
      <div className="flex items-start mt-4">
        <Image src={MiraProfile} width={35} height={35} placeholder="blur" />
        <div className="flex items-center justify-between ">
          <div className="ml-2">
            <a href="/">
              <p className="text-base font-normal leading-5">Mira Jackson</p>
            </a>
            <p className="text-xs font-extralight text-gray-900">
              Mern stack team lead at softonic inc.
            </p>
          </div>
          <a href="/">
            <div className="flex h- items-center text-gray-900 gap-1.5">
              <PlusIcon className="h-5 w-5" />
              Follow
            </div>
          </a>
        </div>
      </div>
      <div className="flex items-start mt-4">
        <Image src={MariaProfile} width={35} height={35} placeholder="blur" />
        <div className="flex items-center justify-between ">
          <div className="ml-2">
            <a href="/">
              <p className="text-base font-normal leading-5">Maria Momo</p>
            </a>
            <p className="text-xs font-extralight text-gray-900">
              Node.js developer at agency.
            </p>
          </div>
          <a href="/">
            <div className="flex h- items-center text-gray-900 gap-1.5">
              <PlusIcon className="h-5 w-5" />
              Follow
            </div>
          </a>
        </div>
      </div>
      <a href="/">
      <DotsHorizontalIcon className="h-5 w-5 mx-auto mt-5" />
      </a>
    </div>
  );
};

export default SugestedUser;
