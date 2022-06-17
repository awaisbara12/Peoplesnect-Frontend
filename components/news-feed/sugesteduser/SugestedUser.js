import React from "react";
import Image from "next/image";
import Link from "next/link";
import SugestionProfile from "../../../public/images/profile-avatar.png";
import MariaProfile from "../../../public/images/mariamomo.png";
import MiraProfile from "../../../public/images/mira.png";
import { PlusIcon, DotsHorizontalIcon } from "@heroicons/react/outline";

const SugestedUser = () => {
  return (
    <>
      <div className="text-base font-normal leading-5">Start feed with</div>
      <div className="flex items-start mt-4">
        <Image src={SugestionProfile} width={35} height={35} alt="" />

        <div className="flex items-center justify-between ">
          <div className="ml-2">
            <Link href="/">
              <a>
                <p className="text-base font-normal leading-5">Maria Momo</p>
              </a>
            </Link>
            <p className="text-xs font-extralight text-gray-900">
              Node.js developer at agency.
            </p>
          </div>
          <Link href="/">
            <a>
              <div className="flex h- items-center text-gray-900 gap-1.5">
                <PlusIcon className="h-5 w-5" />
                Follow
              </div>
            </a>
          </Link>
        </div>
      </div>
      <div className="flex items-start mt-4">

        <Image src={MiraProfile} width={35} height={35} alt="" />
        <div className="flex items-center justify-between ">
          <div className="ml-2">
            <Link href="/">
              <a>
                <p className="text-base font-normal leading-5">Maria Momo</p>
              </a>
            </Link>
            <p className="text-xs font-extralight text-gray-900">
              Node.js developer at agency.
            </p>
          </div>
          <Link href="/">
            <a>
              <div className="flex h- items-center text-gray-900 gap-1.5">
                <PlusIcon className="h-5 w-5" />
                Follow
              </div>
            </a>
          </Link>
        </div>
      </div>
      <div className="flex items-start mt-4">
        <Image src={MariaProfile} width={35} height={35} placeholder="blur" alt="" />
        <div className="flex items-center justify-between ">
          <div className="ml-2">
            <Link href="/">
              <a>
                <p className="text-base font-normal leading-5">Maria Momo</p>
              </a>
            </Link>
            <p className="text-xs font-extralight text-gray-900">
              Node.js developer at agency.
            </p>
          </div>
          <Link href="/">
            <a>
              <div className="flex h- items-center text-gray-900 gap-1.5">
                <PlusIcon className="h-5 w-5" />
                Follow
              </div>
            </a>
          </Link>
        </div>
      </div>
      <Link href="/">
        <a>
          <DotsHorizontalIcon className="h-5 w-5 mx-auto mt-5" />
        </a>
      </Link>
    </>
  );
};

export default SugestedUser;
