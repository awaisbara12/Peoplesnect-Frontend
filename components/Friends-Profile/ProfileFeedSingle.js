import React, { Fragment, useEffect, useState, setState } from "react";
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
  PencilIcon,
} from "@heroicons/react/outline";
import { CalendarIcon } from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import ProfileAvatar from "../../public/images/profile-girl.jpg";
import postimage from "../../public/images/cover.jpg";
import FilterComments from "./comments/FilterComments";
import ReplyComments from "./comments/ReplyComments";
import axios from "axios";
import {
  BOOKMARK_NEWSFEED_API_KEY,
  REACTION_NEWSFEED_API_KEY,
  COMMENT_API_KEY,
  NEWSFEED_COMMENT_POST_KEY,
} from "../../pages/config";
import PostComments from "./comments/PostComments";
// import Spinner from "../common/Spinner";

const cardDropdown = [
  {
    name: "Edit",
    href: "#",
    icon: PencilIcon,
  },
  {
    name: "Delet",
    href: "#",
    icon: XCircleIcon,
  },
];

const ProfileFeedSingle = (singleItem) => {
  const [items, setItems] = useState(singleItem.items);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  function addHeart(feedId) {
    const dataForm = new FormData();
    dataForm.append("reactions[news_feed_id]", feedId);
    dataForm.append("reactions[reaction_type]", "heart");
    fetch(REACTION_NEWSFEED_API_KEY, {
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
          setItems(result.data);
        }
      })
      .catch((err) => console.log(err));
  }

  function createBookmark(feedId) {
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
          setItems(result.data);
        }
      })
      .catch((err) => console.log(err));
  }

  async function deteleBookmark(bookmarkId) {
    const res = await axios(BOOKMARK_NEWSFEED_API_KEY + "/" + bookmarkId, {
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
    const result = await res;

    try {
      if (result) {
        setItems(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deteleHeart(heartId) {
    const res = await axios(REACTION_NEWSFEED_API_KEY + "/" + heartId, {
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
    const result = await res;

    try {
      if (result) {
        setItems(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="w-full pb-4 mt-8 bg-white rounded-xl">
        <div className="flex gap-2 justify-between items-center px-[22px] py-[14px]">
          <div className="flex gap-2">
            <Image
              src={ProfileAvatar}
              width={45}
              height={45}
              alt=""
              className="rounded-full"
            />
            <div>
              <h4 className="flex gap-[6px] items-center font-medium text-gray-900">
                Ibrar Zahid
                <BadgeCheckIcon
                  width={14}
                  height={14}
                  className="text-indigo-400"
                />
              </h4>
              <div className="font-light text-gray-900 opacity-[0.8]">
                Front End Devolper
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={` ${
                        open ? "" : "text-opacity-90 focus-visible:outline-none"
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
                      <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-72 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-xl">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative bg-white py-2">
                            {cardDropdown.map((card) => (
                              <a
                                key={card.name}
                                href={card.id}
                                className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12 pl-2">
                                  <card.icon className="h-6 w-6 text-gray-900" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {card.name}
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
        <div className="px-[22px] py-[14px]">
          <p>New Post</p>
          <div className="rounded-xl bg-white border border-gray-100 my-2">
            <Image
              src={postimage}
              className="object-cover rounded-xl"
              width={1020}
              height={320}
              alt=""
            />
            <div className="py-3 px-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-red-400 text-sm">
                    <span>1:15pm</span>
                    <span>5:15pm</span>&nbsp;
                    <span>22.08.2023</span>&nbsp;
                  </div>
                  <div className="font-semibold text-lg">Chill Party</div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon
                      width={16}
                      height={16}
                      className="text-gray-900"
                    />
                    <span className="text-gray-900 text-sm">Dinner</span>
                  </div>
                  <div className="text-gray-900"></div>
                </div>
                <Link href="/events-design/event-view">
                  <a className="text-sm text-gray-600 cursor-pointer flex items-center border border-gray-100 rounded-full py-1 px-3">
                    View Event
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-[14px]">
            <div className="flex gap-6">
              <div className="flex gap-2 items-center">
                <HeartIcon
                  width={24}
                  height={24}
                  className="text-red-600 cursor-pointer"
                />
                <span className="font-light text-red-600">12</span>
              </div>
              <div className="flex gap-2 items-center">
                <ChatAltIcon
                  width={24}
                  height={24}
                  className="text-red-600 cursor-pointer"
                />
                <span className="font-light text-red-600">14.2k</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <BookmarkIcon
                width={24}
                height={24}
                className="text-indigo-400 cursor-pointer"
                onClick={() => createBookmark(items.id)}
              />
              <ShareIcon
                width={24}
                height={24}
                className="text-indigo-400 cursor-pointer"
                onClick={() => createBookmark(items.id)}
              />
            </div>
          </div>
          <Fragment>
            <PostComments />
            <FilterComments />
            {!loading && <ReplyComments comments={comments.data} />}
          </Fragment>
        </div>
      </div>
    </>
  );
};

export default ProfileFeedSingle;
