import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import postimage from "../../../public/images/752126.jpg";
import postimage1 from "../../../public/images/post-image.png";

import { Menu, Transition } from "@headlessui/react";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import {
  BellIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  LogoutIcon,
  MailIcon,
  ViewGridAddIcon,
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
import { GROUP_API, POST_NEWSFEED_API_KEY, CURENT_USER_LOGIN_API } from "../../../pages/config";
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
import { UserCircleIcon } from "@heroicons/react/solid";
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
  {
    name: "Report to admin",
    href: "#",
    icon: DocumentReportIcon,
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

const JoindGroup = (setList, singleItem) => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const [loading, setLoading] = useState(false);
  const [postText, setPostText] = useState("");
  const [eventCoverImage, setEventCoverImage] = useState([]);
  const [previewEventCoverImage, setPreviewEventCoverImage] = useState();
  const [postImage, setPostImage] = useState([]);
  const [postImagePreview, setpostImagePreview] = useState();
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [inPerson, setInPerson] = useState(false);
  const [online, setOnline] = useState(false);
  const [feedType, setFeedType] = useState("basic");
  const [eventType, setEventType] = useState();
  const [videoSrc, setVideoSrc] = useState([]);
  const [videoPreview, setVideoPreview] = useState();
  const [currentUser, setCurrentUser] = useState();
  let [isOpen, setIsOpen] = useState(false);

  const [group, setgroup] = useState();
   

  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // console.log(myArray[1]);
  const handleImageSelect = (e) => {
    setEventCoverImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setPreviewEventCoverImage(window.URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImagePost = (e) => {
    setPostImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
    }
    setFeedType("image_feed");
  };

  const handleCoverReomve = (e) => {
    setpostImagePreview(window.URL.revokeObjectURL(e.target.files));
    setPreviewEventCoverImage(window.URL.revokeObjectURL(e.target.files));
    setVideoPreview(window.URL.revokeObjectURL(e.target.files));
  };

  const handleVideo = (e) => {
    setFeedType("video_feed");
    setVideoSrc(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setVideoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = () => {
    resetForm();
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      eventOnline: "online",
      eventInPerson: "In person",
      eventName: "",
      timezone: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      address: "",
      venue: "",
      externalLink: "",
      description: "",
      speakers: "",
    },
    validationSchema: eventScheema,
  });

  function postNewsData(e) {
    e.preventDefault();

    setLoading(true);
    fetch(POST_NEWSFEED_API_KEY, {
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
          setList(result);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
    setFeedType("basic");
    setPostText("");
    setpostImagePreview("");
    setEventCoverImage("");
    setVideoSrc("");
    setVideoPreview("");
    onSubmit();
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [items, setItems] = useState(singleItem.items);

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
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
          // console.log("user",result.data);
        }
      })
      .catch((err) => console.log(err)); 
  }

  const LeaveGroup =()=>{
    const res = fetch(GROUP_API +"/leave_group?id="+myArray[1] , {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      router.push("/group-page");
    })
  }
  const GetGroup =()=>{
    const res = fetch(GROUP_API +"/"+myArray[1] , {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      // console.log("Group Data=>", result.data)
      setgroup(result.data);
    })
  }
  useEffect(() => {
    Current_User();
    GetGroup();
  },[])

  return (
    <div className="mt-8 w-[600px] xl:w-[980px] lg:w-[710px] md:w-[780px] px-auto md:px-0 lg:px-0 xl:px-0">
      {/* Group Profile */}
      <div className="">
        <div className="blogs bg-white rounded-xl">
          <div className="image">
            
              {group?(
                group.cover_image_url?(
                  <img
                    src={group.cover_image_url}
                    className="object-cover rounded-xl h-[350px] w-[1350px]"
                    alt=""
                  />
                ):(
                  <Image
                  src={postimage}
                  className="object-cover rounded-xl"
                  width={1350}
                  height={450}
                  alt=""
                />
                )
              )
              :(<Image
                  src={postimage}
                  className="object-cover rounded-xl"
                  width={1350}
                  height={450}
                  alt=""
                />
                )}
              
          </div>
          <div className="p-5">
            <div className=" flex justify-between items-center">
              <div className="heading text-2xl text-indigo-400 font-bold">
                {group?(group.title):('')}
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
                        {/* <Menu.Item className="flex gap-1">
                          <a href="">
                            <BellIcon className="w-5 h-5" />
                            Notifications
                          </a>
                        </Menu.Item> */}
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">
                            <MailIcon className="h-5 w-5" />
                            Report
                          </a>
                        </Menu.Item>
                        { currentUser ?(currentUser.id != group.owner.id ? (
                          <Menu.Item className="flex gap-1 mt-2">
                            
                              <a onClick={()=>LeaveGroup()}>
                                <LogoutIcon className="h-5 w-5" />
                                Leave
                              </a>
                            
                          </Menu.Item>
                        ):(
                          <Menu.Item className="flex gap-1 mt-2">
                            <Link href={{pathname: "/group-page/admin-view", query: myArray[1]}} onClick={()=>alert("yes")}>      
                              <a className="flex">
                                <UserCircleIcon className="h-5 w-5" />
                                View As Admin
                              </a>
                            </Link>
                          </Menu.Item>
                        )):("")
                        }
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
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
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames("text-sm flex gap-2")}
                            >
                              <BellIcon className="w-5 h-5" />
                              Notifications
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          {({ active }) => (
                            <a
                              href=""
                              className={classNames(
                                active ? "" : "",
                                "text-sm flex gap-2"
                              )}
                            >
                              <ViewGridAddIcon className="h-5 w-5" />
                              Group Details
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "" : "",
                                "text-sm flex gap-2"
                              )}
                            >
                              <MailIcon className="h-5 w-5" />
                              Report
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "" : "",
                                "text-sm flex gap-2"
                              )}
                            >
                              <LogoutIcon className="h-5 w-5" />
                              Leave
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          {({ active }) => (
                             <Link href={{pathname: "/group-page/admin-view", query: myArray[1]}}>
                            <a
                              // href="admin-view"
                              className={classNames(
                                active ? "" : "",
                                "text-sm flex gap-2"
                              )}
                            >
                              <UserCircleIcon className="h-5 w-5" />
                              View As Admin
                            </a>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div> */}
              <Link href="">
              <a>
                <div className="border border-indigo-400 py-2 px-3 text-indigo-400 rounded-full">
                  Group Details
                </div>
              </a>
              </Link>
            </div>
            <div className="Details mt-5">
              
              <div className="font-extralight">
                <ReadMore>
                  {group?(group.description):('')}
                </ReadMore>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gropus Feed */}
      {/* <div className="mt-8">
        <div className="bg-white rounded-xl">
          <div className="flex gap-2 justify-between items-center px-[22px] py-[14px]">
            <div className="flex items-center gap-4">
              <Image src={ProfileAvatar} width={45} height={45} alt="" />
              <div className="">
                <div className="flex gap-2">
                  <a href="">
                    <div className="User-name font-bold">Ibrar Zahid</div>
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
                width={1000}
                height={350}
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
      <ProfileFeed />
    </div>
  );
};

export default JoindGroup;
