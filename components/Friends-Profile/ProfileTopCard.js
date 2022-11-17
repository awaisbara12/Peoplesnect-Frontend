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
import { SHOW_USER_PROFILE } from "../../pages/config";
const ProfileTopCard = (props) => {
  const [userDetails, setUserDetails] = useState();
  const [btn1, setbtn1] = useState(true);
// Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  
  const Show_User=async()=>{      
    await fetch(`${SHOW_USER_PROFILE}/${props.id}`, {
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
          //console.log("Current Userss",result.data)
        }
      })
      .catch((err) => console.log(err)); 
  }

  useEffect(() => {
    Show_User(); // Get Current User
  },[]);

  return (
    <>
    <div className="mt-8 w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="w-full bg-white p-5 rounded-t-xl">
          <div className="w-full">
            <div className="">
            {userDetails && userDetails.cover_photo_url?(
                  <img
                    src={userDetails.cover_photo_url}
                    width={96}
                    height={96}
                    className="object-cover rounded-xl h-[320px] w-[1030px]"
                    placeholder="empty"
                    alt="profile-image"
                  />
                  ):( 
                    <Image
                      src={postimage}
                      className="object-cover rounded-xl"
                      width={1030}
                      height={320}
                      alt=""
                    />
                  )}
            </div>
            <div className="">
              <div className="absolute  p-2 -mt-10 ml-14 rounded-full bg-white">
                <div className="">
                  {userDetails && userDetails.display_photo_url?(
                     <Link href="">
                     <a>
                       <img
                         src={userDetails.display_photo_url}
                         className="object-cover rounded-full z-40 h-[96px] w-[96px]"
                        />
                     </a>
                   </Link>
                  ):(
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
                  )}
                 
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 flex flex-col ml-48 gap-1">
            <div className="group relative">
              
              {userDetails && userDetails.first_name?(
                <div className="text-2xl text-indigo-400 font-bold capitalize">
                {userDetails.first_name} {userDetails.last_name}
                </div>
                ):(<div className="text-2xl text-indigo-400 font-bold">
                 Profile Name
                </div>)}
              
            </div>
            <Link href="" className="">
              <a className="text-gray-500 text-xs font-semibold">
              {userDetails && userDetails.city?(
                 <div className="flex gap-1 items-center">
                  <LocationMarkerIcon className="w-5 h-5" />
                  {userDetails.city}{userDetails.country?(<p>- {userDetails.country}</p>):('')}
                </div>
              ):(<div className="flex gap-1 items-center">
              <LocationMarkerIcon className="w-5 h-5" />
              User Location
            </div>)}
              </a>
            </Link>
          </div>
        </div>
        <div className="">
          <TabsProfileCard user={userDetails} />
        </div>
      </div>
    </>
  );
};

export default ProfileTopCard;
