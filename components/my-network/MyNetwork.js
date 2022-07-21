import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";

function MyNetwork() {
  return (
    <div className="mt-8">
      <div className="bg-white border w-[620px] rounded-xl">
        <div className="flex justify-between items-center border-b-1 p-4">
          <div className="heading">Connections Request</div>
          <div className="all-button">
            <button className="bg-blue-400 text-white p-3 rounded-full">
              See All Request
            </button>
          </div>
        </div>
        <div className="border-1">
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
              <button className="border-1 border-blue-400 rounded-full text-blue-400 px-3 py-1 hover:bg-blue-400 hover:text-white">
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
              <button className="border-1 border-blue-400 rounded-full text-blue-400 px-3 py-1 hover:bg-blue-400 hover:text-white">
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
              <button className="border-1 border-blue-400 rounded-full text-blue-400 px-3 py-1 hover:bg-blue-400 hover:text-white">
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
              <button className="border-1 border-blue-400 rounded-full text-blue-400 px-3 py-1 hover:bg-blue-400 hover:text-white">
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
              <button className="border-1 border-blue-400 rounded-full text-blue-400 px-3 py-1 hover:bg-blue-400 hover:text-white">
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
  );
}

export default MyNetwork;
