import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import ProfileAvatar from "../../public/images/profile-avatar.png";
import ProfileAvatar2 from "../../public/images/mira.png";
import InputEmoji from "react-input-emoji";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

import {
  PhotographIcon,
  EmojiHappyIcon,
  ChevronRightIcon,
  PaperAirplaneIcon,
  ChevronDownIcon,
  PencilAltIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";
import { useFormik } from "formik";
import { eventScheema } from "../auth/schemas/CreateEventScheema";
import { POST_NEWSFEED_API_KEY } from "../../pages/config";

const Messaging = () => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const [setLoading] = useState(false);
  const [postText, setPostText] = useState("");
  const [eventCoverImage, setEventCoverImage] = useState([]);
  const [postImage, setPostImage] = useState([]);
  const [setpostImagePreview] = useState();
  const [selectedTimezone] = useState({});
  const [feedType, setFeedType] = useState("basic");
  const [eventType] = useState();
  const [videoSrc, setVideoSrc] = useState([]);
  const [videoPreview, setVideoPreview] = useState();
  let [setIsOpen] = useState(false);

  const [text, setText] = useState("");

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  const handleImagePost = (e) => {
    setPostImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
    }
    setFeedType("image_feed");
  };

  const { values } = useFormik({
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

  return (
    <div className="mt-8">
      <div className="w-[680px]">
        <div className="">
          <div className="flex">
            <div className="w-1/2 h-{600px} border bg-white">
              <div className="flex justify-between p-3 border-b">
                <div className="font-bold flex items-center gap-2 ">
                  Account Name <ChevronDownIcon className="h-5 w-5" />{" "}
                </div>
                <PencilAltIcon className="h-5 w-5" />
              </div>
              <div className="">
                <Link href="">
                  <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                    <Image
                      className="object-cover"
                      src={ProfileAvatar}
                      width={45}
                      height={45}
                      alt=""
                    />
                    <div className="">
                      <div className="font-bold">User Name</div>
                      <div className="">user text as show as popup</div>
                    </div>
                  </a>
                </Link>
                <Link href="">
                  <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                    <Image
                      className="object-cover"
                      src={ProfileAvatar}
                      width={45}
                      height={45}
                      alt=""
                    />
                    <div className="">
                      <div className="font-bold">User Name</div>
                      <div className="">user text as show as popup</div>
                    </div>
                  </a>
                </Link>
                <Link href="">
                  <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                    <Image
                      className="object-cover"
                      src={ProfileAvatar}
                      width={45}
                      height={45}
                      alt=""
                    />
                    <div className="">
                      <div className="font-bold">User Name</div>
                      <div className="">user text as show as popup</div>
                    </div>
                  </a>
                </Link>
                <Link href="">
                  <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                    <Image
                      className="object-cover"
                      src={ProfileAvatar}
                      width={45}
                      height={45}
                      alt=""
                    />
                    <div className="">
                      <div className="font-bold">User Name</div>
                      <div className="">user text as show as popup</div>
                    </div>
                  </a>
                </Link>
                <Link href="">
                  <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                    <Image
                      className="object-cover"
                      src={ProfileAvatar}
                      width={45}
                      height={45}
                      alt=""
                    />
                    <div className="">
                      <div className="font-bold">User Name</div>
                      <div className="">user text as show as popup</div>
                    </div>
                  </a>
                </Link>
                <Link href="">
                  <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                    <Image
                      className="object-cover"
                      src={ProfileAvatar}
                      width={45}
                      height={45}
                      alt=""
                    />
                    <div className="">
                      <div className="font-bold">User Name</div>
                      <div className="">user text as show as popup</div>
                    </div>
                  </a>
                </Link>
                <Link href="">
                  <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                    <Image
                      className="object-cover"
                      src={ProfileAvatar}
                      width={45}
                      height={45}
                      alt=""
                    />
                    <div className="">
                      <div className="font-bold">User Name</div>
                      <div className="">user text as show as popup</div>
                    </div>
                  </a>
                </Link>
                <Link href="">
                  <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                    <Image
                      className="object-cover"
                      src={ProfileAvatar}
                      width={45}
                      height={45}
                      alt=""
                    />
                    <div className="">
                      <div className="font-bold">User Name</div>
                      <div className="">user text as show as popup</div>
                    </div>
                  </a>
                </Link>
                <Link href="">
                  <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                    <Image
                      className="object-cover"
                      src={ProfileAvatar}
                      width={45}
                      height={45}
                      alt=""
                    />
                    <div className="">
                      <div className="font-bold">User Name</div>
                      <div className="">user text as show as popup</div>
                    </div>
                  </a>
                </Link>
                <Link href="">
                  <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                    <Image
                      className="object-cover"
                      src={ProfileAvatar}
                      width={45}
                      height={45}
                      alt=""
                    />
                    <div className="">
                      <div className="font-bold">User Name</div>
                      <div className="">user text as show as popup</div>
                    </div>
                  </a>
                </Link>
                <Link href="">
                  <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                    <Image
                      className="object-cover"
                      src={ProfileAvatar}
                      width={45}
                      height={45}
                      alt=""
                    />
                    <div className="">
                      <div className="font-bold">User Name</div>
                      <div className="">user text as show as popup</div>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
            <div className="w-5/6 bg-white h-{600px}">
              <div className="flex justify-between p-3 border-b">
                <div className="font-bold flex items-center gap-2 ">
                  User Name
                </div>
                <Link href="">
                  <a>
                    <QuestionMarkCircleIcon className="h-5 w-5" />
                  </a>
                </Link>
              </div>
              <div className="">
                <div className="ml-2 mt-3">
                  <Link href="">
                    <a className="flex items-center gap-2">
                      <Image
                        className="object-cover"
                        src={ProfileAvatar}
                        width={30}
                        height={30}
                        alt=""
                      />
                      <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                        <div className="">user text as show as popup</div>
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="flex justify-end mt-7 mr-2">
                  <Link href="">
                    <a className="flex items-center gap-2">
                      <div className=" bg-gray-100 p-2 border w-60 rounded-xl">
                        <div className="">user text as show as popup</div>
                      </div>
                      <Image
                        className="object-cover"
                        src={ProfileAvatar2}
                        width={30}
                        height={30}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="ml-2 mt-3">
                  <Link href="">
                    <a className="flex items-center gap-2">
                      <Image
                        className="object-cover"
                        src={ProfileAvatar}
                        width={30}
                        height={30}
                        alt=""
                      />
                      <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                        <div className="">user text as show as popup</div>
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="flex justify-end mt-7 mr-2">
                  <Link href="">
                    <a className="flex items-center gap-2">
                      <div className=" bg-gray-100 p-2 border w-60 rounded-xl">
                        <div className="">user text as show as popup</div>
                      </div>
                      <Image
                        className="object-cover"
                        src={ProfileAvatar2}
                        width={30}
                        height={30}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="ml-2 mt-3">
                  <Link href="">
                    <a className="flex items-center gap-2">
                      <Image
                        className="object-cover"
                        src={ProfileAvatar}
                        width={30}
                        height={30}
                        alt=""
                      />
                      <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                        <div className="">user text as show as popup</div>
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="flex justify-end mt-7 mr-2">
                  <Link href="">
                    <a className="flex items-center gap-2">
                      <div className=" bg-gray-100 p-2 border w-60 rounded-xl">
                        <div className="">user text as show as popup</div>
                      </div>
                      <Image
                        className="object-cover"
                        src={ProfileAvatar2}
                        width={30}
                        height={30}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="ml-2 mt-3">
                  <Link href="">
                    <a className="flex items-center gap-2">
                      <Image
                        className="object-cover"
                        src={ProfileAvatar}
                        width={30}
                        height={30}
                        alt=""
                      />
                      <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                        <div className="">
                          user text user text as show as popup as show as user
                          text as show as popup popup
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="flex justify-end mt-7 mr-2">
                  <Link href="">
                    <a className="flex items-center gap-2">
                      <div className=" bg-gray-100 p-2 border w-60 rounded-xl">
                        <div className="">
                          user text user text as show as popup as show user text
                          as show as popup as popup
                        </div>
                      </div>
                      <Image
                        className="object-cover"
                        src={ProfileAvatar2}
                        width={30}
                        height={30}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="ml-2 mt-3">
                  <Link href="">
                    <a className="flex items-center gap-2">
                      <Image
                        className="object-cover"
                        src={ProfileAvatar}
                        width={30}
                        height={30}
                        alt=""
                      />
                      <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                        <div className="">
                          user text user text as show as popup as show as user
                          text as show as popup popup
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="">
                <div className="flex items-center px-2 mt-8">
                  <InputEmoji
                    type="text"
                    react-emoji="w-{100%}"
                    onChange={setText}
                    cleanOnEnter
                    onEnter={handleOnEnter}
                    placeholder="Type Your Message"
                  />
                  <PhotographIcon className="h-10 w-10 opacity-40" />
                  <PaperAirplaneIcon className="h-10 w-10 rotate-90 opacity-40 ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
