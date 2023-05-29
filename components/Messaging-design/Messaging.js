import React, { useState, Fragment, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import ProfileAvatar from "../../public/images/profile-avatar.png";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import {
  PhotographIcon,
  EmojiHappyIcon,
  ChevronRightIcon,
  PaperAirplaneIcon,
  ChevronDownIcon,
  PencilAltIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";
import { useFormik } from "formik";
import { eventScheema } from "../auth/schemas/CreateEventScheema";
import { CONVERSATION_API, CURENT_USER_LOGIN_API, SEARCH_MULTIPLE, WS_PUBLIC_API } from "../../pages/config";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";

const Messaging = () => {
  const [openTab, setOpenTab] = React.useState(1);
  let [results, setresults] = useState();
  let [smsFriends, setsmsFriends] = useState([]);
  let [value, setvalue] = useState();
  const [text, setText] = useState("");
  const [Conversation, setConversation] = useState([]);
  const [currentuser, setcurrentuser] = useState("");
  const [Conversation_id, setConversation_id] = useState("");
  const [c_pageConversation, setc_pageConversation] = useState(1);         // PAGE PARAM [:- PAGY]
  const [c_pageFriend, setc_pageFriend] = useState(1);         // PAGE PARAM [:- PAGY]

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  function createConversationSub(CableApp) {
    CableApp.subscriptions.create(
      {
        channel: 'ConversationChannel',
      },
      {
        connected: () => console.log('Converstion connected'),
        disconnected: () => console.log('Converstion disconnected'),
        received: data => {  console.log('Converstion received');GetConversation();}
      } 
    );
  }
  function handleOnEnter(text) {
  }
  
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
  useEffect(() => {
    let actionCable; let ReactDOM;
    if (typeof window !== 'undefined') {
      actionCable = require('actioncable');
      const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
      Current_User(CableApp);
    }
    const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
    Current_User(CableApp);
    ShowFriends();
  }, []);
  // Get All Conversation
  const GetConversation=async()=>{     
    await fetch(CONVERSATION_API+"?page="+c_pageConversation, {
      method: "GET",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result && result.data) {
          const mergedata = [...Conversation, ...result.data ]
          setConversation(mergedata);
          setc_pageConversation(result.pages.next_page)
          // console.log("Result",result.data)
        }
      })
      .catch((err) => console.log(err)); 
  }
  // Current User
  const Current_User=async(CableApp)=>{   
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
          GetConversation();
          setcurrentuser(result.data);
          createConversationSub(CableApp)
        }
      })
      .catch((err) => console.log(err)); 
  }
  // For Search The Friends
  const FriendSearch  = async(event) =>{
    setvalue(event.target.value);
    if (event.target.value.length == 0)
    {
      setresults('');
    }else{
      await fetch(SEARCH_MULTIPLE+"/messengerfriends?query="+event.target.value+"&type=User", {
        method: "GET",
         headers: {
          Accept: "application/json", 
           Authorization: `${authKey}`,
         },
      })
         .then((resp) => resp.json())
        .then((result) => {
          if (result) {
            if (event.target.value.length == 0)
            {
              setresults('');
            }else{
              setresults(result.data);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }
  //  Get Friends
  const ShowFriends  = async() =>{
    if (typeof window !== "undefined") {
      var authKey = window.localStorage.getItem("keyStore");
    }
    await fetch(SEARCH_MULTIPLE+"/messengerfriends?type=friends&page="+c_pageFriend, {
      method: "GET",
        headers: {
        Accept: "application/json", 
          Authorization: `${authKey}`,
        },
    })
      .then((resp) => resp.json())
      .then((result ) => {
        if (result && result.data) {
          const mergedata = [...smsFriends, ...result.data ]
          setsmsFriends(mergedata);
          setc_pageFriend(result.pages.next_page)
        }
      })
      .catch((err) => console.log(err));
  }

  //  Fetch Conversation OnScroll [:pagy ]
  const fetchMoreConversation = async() => {
    GetConversation();
  }
  //  Fetch Friends OnScroll [:pagy ] 
  const fetchMoreFriend = async() => {
    ShowFriends();
  }

  return (
    <div className="">
      <div className="w-full border rounded-l-xl">
        <div className="border bg-white rounded-l-xl">
          <div className="sticky z-40 top-0 bg-white rounded-l-xl">
            <div className="flex justify-between p-3 border-b">
              <div className="font-bold flex items-center gap-2 ">
                {currentuser?currentuser.first_name+" "+currentuser.last_name:''} <ChevronDownIcon className="h-5 w-5" />{" "}
              </div>
            </div>
            <div className="mt-3">
              <ul className="flex justify-between items-center" role="tablist">
                <li className="w-1/2 text-center">
                  <a
                    className={
                      "" +
                      (openTab === 1
                        ? "py-2 text-xs font-bold border-2 border-b-0 text-indigo-400 bg-slate-200 px-3 border-indigo-400"
                        : "px-3 py-2")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                      GetConversation()
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Recent Chats
                  </a>
                </li>
                <li className="w-1/2 text-center">
                  <a
                    className={
                      "" +
                      (openTab === 2
                        ? "py-2 text-xs font-bold border-2 border-b-0 text-indigo-400 bg-slate-200 px-3 border-indigo-400"
                        : "px-3 py-2 text-sm")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    New Message
                  </a>
                </li>
              </ul>
            </div>
           
            <div className="flex-auto">
              <div className="tab-content tab-space pt-2.5">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <div>
                    <input onClick={()=> setOpenTab(2)} onChange={(e)=>{setOpenTab(2); e.target.value='';}} placeholder="Search Friends.." className="border rounded border-indigo-400 w-full p-2 placeholder:font-light focus:border-indigo-400 active:border-indigo-400 focus-visible:border-indigo-400 " />
                  </div>
                  <InfiniteScroll
                    dataLength={Conversation.length}
                    next={fetchMoreConversation}
                    hasMore={c_pageConversation != null}
                    loader={<div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                  >
                  <div className="overflow-y-scroll h-[370px] ">
                    {currentuser && Conversation && 
                      Conversation.map((i)=>{
                        if(i.recipient && currentuser.id != i.recipient.id)
                          {
                            return(
                              <Link href={{pathname:"/messaging-design",query:i.recipient.id}} key={i.id}>
                                <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                                  {currentuser.id!=i.message_CID && i.status=="Unread"?(
                                    i.recipient.display_photo_url?(
                                      <div className="relative">
                                        <img
                                          className="object-cover rounded-full w-[45px] h-[45px]"
                                          src={i.recipient.display_photo_url}
                                          alt=""
                                        />
                                        <div className="bg-red-400 h-2.5 w-2.5 -left-1 -top-1 rounded-full absolute"></div> 
                                      </div>
                                    ):(
                                      <div className="relative">
                                        <Image
                                          className="object-cover rounded-full"
                                          src={ProfileAvatar}
                                          width={45}
                                          height={45}
                                          alt=""
                                        />
                                        <div className="bg-red-400 h-2.5 w-2.5 -left-1 -top-1 rounded-full absolute"></div> 
                                      </div>
                                    )):(
                                      i.recipient.display_photo_url?(
                                        <img
                                          className="object-cover rounded-full w-[45px] h-[45px]"
                                          src={i.recipient.display_photo_url}
                                          alt=""
                                        />
                                      ):( 
                                      <Image
                                        className="object-cover rounded-full"
                                        src={ProfileAvatar}
                                        width={45}
                                        height={45}
                                        alt=""
                                      />)
                                    )
                                  }
                                  <div className="">
                                    <div className="font-bold">{i.recipient.first_name} {i.recipient.last_name}</div>
                                    {currentuser.id!=i.message_CID && i.status=="Unread"?(
                                      <div className="">{i.status} message</div>
                                    ):(
                                      <div className="">Seen all message</div>
                                    )}
                                  </div>
                                </a>
                              </Link>
                            )
                          }else{
                            return(
                              <Link href={{pathname:"/messaging-design",query:i.sender.id}} key={i.id}>
                                <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                                {currentuser.id!=i.message_CID && i.status=="Unread"?(
                                  i.sender.display_photo_url?(
                                    <div className="relative">
                                      <img
                                        className="object-cover rounded-full w-[45px] h-[45px]"
                                        src={i.sender.display_photo_url}
                                        alt=""
                                      />
                                      <div className="bg-red-400 h-2.5 w-2.5 -left-1 -top-1 rounded-full absolute"></div> 
                                    </div>  
                                    ):(
                                      <div className="relative">
                                        <Image
                                          className="object-cover rounded-full"
                                          src={ProfileAvatar}
                                          width={45}
                                          height={45}
                                          alt=""
                                        />
                                        <div className="bg-red-400 h-2.5 w-2.5 -left-1 -top-1 rounded-full absolute"></div> 
                                      </div>
                                    )
                                ):(
                                  i.sender.display_photo_url?(
                                    <img
                                      className="object-cover rounded-full w-[45px] h-[45px]"
                                      src={i.sender.display_photo_url}
                                      alt=""
                                    />
                                    ):(
                                      <Image
                                        className="object-cover rounded-full"
                                        src={ProfileAvatar}
                                        width={45}
                                        height={45}
                                        alt=""
                                      />
                                    )
                                  )}
                                  <div className="">
                                    <div className="font-bold">{i.sender.first_name} {i.sender.last_name}</div>
                                    {/* <div className="">user as show as popup</div> */}
                                    {currentuser.id!=i.message_CID && i.status=="Unread"?(
                                      <div className="">You {i.status} message</div>
                                    ):(
                                      <div className="">Seen all message</div>
                                    )}
                                  </div>
                                </a>
                              </Link>
                            )
                          }
                      })
                    }
                    
                    
                  </div>
                  </InfiniteScroll>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <div>
                    <input placeholder="Search Friends.." 
                    className="border rounded border-indigo-400 w-full p-2 placeholder:font-light focus:border-indigo-400 active:border-indigo-400 focus-visible:border-indigo-400 " 
                    onChange={FriendSearch}/>
                  </div>
                  {results?(
                    <div className="overflow-y-scroll h-[370px] ">
                      {results && results.map((i)=>(
                        <Link href={{pathname:"/messaging-design", query:i.user.id}} key={i.id}>
                          <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                            {i.user && i.user.display_photo_url?(
                              <img
                                className="object-cover rounded-full w-[45px] h-[45px] "
                                src={i.user.display_photo_url}
                                alt=""
                              />
                            ):(
                              <Image
                                className="object-cover rounded-full"
                                src={ProfileAvatar}
                                width={45}
                                height={45}
                                alt=""
                              />
                            )}
                            
                            <div className="">
                              <div className="font-bold">{i.user.first_name} {i.user.last_name}</div>
                              <div className="">Search User</div>
                            </div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  ):(
                    smsFriends?(
                      <InfiniteScroll
                        dataLength={smsFriends.length}
                        next={fetchMoreFriend}
                        hasMore={c_pageFriend != null}
                        loader={<div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                      >
                        <div className="overflow-y-scroll h-[370px] ">
                          {smsFriends && smsFriends.map((i)=>(
                            <Link href={{pathname:"/messaging-design", query:i.id}} key={i.id}>
                              <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                                {i && i.display_photo_url?(
                                  <img
                                    className="object-cover rounded-full w-[45px] h-[45px] "
                                    src={i.display_photo_url}
                                    alt=""
                                  />
                                ):(
                                  <Image
                                    className="object-cover rounded-full"
                                    src={ProfileAvatar}
                                    width={45}
                                    height={45}
                                    alt=""
                                  />
                                )}
                                
                                <div className="">
                                  <div className="font-bold">{i.first_name} {i.last_name}</div>
                                  <div className="">Friends</div>
                                </div>
                              </a>
                            </Link>
                          ))}
                        </div>
                      </InfiniteScroll>
                    ):('')
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
