import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import Cover from "../../public/images/main-banner.jpg";
import { XCircleIcon } from "@heroicons/react/solid";

const Groups = () => {
  return (
    <div className="mt-8">
      <div className="w-[620px] lg:w-full md:w-full px-5 md:px-0 lg:px-0">
        <div className="bg-white rounded-xl p-4">
          <div className="justify-between flex items-center">
            <div className="heading font-semibold">Joind Groups</div>
            <div className="all-button">
              <button className="bg-indigo-400 text-white px-3 py-2 rounded-full">
                Show All
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 md:grid-cols-2">
            <div className="profile mt-10 border rounded-xl">
              <div className="relative cover">
                <Link href="group-page/joind-group">
                  <a>
                    <Image
                      className="object-cover rounded-t-xl"
                      src={Cover}
                      width={620}
                      height={200}
                      alt=""
                    />
                  </a>
                </Link>
                <div className="absolute -bottom-8 left-2">
                  <Link href="group-page/joind-group">
                    <a>
                      <Image
                        className="object-cover"
                        src={ProfileAvatar}
                        width={55}
                        height={55}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="absolute top-2 right-1">
                  <Link href="./">
                    <a>
                      <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="Details px-4 ">
                <div className="ml-16">
                  <div className="User-Name font-bold ">Group Name</div>
                </div>
                <div className="details mt-5 font-light">
                  Group Discription And All Details About Admins
                </div>
                <div className="followers mt-2 font-extralight">
                  25,964 Members
                </div>
                <div className="float-right">
                  <a href="group-page/joind-group">
                    <button className="px-2 bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      Open Group
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="profile mt-10 border rounded-xl">
              <div className="relative cover">
                <Link href="group-page/joind-group">
                  <a>
                    <Image
                      className="object-cover rounded-t-xl"
                      src={Cover}
                      width={620}
                      height={200}
                      alt=""
                    />
                  </a>
                </Link>
                <div className="absolute -bottom-8 left-2">
                  <Link href="group-page/joind-group">
                    <a>
                      <Image
                        className="object-cover"
                        src={ProfileAvatar}
                        width={55}
                        height={55}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="absolute top-2 right-1">
                  <Link href="./">
                    <a>
                      <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="Details px-4 ">
                <div className="ml-16">
                  <div className="User-Name font-bold ">Group Name</div>
                </div>
                <div className="details mt-5 font-light">
                  Group Discription And All Details About Admins
                </div>
                <div className="followers mt-2 font-extralight">
                  25,964 Members
                </div>
                <div className="float-right">
                  <a href="group-page/joind-group">
                    <button className="px-2 bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      Open Group
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="profile mt-10 border rounded-xl">
              <div className="relative cover">
                <Link href="group-page/joind-group">
                  <a>
                    <Image
                      className="object-cover rounded-t-xl"
                      src={Cover}
                      width={620}
                      height={200}
                      alt=""
                    />
                  </a>
                </Link>
                <div className="absolute -bottom-8 left-2">
                  <Link href="group-page/joind-group">
                    <a>
                      <Image
                        className="object-cover"
                        src={ProfileAvatar}
                        width={55}
                        height={55}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="absolute top-2 right-1">
                  <Link href="./">
                    <a>
                      <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="Details px-4 ">
                <div className="ml-16">
                  <div className="User-Name font-bold ">Group Name</div>
                </div>
                <div className="details mt-5 font-light">
                  Group Discription And All Details About Admins
                </div>
                <div className="followers mt-2 font-extralight">
                  25,964 Members
                </div>
                <div className="float-right">
                  <a href="group-page/joind-group">
                    <button className="px-2 bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      Open Group
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="profile mt-10 border rounded-xl">
              <div className="relative cover">
                <Link href="group-page/joind-group">
                  <a>
                    <Image
                      className="object-cover rounded-t-xl"
                      src={Cover}
                      width={620}
                      height={200}
                      alt=""
                    />
                  </a>
                </Link>
                <div className="absolute -bottom-8 left-2">
                  <Link href="group-page/joind-group">
                    <a>
                      <Image
                        className="object-cover"
                        src={ProfileAvatar}
                        width={55}
                        height={55}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="absolute top-2 right-1">
                  <Link href="./">
                    <a>
                      <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="Details px-4 ">
                <div className="ml-16">
                  <div className="User-Name font-bold ">Group Name</div>
                </div>
                <div className="details mt-5 font-light">
                  Group Discription And All Details About Admins
                </div>
                <div className="followers mt-2 font-extralight">
                  25,964 Members
                </div>
                <div className="float-right">
                  <a href="group-page/joind-group">
                    <button className="px-2 bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      Open Group
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="bg-white rounded-xl p-4">
            <div className="justify-between flex items-center">
              <div className="heading font-semibold">Suggestions For You</div>
              <div className="all-button">
                <button className="bg-indigo-400 text-white px-3 py-2 rounded-full">
                  Show All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 md:grid-cols-2">
              <div className="profile mt-10 border rounded-xl">
                <div className="relative cover">
                  <Link href="group-page/suggest-group">
                    <a>
                      <Image
                        className="object-cover rounded-t-xl"
                        src={Cover}
                        width={620}
                        height={200}
                        alt=""
                      />
                    </a>
                  </Link>
                  <div className="absolute -bottom-8 left-2">
                    <Link href="group-page/suggest-group">
                      <a>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={55}
                          height={55}
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="absolute top-2 right-1">
                    <Link href="./">
                      <a>
                        <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="Details px-4 ">
                  <a href="group-page/suggest-group">
                    <div className="ml-16">
                      <div className="User-Name font-bold ">Group Name</div>
                    </div>
                    <div className="details mt-5 font-light">
                      Group Discription And All Details About Admins
                    </div>
                  </a>
                  <div className="followers mt-2 font-extralight">
                    25,964 Members
                  </div>
                  <div className="Group-type float-right my-2">
                    Group:{" "}
                    <a href="">
                      <span className="text-indigo-400 font-bold">Private</span>
                    </a>
                  </div>
                  <a href="group-page/suggest-group">
                    <button className="w-full bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      Join Group
                    </button>
                  </a>
                </div>
              </div>
              <div className="profile mt-10 border rounded-xl">
                <div className="relative cover">
                  <Link href="group-page/suggest-group">
                    <a>
                      <Image
                        className="object-cover rounded-t-xl"
                        src={Cover}
                        width={620}
                        height={200}
                        alt=""
                      />
                    </a>
                  </Link>
                  <div className="absolute -bottom-8 left-2">
                    <Link href="group-page/suggest-group">
                      <a>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={55}
                          height={55}
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="absolute top-2 right-1">
                    <Link href="./">
                      <a>
                        <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="Details px-4 ">
                  <a href="group-page/suggest-group">
                    <div className="ml-16">
                      <div className="User-Name font-bold ">Group Name</div>
                    </div>
                    <div className="details mt-5 font-light">
                      Group Discription And All Details About Admins
                    </div>
                  </a>
                  <div className="followers mt-2 font-extralight">
                    25,964 Members
                  </div>
                  <div className="Group-type float-right my-2">
                    Group:{" "}
                    <a href="">
                      <span className="text-indigo-400 font-bold">Private</span>
                    </a>
                  </div>
                  <a href="group-page/suggest-group">
                    <button className="w-full bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      Join Group
                    </button>
                  </a>
                </div>
              </div>
              <div className="profile mt-10 border rounded-xl">
                <div className="relative cover">
                  <Link href="group-page/suggest-group">
                    <a>
                      <Image
                        className="object-cover rounded-t-xl"
                        src={Cover}
                        width={620}
                        height={200}
                        alt=""
                      />
                    </a>
                  </Link>
                  <div className="absolute -bottom-8 left-2">
                    <Link href="group-page/suggest-group">
                      <a>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={55}
                          height={55}
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="absolute top-2 right-1">
                    <Link href="./">
                      <a>
                        <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="Details px-4 ">
                  <a href="group-page/suggest-group">
                    <div className="ml-16">
                      <div className="User-Name font-bold ">Group Name</div>
                    </div>
                    <div className="details mt-5 font-light">
                      Group Discription And All Details About Admins
                    </div>
                  </a>
                  <div className="followers mt-2 font-extralight">
                    25,964 Members
                  </div>
                  <div className="Group-type float-right my-2">
                    Group:{" "}
                    <a href="">
                      <span className="text-indigo-400 font-bold">Private</span>
                    </a>
                  </div>
                  <a href="group-page/suggest-group">
                    <button className="w-full bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      Join Group
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
