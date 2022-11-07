import React, { Fragment, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import postimage from "../../public/images/266-hero.jpg";
import photos from "../../public/images/pagecover.jpg";
import photos1 from "../../public/images/brand.jpg";
import photos2 from "../../public/images/product1.png";
import photos3 from "../../public/images/groupcover.jpg";

import ProfileAvatar from "../../public/images/profile-girl.jpg";
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
  CURENT_USER_LOGIN_API, UPDATE_PERSONAL_INFO
} from "../../pages/config";

const ProfileTopCard = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const [userDetails, setUserDetails] = React.useState(1);
  const [image, setImage] = useState();
  const [coverimage, setcoverimage] = useState([]);

  const onImageChange = (event) => {
    // if (event.target.files && event.target.files[0]) {
      setImage(window.URL.createObjectURL(event.target.files[0]));
      setcoverimage(event.target.files[0]);
      console.log(coverimage);
      UpdatePersonal();
    // }
  }

  const UpdatePersonal =async()=>{
    const dataForm = new FormData();
    dataForm.append("users[cover_photo]", coverimage);
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
        setUserDetails(result.data.id); 
        alert("Your Information has been Updated! ");
        setcoverimage(result.data.cover_photo);
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
  const Current_User=async()=>{    
   
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
          // console.log("Current Users Profile",result.data.id);
          setcoverimage(result.data.cover_photo);
          console.log(coverimage);
        }
      })
      .catch((err) => console.log(err)); 
  }
  useEffect(()=>{
    Current_User(); 
  },[])
  return (
    <>
    <div className="mt-8 w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="w-full bg-white p-5 rounded-t-xl">
          <div className="group relative w-full">
            <div className="">
              <Link href="/">
                <a>
                  {image? (
                    <Image
                      src={image}
                      className="object-cover rounded-xl"
                      width={1030}
                      height={320}
                      alt=""
                    />
                  ):
                  (
                    <Image
                      src={postimage}
                      className="object-cover rounded-xl"
                      width={1030}
                      height={320}
                      alt=""
                    />
                  )}
                </a>
              </Link>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full rounded-xl h-full bg-black bg-opacity-0 flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-opacity-70 duration-500">
              <div className="relative flex items-center justify-center">
                <div className="">
                  <div className="flex cursor-pointer gap-1 text-sm items-center p-2 rounded-xl border-1 border-white text-white">
                    <PhotographIcon className="w-5 h-5" />
                    Change Cover Photo
                    <input
                      type="file"
                      name="image"
                      id="image"
                      onChange={onImageChange}
                      className="opacity-0 absolute w-6 h-6 -z-0"
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
                      <Image
                        src={ProfileAvatar}
                        width={96}
                        height={96}
                        className="object-cover rounded-full z-40"
                        placeholder="empty"
                        alt="profile-image"
                      />
                    </a>
                  </Link>
                  <div className="absolute top-0 left-0 right-0 bottom-0 w-full rounded-full h-full bg-black bg-opacity-0 z-50 flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-opacity-70 duration-500">
                    <div className="flex gap-1 text-sm text-white rounded-full  cursor-pointer">
                      <PencilIcon className="w-4 h-4" />
                      Edit Profile
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 flex flex-col ml-48 gap-1">
            <div className="group relative">
              <div className="text-2xl text-indigo-400 font-bold">
                Profile Name
              </div>
              <div className="absolute left-40 top-2 opacity-0 group-hover:opacity-100 cursor-pointer">
                <PencilIcon className="h-4 w-4 text-indigo-400" />
              </div>
            </div>
            <Link href="" className="">
              <a className="text-gray-500 text-xs font-semibold">
                <div className="flex gap-1 items-center">
                  <LocationMarkerIcon className="w-5 h-5" />
                  Your Location
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="">
          <TabsProfileCard />
        </div>
      </div>
    </>
  );
};

export default ProfileTopCard;
