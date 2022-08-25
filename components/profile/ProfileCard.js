import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import postimage from "../../public/images/cover.jpg";
import photos from "../../public/images/pagecover.jpg";
import photos1 from "../../public/images/brand.jpg";
import photos2 from "../../public/images/product1.png";
import photos3 from "../../public/images/groupcover.jpg";

import ProfileAvatar from "../../public/images/profile-girl.jpg";
import {
  ChatAlt2Icon,
  CogIcon,
  LocationMarkerIcon,
  PencilIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/solid";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const ProfileCard = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="mt-8">
      <div className="max-w-[1340px] xl:w-full">
        <div className="blogs bg-white rounded-xl px-5 py-8">
          <div className="flex justify-between">
            <div className="flex gap-24">
              <div className="relative">
                <Link href="">
                  <a>
                    <Image
                      src={ProfileAvatar}
                      width={140}
                      height={140}
                      className="object-cover rounded-full"
                      placeholder="empty"
                      alt="profile-image"
                    />
                  </a>
                </Link>
                <div className="absolute top-0 left-0 right-0 bottom-0 w-40 h-40 bg-black bg-opacity-0 flex justify-center items-center opacity-0 rounded-full hover:opacity-100 hover:bg-opacity-70 duration-500">
                  <div className="flex gap-2 text-white rounded-full  cursor-pointer">
                    <PencilIcon className="w-4 h-4" />
                    Edit Profile
                  </div>
                </div>
              </div>
              <div className="">
                <div className="mt-2">
                  <div className="group relative">
                    <div className="text-2xl text-blue-500 font-bold">
                      Profile Name
                    </div>
                    <div className="absolute right-24 top-2 opacity-0 group-hover:opacity-100 cursor-pointer">
                      <PencilIcon className="h-4 w-4 text-blue-500" />
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
                    <a className="text-blue-500 text-xs font-semibold">
                      Recent Job And Position
                    </a>
                  </Link>
                  <div className="flex gap-2 mt-8">
                    <Link href="">
                      <a className="flex items-center text-blue-500 border border-blue-500 px-2 rounded text-xs font-semibold">
                        <UserIcon className="w-5 h-5" />
                        440 connections
                      </a>
                    </Link>
                    <Link href="">
                      <a className="flex items-center bg-blue-500 text-white py-1 px-2 rounded text-xs font-semibold">
                        <ChatAlt2Icon className="w-5 h-5" />
                        Message
                      </a>
                    </Link>
                    <Link href="">
                      <a className="flex items-center text-blue-500 border border-blue-500 px-2 rounded text-xs font-semibold">
                        <XIcon className="w-5 h-5" />
                        Report User
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <BookmarkIcon className="w-5 h-5" />
          </div>
          <div className="mt-8">
            <div className="flex flex-wrap">
              <div className="w-full">
                <ul
                  className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                  role="tablist"
                >
                  <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                      className={
                        "flex justify-center gap-2 text-xs font-bold uppercase px-5 py-3 shadow-lg rounded leading-normal " +
                        (openTab === 1
                          ? "text-white bg-blue-500"
                          : "text-blue-500 bg-gray-100")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(1);
                      }}
                      data-toggle="tab"
                      href="#link1"
                      role="tablist"
                    >
                      <UserIcon className="w-4 h-4" /> Profile
                    </a>
                  </li>
                  <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                      className={
                        "flex justify-center gap-2 text-xs font-bold uppercase px-5 py-3 shadow-lg rounded leading-normal " +
                        (openTab === 2
                          ? "text-white bg-blue-500"
                          : "text-blue-500 bg-gray-100")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(2);
                      }}
                      data-toggle="tab"
                      href="#link2"
                      role="tablist"
                    >
                      <CogIcon className="h-4 w-4" /> Settings
                    </a>
                  </li>
                  <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                      className={
                        "flex justify-center gap-2 text-xs font-bold uppercase px-5 py-3 shadow-lg rounded leading-normal " +
                        (openTab === 3
                          ? "text-white bg-blue-500"
                          : "text-blue-500 bg-gray-100")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(3);
                      }}
                      data-toggle="tab"
                      href="#link3"
                      role="tablist"
                    >
                      <i className="fas fa-briefcase text-base mr-1"></i>{" "}
                      Options
                    </a>
                  </li>
                </ul>
                <div className="relative flex flex-col min-w-0 break-words bg-gray-100 w-full mb-6 shadow-lg rounded">
                  <div className="px-4 py-5 flex-auto">
                    <div className="tab-content tab-space">
                      <div
                        className={openTab === 1 ? "block" : "hidden"}
                        id="link1"
                      >
                        <p>
                          Collaboratively administrate empowered markets via
                          plug-and-play networks. Dynamically procrastinate B2C
                          users after installed base benefits.
                          <br />
                          <br /> Dramatically visualize customer directed
                          convergence without revolutionary ROI.
                        </p>
                      </div>
                      <div
                        className={openTab === 2 ? "block" : "hidden"}
                        id="link2"
                      >
                        <p>
                          Completely synergize resource taxing relationships via
                          premier niche markets. Professionally cultivate
                          one-to-one customer service with robust ideas.
                          <br />
                          <br />
                          Dynamically innovate resource-leveling customer
                          service for state of the art customer service.
                        </p>
                      </div>
                      <div
                        className={openTab === 3 ? "block" : "hidden"}
                        id="link3"
                      >
                        <p>
                          Efficiently unleash cross-media information without
                          cross-media value. Quickly maximize timely
                          deliverables for real-time schemas.
                          <br />
                          <br /> Dramatically maintain clicks-and-mortar
                          solutions without functional solutions.
                        </p>
                      </div>
                    </div>
                  </div>
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
      </div>
    </div>
  );
};

export default ProfileCard;
