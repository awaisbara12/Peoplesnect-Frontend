import ReactDOM from "react-dom";
import dynamic from "next/dynamic";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-girl.jpg";
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
import { eventScheema } from "../auth/schemas/CreateEventScheema";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { POST_NEWSFEED_API_KEY } from "../../pages/config";
import ImageUpload from "image-upload-react";
import Link from "next/link";
import Spinner from "../common/Spinner";
import axios from "axios";
import NewsFeedUserCard from "../news-feed/newsfeed/feedcard/NewsFeedUserCard";

const NewsPostProfile = ({ setList }) => {
  return (
    <div className="mt-7 z-50">
      <div className="w-full rounded-xl bg-white p-[22px]">
        <div className="text-center">
          <h1 className="my-5">Private Account</h1>
          For More Details Must <a href="" className="text-indigo-400">Add</a> this User
        </div>
      </div>
    </div>
  );
};
export default NewsPostProfile;
