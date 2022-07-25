import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import { SearchIcon } from "@heroicons/react/solid";

function MyNetwork() {
  return (
    <div className="mt-8">
      <div className="w-[620px] px-5 md:px-0 lg:px-0">
        <div className="bg-white rounded-xl">
          <div className="flex justify-between items-center border-b-1 p-4">
            <div className="heading">Total Connections 985</div>
            <div className="searech-bar relative">
              <input
                type="email"
                name="email"
                placeholder="Search By Name"
                className={`w-full border-blue-500 border py-2 px-3 mt-2 rounded-full focus: outline-none focus:drop-shadow-indigo-400 border-red-600"
                }`}
              />
              <div className="absolute top-4 right-2">
                <button className="text-blue-500">
                  <Link href="./">
                    <a>
                      <SearchIcon className="w-6 h-6" />
                    </a>
                  </Link>
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
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
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Message
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyNetwork;
