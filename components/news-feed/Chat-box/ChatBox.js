import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { createPopper } from "@popperjs/core";
import {
  ArrowLeftIcon,
  ChatAlt2Icon,
  PaperAirplaneIcon,
  PhotographIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/outline";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import ProfileAvatar2 from "../../../public/images/mira.png";
import InputEmoji from "react-input-emoji";
import { CONVERSATION_API, CURENT_USER_LOGIN_API, MESSAGES_API, SEARCH_MULTIPLE, WS_PUBLIC_API } from "../../../pages/config";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";


const Dropdown = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [dropdownPopoverShow1, setDropdownPopoverShow1] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const btnDropdownRef1 = React.createRef();
  const popoverDropdownRef1 = React.createRef();
  
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const [Conversation, setConversation] = useState([]);          // all Conversation
  const [currentuser, setcurrentuser] = useState("");            //current-user
  let [value, setvalue] = useState();                            // Searching value fron 2nd tab
  let [results, setresults] = useState();                        // Searched-User
  const [msguser, setmsguser] = useState();                      //  user whom you want to chat
  const [messages, setmessages] = useState([]);                  // all msgs
  const [attachment_type, setattachment_type] = useState("");
  const [text, setText] = useState("");
  const [postImage, setPostImage] = useState([]);
  const [postImagePreview, setpostImagePreview] = useState();
  let [smsNotify, setsmsNotify] = useState();                  // Get all Friends
  
  const [subscribed, setsubscribed] = useState();                // Sms Subscription
  const [currentpagemy, setcurrentpagemy] = useState(1);         // PAGE PARAM [:- PAGY]
  let [smsFriends, setsmsFriends] = useState([]);                  // Get all Friends
  
  const messageRef = useRef();
  var tomsgid;                                                   
  const myDivRef = useRef(null); 


  // Box Open
  const openDropdownPopover = () => {
    let actionCable;
    if (typeof window !== 'undefined') {
      actionCable = require('actioncable');
      const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
      setsubscribed(CableApp);
      createConversationSub(CableApp);
    }
    const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
    createConversationSub(CableApp)
    ShowFriends();
    
    if(currentuser){
      GetConversation();
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "top-end",
      });
      setDropdownPopoverShow(true);
    }else{Current_User();}
    
  };
  // Box close
  const closeDropdownPopover = () => {
    console.log("close/hode");
    setDropdownPopoverShow(false);
  };


  // open chat-popover
  const openDropdownPopover1 = (i) => {
    GetMessages(i.id)
    tomsgid=i.id;
    setmsguser(i);
    createPopper(btnDropdownRef1.current, popoverDropdownRef1.current, {
      placement: "bottom-end",
    });
    createMessageSub(subscribed , i.id)
    setDropdownPopoverShow1(true);
  };
  // back chat-popover
  const closeDropdownPopover1 = () => {
    setOpenTab(1);
    setmsguser(''); 
    setmessages('');
    setDropdownPopoverShow1(false);
  };
  // Send sms On-Enter
  function handleOnEnter() {
    if(text){
      SendMessage()
    }
  }
  // Upload Attachments [:- image/vedio/file ]
  const handleImagePost = (e) => {
    if(e.target.files[0])
    {
      var type=e.target.files[0].type
      var s=type.split("/")
      setattachment_type(s[0])
      setPostImage(e.target.files[0]);
      
      if (e.target.files.length !== 0 && s[0]=="application"){
        setpostImagePreview(e.target.files[0].name)
      }
      else{
        setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
      }
    }
    
    
  };
  //  Clearing Preview/attachment
  const clearPic =()=>{
    setpostImagePreview('');
    setPostImage('');
    setattachment_type('')
  }
  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-indigo-400")
    : (bgColor = "bg-" + color + "-500");



  useEffect(() => {
    let actionCable;
    if (typeof window !== 'undefined') {
      actionCable = require('actioncable');
      const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
    }
    const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
    Current_User(CableApp);
    ConversationAlert()
  },[])
  // Current User Detail
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
          setcurrentuser(result.data);
          createAlertSub(CableApp, result.data.id)
        }
      })
      .catch((err) => console.log(err)); 
  }
  //  Get All Converstion
  const GetConversation=async()=>{     
    await fetch(CONVERSATION_API, {
      method: "GET",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result && result.data) {
          setConversation(result.data);
          // setc_pageConversation(result.pages.next_page)
        }
      })
      .catch((err) => console.log(err)); 
  }
  // Get All SMS of any Conversation
  const GetMessages=async(id)=>{  
      await fetch(MESSAGES_API+"?recipient_id="+id, {
        method: "GET",
        headers: {
          Accept: "application/json", 
          Authorization: `${authKey}`,
        },
      })
        .then((resp) => resp.json())
        .then((result) => {
          if (result && result.data) {
            setmessages(result.data);
            setcurrentpagemy(result.pages.next_page);
            if (messageRef.current) {
              messageRef.current.scrollIntoView(
                {
                  behavior: 'smooth',
                  block: 'end',  //center
                  inline: 'nearest'
                })
            }

          }
          else{setmessages('');}
        })
        .catch((err) => console.log(err)); 
  }
  //  Send/Create Sms
  const SendMessage=async()=>{
    if (text || attachment_type)
    {
      const dataForm = new FormData();
      if(postImagePreview){
        dataForm.append("attachment_type", attachment_type);
        dataForm.append("attachment", postImage);
      }
      dataForm.append("body", text);
      dataForm.append("recipient_id",msguser.id ); 
      setText('');
      clearPic();     
      await fetch(MESSAGES_API, {
        method: "POST",
        headers: {
          Accept: "application/json", 
          Authorization: `${authKey}`,
        },body: dataForm,
      })
        .then((resp) => resp.json())
        .then((result) => {
          // if (result) {
          //   GetMessages(msguser.id)
          // }
          if (result && result.data) {
            if(messages.length==0){
              let actionCable;
              if (typeof window !== 'undefined') {
                actionCable = require('actioncable');
                const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
              }
              const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
              createMessageSub(CableApp, msguser.id);
            }
            // GetMessages(msguser.id)
            if (messages) {
              let mergedData;
              if (Array.isArray(result.data)) {
                mergedData = [...result.data, ...messages];
              } else {
                mergedData = [result.data, ...messages];
              }
              setmessages(mergedData);
            } else {
              setmessages(Array.isArray(result.data) ? result.data : [result.data]);
            }
            // downfunction();
          }else if(result && result.block){
            alert("You can't send Message");
          }
        })
        .catch((err) => console.log(err)); 
    }
  }
  //  Search User Only
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
    await fetch(SEARCH_MULTIPLE+"/messengerfriends?type=friends", {
      method: "GET",
        headers: {
        Accept: "application/json", 
          Authorization: `${authKey}`,
        },
    })
      .then((resp) => resp.json())
      .then((result ) => {
        if (result && result.data) {
          setsmsFriends(result.data);
        }
      })
      .catch((err) => console.log(err));
  }


// ****** Subscription ******

  // SMS Subscription
  function createMessageSub(subscribeds,  r_id) {
    subscribeds.subscriptions.create(
      {
        channel: 'MessageChannel',
        current_user:  currentuser.id,
        recipient_id:  r_id,
      },
      {
        connected: () => console.log('Box-connected'),
        disconnected: () => console.log('Box-disconnected'),
        received: data => {  
          if(myDivRef.current){
            if( myDivRef.current.id ==  data){
              console.log('Box-recieved');
              GetMessages(data);
            }
          }
       },
      }
    );
  }
  // Converstion Subscription
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
  // Alert Subscription
  function createAlertSub(CableApp , c_id) {
    CableApp.subscriptions.create(
      {
        channel: 'AlertChannel',
        id: c_id,
      },
      {
        connected: () => console.log('Box-alert connected'),
        disconnected: () => console.log('Box-alert disconnected'),
        received: data => {  console.log('Box-alert received');ConversationAlert();
         },
      } 
    );
  }



  //  For Scroll Down
  const downfunction=()=>{
    const scroll =messageRef.current.scrollHeight - messageRef.current.clientHeight;
    messageRef.current.scrollTo(0, scroll);

   // if (messageRef.current) {
      //   messageRef.current.scrollIntoView(
      //     {
      //       behavior: 'smooth',
      //       block: 'end',  //center
      //       inline: 'nearest'
      //     })
      // }
  }
  //  Fetch Sms OnScroll [:pagy ]
  const fetchMoreSMS = async() => {
    if(msguser){
      await fetch(MESSAGES_API+"?recipient_id="+msguser.id+"&page="+currentpagemy, {
        method: "GET",
        headers: {
          Accept: "application/json", 
          Authorization: `${authKey}`,
        },
      }).then((resp) => resp.json())
        .then((result) => {
          if (result && result.data) {
            const mergedata = [...messages, ...result.data ]
            setmessages(mergedata);
            setcurrentpagemy(result.pages.next_page)
          }
          else{setmessages('');}
        })
        .catch((err) => console.log(err)); 
    }else{console.log("no user")}
  } 
  // converstion Alert
  const ConversationAlert=async()=>{     
    await fetch(CONVERSATION_API+"/conversation_alert", {
      method: "GET",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result && result.data) {
          setsmsNotify(result.data);
        }
      })
      .catch((err) => console.log(err)); 
  }
  return (
    <>
      <div className="flex flex-wrap">
        <div className="fixed bottom-4 right-4">
          <div className="relative inline-flex align-middle w-full">
            <a
              className={
                "text-white px-3 py-3 rounded-full shadow-lg bg-indigo-400 "
              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              <ChatAlt2Icon className="h-10 w-10" />
              {smsNotify && smsNotify=="true"? (
                <div className="bg-red-400 h-5 w-5 text-white -top-1 left-3 rounded-full flex justify-center items-center absolute">
                </div>
              ) : ('')}
            </a>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block" : "hidden ") +
                (color === "white" ? " bg-white " : bgColor + " ") +
                "text-base border border-indigo-400 z-50 inbox_DropDown float-left list-none text-left shadow-lg mb-1 transform-gpu translate-x-0 translate-y-0"
              }
              style={{ minWidth: "20rem" }}
            >
              <div className="w-full bg-white h-[380px] z-50">
                <div className="sticky bg-white z-40 top-0">
                  <div className="flex justify-between p-3 border-b">
                    {currentuser?(
                      <div className="font-bold flex items-center gap-2 capitalize">
                        {currentuser.first_name} {currentuser.last_name}
                      </div>
                    ):('')} 
                    <div ref={btnDropdownRef1}
                      onClick={() => {
                        dropdownPopoverShow
                        : closeDropdownPopover();
                      }}>
                      <a>
                        <XIcon className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
                <ul className="flex justify-between items-center" role="tablist">
                  <li className="w-1/2 text-center">
                    <a
                      className={
                        "" +
                        (openTab === 1
                          ? "py-2 font-bold border-b-2 pr-4 border-r-2 text-indigo-400 border-indigo-400"
                          : "w-full py-2 pr-4")
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
                          ? "py-2 font-bold border-b-2 border-l-2 pl-4 text-indigo-400 border-indigo-400"
                          : "w-full py-2 pl-4")
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
                <div className="tab-content tab-space pt-2.5">
                  {/* Recent-Chats */}
                  <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <div>
                      <input onClick={()=> setOpenTab(2)} onChange={(e)=>{setOpenTab(2); e.target.value='';}} 
                        placeholder="Search Chat.." className="border-1 border-indigo-400 w-full p-2 placeholder:font-light focus:border-indigo-400 active:border-indigo-400 focus-visible:border-indigo-400 " />
                    </div>
                    <div className="h-[256px] overflow-y-scroll">
                      {Conversation && currentuser &&
                        Conversation.map((i)=>{
                          if(currentuser.id != i.recipient.id)
                          {
                            return(
                              <div className=" bg-gray-100 p-2 border-b"
                                ref={btnDropdownRef1}
                                onClick={() => {
                                  dropdownPopoverShow1
                                  : openDropdownPopover1(i.recipient);
                                }} key={i.id}>
                                <Link href="">
                                  <a className="flex items-center gap-2">
                                    { currentuser.id!=i.message_CID && i.status=="Unread"?(
                                        i.recipient.display_photo_url?(
                                        <div className="relative">
                                          <img
                                            className="object-cover rounded-full w-[40px] h-[40px]"
                                            src={i.recipient.display_photo_url}
                                            alt=""
                                          />
                                          <div className="bg-red-400 h-2.5 w-2.5 -left-1 -top-1 rounded-full absolute"></div> 
                                        </div>
                                        ):(
                                          <div className="relative">
                                            <Image
                                              className="object-cover"
                                              src={ProfileAvatar}
                                              width={40}
                                              height={40}
                                              alt=""
                                            />
                                            <div className="bg-red-400 h-2.5 w-2.5 -left-1 -top-1 rounded-full absolute"></div> 
                                          </div>
                                      )
                                    ):(
                                      i.recipient.display_photo_url?(
                                        <img
                                        className="object-cover rounded-full w-[40px] h-[40px]"
                                        src={i.recipient.display_photo_url}
                                        alt=""
                                      />
                                      ):(
                                        <Image
                                          className="object-cover"
                                          src={ProfileAvatar}
                                          width={40}
                                          height={40}
                                          alt=""
                                        />
                                      ))
                                    }
                                    <div>
                                      <div className="font-bold capitalize">{i.recipient.first_name} {i.recipient.last_name}</div>
                                      {/* <div className="font-light">Your Conversations</div></div> */}
                                      {currentuser.id!=i.message_CID && i.status=="Unread"?(
                                        <div className="">You {i.status} message</div>
                                      ):(
                                        <div className="">Seen all message</div>
                                      )}
                                    </div>
                                  </a>
                                </Link>
                              </div>
                            )
                          }else{
                            return(
                              <div className=" bg-gray-100 p-2 border-b"
                                ref={btnDropdownRef1}
                                onClick={() => {
                                  dropdownPopoverShow1
                                  : openDropdownPopover1(i.sender);
                                }} key={i.id}>
                                <Link href="">
                                  <a className="flex items-center gap-2">
                                  {currentuser.id!=i.message_CID && i.status=="Unread"?(
                                    i.sender.display_photo_url?(
                                      <div className="relative"> 
                                       <img
                                          className="object-cover rounded-full w-[40px] h-[40px]"
                                          src={i.sender.display_photo_url}
                                          alt=""
                                        />
                                        <div className="bg-red-400 h-2.5 w-2.5 -left-1 -top-1 rounded-full absolute"></div> 
                                      </div>
                                    ):(
                                      <div className="relative">
                                      <Image
                                        className="object-cover"
                                        src={ProfileAvatar}
                                        width={40}
                                        height={40}
                                        alt=""
                                      />
                                      <div className="bg-red-400 h-2.5 w-2.5 -left-1 -top-1 rounded-full absolute"></div> 
                                      </div>
                                    )):(
                                      i.sender.display_photo_url?(
                                        <img
                                          className="object-cover rounded-full w-[40px] h-[40px]"
                                          src={i.sender.display_photo_url}
                                          alt=""
                                        />
                                      ):(
                                        <Image
                                          className="object-cover"
                                          src={ProfileAvatar}
                                          width={40}
                                          height={40}
                                          alt=""
                                        />
                                      )
                                    )
                                  }
                                    <div>
                                      <div className="font-bold capitalize">{i.sender.first_name} {i.sender.last_name}</div>
                                      {currentuser.id!=i.message_CID && i.status=="Unread"?(
                                        <div className="">You {i.status} message</div>
                                      ):(
                                        <div className="">Seen all message</div>
                                      )}
                                      {/* <div className="font-light">Your Conversations</div> */}
                                    </div>
                                  </a>
                                </Link>
                              </div>
                            )

                          }
                        })
                      }
                    </div>
                  </div>
                  {/* New Messages tab */}
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <div>
                      <input onChange={FriendSearch} placeholder="Search New Friends.." className="border-1 border-indigo-400 w-full p-2 placeholder:font-light focus:border-indigo-400 active:border-indigo-400 focus-visible:border-indigo-400 " />
                    </div>
                    {results?(
                      <div className="h-[256px] overflow-y-scroll">
                        {results && results.map((i)=>(
                          <div className=" bg-gray-100 p-2 border-b"
                            ref={btnDropdownRef1}
                            onClick={() => {
                              dropdownPopoverShow1
                              : openDropdownPopover1(i.user);
                            }} key={i.id}>
                            <Link href="">
                              <a className="flex items-center gap-2">
                              {i.user && i.user.display_photo_url?(
                                <img
                                  className="object-cover rounded-full w-[40px] h-[40px] "
                                  src={i.user.display_photo_url}
                                  alt=""
                                />
                              ):(
                                <Image
                                  className="object-cover"
                                  src={ProfileAvatar}
                                  width={40}
                                  height={40}
                                  alt=""
                                />
                              )}
                                <div>
                                  <div className="font-bold capitalize">{i.user.first_name} {i.user.last_name}</div>
                                  <div className="font-light">Search User </div>
                                </div>
                              </a>
                            </Link>
                          </div>
                          ))
                        }
                      </div>
                    ):(
                      smsFriends?(
                        <div className="h-[256px] overflow-y-scroll">
                          {smsFriends && smsFriends.map((i)=>(
                            <div className=" bg-gray-100 p-2 border-b"
                              ref={btnDropdownRef1}
                              onClick={() => {
                                dropdownPopoverShow1
                                : openDropdownPopover1(i);
                              }} key={i.id}>
                              <Link href="">
                                <a className="flex items-center gap-2">
                                {i && i.display_photo_url?(
                                  <img
                                    className="object-cover rounded-full w-[40px] h-[40px] "
                                    src={i.display_photo_url}
                                    alt=""
                                  />
                                ):(
                                  <Image
                                    className="object-cover"
                                    src={ProfileAvatar}
                                    width={40}
                                    height={40}
                                    alt=""
                                  />
                                )}
                                  <div>
                                    <div className="font-bold capitalize">{i.first_name} {i.last_name}</div>
                                    <div className="font-light">Friends  </div>
                                  </div>
                                </a>
                              </Link>
                            </div>
                          ))
                        }
                        </div> 
                      ):('')
                    )}
                  </div>
                  {/* Chat-Box */}
                  {msguser?(
                    <div
                      ref={popoverDropdownRef1}
                      className={
                        (dropdownPopoverShow1 ? "block" : "hidden ") +
                        (color === "white" ? "bg-white " : bgColor + " ") +
                        "text-base z-50 float-left list-none text-left chat_DropDown absolute top-0 rounded shadow-lg mb-1"
                      }
                      style={{ minWidth: "20rem" }}
                    >
                      {/* Chat Box Header */}
                      <div className="sticky bg-white z-50 top-0">
                        <div className="flex justify-between p-3 border-b">
                          <div className="font-bold cursor-pointer flex items-center gap-2"
                            ref={btnDropdownRef1}
                            onClick={() => {
                              dropdownPopoverShow1
                              : closeDropdownPopover1();
                            }}>
                            <ArrowLeftIcon className="h-4 w-4" />
                            <div className="capitalize"> {msguser.first_name} {msguser.last_name} </div>
                          </div>
                          <div ref={btnDropdownRef1}
                            onClick={() => {
                              dropdownPopoverShow
                              : closeDropdownPopover();
                            }}>
                            <a>
                              <XIcon className="h-5 w-5" />
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* chat-Box body */}
                      
                      <div ref={myDivRef} id={msguser && msguser.id}>
                        
                      {/* Show Messages */}
                      
                        <div id="scrollableDiv" ref={messageRef}
                          style={{
                            height: 280,
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column-reverse',
                            backgroundColor: 'white'
                          }}
                          // className="w-full bg-white"
                          // className="w-full bg-white h-[280px] overflow-y-scroll"
                        >
                        {/* <div id="scrollableDiv" ref={messageRef}
                          style={{
                            height: 400,
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column-reverse',
                          }}
                        > */}
                          
                          <InfiniteScroll

                            dataLength={messages.length}
                            next={fetchMoreSMS}
                            style={{ display: 'flex', flexDirection: 'column-reverse' }} 
                            hasMore={currentpagemy != null}
                            inverse={true}
                            scrollableTarget="scrollableDiv"
                            loader={messages && messages.length>0?(<div className="flex justify-center "><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>):('')}
                          >
                            {messages?(
                              <div className="">
                                {messages.slice(0).reverse().map((i)=>{
                                  if(i.user && msguser&& i.user.id==msguser.id)
                                  {
                                    return(
                                      <div className="ml-2 mt-3">
                                        <div className="flex items-center gap-2">
                                        {i.user.display_photo_url?(
                                          <img
                                            className="object-cover w-[30px] h-[30px] rounded-full"
                                            src={i.user.display_photo_url}
                                            width={30}
                                            height={30}
                                            alt=""
                                          />
                                          ):(
                                          <Image
                                            className="object-cover"
                                            src={ProfileAvatar}
                                            width={30}
                                            height={30}
                                            alt=""
                                          />)}
                                          <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                                          {i.attachment && i.attachment_type=="image"?(
                                            <div className="relative w-1/4 mt-2">
                                              <img
                                              src={i.attachment}
                                              className="rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover"
                                              alt=""/>
                                            </div>
                                            ):(
                                              i.attachment && i.attachment_type=="video"?(
                                                <div className="relative w-1/4 mt-2">
                                                  <div className="relative w-1/4 mt-2">
                                                    <video controls className=" rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover">
                                                      <source src={i.attachment} type="video/mp4" />
                                                    </video> 
                                                  </div>
                                                </div>

                                              ):(
                                                i.attachment && i.attachment_type=="application"?(
                                                  <div className="relative w-1/4 mt-2">
                                                    <div className=" flex border-b w-56 pb-2 justify-between ">
                                                      <div>{i.attachment_type}</div>
                                                      <a href={i.attachment} download>
                                                        <button className= "text-black p-0">Download</button>
                                                      </a>
                                                    </div>
                                                  </div>
                                                ):('')
                                              )
                                            )
                                          }
                                            <div className="">{i.body }</div>
                                            <div className=" flex justify-end mt-0 mr-2 text-xs text-black">{i.time}</div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  }else{
                                    return(
                                      <div className="flex justify-end mt-7 mr-2">
                                        <div className="flex items-center gap-2">
                                          <div className="bg-gray-100 p-2 border w-60 rounded-xl">
                                          {i.attachment && i.attachment_type=="image"?(
                                            <div className="relative w-1/4 mt-2">
                                              <img
                                              src={i.attachment}
                                              className="rounded-xl my-4 max-h-[150px] max-w-[280px] object-cover"
                                              alt=""/>
                                            </div>
                                            ):(
                                              i.attachment && i.attachment_type=="video"?(
                                                <div className="relative w-1/4 mt-2">
                                                  <div className="relative w-1/4 mt-2">
                                                    <video controls className=" rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover">
                                                      <source src={i.attachment} type="video/mp4" />
                                                    </video> 
                                                  </div>
                                                </div>

                                              ):(
                                                i.attachment && i.attachment_type=="application"?(
                                                  <div className="relative w-1/4 mt-2">
                                                    {/* <video autoPlay="autoplay" controls className="ml-5 rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover">
                                                      <source src={postImagePreview} type="video/mp4" />
                                                    </video> */}
                                                    {/* <iframe src={i.attachment} width="100%" height="300" >
                                                    </iframe> */}
                                                    {/* <a href={i.attachment} download>Click to download</a>
                                                    <div>{i.attachment_type}</div> */}
                                                    <div className=" flex border-b w-56 pb-2 justify-between ">
                                                      <div>{i.attachment_type}</div>
                                                      <a href={i.attachment} download>
                                                        <button className= "text-black p-0">Download</button>
                                                      </a>
                                                    </div>
                                                  </div>
                                                ):('')
                                              )
                                            )
                                          }
                                            <div className="">{i.body}</div>
                                            <div className=" flex justify-end mt-0 mr-2 text-xs text-black">{i.time}</div>
                                          </div>
                                          {i.user.display_photo_url?(
                                          <img
                                            className="object-cover w-[30px] h-[30px] rounded-full"
                                            src={i.user.display_photo_url}
                                            width={30}
                                            height={30}
                                            alt=""
                                          />
                                          ):(
                                          <Image
                                            className="object-cover"
                                            src={ProfileAvatar}
                                            width={30}
                                            height={30}
                                            alt=""
                                          />)}
                                        </div>
                                      </div>
                                    )
                                  }
                                })}
                              </div>
                            ):('')}
                          </InfiniteScroll>
                        </div>
                      
                         
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        {/*  Create Msgs */}
                        <div className="sticky bottom-0 bg-white">
                          {postImagePreview && attachment_type=="image"?(
                            <div className="relative w-1/4 mt-2">
                              <img
                              src={postImagePreview}
                              className="ml-5 rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover"
                              alt=""/>
                              <div className="bg-indigo-100 absolute top-4 right-0 z-10 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
                              onClick={clearPic} >
                                <TrashIcon className="w-5 h-5 text-indigo-600" />
                              </div>
                            </div>
                          ):(
                            postImagePreview && attachment_type=="video"?(
                              <div className="relative w-1/4 mt-2">
                                <div className="relative w-1/4 mt-2">
                                  <video autoPlay="autoplay" controls className="ml-5 rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover">
                                    <source src={postImagePreview} type="video/mp4" />
                                  </video> 
                                </div>
                                <div className="bg-indigo-100 absolute top-4 right-0 z-10 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
                                onClick={clearPic} >
                                  <TrashIcon className="w-5 h-5 text-indigo-600" />
                                </div>
                              </div>

                            ):(
                              postImagePreview && attachment_type=="application"?(
                                <div className="relative w-1/4 mt-2">
                                {/* <video autoPlay="autoplay" controls className="ml-5 rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover">
                                  <source src={postImagePreview} type="video/mp4" />
                                </video> */}
                                
                                <div>{postImagePreview}</div>
                                
                                <div className="bg-indigo-100 absolute top-4 right-0 z-10 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
                                onClick={clearPic} >
                                  <TrashIcon className="w-5 h-5 text-indigo-600" />
                                </div>
                              </div>
                              ):('')
                              // application
                            )
                          )}
                          <div className="flex items-center px-2">
                            <InputEmoji
                              type="text"
                              react-emoji="w-{100%}"
                              value={text}
                              onChange={setText}
                              // cleanOnEnter
                              onEnter={handleOnEnter}
                              placeholder="Type Your Message"
                            />
                            
                            <div className="">
                            <div className="relative flex gap-2 items-center justify-center">
                              <PhotographIcon
                                className={"h-8 w-8 opacity-40"}
                              />
                              {/* <div className="font-extralight">Photo Upload</div> */}
                              <input
                                type={"file"}
                                name="image"
                                id="image"
                                className="opacity-0 absolute w-6 h-6 -z-0"
                                onChange={handleImagePost}
                                title={""}
                                multiple
                              />
                            </div>
                          </div>
                            {/* <PhotographIcon className="h-10 w-10 opacity-40" /> */}
                            <PaperAirplaneIcon className="h-10 w-10 rotate-90 opacity-40 ml-2" onClick={()=>{SendMessage()}} />
                          </div>
                        </div>
                      </div>

                    </div>
                  ):('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function DropdownRender() {
  return (
    <>
      <Dropdown color="white" />
    </>
  );
}
