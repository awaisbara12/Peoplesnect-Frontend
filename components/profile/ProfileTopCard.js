import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import postimage from "../../public/images/266-hero.jpg";
import photos from "../../public/images/pagecover.jpg";
import photos1 from "../../public/images/brand.jpg";
import photos2 from "../../public/images/product1.png";
import photos3 from "../../public/images/groupcover.jpg";

import ProfileAvatar from "../../public/images/profile-avatar.png";
import {
  BookmarkAltIcon,
  PhotographIcon,
  ChatAlt2Icon,
  CogIcon,
  LocationMarkerIcon,
  PencilIcon,
  PhoneIcon,
  UserIcon,
  XIcon,
  StarIcon,
  TrashIcon
} from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/solid";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import TabsProfileCard from "./profile-tabs/TabsProfileCard";
import {
  CURENT_USER_LOGIN_API, REMOVE_DP_API, UPDATE_PERSONAL_INFO
} from "../../pages/config";

const ProfileTopCard = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const [userDetails, setUserDetails] = React.useState(1);
  const [image, setImage] = useState();
  const [coverpreview, setcoverpreview] = useState();
  const [coverimage, setcoverimage] = useState();
  const [profileimage, setprofileimage] = useState();

  const onImageChange = (event) => {
    if (event.target.files.length !== 0) {
      setImage(window.URL.createObjectURL(event.target.files[0]));
      UpdatePersonal(event.target.files[0], "cover");
    }
  }
  const onProfileChange = (event) => {
    if (event.target.files.length !== 0) {
      setcoverpreview(window.URL.createObjectURL(event.target.files[0]));
      UpdatePersonal(event.target.files[0], "profile");
    }
  }

  const UpdatePersonal = async (e, type) => {
    const dataForm = new FormData();
    if (type == "cover") {
      dataForm.append("users[cover_photo]", e);
    }
    else if (type == "profile") {
      dataForm.append("users[display_photo]", e);
    }
    await fetch(UPDATE_PERSONAL_INFO, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setUserDetails(result.data);
          setcoverimage(result.data.cover_photo_url);
          setprofileimage(result.data.display_photo_url);
        }
      })
      .catch((err) => console.log(err));
  }

  const Deletephoto = async (a) => {
   
    await fetch(REMOVE_DP_API+"?type="+a, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setcoverpreview("");
          setImage("");
          Current_User();
        }
      })
      .catch((err) => console.log(err));
  }

  // Bareer Key
  if (typeof window !== "undefined") {
    // Bareer Key
    var authKey = window.localStorage.getItem("keyStore");
  }

  //current User
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
          setcoverimage(result.data.cover_photo_url);
          setprofileimage(result.data.display_photo_url);
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    Current_User();
  }, [])
  return (
    <>
      <div className="mt-8 w-full xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="w-full md:w-full h-[275px] md:h-auto bg-white p-5 rounded-t-xl">
          <div className="group relative w-full">
            <div className="">
              <Link href="/">
                <a>
                  {image ? (
                    <Image
                      src={image}
                      className="object-cover rounded-xl"
                      width={1030}
                      height={320}
                      alt=""
                    />
                  ) : (
                    coverimage ? (
                      <img
                        src={coverimage}
                        className="object-cover rounded-xl h-[320px] w-[1030px]"
                        alt=""
                      />
                    ) :
                      (
                        <Image
                          src={postimage}
                          className="object-cover rounded-xl"
                          width={1030}
                          height={320}
                          alt=""
                        />
                      )
                  )}
                </a>
              </Link>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full rounded-xl h-full bg-black bg-opacity-0 flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-opacity-90 duration-500">

              <div className="absolute top-2 right-2 bg-indigo-400 p-2 rounded-full">
                <TrashIcon className="w-5 h-5 text-white"  onClick={()=>Deletephoto("cover_photo")}/>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="">
                  <div className="flex gap-1 text-sm items-center p-2 rounded-xl border-1 border-white text-white">
                    <PhotographIcon className="w-5 h-5" />
                    Change Cover Photo
                    <input
                      type="file"
                      name="image"
                      id="image"
                      onChange={onImageChange}
                      className="opacity-0 absolute top-auto left-auto right-auto w-44  h-6 -z-0"
                      title={""}
                      multiple
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="absolute  p-2 -mt-10 ml-14 rounded-full bg-white">
                <div className="relative">
                  <Link href="">
                    <a>
                      {coverpreview ? (
                        <Image
                          src={coverpreview}
                          width={96}
                          height={96}
                          className="object-cover object-top rounded-full z-40"
                          placeholder="empty"
                          alt="profile-image"
                        />
                      ) : (
                        profileimage ? (
                          <img
                            src={profileimage}
                            className="object-cover rounded-full z-40 h-[96px] w-[96px]"
                            alt=""
                          />
                        ) : (
                          <Image
                            src={ProfileAvatar}
                            width={96}
                            height={96}
                            className="object-cover rounded-full z-40"
                            placeholder="empty"
                            alt="profile-image"
                          />
                        )
                      )}
                    </a>
                  </Link>
                  <div className="absolute top-0 left-0 right-0 bottom-0 w-full rounded-full h-full bg-black bg-opacity-0 z-50 flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-opacity-70 duration-500">
                    <div className="flex gap-1 text-sm text-white rounded-full  cursor-pointer">
                      <PencilIcon className="w-4 h-4" />
                      <div>
                        Edit Profile
                        <input
                          type="file"
                          name="image"
                          id="image"
                          onChange={onProfileChange}
                          className="opacity-0 absolute top-auto left-0 z-10"
                          title={""}
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-indigo-400 p-1 z-50 rounded-full">
                    <TrashIcon onClick={()=>Deletephoto("display_photo")} className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {userDetails ? (
            <div className="my-2 flex flex-col ml-48 gap-1">
              <div className="group relative">
                <div className="text-2xl text-indigo-400 font-bold capitalize">
                  {userDetails.first_name} {userDetails.last_name}
                </div>
                <div className="absolute left-40 top-2 opacity-0 group-hover:opacity-100 cursor-pointer">
                  {/* <PencilIcon className="h-4 w-4 text-indigo-400" /> */}
                </div>
              </div>
              <Link href="" className="">
                <a className="text-gray-500 text-xs font-semibold">
                  <div className="flex gap-1 items-center capitalize">
                    <LocationMarkerIcon className="w-5 h-5" />
                    {userDetails.city ? userDetails.city + ", " : ""} {userDetails.state ? userDetails.state + ", " : ""} {userDetails.country ? userDetails.country : ''}
                  </div>
                </a>
              </Link>
            </div>
          ) : ('')}
        </div>
        <div className="w-full">
          <TabsProfileCard />
        </div>
      </div>
    </>
  );
};

export default ProfileTopCard;
