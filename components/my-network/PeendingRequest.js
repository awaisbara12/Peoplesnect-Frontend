import React, { useState, useEffect, setState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import Cover from "../../public/images/main-banner.jpg";
import { XCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import dynamic from 'next/dynamic'
import { 
  FOLLOW_USER_API, 
  SUGGESTED_USER_API,
  FOLLOW_REQUEST_USER_API,
  CURENT_USER_LOGIN_API
} from "../../pages/config";

function PeendingRequest() {
  const [UserList, setUserList] = useState(true);
  const [user_request, setUser_Request] = useState([]);
  const { data: user } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState();
  
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  //Get Current User Detail
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
          setUserDetails(result.data.id);  
        }
      })
      .catch((err) => console.log(err)); 
  }
  // Show All PeopleNeact's Users 
  const ShowUsers=async()=>
  {   
    await fetch(SUGGESTED_USER_API, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setUserList(result.data);  
          //console.log("All Users",result)
        }
      })
      .catch((err) => console.log(err));

      
  } 
  //Show All Pending Follow Request
  const PendingFollowRequest=async()=>
  {   
    await fetch(FOLLOW_REQUEST_USER_API, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setUser_Request(result.data);
         //console.log("Requests check",result.data);  
          //console.log(UserList)
                   
        }
      })
      .catch((err) => console.log('err ha'));      
  } 
  const hideUser=async(id)=>
  {
    await fetch(SUGGESTED_USER_API+"?id="+id, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setUserList(result.data);  
          //console.log("All Users",result)
        }
      })
      .catch((err) => console.log(err));
  }
  // Create Follower
  const CreateFollower=async(userId)=>
  {      
    const requestOptions = {
      method: 'POST',
      headers:{Accept: "application/json", Authorization: `${authKey}` },
    };
    const response = await fetch(`${FOLLOW_USER_API}?followers[followee_id]=${userId}`,requestOptions);
    const data = await response.json();
    console.log("Send", data );
    PendingFollowRequest();
    ShowUsers();
    alert("Send Follow Request");
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
    console.log("Send", data );
    PendingFollowRequest();
    ShowUsers();
    alert("Send Follow Request");
  }
  //Ignore & Accept Follow Request
  const ActionOnFollowRequest=async(id,status)=>{
    const requestOptions = {
      method: 'PATCH',
      headers:{Accept: "application/json", Authorization: `${authKey}`},
    };
    const response = await fetch(`${FOLLOW_REQUEST_USER_API}/${id}?follow_requests[status]=${status}`,requestOptions);
    PendingFollowRequest(); // update Pending Request
    //console.log( "Id ha yeh", user_request  )
  }
 
  useEffect(() => {
    Current_User(); // Get Current User
    ShowUsers();            // Show All User
    PendingFollowRequest()  // Show Pending Request
  },[]);
  
  return (
    <div className="mt-8">
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="bg-white rounded-xl">
          <div className="flex justify-between items-center border-b-1 p-4">
            <div className="heading">Connections Request</div>
            <div className="all-button">
              <button className="bg-indigo-400 text-white px-3 py-2 rounded-full">
                See All Request
              </button>
            </div>
          </div>
          {  // Show all Follow request
            Object.values(user_request).map((items)=>{
              if(userDetails)
              {  if(userDetails!=items.sender.id && items.status=="pending")
                {
              return(
              <div className="border-b-1"key="{items.id}">
              <div className="request-profile flex  px-4 py-3 justify-between items-center">
                <div className="flex items-center gap-3">
                  <Link 
                   href={{
                    pathname: "/User-Profile/",
                    query: items.sender.id,}}
                    >
                    <a>
                      <Image src={ProfileAvatar} width={35} height={35} alt="" />
                    </a>
                  </Link>
                  <div className="">
                  <Link 
                   href={{
                    pathname: "/User-Profile/",
                    query: items.sender.id,}}
                    >
                    <a>
                      <div className="username text-sm font-bold">{items.sender.first_name} {items.sender.last_name}</div>
                      <div className="userfield text-xs">{items.sender.city}, {items.sender.country}</div>
                      <div className="mutual-followers text-xs">Matual Friends +3</div>
                    </a>
                    </Link>
                  </div>
                </div>
                <div className="Request-button flex items-center gap-2">
                  <button className="border-1 border-indigo-400 rounded-full text-indigo-400 px-3 py-1 hover:bg-indigo-400 hover:text-white"
                    onClick={()=>ActionOnFollowRequest(items.id,"accepted")}>
                    Accept
                  </button>
                  <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white"
                    onClick={()=>ActionOnFollowRequest(items.id,"cancelled")}>
                    Ignore
                  </button>
                </div>
              </div>
              </div>
              )
              }}
            })
          }
        </div>
      <div className="mt-8">
          <div className="bg-white rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div className="heading font-semibold">Suggestions</div>
              <div className="all-button">
                <button className="bg-indigo-400 text-white p-2 rounded-full">
                  See All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
              {
              Object.values(UserList).map((e)=>
                 { if(!e.recent_company)
                     {
                      e.recent_company="Not Available"
                     }
                     if(!e.followers_count)
                     {
                      e.followers_count="0"
                     }
                  return(
                    <div className="profile mt-10 border rounded-xl" key = {e.id}>
                    <div className="relative cover">
                      <Link 
                        href={{
                        pathname: "/User-Profile/",
                        query: e.id, // the data
                      }}>
                        <a>
                        {e.cover_photo_url?(
                          <img
                            src={e.cover_photo_url}
                            className="object-cover rounded-t-xl h-[96px] w-[620px]"
                            alt=""
                          />
                          ):(
                            <Image
                              className="object-cover rounded-t-xl"
                              src={Cover}
                              width={620}
                              height={200}
                              alt=""
                            />
                          )
                        }
                        </a>
                      </Link>
                      <div className="absolute -bottom-12 border-3 rounded-full border-white left-2">
                        <Link 
                         href={{
                          pathname: "/User-Profile/",
                          query: e.id, // the data
                        }}>
                          <a>
                          {e.display_photo_url?(
                            <img
                              src={e.display_photo_url}
                              className="object-cover rounded-full z-40 h-[70px] w-[70px]"
                              alt=""
                            />
                            ):(
                              <Image
                                className="object-cover rounded-full"
                                src={ProfileAvatar}

                                width={65}
                                height={65}
                                alt=""
                              />
                            )
                          }
                          </a>
                        </Link>
                      </div>
                      <div className="absolute top-2 right-1">
                        <Link href="">
                        <a>
                          <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" onClick={ () =>hideUser(e.id)}/>
                        </a> 
                        </Link>
                      </div>
                    </div>
                    <div className="Details px-4 ">
                      <div className="ml-20 mt-2">
                        <div className="User-Name font-bold capitalize">{e.first_name} {e.last_name}</div>
                        <div className="Locations font-extralight">
                           {e.city}, {e.country}
                        </div>
                      </div>
                      <div className="details mt-3 font-light block max-h-[40px] overflow-hidden">
                        {e.description}
                      </div>
                      <div className="followers mt-3 font-extralight">
                        {e.followers_count} Followers
                      </div>
                     
                      {e.profile_type === "public_profile"?(
                        <div>
                          <button className="w-full bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent
                            border-1 border-indigo-400 mt-5 mb-2 "onClick={()=>CreateFollower(e.id)}>
                            Follow
                          </button>
                          <button className="w-full bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent
                            border-1 border-indigo-400 mb-4 " onClick={()=>ConnectionRequest(e.id)}>
                            Connect
                          </button>
                        </div>
                        
                      ):(
                        <button className="w-full bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent
                          border-1 border-indigo-400 mt-10 mb-5 "onClick={()=>ConnectionRequest(e.id)}>
                          Connect
                        </button>
                      )}
                      
                    </div>
                    </div>
                 );}
                  
              )}
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeendingRequest;
