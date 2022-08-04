import React, { useState, Fragment } from "react";
import dynamic from "next/dynamic";
import InputEmoji from "react-input-emoji";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

import Image from "next/image";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import {
  PhotographIcon,
  EmojiHappyIcon,
  ChevronRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { useFormik } from "formik";
import { eventScheema } from "../../../auth/schemas/CreateEventScheema";
import { POST_NEWSFEED_API_KEY } from "../../../../pages/config";

const PostComments = () => {
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
    <Fragment>
      <div className="relative w-full mt-[14px]">
        <div className="w-10/12 ml-10">
          <InputEmoji
            type="text"
            react-emoji="w-{80%}"
            onChange={setText}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Your comment"
          />
        </div>
        <div className="absolute top-2 left-0">
          <Image src={ProfileAvatar} width={34} height={34} alt="" />
        </div>
        <div className="flex gap-1 items-center absolute top-3.5 right-0">
          <div className="">
            <div className="relative flex items-center justify-center">
              <PhotographIcon
                width={28}
                height={28}
                className={values.eventName || (videoPreview && true) ? `` : `text-gray-500`}
              />
              <input
                type={values.eventName || (videoPreview && true) ? `` : `file`}
                name="image"
                id="image"
                className="opacity-0 absolute w-6 h-6 -z-0"
                onChange={handleImagePost}
                title={""}
                multiple
              />
            </div>
          </div>
          <a href="">
            <div className="flex gap-2 z-50">
              <button className="bg-transparent px-1 rounded-r-full text-gray-500 hover:text-blue-500">
                <PaperAirplaneIcon className="h-7 w-7 rotate-90" />
              </button>
            </div>
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default PostComments;
