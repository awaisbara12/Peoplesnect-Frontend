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

const Messaging = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const [postImage, setPostImage] = useState([]);
  const [postImagePreview, setpostImagePreview] = useState();
  let [results, setresults] = useState();
  let [value, setvalue] = useState();
  const [text, setText] = useState("");
  const [Conversation, setConversation] = useState("");
  const [currentuser, setcurrentuser] = useState("");

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
  const handleImagePost = (e) => {
    setPostImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
    }
  };
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
  }, []);
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
        }
      })
      .catch((err) => console.log(err)); 
  }
  
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
  const searchmultiples  = async(event) =>{
    setvalue(event.target.value);
    if (event.target.value.length == 0)
    {
      setresults('');
    }else{
      await fetch(SEARCH_MULTIPLE+"?query="+event.target.value+"&type=User", {
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
  return (
    <div className="">
      <div className="w-[240px] xl:w-[280px] lg:w-[300px] md:w-[260px] border rounded-l-xl">
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
                        ? "py-2 font-bold border-2 border-b-0 text-indigo-400 bg-slate-200 px-3 border-indigo-400"
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
                        ? "py-2 font-bold border-2 border-b-0 text-indigo-400 bg-slate-200 px-3 border-indigo-400"
                        : "px-3 py-2")
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
                  <div className="overflow-y-scroll h-[620px] ">
                    {currentuser && Conversation && 
                      Conversation.map((i)=>{
                        if(currentuser.id != i.recipient.id)
                          {
                            return(
                              <Link href={{pathname:"/messaging-design",query:i.recipient.id}} key={i.id}>
                                <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                                  {i.recipient.display_photo_url?(
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
                                    />
                                  )}
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
                                {i.sender.display_photo_url?(
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
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <div>
                    <input placeholder="Search Friends.." 
                    className="border rounded border-indigo-400 w-full p-2 placeholder:font-light focus:border-indigo-400 active:border-indigo-400 focus-visible:border-indigo-400 " 
                    onChange={searchmultiples}/>
                  </div>
                  <div className="overflow-y-scroll h-[620px] ">
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
                            <div className="">user text as show as popup</div>
                          </div>
                        </a>
                      </Link>
                    ))}
                    
                  </div>
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
