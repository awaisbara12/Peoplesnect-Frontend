import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../public/images/profile-avatar.png";

import {
  CalendarIcon,
  MailIcon,
  PencilIcon,
  PhoneIcon,
} from "@heroicons/react/outline";

const TabRecentProfile = () => {
  return (
    <div className="bg-white rounded-b-xl mt-3">
      <div className="flex gap-10">
        <div className="border-x h-40 rounded-b-full w-36 ml-10 mb-5"></div>
        <div className="mt-5 w-2/3">
          <div className="like-on-article border-b-1">
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
                    <div className="userfield text-xs">
                      You Like{" "}
                      <a className="font-bold text-blue-500" href="">
                        Article
                      </a>
                    </div>
                  </a>
                </div>
              </div>
              <div className="time font-light text-xs">12:11pm</div>
            </div>
          </div>
          <div className="Comment-on-post border-b-1">
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
                    <div className="userfield text-xs">
                      You Commented on {" "}
                      <a className="font-bold text-blue-500 " href="">
                        Post
                      </a>
                    </div>
                  </a>
                </div>
              </div>
              <div className="time font-light text-xs">12:11pm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabRecentProfile;
