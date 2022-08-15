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
import { POST_NEWSFEED_API_KEY } from "../../../pages/config";
import Spinner from "../../common/Spinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import PostComments from "./PostComments";
import FilterComments from "./FilterComments";
import { ThumbDownIcon, UserCircleIcon } from "@heroicons/react/solid";

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

const SuggestedPages = (setList, singleItem) => {
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
  let [isOpen, setIsOpen] = useState(false);

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

  const { values, errors, touched, handleBlur, handleChange, resetForm } =
    useFormik({
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
  return (
    <div className="mt-8">
      <div className="px-10 w-[620px] xl:w-full">
        <div className="blogs bg-white rounded-xl">
          <div className="image relative">
            <Link href="/">
              <a>
                <Image
                  src={postimage}
                  className="object-cover rounded-xl"
                  width={750}
                  height={250}
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
              <div className="heading ml-28 text-2xl text-blue-500 font-bold">
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
                            <MailIcon className="h-5 w-5" />
                            Report
                          </a>
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
                <a href="" className="ml-4 font-bold text-blue-500">
                  Read More...
                </a>
              </div>
            </div>
            <div className="">
              <Link href="">
                <a href="" className="flex justify-end">
                  <button className="w-auto flex gap-2 justify-center bg-blue-500 text-white rounded-xl p-2 hover:text-blue-500 hover:bg-transparent  border-1 border-blue-500 mt-2 mb-1">
                    <ThumbUpIcon className="w-5 h-5" />
                    <div className="">Like This Page</div>
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-10 mt-8">
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
                width={700}
                height={250}
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
      </div>
    </div>
  );
};

export default SuggestedPages;
