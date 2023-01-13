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
  Button,
} from "@material-tailwind/react";
import TabsProfileCard from "./profile-tabs/TabsProfileCard";
import { 
  SHOW_USER_PROFILE, 
  FOLLOW_USER_API, 
  FOLLOW_REQUEST_USER_API,
  GET_CONNECTIONS, 
  
} from "../../pages/config";

const ProfileTopCard = (props) => {
  const [btn1, setbtn1] = useState();
  const [btn2, setbtn2] = useState();
  const [userDetails, setUserDetails] = useState();
  
  
// Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
 
  
  
  
  
  
  
  
  // Create Follower
   const CreateFollower=async(userId)=>
   {      
     const requestOptions = {
       method: 'POST',
       headers:{Accept: "application/json", Authorization: `${authKey}` },
     };
     const response = await fetch(`${FOLLOW_USER_API}?followers[followee_id]=${userId}`,requestOptions);
     const data = await response.json();
     setbtn1('');
     CheckFollower();
     alert("Send Follow Request");
   }
  //UnFollow 
  const UnFollow=async(userId)=>
  {      
    const requestOptions = {
      method: 'DELETE',
      headers:{Accept: "application/json", Authorization: `${authKey}` },
    };
    const response = await fetch(`${FOLLOW_USER_API}/${userId}`,requestOptions);
    const data = await response.json();
    // console.log("DElet Follower", data.data );
    setbtn1('');
    CheckFollower();
  }
  
  // Remove Connection
  const RemoveConnection=async(id)=>{
    const requestOptions = {
      method: 'DELETE',
      headers:{Accept: "application/json", Authorization: `${authKey}`},
    };
    const response = await fetch(`${FOLLOW_REQUEST_USER_API}/${id}`,requestOptions);
    CheckConnection(); // update Pending Request
    //console.log( "Id ha yeh", user_request  )
  }
  // Send Connection Request
   const ConnectionRequest=async(userId)=>
   {     
     const requestOptions = {
       method: 'POST',
       headers:{Accept: "application/json", Authorization: `${authKey}` },
     };
     const response = await fetch(`${FOLLOW_REQUEST_USER_API}?follow_requests[receiver_id]=${userId}`,requestOptions);
     const data = await response.json();
     //console.log("Send", data );
     CheckConnection();
     alert("Send Follow Request");
   }

   
   //Check Connection Request
   const CheckConnection=async()=>
    {   
      await fetch(`${FOLLOW_REQUEST_USER_API}/${props.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json", 
          Authorization: `${authKey}`,
        },
      })
        .then((resp) => resp.json())
        .then((result) => {
          if (result) {
           setbtn2(result.data);
           console.log("Requests check",result.data);  
            //console.log(UserList)
          }
        })
        .catch((err) => console.log('error ha'));      
   }
   // Check Folower
   const CheckFollower=async()=>{      
    await fetch(`${FOLLOW_USER_API}/${props.id}`, {
      method: "GET",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setbtn1(result.data);
        }
      })
      .catch((err) => console.log(err)); 
  }
  //show User-Profile data
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
            CheckConnection();
            //console.log("Current Userss",result.data)
          }
        })
        .catch((err) => console.log(err)); 
  }
  
  useEffect(() => {
    CheckFollower();
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
                    <img
                      src={userDetails.display_photo_url}
                      width={96}
                      height={96}
                      className="object-cover rounded-full z-40 h-[96px] w-[96px]"
                      placeholder="empty"
                      alt="profile-image"
                    />
                  ):(
                    <Image
                      src={ProfileAvatar}
                      width={96}
                      height={96}
                      className="object-cover rounded-full z-40"
                      placeholder="empty"
                      alt="profile-image"
                    />
                  )}
                 
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="my-2 flex flex-col ml-48 gap-1">
              <div className="">
                  {userDetails && userDetails.first_name?(
                    <div className="text-2xl text-indigo-400 font-bold capitalize">
                      {userDetails.first_name} {userDetails.last_name}
                    </div>
                    ):(
                    <div className="text-2xl text-indigo-400 font-bold">
                      Profile Name
                    </div>
                  )}
              </div>
              <span className="text-gray-500 text-xs font-semibold">
                {userDetails && userDetails.city?(
                  <div className="flex gap-1 items-center">
                  <LocationMarkerIcon className="w-5 h-5 capitalize" />
                  {userDetails.city}{userDetails.country?(<span>, {userDetails.country}</span>):('')}
                  </div>):(
                  <div className="flex gap-1 items-center">
                  <LocationMarkerIcon className="w-5 h-5" />
                  User Location
                  </div>
                )}                  
              </span>
            </div>
            <div>
            
              {btn2 && btn2.length==0 && userDetails && userDetails.profile_type=="private_profile"?(
                <Link 
                href={{
                  pathname: "/User-Profile",
                  query: userDetails.id+"?"+"ok",
                }}>
                <Button className="bg-indigo-400 rounded-full mt-4" 
                onClick={()=>ConnectionRequest(userDetails.id)}>
                Connect
                </Button>
                
              </Link >)
              :('') }
               {btn2 && btn2.length==1 && userDetails && userDetails.profile_type=="private_profile"?(
               <Button className="bg-indigo-400 rounded-full mt-4" 
                onClick={()=>RemoveConnection(btn2[0].id)}>
                Remove Connection
                </Button>
             )
              :('') }

              
              {btn1 && btn1.length==0 && userDetails && userDetails.profile_type=="public_profile"?(
              <Button className="bg-indigo-400 rounded-full mt-4" onClick={()=>CreateFollower(userDetails.id)}>
                Follow
              </Button>):('')}
              {btn1 && btn1.length>0 && userDetails && userDetails.profile_type=="public_profile"?(
              <Button className="bg-indigo-400 rounded-full mt-4" onClick={()=>UnFollow(btn1[0].id)}>
                UnFollow
              </Button>):('')}
              
              
            </div>
          </div>
        </div>
        <div className="">
          <TabsProfileCard user={userDetails}/>
        </div>
      </div>
    </>
  );
};

export default ProfileTopCard;
