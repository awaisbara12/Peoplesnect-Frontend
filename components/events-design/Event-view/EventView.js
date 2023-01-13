import React, { Fragment, useEffect,useState } from "react";
import Link from "next/link";
import Image from "next/image";
import post from "../../../public/images/main-banner.jpg";
import {
  BookmarkIcon,
  CalendarIcon,
  SaveAsIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { DotsHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";
import { POST_NEWSFEED_API_KEY } from "../../../pages/config";
import axios from "axios";
import PostComments from "../../news-feed/newsfeed/comments/PostComments";

const EventView = () => {
  const [posts, setPost] = useState();
  
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  
  const getNewsFeed = async () => {
    const res = await axios(POST_NEWSFEED_API_KEY +"/5636a13a-9d7e-4bb4-b786-616a02f612c0" , {
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
      }
    } catch (error) {
      console.log(error);
    }
   ;
  };
  useEffect(() => {
    getNewsFeed();
  },[]);

  return (
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
      <div className="blogs bg-white rounded-xl my-8 ">
          <div className="px-10 py-4 flex justify-between">
            <div className="font-bold">Title Of Event</div>
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
          <div className="image">
            <div className="">
              <Link href="/">
                {posts && posts.event && posts.event.cover_photo_url?(
                    <a>
                    <img 
                    src={posts.event.cover_photo_url} 
                    width={1000} 
                    height={500} 
                    className="w-[980px] h-[350px] object-cover rounded-xl"
                    alt="" />
                  </a>
                ):( <a>
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
          {posts && posts.event?(
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
          ):('')}
          <div className="comments px-5">
            <PostComments/>
          </div>
      </div>
    </div>
  );
};

export default EventView;
