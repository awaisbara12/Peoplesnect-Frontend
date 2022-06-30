import React, { useState, useEffect, Fragment } from "react";
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
import { Dialog, Transition } from "@headlessui/react";
import { POST_NEWSFEED_API_KEY } from "../../../../pages/config";
import { useDropzone } from "react-dropzone";
import { TimezoneSelect, clientTz } from "timezone-select-js";
import ImageUpload from "image-upload-react";

import { getCookie } from "cookies-next";
import Link from "next/link";
const authKey = getCookie("authKey");

const NewsPost = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [eventCover, setEventCover] = useState();
  const [imageSrc, setImageSrc] = useState();

  const handleImageSelect = (e) => {
    setEventCover(e.target.files);
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleCoverReomve = (e) => {
    setEventCover("");
    setImageSrc(URL.revokeObjectURL(e.target.files));
  };

  console.log(eventCover)

  const [inPerson, setInPerson] = useState(false);
  const [online, setOnline] = useState(false);

  const [postText, setPostText] = useState("");

  const [files, setFiles] = useState([]);

  const [selectedTimezone, setSelectedTimezone] = useState(clientTz());

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
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

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div className="mt-2">
        <img
          className="rounded-xl"
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const newsPost = async () => {
    const data = {
      news_feeds: {
        body: postText,
        feed_attachments: [files],
        // events: {
        //   name: values.eventName,
        // },
      },
    };
    const resp = await fetch(POST_NEWSFEED_API_KEY, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${authKey}`,
      },
      body: JSON.stringify(data),
    });

    const result = await resp.json();

    try {
      console.log(result);
    } catch (err) {
      console.log(err);
    }
    setPostText("");
    setFiles([]);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="mt-7">
      <div className="w-[600px] rounded-xl bg-white p-[22px]">
        <form>
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
            />
          </div>

          <aside className="pt-0 mb-5">{thumbs}</aside>

          <div className="flex justify-between">
            <div className="flex items-center gap-6">
              <div
                {...getRootProps({ className: "dropzone" })}
                className="relative flex items-center justify-center "
              >
                <PhotographIcon
                  width={22}
                  height={22}
                  className="text-indigo-400 cursor-pointer"
                />
                <input
                  type="file"
                  multiple
                  name="image"
                  {...getInputProps()}
                  className="opacity-0 absolute w-6 h-6 cursor-pointer -z-0"
                />
              </div>

              <VideoCameraIcon
                width={22}
                height={22}
                className="text-indigo-400 cursor-pointer"
              />

              <CalendarIcon
                width={22}
                height={22}
                onClick={openModal}
                className="text-indigo-400 cursor-pointer"
              />

              <EmojiHappyIcon
                width={22}
                height={22}
                className="text-indigo-400 cursor-pointer"
              />

              <NewspaperIcon
                width={22}
                height={22}
                className="text-indigo-400 cursor-pointer"
              />
            </div>
            <div
              onClick={() => newsPost()}
              className="w-[100px] h-8 rounded-full flex gap-1 items-center justify-center bg-indigo-400 text-white cursor-pointer"
            >
              <GlobeAltIcon width={16} height={16} /> Public
            </div>
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
                          className="absolute top-0 left-0 w-full h-[270px] opacity-0"
                          onChange={handleImageSelect}
                        />
                        <div
                          className={`text-center	${
                            eventCover && true ? "hidden" : "visible"
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
                          <img src={imageSrc} className="aspect-video" alt="" />
                          {eventCover && true ? (
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
                              onChange={() => {
                                setOnline(true);
                                setInPerson(false);
                              }}
                            />
                            <label htmlFor="online">Online</label>
                          </fieldset>
                          <fieldset className="flex items-center gap-2 pt-3">
                            <input
                              type="radio"
                              name="event-radio"
                              id="in-person"
                              onChange={() => setInPerson(true)}
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
                            onChange={handleChange}
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
                          <TimezoneSelect
                            value={selectedTimezone}
                            onChange={setSelectedTimezone}
                          />
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
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
