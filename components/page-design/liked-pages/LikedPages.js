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
  LogoutIcon,
  MailIcon,
} from "@heroicons/react/outline";
import { Popover } from "@headlessui/react";

import { useState, useEffect } from "react";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import {
  PhotographIcon,
  VideoCameraIcon,
  CalendarIcon,
  NewspaperIcon,
  XIcon,
  CameraIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { useFormik } from "formik";
import { eventScheema } from "../../auth/schemas/CreateEventScheema";
import { Dialog } from "@headlessui/react";
import { CURENT_USER_LOGIN_API, PAGES_API, POST_NEWSFEED_API_KEY } from "../../../pages/config";
import Spinner from "../../common/Spinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import {
  GlobeIcon,
  HeartIcon,
  ChatAltIcon,
  DocumentReportIcon,
} from "@heroicons/react/outline";
import PostComments from "./PostComments";
import FilterComments from "./FilterComments";
import {
  ThumbDownIcon,
  ThumbUpIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import ProfileFeed from "./ProfileFeed";

// import Spinner from "../../../common/Spinner";

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

const LikedPages = (setList, singleItem) => {
  const [Page, setPage] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [admins,setadmins] = useState();
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  //  Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  
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
  // Current User
  const Current_User=async()=>{    
   
    await fetch(CURENT_USER_LOGIN_API, {
      method: "GET",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setCurrentUser(result.data);
        }
      })
      .catch((err) => console.log(err)); 
  }

  const GetAdmins =()=>{
    fetch(PAGES_API +"/get_page_admin?page_id="+myArray[1] , {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      setadmins(result.data);
      console.log(result.data)
    })
  };
  // Unlike Page
  const UnlikePage =()=>{
    const res = fetch(PAGES_API +"/unlike_page?id="+myArray[1] , {
    method: "Delete",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      router.push("/page-design");
    })
  }
  function isadmin(admin,user_id)
  {
    for(var i=0; i < admin.length; i++){
     if (admin[i].user.id == user_id)
     {
      return true;
     }
    }
    return false;
  }
  useEffect(() => {
    PageDetail();
    Current_User();
    GetAdmins();
  },[])

  
  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className=" flex justify-between items-center">
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
              <div className="flex justify-between">
                <div className="p-5 pt-1">
                  <div className=" flex justify-between items-center">
                    {Page && Page.name?(
                    <div className="heading ml-28 text-2xl text-indigo-400 font-bold capitalize cursor-pointer">
                    {Page.name}
                    </div>
                    ):('')}
                  </div>
                  <div className="Details">
                  {Page && Page.page_likes_count>0?(
                    <div className="flex gap-1 mt-2 ml-28 cursor-pointer">{Page.page_likes_count} Liked</div>
                  ):(
                    <div className="flex gap-1 mt-2 ml-28">0 Liked</div>
                  )}
                  </div>
                </div>
                <div className="mr-5">
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
                        {currentUser && Page && admins && (isadmin(admins,currentUser.id)!=true  && currentUser.id!=Page.owner.id)?(
                          <>
                            <Menu.Item className="flex gap-1 mt-2">
                              <a href="">
                                <MailIcon className="h-5 w-5" />
                                Report
                              </a>
                            </Menu.Item>
                            <Menu.Item className="flex gap-1 mt-2">
                              <a onClick={()=>UnlikePage()}>
                                <ThumbDownIcon className="h-5 w-5" />
                                Unlike
                              </a>
                            </Menu.Item>
                          </>
                          ):('')} 
                         {currentUser && Page && admins && (isadmin(admins,currentUser.id)  || currentUser.id==Page.owner.id)?(
                          <Menu.Item className="flex gap-1 mt-2">
                            <Link href={{pathname: "page-admin", query: Page.id,}}>
                            {/* <Link href="page-admin"> */}
                              <a className="flex gap-1 mt-2">
                                <UserCircleIcon className="h-5 w-5" />
                                View As Admin
                              </a>
                            </Link>
                          </Menu.Item>
                          ):('')}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="Details m-2 ml-10 mr-10 pb-5" >
              <div className="font-extralight">
                <ReadMore>
                  {Page?(Page.description):('')}
                </ReadMore>
              </div>
            </div>
            </div>
          </div>
        </div>
        

       
        {/* <div className="blogs bg-white rounded-xl">
          <div className="image relative">
            <Link href="/">
              <a>
                <Image
                  src={postimage}
                  className="object-cover rounded-xl"
                  width={1050}
                  height={300}
                  alt=""
                />
              </a>
            </Link>
            <div className="absolute -bottom-16 left-5">
              <Image
                src={ProfileAvatar}
                className="rounded-full object-cover"
                width={85}
                height={85}
                alt=""
              />
            </div>
          </div>
          <div className="p-5 pt-1">
            <div className=" flex justify-between items-center">
              <div className="heading ml-28 text-2xl text-indigo-400 font-bold">
                Page And Brand Name
              </div>

              <div className="">
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
                            <BellIcon className="w-5 h-5" />
                            Notifications
                          </a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">
                            <MailIcon className="h-5 w-5" />
                            Report
                          </a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">
                            <ThumbDownIcon className="h-5 w-5" />
                            Unlike
                          </a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <Link href="page-admin">
                            <a className="flex gap-1 mt-2">
                              <UserCircleIcon className="h-5 w-5" />
                              View As Admin
                            </a>
                          </Link>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className="Details">
              <Link href="">
                <a className="flex gap-1 mt-2 ml-28">
                  <ThumbUpIcon className="h-5 w-5" />
                  <div className="">14250 Liked</div>
                </a>
              </Link>
              <div className="caption mt-4 text-lg font-extralight">
                Details About Ur Brand
              </div>
              <div className="font-extralight">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
                <a href="" className="ml-4 font-bold text-indigo-400">
                  Read More...
                </a>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="mt-8">
          <div className="rounded-xl bg-white p-[22px]">
            <form onSubmit={postNewsData}>
              <div className="w-full flex justify-start gap-[22px]">
                <div className="w-[42px] h-[42px]">
                  <Image
                    src={Profileuser}
                    width={42}
                    height={42}
                    placeholder="empty"
                    alt="profile-image"
                  />
                </div>

                <textarea
                  type="text"
                  name="post-text"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className="w-full pt-0 resize-none border-0 px-0 text-base overflow-y-hidden outline-none focus:outline focus:ring-0"
                  placeholder="Want To send Anything To Admin?"
                ></textarea>
              </div>

              {videoPreview ? (
                <div className="relative">
                  <video
                    autoPlay="autoplay"
                    controls
                    className="aspect-video rounded-xl mb-4"
                  >
                    <source src={videoPreview} type="video/mp4" />
                  </video>
                  <div
                    onClick={handleCoverReomve}
                    className="bg-indigo-100 absolute top-4 right-4 z-50 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
                  >
                    <TrashIcon className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
              ) : (
                ""
              )}

              {postImagePreview ? (
                <div className={`relative`}>
                  <img
                    src={postImagePreview}
                    className="aspect-video object-cover rounded-xl mb-4"
                    alt=""
                  />

                  <div
                    onClick={handleCoverReomve}
                    className="bg-indigo-100 absolute top-4 right-4 z-50 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
                  >
                    <TrashIcon className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
              ) : (
                ""
              )}

              {values.eventName && true ? (
                <div
                  className={`rounded-xl bg-white border border-gray-100 mb-2`}
                >
                  <img
                    src={previewEventCoverImage}
                    className="aspect-video object-cover rounded-t-xl"
                    alt=""
                  />
                  <div className="py-2 px-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-red-400 text-sm">
                          {values.startDate} {values.startTime}{" "}
                          {selectedTimezone.label}
                        </div>
                        <div className="font-semibold text-lg">
                          {values.eventName}
                        </div>
                        <div className="text-gray-900">
                          {inPerson && true ? "In Person" : "Online"}
                        </div>
                      </div>
                      <div
                        onClick={openModal}
                        className="text-sm text-gray-600 cursor-pointer flex items-center border border-gray-100 rounded-full py-1 px-3"
                      >
                        Edit Event
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="flex justify-between">
                <div className="flex items-center gap-6">
                  <div className="relative group border-indigo-500">
                    <div className="relative flex items-center justify-center">
                      <PhotographIcon
                        width={22}
                        height={22}
                        className={
                          values.eventName || (videoPreview && true)
                            ? `text-indigo-100`
                            : `text-indigo-400 cursor-pointer`
                        }
                      />
                      <input
                        type={
                          values.eventName || (videoPreview && true) ? `` : `file`
                        }
                        name="image"
                        id="image"
                        className="opacity-0 absolute w-6 h-6 -z-0"
                        onChange={handleImagePost}
                        title={""}
                        multiple
                      />
                    </div>
                    <p className="text-indigo-400 opacity-0 group-hover:opacity-100 absolute left-4">
                      Add Image
                    </p>
                  </div>
                  <div className="relative group border-indigo-500">
                    <div className="relative flex items-center justify-center">
                      <VideoCameraIcon
                        width={22}
                        height={22}
                        className={
                          values.eventName || (postImagePreview && true)
                            ? `text-indigo-100`
                            : `text-indigo-400 cursor-pointer`
                        }
                      />

                      <input
                        type={
                          postImagePreview || (values.eventName && true)
                            ? ``
                            : `file`
                        }
                        name="video"
                        id="video"
                        onChange={handleVideo}
                        title={""}
                        className="opacity-0 absolute w-6 h-6 -z-0"
                      />
                    </div>
                    <p className="text-indigo-400 opacity-0 group-hover:opacity-100 absolute left-4">
                      Add Video
                    </p>
                  </div>

                  <div className="relative group border-indigo-500">
                    <CalendarIcon
                      width={22}
                      height={22}
                      onClick={
                        postImagePreview || videoPreview ? closeModal : openModal
                      }
                      className={
                        postImagePreview || videoPreview
                          ? `text-indigo-100`
                          : `text-indigo-400 cursor-pointer`
                      }
                    />

                    <p className="text-indigo-400 opacity-0 group-hover:opacity-100 absolute left-4">
                      Add event
                    </p>
                  </div>
                  <div className="relative group border-indigo-500">
                    <div className="icon relative">
                      <Link href="/post/new">
                        <NewspaperIcon
                          width={22}
                          height={22}
                          className={` ${
                            values.eventName ||
                            (postImagePreview && true) ||
                            videoPreview
                              ? "text-indigo-100"
                              : "text-indigo-400 cursor-pointer"
                          }`}
                        />
                      </Link>
                    </div>

                    <p className="text-indigo-400 opacity-0 group-hover:opacity-100 absolute left-4">
                      Add Article
                    </p>
                  </div>
                </div>
                <button
                  disabled={postText == 0 ? true : false}
                  type="submit"
                  className={`w-[150px] h-10 rounded-full flex gap-1 items-center justify-center bg-indigo-400 text-white cursor-pointer ${
                    postText == 0 ? `bg-indigo-200` : ``
                  }`}
                >
                  {loading ? <Spinner /> : "Send to Company"}
                </button>
              </div>
            </form>
          </div>

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              static={true}
              onClose={closeModal}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-[95%] md:w-[524px] mx-auto transform overflow-hidden rounded-lg bg-white py-4 text-left align-middle shadow-xl transition-all">
                      <div className="flex justify-between items-center mx-4">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Create Event
                        </Dialog.Title>
                        <XIcon
                          onClick={closeModal}
                          className="w-5 h-5 cursor-pointer"
                        />
                      </div>
                      <div className="mt-6">
                        <div className="w-full relative bg-zinc-100 h-[270px] flex justify-center items-center ">
                          <div className="relative">
                            <input
                              type="file"
                              name="image"
                              id="image"
                              className="absolute top-0 left-0 w-full h-[270px] opacity-0"
                              onChange={handleImageSelect}
                            />
                            <div
                              className={`text-center	${
                                previewEventCoverImage ? "hidden" : "visible"
                              }`}
                            >
                              <CameraIcon className="h-8 w-8 mx-auto mb-1 text-indigo-400" />
                              <h4 className="font-semibold text-xl">
                                Upload Cover Image
                              </h4>
                              <div className="pt-1 text-sm text-neutral-600">
                                Minimum width 512 pixels, aspect ratio 16:9
                              </div>
                            </div>
                            <div className="relative">
                              {previewEventCoverImage ? (
                                <img
                                  src={previewEventCoverImage}
                                  className="aspect-video object-cover"
                                  alt=""
                                />
                              ) : (
                                ""
                              )}

                              {previewEventCoverImage ? (
                                <div
                                  onClick={handleCoverReomve}
                                  className="bg-indigo-100 absolute top-4 right-4 z-50 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
                                >
                                  <TrashIcon className="w-5 h-5 text-indigo-600 " />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-4 mt-2">
                          <h1 className="text-neutral-900 text-sm">Event Type</h1>
                          <form>
                            <div className="flex items-center gap-4">
                              <fieldset className="flex items-center gap-2 pt-3">
                                <input
                                  type="radio"
                                  name="event-radio"
                                  id="online"
                                  value="online"
                                  onChange={() => {
                                    setOnline(true);
                                    setInPerson(false);
                                    setEventType(values.eventOnline);
                                  }}
                                />
                                <label htmlFor="online">Online</label>
                              </fieldset>
                              <fieldset className="flex items-center gap-2 pt-3">
                                <input
                                  type="radio"
                                  name="event-radio"
                                  id="in-person"
                                  value="I Person"
                                  onChange={() => {
                                    setInPerson(true);
                                    setOnline(false);
                                    setEventType(values.eventInPerson);
                                  }}
                                />
                                <label htmlFor="in-person">In Person</label>
                              </fieldset>
                            </div>
                            <div className="form-group w-full pt-6">
                              <label
                                htmlFor="eventName"
                                className="text-neutral-900 text-sm"
                              >
                                Event Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="eventName"
                                value={values.eventName}
                                onChange={(e) => {
                                  handleChange(e);
                                  setFeedType("event_feed");
                                }}
                                onBlur={handleBlur}
                                placeholder="Event Name"
                                className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                                  errors.eventName && touched.eventName
                                    ? "border-red-600"
                                    : ""
                                }`}
                                id="eventName"
                                required="required"
                              />
                              {errors.eventName && touched.eventName ? (
                                <div className="text-red-600 pt-2 pl-1">
                                  {errors.eventName}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group py-4">
                              <label
                                htmlFor="eventName"
                                className="text-neutral-900 text-sm"
                              >
                                Timezone <span className="text-red-500">*</span>
                              </label>
                              <div className="select-wrapper">
                                <TimezoneSelect
                                  value={selectedTimezone}
                                  onChange={setSelectedTimezone}
                                  timezones={{
                                    ...allTimezones,
                                    "America/Lima": "Pittsburgh",
                                  }}
                                />
                              </div>
                            </div>
                            <div className="block md:flex justify-between items-center gap-6">
                              <div className="form-group w-full py-4">
                                <label
                                  htmlFor="startDate"
                                  className="text-neutral-900 text-sm"
                                >
                                  Start Date{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="date"
                                  name="startDate"
                                  value={values.startDate}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder="Event Name"
                                  className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                                    errors.startDate && touched.startDate
                                      ? "border-red-600"
                                      : ""
                                  }`}
                                  id="startDate"
                                  required="required"
                                />
                                {errors.startDate && touched.startDate ? (
                                  <div className="text-red-600 pt-2 pl-1">
                                    {errors.startDate}
                                  </div>
                                ) : null}
                              </div>
                              <div className="form-group w-full py-4">
                                <label
                                  htmlFor="endDate"
                                  className="text-neutral-900 text-sm"
                                >
                                  End Date
                                </label>
                                <input
                                  type="date"
                                  name="endDate"
                                  onChange={handleChange}
                                  placeholder="Event Name"
                                  className="w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400"
                                  id="endDate"
                                />
                              </div>
                            </div>
                            <div className="block md:flex justify-between items-center gap-6">
                              <div className="form-group w-full py-4">
                                <label
                                  htmlFor="startTime"
                                  className="text-neutral-900 text-sm"
                                >
                                  Start Time{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="time"
                                  name="startTime"
                                  value={values.startTime}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder="Event Name"
                                  className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                                    errors.startTime && touched.startTime
                                      ? "border-red-600"
                                      : ""
                                  }`}
                                  id="startTime"
                                  required="required"
                                />
                                {errors.startTime && touched.startTime ? (
                                  <div className="text-red-600 pt-2 pl-1">
                                    {errors.startTime}
                                  </div>
                                ) : null}
                              </div>
                              <div className="form-group w-full py-3">
                                <label
                                  htmlFor="endTime"
                                  className="text-neutral-900 text-sm"
                                >
                                  End Time
                                </label>
                                <input
                                  type="time"
                                  name="endTime"
                                  value={values.endTime}
                                  onChange={handleChange}
                                  placeholder="Event Name"
                                  className="w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400"
                                  id="endTime"
                                />
                              </div>
                            </div>
                            {inPerson && true ? (
                              <div>
                                <div className="form-group w-full py-3">
                                  <label
                                    htmlFor="address"
                                    className="text-neutral-900 text-sm"
                                  >
                                    Address{" "}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="address"
                                    value={online && true ? "" : values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Event Name"
                                    className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                                      errors.address && touched.address
                                        ? "border-red-600"
                                        : ""
                                    }`}
                                    id="address"
                                  />
                                  {errors.address && touched.address ? (
                                    <div className="text-red-600 pt-2 pl-1">
                                      {errors.address}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="form-group w-full py-3">
                                  <label
                                    htmlFor="venue"
                                    className="text-neutral-900 text-sm"
                                  >
                                    Venue<span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="venue"
                                    value={online && true ? "" : values.venue}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Event Name"
                                    className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                                      errors.venue && touched.venue
                                        ? "border-red-600"
                                        : ""
                                    }`}
                                    id="venue"
                                  />
                                  {errors.venue && touched.venue ? (
                                    <div className="text-red-600 pt-2 pl-1">
                                      {errors.venue}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            <div className="form-group w-full py-3">
                              <label
                                htmlFor="externalLink"
                                className="text-neutral-900 text-sm"
                              >
                                External Event Link{" "}
                              </label>
                              <input
                                type="text"
                                name="externalLink"
                                value={values.externalLink}
                                onChange={handleChange}
                                placeholder="Event Name"
                                className="w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400"
                                id="externalLink"
                              />
                            </div>
                            <div className="form-group w-full py-3">
                              <label
                                htmlFor="description"
                                className="text-neutral-900 text-sm"
                              >
                                Description{" "}
                              </label>
                              <textarea
                                type="text"
                                value={values.description}
                                onChange={handleChange}
                                name="description"
                                placeholder="Ex: topics, schedual, etc."
                                className="w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400"
                                id="description"
                              />
                            </div>
                            <div className="form-group w-full py-3">
                              <label
                                htmlFor="speakers"
                                className="text-neutral-900 text-sm"
                              >
                                Speakers{" "}
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="speakers"
                                  value={values.speakers}
                                  onChange={handleChange}
                                  placeholder=""
                                  className="w-full border-gray-100 border pl-10 py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400"
                                  id="speakers"
                                />
                                <div className="absolute inset-y-[18px] left-3">
                                  🔍
                                </div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-400">
                              Add any of your connection as speaker.
                            </div>
                            <div className="border border-gray-100 mt-4"></div>
                          </form>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-4">
                        <div className="text-xs pt-4">
                          By continuing, you agree with{" "}
                          <Link href="/">
                            <a className="text-indigo-800">
                              Peoplesnect, events policy
                            </a>
                          </Link>
                        </div>
                        <div className="flex justify-end mt-6">
                          <button
                            type="button"
                            onClick={closeModal}
                            className="w-[100] h-[32px] inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
        <div className="mt-8">
          <div className="bg-white rounded-xl">
            <div className="flex gap-2 justify-between items-center px-[22px] py-[14px]">
              <div className="flex items-center gap-4">
                <Image
                  src={ProfileAvatar}
                  className="rounded-full object-cover"
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="flex gap-2">
                    <a href="">
                      <div className="User-name font-bold">
                        Page OR Brand Name
                      </div>
                    </a>
                    <div className="details font-extralight">
                      Upload a new post
                    </div>
                  </div>
                  <div className="time font-extralight mt-2">1 Hour Ago</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
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
            <div className="border-1 border-gray-100"></div>
            <div className="px-[22px] py-[14px]">
              <div className="rounded-xl bg-white border border-gray-100 my-2">
                <Image
                  src={postimage1}
                  className="object-cover rounded-xl"
                  width={1050}
                  height={300}
                  alt=""
                />
              </div>
              <div className="flex gap-4 mt-[14px]">
                <div className="flex gap-2 items-center">
                  <HeartIcon
                    width={24}
                    height={24}
                    className="text-gray-900 cursor-pointer"
                    onClick={() => HeartIcon}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <ChatAltIcon
                    width={24}
                    height={24}
                    className="text-gray-900 cursor-pointer"
                  />
                  <span className="font-light text-gray-900">14.2k</span>
                </div>
              </div>
              <Fragment>
                <PostComments />
                <FilterComments />
              </Fragment>
            </div>
          </div>
        </div> */}
        {currentUser && Page ?(
          <ProfileFeed currentUser={currentUser} group={Page} admins={admins}/>
        ):("")}
      </div>
    </div>
  );
};

export default LikedPages;
