import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";

const PendingGroupRequest = () => {
  return (
    <div className="mt-8">
      <div className="w-[620px] px-5 md:px-0 lg:px-0">
        <div className="bg-white rounded-xl">
          <div className="flex justify-between items-center border-b-1 p-4">
            <div className="heading">Group Joining Request</div>
            <div className="request-counting">99+</div>
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
                    <div className="mutual-followers text-xs">
                      Friends Already Members
                      <span className="text-blue-500"> 2+</span>
                    </div>
                  </a>
                  <a href="">
                    <div className="userfield text-xs">
                      Added By <span className="text-blue-500">User Name</span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="Request-button flex items-center gap-2">
                <button className="border-1 border-blue-500 rounded-full text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white">
                  Add To Group
                </button>
                <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingGroupRequest;