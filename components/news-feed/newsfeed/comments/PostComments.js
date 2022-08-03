import React, { useState, Fragment } from "react";
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
        <input
          type="text"
          className="w-full h-12 placeholder-slate-400 bg-zinc-100 rounded-full border-0 pl-14"
          placeholder="Your comment"
        />
        <div className="absolute top-1 left-2">
          <Image src={ProfileAvatar} width={34} height={34} alt="" />
        </div>
        <div className="flex gap-1 items-center absolute top-1 right-0">
          <EmojiHappyIcon className="w-5 h-5" />
          <div className="">
            <div className="relative flex items-center justify-center">
              <PhotographIcon
                width={22}
                height={22}
                className={values.eventName || (videoPreview && true) ? `` : ``}
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
          <div className="">
            <div className="flex gap-2">
              <button className="bg-transparent px-1 rounded-r-full text-blue-500">
                <PaperAirplaneIcon className="h-10 w-6 rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostComments;
