import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
const TabRecentProfile = () => {
  return (
    <>
      <div className="bg-white rounded-r-xl px-5 pb-5">
        <div className="">
          <div className="like-on-article border-b-1">
            <div className="flex px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <Link href="/news-feed">
                  <a href="">
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                  </a>
                </Link>
                <div className="">
                  <a href="">
                    <div className="username text-sm font-bold">User Name</div>
                  </a>
                  <a href="">
                    <div className="userfield text-xs">
                      You Like
                      <div className="font-bold cursor-pointer text-indigo-400">
                        Article
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="time font-light text-xs">12:11pm</div>
            </div>
          </div>
          <div className="Comment-on-post border-b-1">
            <div className="flex  px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <Link href="/news-feed">
                  <a href="">
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                  </a>
                </Link>
                <div className="">
                  <a href="">
                    <div className="username text-sm font-bold">User Name</div>
                  </a>
                  <a href="">
                    <div className="userfield text-xs">
                      You Commented on
                      <div className="font-bold cursor-pointer text-indigo-400">
                        Post
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="time font-light text-xs">12:11pm</div>
            </div>
          </div>
          <div className="Comment-on-post border-b-1">
            <div className="flex  px-4 py-3 justify-between items-center">
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
                      You Commented on
                      <div className="font-bold cursor-pointer text-indigo-400 ">
                        Post
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="time font-light text-xs">12:11pm</div>
            </div>
          </div>
          <div className="border border-indigo-400 rounded-full text-indigo-400 w-32 text-center py-1 ml-auto mt-4">
            See More
          </div>
        </div>
      </div>
    </>
  );
};

export default TabRecentProfile;
