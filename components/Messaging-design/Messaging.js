import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import ProfileAvatar from "../../public/images/profile-avatar.png";
import ProfileAvatar2 from "../../public/images/mira.png";
import ProfileAvatar3 from "../../public/images/profile-girl.jpg";

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
    <div className="">
      <div className="w-[240px] ">
        <div className="border bg-white">
          <div className="sticky z-50 top-0 bg-white">
            <div className="flex justify-between p-3 border-b">
              <div className="font-bold flex items-center gap-2 ">
                Account Name <ChevronDownIcon className="h-5 w-5" />{" "}
              </div>
              <PencilAltIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="overflow-y-scroll h-[700px] ">
            <Link href="/messaging-design/inbox-design">
              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                <Image
                  className="object-cover rounded-full"
                  src={ProfileAvatar}
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="font-bold">Ibrar Zahid</div>
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
            <Link href="/messaging-design/inbox-design">
              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                <Image
                  className="object-cover rounded-full"
                  src={ProfileAvatar2}
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="font-bold">Mishal javed</div>
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
            <Link href="/messaging-design/inbox-design">
              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                <Image
                  className="object-cover rounded-full"
                  src={ProfileAvatar3}
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="font-bold">Javeriya Latif</div>
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
            <Link href="/messaging-design/inbox-design">
              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                <Image
                  className="object-cover rounded-full"
                  src={ProfileAvatar2}
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="font-bold">Mishal javed</div>
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
            <Link href="/messaging-design/inbox-design">
              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                <Image
                  className="object-cover rounded-full"
                  src={ProfileAvatar}
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="font-bold">Ibrar Zahid</div>
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
            <Link href="/messaging-design/inbox-design">
              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                <Image
                  className="object-cover rounded-full"
                  src={ProfileAvatar2}
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="font-bold">Mishal javed</div>
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
            <Link href="/messaging-design/inbox-design">
              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                <Image
                  className="object-cover rounded-full"
                  src={ProfileAvatar3}
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="font-bold">Javeriya Latif</div>
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
            <Link href="/messaging-design/inbox-design">
              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                <Image
                  className="object-cover rounded-full"
                  src={ProfileAvatar}
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="font-bold">Ibrar Zahid</div>
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
            <Link href="/messaging-design/inbox-design">
              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                <Image
                  className="object-cover rounded-full"
                  src={ProfileAvatar2}
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="font-bold">Mishal javed</div>
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
            <Link href="/messaging-design/inbox-design">
              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                <Image
                  className="object-cover rounded-full"
                  src={ProfileAvatar3}
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="font-bold">Javeriya Latif</div>
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
            <Link href="/messaging-design/inbox-design">
              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                <Image
                  className="object-cover rounded-full"
                  src={ProfileAvatar2}
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="font-bold">Mishal javed</div>
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
            <Link href="/messaging-design/inbox-design">
              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                <Image
                  className="object-cover rounded-full"
                  src={ProfileAvatar}
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="font-bold">Ibrar Zahid</div>
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
            <Link href="/messaging-design/inbox-design">
              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                <Image
                  className="object-cover rounded-full"
                  src={ProfileAvatar2}
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="font-bold">Mishal javed</div>
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
            <Link href="/messaging-design/inbox-design">
              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                <Image
                  className="object-cover rounded-full"
                  src={ProfileAvatar3}
                  width={45}
                  height={45}
                  alt=""
                />
                <div className="">
                  <div className="font-bold">Javeriya Latif</div>
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
