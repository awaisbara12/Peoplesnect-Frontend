import React from "react";
import Link from "next/link";
import Image from "next/image";
import postimage from "../../../public/images/pagecover.jpg";
import postimage1 from "../../../public/images/post-image.png";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import ProfileAvatar from "../../../public/images/brand.jpeg";
import Profileuser from "../../../public/images/profile-avatar.png";

import {
  BellIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  MailIcon,
  PhotographIcon,
  VideoCameraIcon,
  CalendarIcon,
  NewspaperIcon,
  XIcon,
  CameraIcon,
  TrashIcon,
  HeartIcon,
  ChatAltIcon,
  DocumentReportIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";
import { Popover } from "@headlessui/react";

import { useState, useEffect } from "react";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import { useFormik } from "formik";
import { eventScheema } from "../../auth/schemas/CreateEventScheema";
import { Dialog } from "@headlessui/react";
import { LIKE_PAGES_API, PAGES_API, } from "../../../pages/config";
import Spinner from "../../common/Spinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import PostComments from "./PostComments";
import FilterComments from "./FilterComments";
import { ThumbDownIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

const cardDropdown = [
  {
    name: "Turn Off Notifications",
    href: "",
    icon: BellIcon,
  },
  {
    name: "Save",
    href: "#",
    icon: BookmarkIcon,
  },
];

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 355) + (text.length > 355?("......"):('')) : text}
      {text.length > 355?(
        <span onClick={toggleReadMore} className="text-indigo-400 cursor-pointer ml-2 font-bold">
          {isReadMore ? "Read more" : "Show less"}
        </span>
      ):('')}
    </p>
  );
};

const SuggestedPages = (setList, singleItem) => {
  const [Page, setPage] = useState(false);
  const [join, setjoin] = useState(false);
  
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  // page like function
  const PageLikeFun =()=>{
    const res = fetch(LIKE_PAGES_API +"?page_id="+myArray[1], {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      setjoin(true);
      router.push('/page-design/liked-pages?'+myArray[1]);
    })
  }
  // Check currentUser is Member or not
  const Ismember =()=>{
    const res = fetch(PAGES_API +"/ismember?page_id="+myArray[1], {
    method: "GeT",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      console.log(result)
      if(result.data){setjoin(true);}
    })
  }
  // Page details
  const PageDetail =()=>{
    const res = fetch(PAGES_API +"/"+myArray[1], {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      setPage(result.data);
    })
  }
  useEffect(() => {
    PageDetail();
    Ismember();
  },[])
  return (
    <div className="mt-8">
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="blogs bg-white rounded-xl">
          <div className="image relative">
              {Page && Page.cover_photo_url?(
                <img
                  src={Page.cover_photo_url} 
                  className="object-cover rounded-xl h-[300px] w-[1350px]"
                  alt=""
                />
              ):(
                <Image
                  src={postimage}
                  className="object-cover rounded-xl"
                  width={1050}
                  height={300}
                  alt=""
                />
              )}
            {Page && Page.display_photo_url?(
              <div className="absolute -bottom-16 left-5">
                <img
                  src={Page.display_photo_url}
                  className="object-cover rounded-full z-40 h-[100px] w-[100px]"
                  alt=""
                />
              </div>
              ):(
              <div className="absolute -bottom-16 left-5">
                <Image
                  src={ProfileAvatar}
                  className="rounded-full object-cover"
                  width={85}
                  height={85}
                  alt=""
                />
              </div>
              )}
          </div>
          <div className="p-5 pt-1">
            <div className=" flex justify-between items-center">
              {Page && Page.name?(
              <div className="heading ml-28 text-2xl text-indigo-400 font-bold capitalize cursor-pointer">
               {Page.name}
              </div>
              ):('')}
              {/* <div className="">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="">
                      <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                        <DotsHorizontalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Menu.Items className="absolute left-1/2 z-10 mt-3 w-48 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                      <div className="flex items-start flex-col gap-2 border-1 bg-white rounded-xl p-3">
                        <Menu.Item className="flex gap-1">
                          <a href="">
                            <MailIcon className="h-5 w-5" />
                            Report
                          </a>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div> */}
            </div>
            <div className="Details">
            {Page && Page.page_likes_count>0?(
              <div className="flex gap-1 mt-2 ml-28 cursor-pointer">{Page.page_likes_count} Liked</div>
            ):(
              <div className="flex gap-1 mt-2 ml-28">0 Liked</div>
            )} 
              <div className="caption mt-4 text-lg font-extralight">
                Details About Ur Brand
              </div>
              {Page && Page.description?(
              <div className="font-extralight">
                <ReadMore>{Page.description}</ReadMore>
              </div>
              ):('')}
            </div>
            
           
              <div className="flex justify-between">
                <div className="Creat-Name mt-5 font-bold">
                  Page Admin Name :{" "}
                  <span className="text-indigo-400 ml-2 cursor-pointer capitalize ">
                  {Page?(Page.owner.first_name+" "+ Page.owner.last_name):('')}
                  </span>
                </div>
                {join==true?(
                <button disabled={true} className="w-auto flex gap-2 justify-center bg-indigo-100 text-white rounded-xl p-2 hover:text-indigo-100 hover:bg-transparent  border-1 border-indigo-100 mt-2 mb-1">
                  <ThumbUpIcon className="w-5 h-5" />
                  <div className="">You have Liked this Page</div>
                </button>
                ):(
                <button onClick={()=>PageLikeFun()} className="w-auto flex gap-2 justify-center bg-indigo-400 text-white rounded-xl p-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-1">
                  <ThumbUpIcon className="w-5 h-5" />
                  <div className="">Like This Page</div>
                </button>
                )}
              </div>
          </div>
        </div>
      
    </div>
    </div>
  );
};

export default SuggestedPages;
