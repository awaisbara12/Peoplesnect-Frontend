import ReactDOM from "react-dom";
import dynamic from "next/dynamic";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import Image from "next/image";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import {
  PhotographIcon,
  VideoCameraIcon,
  CalendarIcon,
  EmojiHappyIcon,
  NewspaperIcon,
  GlobeAltIcon,
  XIcon,
  CameraIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { XCircleIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import { eventScheema } from "../../auth/schemas/CreateEventScheema";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { POST_NEWSFEED_API_KEY, CURENT_USER_LOGIN_API, SEARCH_MULTIPLE, HASHTAGS_API } from "../../../pages/config";
import ImageUpload from "image-upload-react";
import Link from "next/link";
import Spinner from "../../common/Spinner";
import axios from "axios";
import HashtagMentionInput from "../../news-feed/newsfeed/newspost/HashtagMentionInput";

const NewsPostProfile = (setList) => {
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
  const [userDetails, setUserDetails] = useState();
  let [isOpen, setIsOpen] = useState(false);


  const [tags, settags] = useState([]);
  const [mentioned, setMentioned] = useState([]);
  const [hashtaged, setHashtaged] = useState([]);
  let [hastags, sethastags] = useState();

  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }
  // Current User
  const Current_User = async () => {
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
          setUserDetails(result.data);
        }
      })
      .catch((err) => console.log(err));
  }
  const handleImageSelect = (e) => {
    setEventCoverImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setPreviewEventCoverImage(window.URL.createObjectURL(e.target.files[0]));
    }
  };
  // for Upload pic (image_Feed)
  const handleImagePost = (e) => {
    // setPostImage(e.target.files[0]);
    // if (e.target.files.length !== 0) {
    //   setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
    // }
    // setFeedType("image_feed");
    if(postImage && postImage.length>0 || postImagePreview && postImagePreview.length>0){
      const mergedata = [...postImage, ...e.target.files]
      setPostImage(mergedata);
      var pres = [];
      for (var i = 0; i < e.target.files.length; i++) {
        pres[i] = window.URL.createObjectURL(e.target.files[i]);
      }
      const mergedata1 = [...postImagePreview, ...pres]
      setpostImagePreview(mergedata1)
    }
    else{
      setPostImage(e.target.files);
      var pres = [];
      for (var i = 0; i < e.target.files.length; i++) {
        pres[i] = window.URL.createObjectURL(e.target.files[i]);
      }
      setpostImagePreview(pres)
    }
    setFeedType("image_feed");
  };
  // for Remove pic (image_Feed)
  const handleCoverReomve = (index) => {
    // setpostImagePreview(window.URL.revokeObjectURL(e.target.files));
    // setPreviewEventCoverImage(window.URL.revokeObjectURL(e.target.files));
    // setVideoPreview(window.URL.revokeObjectURL(e.target.files));
    setPreviewEventCoverImage("");
    setVideoPreview("");
    setEventCoverImage([]);
    setVideoSrc([])
    if (index !== 0) {
      const updatedArray = [...postImagePreview];
      updatedArray.splice(index, 1);
      setpostImagePreview(updatedArray);

      if(postImage && postImage.length>0){
        const updatedArray1 = [...postImage];
        updatedArray1.splice(index, 1);
        setPostImage(updatedArray1);
      }
      
    }else{setpostImagePreview('');setPostImage([]);setFeedType('');}
  };
  // for Upload Vedio (Vedio)
  const handleVideo = (e) => {
    setFeedType("video_feed");
    setVideoSrc(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setVideoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleVideoRemove = (e) => {
    setFeedType("")
    setVideoSrc("");
    setVideoPreview("");
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
      eventInPerson: "in_person",
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
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // console.log("jsskds", myArray[1]);

  function postNewsData(e) {
    e.preventDefault();

    const dataForm = new FormData();
    if (tags.length > 0) {
      for (let i = 0; i < tags.length; i++) {
        dataForm.append("tags[]", tags[i]);
      }
    }
    dataForm.append("news_feeds[body]", postText.replace(/\[\@(.*?)\]\((.*?)\)/g, "@$1"));
    dataForm.append("news_feeds[feed_type]", feedType);
    dataForm.append("news_feeds[feed_from]", "groups");
    for (let i = 0; i < postImage.length; i++) {
      dataForm.append(`news_feeds[feed_attachments][]`, postImage[i]);
    }
    // dataForm.append("news_feeds[feed_attachments][]", postImage);
    dataForm.append("news_feeds[feed_attachments][]", videoSrc);
    // if (feedType === "event_feed") {
    //   dataForm.append("events[name]", values.eventName);
    //   dataForm.append("events[event_type]", eventType);
    //   dataForm.append("events[cover_photo]", eventCoverImage);
    //   dataForm.append("events[event_timezone]", selectedTimezone.label);
    //   dataForm.append("events[start_date]", values.startDate);
    //   dataForm.append("events[end_date]", values.endDate);
    //   dataForm.append("events[start_time]", values.startTime);
    //   dataForm.append("events[end_time]", values.endTime);
    //   dataForm.append("events[event_link]", values.externalLink);
    //   dataForm.append("events[description]", values.description);
    //   dataForm.append("events[address]", values.address);
    //   dataForm.append("events[venue]", values.venue);
    // }
    setLoading(true);
    fetch(POST_NEWSFEED_API_KEY + "?group_id=" + myArray[1], {
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
          const mergedata = [result.data, ...setList.lists]
          setList.setList(mergedata);
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
  useEffect(() => {
    Current_User();
    mentioneds();
    HashTags();
  }, [])


  const HashTags = async () => {
    await fetch(HASHTAGS_API, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          let awa = [];
          for (let i = 0; i < result.data.length; i++) {
            awa[i] = {
              display: result.data[i].name,
              id: result.data[i].id,
            }
          }
          sethastags(awa);
        }
      })
      .catch((err) => console.log(err));
  }
  let a = '';
  const mentioneds = () => {
    if (typeof window !== "undefined") {
      var authKey = window.localStorage.getItem("keyStore");
    }
    // const [mention,setmention] = useState([]);
    fetch(SEARCH_MULTIPLE + "/gettags?query=" + 'friends', {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          let awa = [];
          for (let i = 0; i < result.data.length; i++) {
            awa[i] = {
              display: '@' + result.data[i].first_name + " " + result.data[i].last_name,
              link: 'Friends-Profile?' + result.data[i].id,
              avatar: result.data[i].display_photo_url,
              id: result.data[i].id,
              type: 'User'
            }
          }
          a = awa;
          // setspeakerMention(awa);
          mentionpages();
          // console.log("frie",awa);
        }
      })
      .catch((err) => console.log(err));
  };
  const mentionpages = () => {
    if (typeof window !== "undefined") {
      var authKey = window.localStorage.getItem("keyStore");
    }
    fetch(SEARCH_MULTIPLE + "/gettags?query=" + 'pages', {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          let awa = [];

          for (let i = 0; i < result.data.length; i++) {
            awa[i] = {
              display: '@' + result.data[i].name,
              link: 'Liked-Pages?' + result.data[i].id,
              avatar: result.data[i].display_photo_url,
              id: result.data[i].id,
              type: 'Page'
            }
          }
          let dbc = [...a, ...awa]
          setMentioned(dbc);
          // setspeakerMention(dbc);
          //  console.log("ment",mentioned);
        }
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="mt-8 z-20">
      <div className="w-full xl:w-[980px] lg:w-[730px] md:w-[780px] rounded-xl bg-white p-[22px]">
        <form onSubmit={postNewsData}>
          <div className="w-full flex justify-start gap-[22px]">
            <div className="w-[42px] h-[42px]">
              {userDetails && userDetails.display_photo_url ? (
                <img
                  src={userDetails.display_photo_url}
                  className="rounded-full w-[42px] h-[42px] object-cover"
                  width={42}
                  height={42}
                  placeholder="empty"
                  alt="profile-image"
                />
              ) : (
                <Image
                  src={ProfileAvatar}
                  width={42}
                  height={42}
                  placeholder="empty"
                  alt="profile-image"
                />
              )}

            </div>

            {/* <textarea
              type="text"
              name="post-text"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full pt-0 resize-none border-0 px-0 text-base overflow-y-hidden outline-none focus:outline focus:ring-0"
              placeholder="Start a post?"
            ></textarea> */}
            <HashtagMentionInput postText={postText} setPostText={setPostText} mentioned={mentioned} tags={tags} settags={settags} hastags={hastags} />
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
                onClick={handleVideoRemove}
                className="bg-indigo-100 absolute top-4 right-4 z-50 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
              >
                <TrashIcon className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          ) : (
            ""
          )}

          {postImagePreview ? (
            // <div className={`relative`}>
            //   <img
            //     src={postImagePreview}
            //     className="aspect-video object-cover rounded-xl mb-4"
            //     alt=""
            //   />

            //   <div
            //     onClick={handleCoverReomve}
            //     className="bg-indigo-100 absolute top-4 right-4 z-50 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
            //   >
            //     <TrashIcon className="w-5 h-5 text-indigo-600" />
            //   </div>
            // </div>
            <div className="flex flex-wrap gap-4" >
              {postImagePreview.map((i,j) => (
                <div className="relative" key={i}>
                  <img
                    src={i}
                    key={i}
                    className="object-cover rounded-xl w-[300px] h-[300px]"
                  />
                  <div className="absolute top-0 hover:shadow-4xl right-0 w-7 h-7 flex justify-center items-center bg-indigo-400 rounded-l-full">
                    <TrashIcon className="h-4 w-4 text-white" onClick={ ()=>handleCoverReomve(j)} />
                    {/* <div>
                    <p className="text-sm font-medium text-gray-900">
                      Delete
                    </p>
                  </div> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}

          {values.eventName && true ? (
            <div className={`rounded-xl bg-white border border-gray-100 mb-2`}>
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

          <div className="flex justify-between items-center border-t-1 pt-2">
            <div className="flex items-center gap-3 md:gap-6">
              <div className="relative flex gap-1 md:gap-2 items-center justify-center">
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
                <div className="font-extralight">Photo Upload</div>
              </div>
              <div className="relative flex gap-1 md:gap-2 items-center justify-center">
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
                <div className="font-extralight">Video Upload</div>
              </div>

              {/* <div className="flex gap-1 md:gap-2 items-center justify-center border-indigo-500">
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
                <div className="font-extralight">Events</div>
              </div> */}
              {/* <div className="flex gap-1 md:gap-2 items-center justify-center border-indigo-500">
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
                <div className="font-extralight"> Article</div>
              </div> */}
            </div>
            <button
              disabled={postText == 0 ? true : false}
              type="submit"
              className={`w-[100px] h-8 rounded-full flex gap-1 items-center justify-center bg-indigo-400 text-white cursor-pointer ${postText == 0 ? `bg-indigo-200` : ``
                }`}
            >
              {loading ? <Spinner /> : "Public"}
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
                          required="{image}"
                          className="absolute top-0 left-0 w-full h-[270px] opacity-0"
                          onChange={handleImageSelect}
                        />
                        <div
                          className={`text-center	${previewEventCoverImage ? "hidden" : "visible"
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
                              className="bg-indigo-100 absolute top-4 right-4 z-40 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
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
                              required
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
                              value="in_person"
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
                            className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${errors.eventName && touched.eventName
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
                              Start Date <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              name="startDate"
                              value={values.startDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Event Name"
                              className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${errors.startDate && touched.startDate
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
                              Start Time <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="time"
                              name="startTime"
                              value={values.startTime}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Event Name"
                              className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${errors.startTime && touched.startTime
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
                                Address <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="address"
                                value={online && true ? "" : values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Event Name"
                                className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${errors.address && touched.address
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
                                className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${errors.venue && touched.venue
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
                      {
                        previewEventCoverImage && values.eventName && values.startTime && selectedTimezone.label && values.endTime ? (
                          <button
                            type="button"
                            onClick={closeModal}
                            className="w-[100] h-[32px] inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
                          >
                            Continue
                          </button>
                        ) : (
                          <button
                            type="disable"
                            className="w-[100] cursor-not-allowed h-[32px] inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-400">
                            Continue
                          </button>)

                      }

                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default NewsPostProfile;
