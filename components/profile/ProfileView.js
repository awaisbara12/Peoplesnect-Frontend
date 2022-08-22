import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import postimage from "../../public/images/cover.jpg";
import photos from "../../public/images/pagecover.jpg";
import photos1 from "../../public/images/brand.jpg";
import photos2 from "../../public/images/product1.png";
import photos3 from "../../public/images/groupcover.jpg";

import ProfileAvatar from "../../public/images/profile-girl.jpg";
import { Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  CogIcon,
  DotsHorizontalIcon,
  LogoutIcon,
  MailIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
const ProfileView = () => {
  return (
    <div className="mt-8">
      <div className="max-w-[300px] xl:w-full">
        <div className="blogs bg-white rounded-xl">
          <div className="image relative">
            <Link href="/">
              <a>
                <Image
                  src={postimage}
                  className="object-cover rounded-xl"
                  width={300}
                  height={150}
                  alt=""
                />
              </a>
            </Link>
            <div className="absolute bg-black bg-opacity-0 opacity-0 hover:opacity-100 hover:bg-opacity-70 rounded-xl top-0 left-0 right-0 bottom-1 flex justify-center items-center duration-500">
              <Link href="">
                <a className="flex gap-2 text-white">
                  <PencilIcon className="w-5 h-5 text-white" />
                  Edit Cover Photo
                </a>
              </Link>
            </div>
          </div>
          <div className="-mt-16 flex justify-center">
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
          <div className="justify-center flex">
            <div className="mt-2">
              <div className="group relative">
                <div className="text-2xl text-blue-500 font-bold">
                  Profile Name
                </div>
                <div className="absolute -right-6 top-2 opacity-0 group-hover:opacity-100 cursor-pointer">
                  <PencilIcon className="h-4 w-4 text-blue-500" />
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="">
                  <a className="text-gray-500 text-xs font-semibold">
                    Your Location
                  </a>
                </Link>
                <Link href="">
                  <a className="text-blue-500 text-xs font-semibold">
                    Contact info
                  </a>
                </Link>
              </div>
              <div className="flex justify-center my-2 pb-4">
                <div className="">
                  <Link href="">
                    <a className="text-blue-500 border border-blue-500 py-1 px-2 rounded-full text-xs font-semibold">
                      440 connections
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
