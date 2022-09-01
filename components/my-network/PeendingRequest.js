import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import Cover from "../../public/images/main-banner.jpg";
import { XCircleIcon } from "@heroicons/react/solid";

function PeendingRequest() {
  return (
    <div className="mt-8">
      <div className="w-[620px] lg:w-full md:w-full px-5 md:px-0 lg:px-0">
        <div className="bg-white rounded-xl">
          <div className="flex justify-between items-center border-b-1 p-4">
            <div className="heading">Connections Request</div>
            <div className="all-button">
              <button className="bg-indigo-400 text-white p-3 rounded-full">
                See All Request
              </button>
            </div>
          </div>
          <div className="border-b-1">
            <div className="request-profile flex  px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <Link href="/news-feed">
                  <a>
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                  </a>
                </Link>
                <div className="">
                  <a href="">
                    <div className="username text-sm font-bold">User Name</div>
                  </a>
                  <a href="">
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                  <a href="">
                    <div className="mutual-followers text-xs">
                      Matual Friends +3
                    </div>
                  </a>
                </div>
              </div>
              <div className="Request-button flex items-center gap-2">
                <button className="border-1 border-indigo-400 rounded-full text-indigo-400 px-3 py-1 hover:bg-indigo-400 hover:text-white">
                  Accept
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Ignore
                </button>
              </div>
            </div>
          </div>
          <div className="border-b-1">
            <div className="request-profile flex  px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <Link href="/news-feed">
                  <a>
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                  </a>
                </Link>
                <div className="">
                  <a href="">
                    <div className="username text-sm font-bold">User Name</div>
                  </a>
                  <a href="">
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                  <a href="">
                    <div className="mutual-followers text-xs">
                      Matual Friends +3
                    </div>
                  </a>
                </div>
              </div>
              <div className="Request-button flex items-center gap-2">
                <button className="border-1 border-indigo-400 rounded-full text-indigo-400 px-3 py-1 hover:bg-indigo-400 hover:text-white">
                  Accept
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Ignore
                </button>
              </div>
            </div>
          </div>
          <div className="border-b-1">
            <div className="request-profile flex  px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <Link href="/news-feed">
                  <a>
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                  </a>
                </Link>
                <div className="">
                  <a href="">
                    <div className="username text-sm font-bold">User Name</div>
                  </a>
                  <a href="">
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                  <a href="">
                    <div className="mutual-followers text-xs">
                      Matual Friends +3
                    </div>
                  </a>
                </div>
              </div>
              <div className="Request-button flex items-center gap-2">
                <button className="border-1 border-indigo-400 rounded-full text-indigo-400 px-3 py-1 hover:bg-indigo-400 hover:text-white">
                  Accept
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Ignore
                </button>
              </div>
            </div>
          </div>
          <div className="border-b-1">
            <div className="request-profile flex  px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <Link href="/news-feed">
                  <a>
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                  </a>
                </Link>
                <div className="">
                  <a href="">
                    <div className="username text-sm font-bold">User Name</div>
                  </a>
                  <a href="">
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                  <a href="">
                    <div className="mutual-followers text-xs">
                      Matual Friends +3
                    </div>
                  </a>
                </div>
              </div>
              <div className="Request-button flex items-center gap-2">
                <button className="border-1 border-indigo-400 rounded-full text-indigo-400 px-3 py-1 hover:bg-indigo-400 hover:text-white">
                  Accept
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Ignore
                </button>
              </div>
            </div>
          </div>
          <div className="border-b-1">
            <div className="request-profile flex  px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <Link href="/news-feed">
                  <a>
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                  </a>
                </Link>
                <div className="">
                  <a href="">
                    <div className="username text-sm font-bold">User Name</div>
                  </a>
                  <a href="">
                    <div className="userfield text-xs">User Belong To</div>
                  </a>
                  <a href="">
                    <div className="mutual-followers text-xs">
                      Matual Friends +3
                    </div>
                  </a>
                </div>
              </div>
              <div className="Request-button flex items-center gap-2">
                <button className="border-1 border-indigo-400 rounded-full text-indigo-400 px-3 py-1 hover:bg-indigo-400 hover:text-white">
                  Accept
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Ignore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="w-[620px] lg:w-full md:w-full px-5 md:px-0 lg:px-0">
          <div className="bg-white rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div className="heading font-semibold">Suggestions</div>
              <div className="all-button">
                <button className="bg-indigo-400 text-white p-2 rounded-full">
                  See All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 md:grid-cols-2">
              <div className="profile mt-10 border rounded-xl">
                <div className="relative cover">
                  <Link href="/news-feed">
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
                  <div className="absolute -bottom-12 left-2">
                    <Link href="/news-feed">
                      <a>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={85}
                          height={85}
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
                  <div className="ml-24">
                    <div className="User-Name font-bold ">User Name</div>
                    <div className="Locations font-extralight">
                      Compny Location
                    </div>
                  </div>
                  <div className="details mt-5 font-light">
                    Hearing Jobs And Products and Employs Details here
                  </div>
                  <div className="followers mt-5 font-extralight">
                    25,964 Followers
                  </div>
                  <button className="w-full bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-7 mb-4">
                    Follow
                  </button>
                </div>
              </div>
              <div className="profile mt-10 border rounded-xl">
                <div className="relative cover">
                  <Link href="/news-feed">
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
                  <div className="absolute -bottom-12 left-2">
                    <Link href="/news-feed">
                      <a>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={85}
                          height={85}
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
                  <div className="ml-24">
                    <div className="User-Name font-bold ">User Name</div>
                    <div className="Locations font-extralight">
                      Compny Location
                    </div>
                  </div>
                  <div className="details mt-5 font-light">
                    Hearing Jobs And Products and Employs Details here
                  </div>
                  <div className="followers mt-5 font-extralight">
                    25,964 Followers
                  </div>
                  <button className="w-full bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-7 mb-4">
                    Follow
                  </button>
                </div>
              </div>
              <div className="profile mt-10 border rounded-xl">
                <div className="relative cover">
                  <Link href="/news-feed">
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
                  <div className="absolute -bottom-12 left-2">
                    <Link href="/news-feed">
                      <a>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={85}
                          height={85}
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
                  <div className="ml-24">
                    <div className="User-Name font-bold ">User Name</div>
                    <div className="Locations font-extralight">
                      Compny Location
                    </div>
                  </div>
                  <div className="details mt-5 font-light">
                    Hearing Jobs And Products and Employs Details here
                  </div>
                  <div className="followers mt-5 font-extralight">
                    25,964 Followers
                  </div>
                  <button className="w-full bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-7 mb-4">
                    Follow
                  </button>
                </div>
              </div>
              <div className="profile mt-10 border rounded-xl">
                <div className="relative cover">
                  <Link href="/news-feed">
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
                  <div className="absolute -bottom-12 left-2">
                    <Link href="/news-feed">
                      <a>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={85}
                          height={85}
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
                  <div className="ml-24">
                    <div className="User-Name font-bold ">User Name</div>
                    <div className="Locations font-extralight">
                      Compny Location
                    </div>
                  </div>
                  <div className="details mt-5 font-light">
                    Hearing Jobs And Products and Employs Details here
                  </div>
                  <div className="followers mt-5 font-extralight">
                    25,964 Followers
                  </div>
                  <button className="w-full bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-7 mb-4">
                    Follow
                  </button>
                </div>
              </div>
              <div className="profile mt-10 border rounded-xl">
                <div className="relative cover">
                  <Link href="/news-feed">
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
                  <div className="absolute -bottom-12 left-2">
                    <Link href="/news-feed">
                      <a>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={85}
                          height={85}
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
                  <div className="ml-24">
                    <div className="User-Name font-bold ">User Name</div>
                    <div className="Locations font-extralight">
                      Compny Location
                    </div>
                  </div>
                  <div className="details mt-5 font-light">
                    Hearing Jobs And Products and Employs Details here
                  </div>
                  <div className="followers mt-5 font-extralight">
                    25,964 Followers
                  </div>
                  <button className="w-full bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-7 mb-4">
                    Follow
                  </button>
                </div>
              </div>
              <div className="profile mt-10 border rounded-xl">
                <div className="relative cover">
                  <Link href="/news-feed">
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
                  <div className="absolute -bottom-12 left-2">
                    <Link href="/news-feed">
                      <a>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={85}
                          height={85}
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
                  <div className="ml-24">
                    <div className="User-Name font-bold ">User Name</div>
                    <div className="Locations font-extralight">
                      Compny Location
                    </div>
                  </div>
                  <div className="details mt-5 font-light">
                    Hearing Jobs And Products and Employs Details here
                  </div>
                  <div className="followers mt-5 font-extralight">
                    25,964 Followers
                  </div>
                  <button className="w-full bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-7 mb-4">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeendingRequest;
