import ReactDOM from "react-dom";
import dynamic from "next/dynamic";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import Image from "next/image";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
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
import { eventScheema } from "../../../auth/schemas/CreateEventScheema";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { POST_NEWSFEED_API_KEY } from "../../../../pages/config";
import ImageUpload from "image-upload-react";
import Link from "next/link";
import Spinner from "../../../common/Spinner";
import axios from "axios";
import NewsFeedUserCard from "../../../news-feed/newsfeed/feedcard/NewsFeedUserCard";

const NewsPost = ({ setList }) => {
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

    const dataForm = new FormData();
    dataForm.append("news_feeds[body]", postText);
    dataForm.append("news_feeds[feed_type]", feedType);

    dataForm.append("news_feeds[feed_attachments][]", postImage);
    dataForm.append("news_feeds[feed_attachments][]", videoSrc);
    if (feedType === "event_feed") {
      dataForm.append("events[name]", values.eventName);
      dataForm.append("events[event_type]", eventType);
      dataForm.append("events[cover_photo]", eventCoverImage);
      dataForm.append("events[event_timezone]", selectedTimezone.label);
      dataForm.append("events[start_date]", values.startDate);
      dataForm.append("events[end_date]", values.endDate);
      dataForm.append("events[start_time]", values.startTime);
      dataForm.append("events[end_time]", values.endTime);
      dataForm.append("events[event_link]", values.externalLink);
      dataForm.append("events[description]", values.description);
      dataForm.append("events[address]", values.address);
      dataForm.append("events[venue]", values.venue);
    }
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

  return (
    <div className="mt-7 z-50">
      <div className="w-[600px] rounded-xl bg-white p-[22px]">
        <form onSubmit={postNewsData}>
          <div className="w-full flex justify-start gap-[22px]">
            <div className="w-[42px] h-[42px]">
              <Image
                src={ProfileAvatar}
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
              placeholder="Start a post?"
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
                  Add Blogs
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
              className={`w-[100px] h-8 rounded-full flex gap-1 items-center justify-center bg-indigo-400 text-white cursor-pointer ${
                postText == 0 ? `bg-indigo-200` : ``
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
                              Start Date <span className="text-red-500">*</span>
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
                              Start Time <span className="text-red-500">*</span>
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
                                Address <span className="text-red-500">*</span>
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
                        className="w-[100] h-[32px] inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
  );
};

export default NewsPost;
