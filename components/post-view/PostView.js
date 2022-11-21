import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import post from "../../public/images/main-banner.jpg";
import {
  BookmarkIcon,
  CalendarIcon,
  SaveAsIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { DotsHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";
import { POST_NEWSFEED_API_KEY } from "../../pages/config";
import axios from "axios";
import PostComments from "./comments/PostComments";
import FilterComments from "./comments/FilterComments";
import ReplyComments from "./comments/ReplyComments";

const PostView = () => {
  const [posts, setPost] = useState();

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  const getNewsFeed = async () => {
    const res = await axios(POST_NEWSFEED_API_KEY + "/5636a13a-9d7e-4bb4-b786-616a02f612c0", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        Authorization: authKey,
      },
      credentials: "same-origin",
    });
    const result = await res;

    try {
      if (result.status == 200) {
        setPost(result.data.data);
        console.log("uff", result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    ;
  };
  useEffect(() => {
    getNewsFeed();
  }, []);

  return (
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
      <div className="blogs bg-white rounded-xl my-8 ">
        <div className="px-5 py-4 flex justify-between">
          <div className="font-bold">Title Of Event</div>
          <div className="">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={` ${open ? "" : "text-opacity-90 focus-visible:outline-none"
                      }`}
                  >
                    <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                      <DotsHorizontalIcon className="w-5 h-5" />
                    </div>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-72 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative bg-white py-2">
                          <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                            <div className="flex text-gray-900 gap-2">
                              <BookmarkIcon className="h-6 w-6 " />
                              <div className="">Save</div>
                            </div>
                          </a>
                          <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                            <div className="flex text-gray-900 gap-2">
                              <ShareIcon className=" h-5 w-5" />
                              <div className="">Share</div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
        <div className="image px-5">
          <div className="">
            <Link href="/">
              {posts && posts.event && posts.event.cover_photo_url ? (
                <a>
                  <img
                    src={posts.event.cover_photo_url}
                    width={1000}
                    height={500}
                    className="w-[980px] h-[350px] object-cover rounded-xl"
                    alt="" />
                </a>
              ) : (<a>
                <Image
                  src={post}
                  width={1000}
                  height={500}
                  className="w-[980px] h-[350px] object-cover rounded-xl"
                  alt="" />
              </a>)}

            </Link>
          </div>
        </div>
        <div className="videos">
        {/* <>
          <video controls className="aspect-video w-full rounded-xl my-4">
            <source src={items.attachments_link} type="video/mp4" />
          </video>
        </> */}
        </div>
        {posts && posts.event ? (
          <div className=" details p-10">
            <div className="heading text-2xl font-bold">{posts.event.name}</div>
            <div className="caption text-lg font-extralight">
              Event Organizer{" "}
              <b>
                <a href="">name</a>
              </b>
            </div>
            <div className="flex gap-3 mt-2">
              <CalendarIcon className="h-5 w-5" />
              <div className="event-time flex gap-2 font-extralight">
                <div className="day">Monday,</div>
                <div className="date">{posts.event.start_date}, {posts.event.start_time}</div>
                <div className="time"><b></b>- {posts.event.end_date}, {posts.event.end_time} (Your Local time )</div>
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <VideoCameraIcon className="w-5 h-5" />
              <div className="font-extralight">Online</div>
            </div>
            <div className="flex justify-end">
              <button className="bg-indigo-400 text-white p-3 rounded-full font-bold">
                Reserve Your Seat
              </button>
            </div>
          </div>
        ) : ('')}
          {/* <div className="flex justify-between mt-[14px]">
            <div className="flex gap-6">
              <div className="flex gap-2 items-center">
                {items.is_heart && items.is_heart == true ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="Red"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => deteleHeart(items.heart_id)}
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                    <span className="font-light text-gray-900">
                      {items.reactions_count}
                    </span>
                  </>
                ) : (
                  <>
                    <HeartIcon
                      width={24}
                      height={24}
                      className="text-gray-600 cursor-pointer"
                      onClick={() => addHeart(items.id)}
                    />
                    <span className="font-light text-gray-600 cursor-pointer">
                      {items.reactions_count}
                    </span>
                  </>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <ChatAltIcon
                  width={24}
                  height={24}
                  className="text-gray-600 cursor-pointer"
                />
                <span className="font-light text-gray-600 cursor-pointer">{comments_count>=0 && is_deleted==true?(comments_count):(items.comments_count==0?(0):(items.comments_count))}</span>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex gap-2 items-center">
                {items.is_bookmark && items.is_bookmark == true ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-indigo-400 cursor-pointer"
                      onClick={() => deteleBookmark(items.bookmark_id)}
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-light text-indigo-400">
                      {items.bookmarks_count}
                    </span>
                  </>
                ) : (
                  <>
                    <BookmarkIcon
                      width={24}
                      height={24}
                      className="text-indigo-400 cursor-pointer"
                      onClick={() => createBookmark(items.id)}
                    />
                    <span className="font-light text-indigo-400">
                      {items.bookmarks_count}
                    </span>
                  </>
                )}
              </div>
              <div>
                <ShareIcon
                  width={24}
                  height={24}
                  className="text-indigo-400 cursor-pointer"
                  onClick={() => createBookmark(items.id)}
                  // onClick={() => {navigator.clipboard.writeText(NEWSFEED_COMMENT_POST_KEY + "/" + items.id)}}
                />
              </div>
            </div>
          </div> */}
        <div className="comments px-5">
          <Fragment>
            <PostComments />
            <FilterComments />
            {/* <ReplyComments /> */}
          </Fragment>
        </div>
      </div>
    </div>
  );
};

export default PostView;
