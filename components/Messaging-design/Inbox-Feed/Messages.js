import React, { useState,useRef, Fragment, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import ProfileAvatar from "../../../public/images/profile-avatar.png";
import InputEmoji from "react-input-emoji";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import {
  PhotographIcon,
  EmojiHappyIcon,
  ChevronRightIcon,
  PaperAirplaneIcon,
  ChevronDownIcon,
  PencilAltIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { CURENT_USER_LOGIN_API, MESSAGES_API, WS_PUBLIC_API } from "../../../pages/config";
import { useRouter } from "next/router";
const Messages = () => {
  const [setLoading] = useState(false);
  const [postText, setPostText] = useState("");
  const [eventCoverImage, setEventCoverImage] = useState([]);
  const [postImage, setPostImage] = useState([]);
  const [postImagePreview, setpostImagePreview] = useState();
  const [selectedTimezone] = useState({});
  const [feedType, setFeedType] = useState("basic");
  const [eventType] = useState();
  const [videoSrc, setVideoSrc] = useState([]);
  const [videoPreview, setVideoPreview] = useState();
  let [setIsOpen] = useState(false);

  const [attachment_type, setattachment_type] = useState("");
  const [text, setText] = useState("");
  const [messages, setmessages] = useState();
  const [senderDetails, setsenderDetails] = useState("");
  const [cables, setcables] = useState();
  const [channl, setchannl] = useState();
  const messageRef = useRef();

  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  // Action Cable
  const [sms, setsms] = useState();
  const [Id, setId] = useState();
  function createMessageChanel(id,CableApp) {
    // const CableApp = {}
    CableApp.subscriptions.create(
      {
        channel: 'MessageChannel',
        current_user:  id,
        recipient_id:  myArray[1]
      },
      {
        connected: () => console.log('connected'),
        disconnected: () => console.log('disconnected'),
        received: data => {  GetConversation();  },
      }
    );
  }
  function handleOnEnter(text) {
  }
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
  const clearPic =()=>{
    setpostImagePreview('');
    setPostImage('');
    setattachment_type('')
  }
  const SendMessage=async()=>{
    if (text)
    {
      const dataForm = new FormData();
      if(postImagePreview){
        dataForm.append("attachment_type", attachment_type);
        dataForm.append("attachment", postImage);
      }
      dataForm.append("body", text);
      dataForm.append("recipient_id",myArray[1] ); 
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
          if (result) {
            
            setmessages(result.data);

          }
        })
        .catch((err) => console.log(err)); 
    }
  }
  const GetConversation=async()=>{     
    if(myArray[1])
    {
      await fetch(MESSAGES_API+"?recipient_id="+myArray[1], {
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
    }else{console.log("no user")}
  }
  const recipientUserDetails=async()=>{   
    if(myArray[1])
      {
        await fetch(CURENT_USER_LOGIN_API+"?id="+myArray[1], {
            method: "GET",
            headers: {
              Accept: "application/json", 
              Authorization: `${authKey}`,
            },
          })
            .then((resp) => resp.json())
            .then((result) => {
              if (result) {
                setsenderDetails(result.data);
              }
            })
            .catch((err) => console.log(err)); 
            GetConversation();
      }
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
            recipientUserDetails();
            createMessageChanel(result.data.id, CableApp);
          }
        })
        .catch((err) => console.log(err)); 
        if(myArray[1])
        {recipientUserDetails();} 
    }

  useEffect(() => {
    let actionCable;
    if (typeof window !== 'undefined') {
      actionCable = require('actioncable');
      const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
      Current_User(CableApp);
    }
    const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
    Current_User(CableApp);
  }, [myArray[1]]);
  
  // Render your component
  
  return (
    <div>
      <div className="w-[340px] xl:w-[780px] lg:w-[419px] md:w-[540px] bg-white rounded-r-xl">
        {/* Chat-Head */}
        <div className="flex justify-between bg-white sticky top-0 p-3 z-40 border-b rounded-tr-xl">
          {senderDetails?(
             <div className="font-bold flex items-center gap-2 ">{senderDetails.first_name} {senderDetails.last_name}</div>
          ):('')}
         <Link href="">
            <a>
              <QuestionMarkCircleIcon className="h-5 w-5" />
            </a>
          </Link>
        </div>
        {/* Show Message */}
        <div className="overflow-y-scroll h-[550px]">
          {messages &&
            messages.map((i)=>{
              if(i.user && senderDetails&& i.user.id==senderDetails.id)
              {
                return(
                  <div className="ml-2 mt-3" key={i.id} >
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
                                  {/* <video autoPlay="autoplay" controls className="ml-5 rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover">
                                    <source src={postImagePreview} type="video/mp4" />
                                  </video> */}
                                  {/* <iframe src={i.attachment} width="100%" height="300" >
                                  </iframe> */}
                                  
                                  <div>{i.attachment_type}</div>
                                </div>
                              ):('')
                            )
                          )
                        }
                        <div className="">{i.body} </div>
                          <div className=" flex justify-end mt-0 mr-2 text-xs">{i.time}</div>
                      </div>
                    </div>
                  </div>
                )
              }
              else
              {
                return(
                    <div className="flex justify-end mt-7 mr-2" key={i.id} >
                      <div className="flex items-center gap-2">
                        <div className=" bg-indigo-400 p-2 border w-60 rounded-xl">
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
                                    <video controls className="rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover">
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
                                
                                  <div className=" flex border w-56 p-2 justify-between ">
                                    <div>{i.attachment_type}</div>
                                    <a href={i.attachment} download>
                                      <button className= "text-white p-0">Download</button>
                                    </a>
                                  </div>
                                </div>
                                ):('')
                              )
                            )
                          }
                          <div className="text-white">{i.body} </div>
                          <div className=" flex justify-end mt-0 mr-2 text-xs text-white">{i.time}</div>
                        </div>
                        {i.user && i.user.display_photo_url?(
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
            })
          }
          <div ref={messageRef}></div>
        </div>

        {/* Messgae Send-Bar */}
        <div className="sticky bottom-0 bg-white">
        {  postImagePreview && attachment_type=="image"?(
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
              // onEnter={handleOnEnter}
              placeholder="Type Your Message"
            />
            {/* <PhotographIcon className="h-10 w-10 opacity-40" /> */}
            <div className="">
                <div className="relative flex gap-2 items-center justify-center">
                  <PhotographIcon
                    className={"h-10 w-10 opacity-40"}
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
            <PaperAirplaneIcon className="h-10 w-10 rotate-90 opacity-40 ml-2" onClick={()=>{SendMessage()}}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
