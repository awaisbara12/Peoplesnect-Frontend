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
} from "@material-tailwind/react";
import TabsProfileCard from "./profile-tabs/TabsProfileCard";

const ProfileTopCard = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="mt-8">
      <div className="px-10 w-[720px] xl:w-full">
        <div className="blogs bg-white rounded-xl">
          <div className="group relative w-full">
            <div className="">
              <Link href="/">
                <a>
                  <Image
                    src={postimage}
                    className="object-cover rounded-xl"
                    width={720}
                    height={220}
                    alt=""
                  />
                </a>
              </Link>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full rounded-xl h-full bg-black bg-opacity-0 flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-opacity-70 duration-500">
              <div className="relative flex items-center justify-center">
                <div className="">
                  <div className="flex cursor-pointer gap-2 items-center p-2 rounded-xl border-2 border-white text-white">
                    <PhotographIcon width={22} height={22} />
                    Change Cover Photo
                  </div>
                </div>
                <input
                  name="image"
                  id="image"
                  className="opacity-0 absolute w-6 h-6 -z-0"
                  multiple
                />
              </div>
            </div>
          </div>
          <div className="pl-10">
            <div className="">
              <div className="flex gap-10">
                <div className="relative -mt-8  border-x h-48 rounded-t-full">
                  <Link href="">
                    <a>
                      <Image
                        src={ProfileAvatar}
                        width={125}
                        height={125}
                        className="object-cover rounded-full z-40"
                        placeholder="empty"
                        alt="profile-image"
                      />
                    </a>
                  </Link>
                  <div className="absolute top-0 left-0 right-0 bottom-0 w-36 rounded-full h-36 bg-black bg-opacity-0 z-50 flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-opacity-70 duration-500">
                    <div className="flex gap-2 text-white rounded-full  cursor-pointer">
                      <PencilIcon className="w-4 h-4" />
                      Edit Profile
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="mt-4">
                    <div className="group relative">
                      <div className="text-2xl text-indigo-400 font-bold">
                        Profile Name
                      </div>
                      <div className="absolute -right-6 top-2 opacity-0 group-hover:opacity-100 cursor-pointer">
                        <PencilIcon className="h-4 w-4 text-indigo-400" />
                      </div>
                    </div>
                    <Link href="">
                      <a className="text-gray-500 text-xs font-semibold">
                        <div className="flex items-center gap-1">
                          <LocationMarkerIcon className="w-5 h-5" />
                          Your Location
                        </div>
                      </a>
                    </Link>
                    <Link href="">
                      <a className="text-indigo-400 text-xs font-semibold">
                        Recent Job And Position
                      </a>
                    </Link>
                  </div>
                  {/* <div className="flex gap-2 mt-8">
                    <Link href="">
                      <a className="flex items-center text-indigo-400 border border-indigo-400 px-2 rounded text-xs font-semibold">
                        <UserIcon className="w-5 h-5" />
                        440 connections
                      </a>
                    </Link>
                    <Link href="">
                      <a className="flex items-center bg-indigo-400 text-white py-1 px-2 rounded text-xs font-semibold">
                        <ChatAlt2Icon className="w-5 h-5" />
                        Message
                      </a>
                    </Link>
                    <Link href="">
                      <a className="flex items-center text-indigo-400 border border-indigo-400 px-2 rounded text-xs font-semibold">
                        <XIcon className="w-5 h-5" />
                        Report User
                      </a>
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="justify-end flex -mt-20">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="">
                    <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                      <DotsHorizontalIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Menu.Items className="absolute left-1/2 z-10 mt-3 w-48 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                    <div className="flex items-start flex-col gap-2 border-1 bg-white rounded-xl p-3">
                      <Menu.Item className="flex gap-1">
                        <a href="">
                          <PencilIcon className="w-5 h-5" />
                          Edit Profile
                        </a>
                      </Menu.Item>
                      <Menu.Item className="flex gap-1 mt-2">
                        <a href="">
                          <CogIcon className="h-5 w-5" />
                          Profile Settings
                        </a>
                      </Menu.Item>
                      <Menu.Item className="flex gap-1 mt-2">
                        <a href="admin-view">
                          <UserCircleIcon className="h-5 w-5" />
                          View As User
                        </a>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div> */}
          {/* 
          <div className="">
            <div className="border-t">
              <div className="flex justify-center font-semibold my-2">Bio</div>
            </div>
            <div className="border-t">
              <div className="p-5 text-center">
                The following is an excellent collection of profile page design
                templates and mockups for web designers
              </div>
            </div>
          </div>
          <div className="">
            <div className="border-t">
              <div className="flex justify-center font-semibold my-2">
                About
              </div>
            </div>
            <div className="border-t">
              <div className="p-5 text-center">
                The following is an excellent collection of profile page design
                templates and mockups for web designers
              </div>
            </div>
          </div>
          <div className="">
            <div className="border-t">
              <div className="flex justify-center font-semibold my-2">
                Photos
              </div>
            </div>
            <div className="border-t">
              <div className="p-5 flex justify-center gap-3">
                <Link href="/">
                  <a>
                    <Image
                      src={photos}
                      className="object-cover rounded-xl"
                      width={50}
                      height={70}
                      alt=""
                    />
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <Image
                      src={photos1}
                      className="object-cover rounded-xl"
                      width={50}
                      height={70}
                      alt=""
                    />
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <Image
                      src={photos2}
                      className="object-cover rounded-xl"
                      width={50}
                      height={70}
                      alt=""
                    />
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <Image
                      src={photos3}
                      className="object-cover rounded-xl"
                      width={50}
                      height={70}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div> */}
        </div>
        <TabsProfileCard />
      </div>
    </div>
  );
};

export default ProfileTopCard;
