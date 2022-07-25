import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import {
  BadgeCheckIcon,
  PlusIcon,
  GlobeIcon,
  HeartIcon,
  ChatAltIcon,
  DownloadIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  ShareIcon,
  DocumentReportIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { CalendarIcon } from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import PostImage from "../../../../public/images/post-image.png";
import PostComments from "../comments/PostComments";
import FilterComments from "../comments/FilterComments";
import ReplyComments from "../comments/ReplyComments";
import axios from "axios";
import { BOOKMARK_NEWSFEED_API_KEY } from "../../../../pages/config";
// import Spinner from "../../../common/Spinner";

const cardDropdown = [
  {
    name: "Save",
    href: "#",
    icon: BookmarkIcon,
  },
  {
    name: "Share",
    href: "#",
    icon: ShareIcon,
  },
  {
    name: "Report",
    href: "#",
    icon: DocumentReportIcon,
  },
  {
    name: "Unfollow",
    href: "#",
    icon: XCircleIcon,
  },
];

const NewsFeedUserCard = (list) => {
  // const [list, setList] = useState(list);
  const [bookmark, setBookmark] = useState([]);
  // console.log("test")

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  function createBookmark(feedId){
    const dataForm = new FormData();
    dataForm.append("bookmarks[news_feed_id]", feedId);
    fetch(BOOKMARK_NEWSFEED_API_KEY, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        setBookmark(result.data);
      }
    })
    .catch((err) => console.log(err));
  }

  function deteleBookmark(bookmarkId){
    const res = axios(BOOKMARK_NEWSFEED_API_KEY+"/"+bookmarkId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        Authorization: authKey,
      },
      credentials: "same-origin",
    });
    const result = res;

    try {
      if (result) {
        setBookmark(result)
      }
    } catch (error) {
      console.log(error);
    }
  }


  // if (loading)
  //   return (
  //     <div className="mt-8">
  //       <Spinner />
  //     </div>
  //   );

  return (
    <div>
      {list &&
        list.list.map((items) => (
          <div
            key={items.id}
            className="w-[600px] pb-4 mt-[14px] bg-white rounded-xl"
          >
            <div className="flex gap-2 justify-between items-center px-[22px] py-[14px]">
              <div className="flex gap-2">
                <Image src={ProfileAvatar} width={45} height={45} alt="" />
                <div>
                  <h4 className="flex gap-[6px] items-center font-medium text-gray-900">
                    {items.user.first_name} {items.user.last_name}
                    <BadgeCheckIcon
                      width={14}
                      height={14}
                      className="text-indigo-400"
                    />
                  </h4>
                  <div className="font-light text-gray-900 opacity-[0.8]">
                    {items.user.recent_job}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[88px] h-[30px] flex gap-1 items-center rounded-full justify-center bg-gray-900 text-white font-light cursor-pointer">
                  <PlusIcon
                    width={16}
                    height={16}
                    className="text-white opacity-100"
                  />
                  Follow
                </div>
                <div className="">
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={` ${
                            open
                              ? ""
                              : "text-opacity-90 focus-visible:outline-none"
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
                                {cardDropdown.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                  >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12 pl-2">
                                      <item.icon className="h-6 w-6 text-gray-900" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        {item.name}
                                      </p>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              </div>
            </div>
            <div className="border-1 border-gray-100"></div>

            <div className="px-[22px] py-[14px]">
              <p>{items.body ? items.body : ""}</p>
              {items.event && items.event ? (
                <div className="rounded-xl bg-white border border-gray-100 my-2">
                  {items.event.cover_photo_url ? (
                    <img
                      src={items.event.cover_photo_url}
                      className="aspect-video object-cover rounded-t-xl"
                      alt=""
                    />
                  ) : (
                    ""
                  )}

                  <div className="py-3 px-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-red-400 text-sm">
                          <span>{items.event.start_time}</span>
                          <span>-{items.event.end_time}</span>&nbsp;
                          <span>{items.event.start_date}</span>&nbsp;
                        </div>
                        <div className="font-semibold text-lg">
                          {items.event.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon
                            width={16}
                            height={16}
                            className="text-gray-900"
                          />
                          <span className="text-gray-900 text-sm">
                            {items.event.event_type}
                          </span>
                        </div>
                        <div className="text-gray-900"></div>
                      </div>
                      <div className="text-sm text-gray-600 cursor-pointer flex items-center border border-gray-100 rounded-full py-1 px-3">
                        View Event
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="flex gap-1 items-center mt-3">
                <GlobeIcon width={14} height={14} className="text-slate-400" />
                <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                <div className="text-slate-400 text-sm">{items.created_at}</div>
                {items.body.length > 200 ? (
                  <a href="#" className="text-indigo-400 text-[15px] ml-3">
                    seemore...
                  </a>
                ) : (
                  ""
                )}
              </div>
              {items.feed_type && items.feed_type === "video_feed" ? (
                <>
                  <video
                    controls
                    className="aspect-video w-full rounded-xl my-4"
                  >
                    <source src={items.attachments_link} type="video/mp4" />
                  </video>
                </>
              ) : (
                ""
              )}
              {items.attachments_link && items.feed_type === "image_feed" ? (
                <div className="mt-[14px]">
                  <img
                    src={items.attachments_link}
                    width={552}
                    height={240}
                    layout="responsive"
                    className="aspect-video object-cover rounded-lg"
                    alt=""
                  />
                </div>
              ) : (
                ""
              )}

              <div className="flex justify-between mt-[14px]">
                <div className="flex gap-2 items-center">
                  <HeartIcon
                    width={24}
                    height={24}
                    className="text-gray-900 cursor-pointer"
                  />
                  <span className="font-light text-gray-900">14.2k</span>
                </div>
                <div className="flex gap-2 items-center">
                  <ChatAltIcon
                    width={24}
                    height={24}
                    className="text-gray-900 cursor-pointer"
                  />
                  <span className="font-light text-gray-900">14.2k</span>
                </div>
                <div className="flex gap-2 items-center">
                  {(bookmark && bookmark.news_feed_id == items.id) || (items.is_bookmark && items.is_bookmark == true) ? (
                    <>
                      <BookmarkIcon
                        width={24}
                        height={24}
                        className="text-gray-900 cursor-pointer"
                        onClick={() => deteleBookmark(bookmark && bookmark.news_feed_id == items.id ? (bookmark.id) : (items.bookmark_id))}
                      />
                      <span className="font-light text-gray-900">{bookmark && bookmark.news_feed_id == items.id ? (bookmark.bookmarks_count) : (items.bookmarks_count)}</span>
                    </>
                  )
                  : (
                    <>
                      <BookmarkIcon
                        width={24}
                        height={24}
                        className="text-gray-900 cursor-pointer"
                        onClick={() => createBookmark(items.id)}
                      />
                      <span className="font-light text-gray-900">{items.bookmarks_count}</span>
                    </>
                  )
                  }

                </div>
              </div>
              {/* <Fragment>
                <PostComments />
                <FilterComments />
                <ReplyComments />
              </Fragment> */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default NewsFeedUserCard;
