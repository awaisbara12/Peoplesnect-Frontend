import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import postimage from "../../public/images/266-hero.jpg";
import photos from "../../public/images/pagecover.jpg";
import photos1 from "../../public/images/brand.jpg";
import photos2 from "../../public/images/product1.png";
import photos3 from "../../public/images/groupcover.jpg";

import ProfileAvatar from "../../public/images/profile-girl.jpg";
import {
  BookmarkAltIcon,
  PhotographIcon,
  ChatAlt2Icon,
  CogIcon,
  LocationMarkerIcon,
  PencilIcon,
  PhoneIcon,
  UserIcon,
  XIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/solid";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
} from "@material-tailwind/react";
import TabsProfileCard from "./profile-tabs/TabsProfileCard";
const ProfileTopCard = () => {
  return (
    <>
    <div className="mt-8 w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="w-full bg-white p-5 rounded-t-xl">
          <div className="w-full">
            <div className="">
              <Link href="/">
                <a>
                  <Image
                    src={postimage}
                    className="object-cover rounded-xl"
                    width={1030}
                    height={320}
                    alt=""
                  />
                </a>
              </Link>
            </div>
            <div className="">
              <div className="absolute  p-2 -mt-10 ml-14 rounded-full bg-white">
                <div className="">
                  <Link href="">
                    <a>
                      <Image
                        src={ProfileAvatar}
                        width={96}
                        height={96}
                        className="object-cover rounded-full z-40"
                        placeholder="empty"
                        alt="profile-image"
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="my-2 flex flex-col ml-48 gap-1">
              <div className="">
                <a href="">
                <div className="text-2xl text-indigo-400 font-bold">
                  Profile Name
                </div>
                </a>
              </div>
              <Link href="" className="">
                <a className="text-gray-500 text-xs font-semibold">
                  <div className="flex gap-1 items-center">
                    <LocationMarkerIcon className="w-5 h-5" />
                    User Location
                  </div>
                </a>
              </Link>
            </div>
            <div>
              <Button className="bg-indigo-400 mt-4">Follow</Button>
            </div>
          </div>
        </div>
        <div className="">
          <TabsProfileCard />
        </div>
      </div>
    </>
  );
};

export default ProfileTopCard;
