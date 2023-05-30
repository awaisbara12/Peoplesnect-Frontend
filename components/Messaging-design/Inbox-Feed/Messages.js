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
import { array } from "yup";
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';
const Messages = () => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const [text, setText] = useState("");                          // SMS BODY
  const [attachment_type, setattachment_type] = useState("");    // TYPE [:- IMAGE/VEDIO/Doc]
  const [postImage, setPostImage] = useState([]);                // UPLOAD [:- IMAGE/VEDIO/Doc]
  const [postImagePreview, setpostImagePreview] = useState();    // PREVIEW [:- IMAGE/VEDIO/Doc]
  const [messages, setmessages] = useState([]);                  // GET SMS OF Certain CONVERSATON 
  const [senderDetails, setsenderDetails] = useState("");        // 2nd USER
  const [cables, setcables] = useState(null);                    // ACTIONCABLE CONNECTION
  const [currentuser, setcurrentuser] = useState(null);          // current user
  
  const [currentpagemy, setcurrentpagemy] = useState(1);         // PAGE PARAM [:- PAGY]
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");

  const messageRef = useRef();                // FOR MSG_DIV SCROLLING DOWN
  const myDivRef = useRef(null);              // FOR MSG DIV_ID REFERENCENC
  
  //  Subscribe Message Channel
  const createMessageChanel=async(id,CableApp)=> {
    CableApp.subscriptions.create(
      {
        channel: 'MessageChannel',
        current_user:  id,
        recipient_id:  myArray[1]
      },
      {
        connected: () => {
          console.log('Chat-connected');
        },
        disconnected: () => {
          console.log('Chat-disconnected');

        },
        received: data => { 
          if(myDivRef.current){
            if (myDivRef.current.id == myArray[1]){
              GetMessages();
              downfunction();
              console.log("Chat-received");
            }
          }
          
         
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
  //  Send On Enter
  function handleOnEnter() {
    if (text){
      SendMessage();
    }
  }
  //  Uploading Attachment
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
  //  Clearing attachments
  const clearPic =()=>{
    setpostImagePreview('');
    setPostImage('');
    setattachment_type('')
  }
  //  Create/ Send Messsage
  const SendMessage=async()=>{
    if ((text || attachment_type) && myArray[1])
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
            if (result && result.data) {
              if(messages.length==0){
                let actionCable;
                if (typeof window !== 'undefined') {
                  actionCable = require('actioncable');
                  const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
                }
                const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
                createMessageChanel(currentuser.id, CableApp);
              }
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
             downfunction();
            }
            else if(result && result.block){
              alert("You can't Send Message");
            }
        })
        .catch((err) => console.log(err)); 
    }
  }
  //  Get Message
  const GetMessages=async()=>{     
    if(myArray[1]){
      await fetch(MESSAGES_API+"?recipient_id="+myArray[1], {
        method: "GET",
        headers: {
          Accept: "application/json", 
          Authorization: `${authKey}`,
        },
      }).then((resp) => resp.json())
        .then((result) => {
          if (result && result.data) {
            setmessages(result.data);
            setcurrentpagemy(result.pages.next_page)
          }
          else{setmessages('');}
        })
        .catch((err) => console.log(err)); 
    }else{console.log("no user")}
  }
  //  Fing @nd User
  const recipientUserDetails=async(id, cable)=>{   
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
                createMessageChanel(id, cable);
                GetMessages();
              }
            })
            .catch((err) => console.log(err)); 
           
      }
  }
  //  Get Current User
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
          recipientUserDetails(result.data.id,CableApp);
        }
      })
      .catch((err) => console.log(err)); 
  }

  useEffect(() => {
    let actionCable;
    if (typeof window !== 'undefined') {
      actionCable = require('actioncable');
      const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
      setcables(CableApp);
      Current_User(CableApp);
    }
    const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
    setcables(CableApp);
    Current_User(CableApp);
    return ()=>{
      if (cables) {
         cables.disconnect(); 
      }
    }
  }, [myArray[1]]);
  
  //  Fetch Sms OnScroll [:pagy ]
  const fetchMoreSMS = async() => {
    if(myArray[1]){
      await fetch(MESSAGES_API+"?recipient_id="+myArray[1]+"&page="+currentpagemy, {
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

  return (
    <div
      ref={myDivRef}
      id={senderDetails && senderDetails.id}>
      <div className="w-full bg-white rounded-r-xl">
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
        <div id="scrollableDiv" ref={messageRef}
          style={{
            height: 400,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          <InfiniteScroll
            dataLength={messages.length}
            next={fetchMoreSMS}
            style={{ display: 'flex', flexDirection: 'column-reverse' }} 
            hasMore={currentpagemy != null}
            inverse={true}
            scrollableTarget="scrollableDiv"
            loader={messages && messages.length>0?(<div className="flex justify-center "><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>):('')}
          >
            {messages &&
              messages.map((i)=>{
                if(i.user && senderDetails&& i.user.id==senderDetails.id)
                {
                  return(
                    <div className="ml-2 mt-3" key={i.id} >
                      <div className="flex items-center gap-2">
                      {i.user.display_photo_url?(
                          <Link href={{ pathname: "/User-Profile", query: i.user.id,}}>
                            <a>
                              <img
                                className="object-cover w-[30px] h-[30px] rounded-full"
                                src={i.user.display_photo_url}
                                width={30}
                                height={30}
                                alt=""
                              />
                            </a>
                          </Link>
                          
                        ):(
                          <Link href={{ pathname: "/User-Profile", query: i.user.id,}}>
                            <a>
                              <Image
                                className="object-cover"
                                src={ProfileAvatar}
                                width={30}
                                height={30}
                                alt=""
                              />
                            </a>
                          </Link>
                        )}
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
                                    <div className=" flex border-b w-56 p-2 justify-between ">
                                      <div>{i.attachment_type}</div>
                                      <a href={i.attachment} download>
                                        <button className= "text-black p-0">Download</button>
                                      </a>
                                    </div>
                                    {/* <div>{i.attachment_type}</div> */}
                                  </div>
                                ):('')
                              )
                            )
                          }

                          {i.productPic?(
                            <div className="relative w-1/4 mt-2">
                              <img
                              src={i.productPic}
                              className="rounded-xl my-2 max-h-[150px] max-w-[230px] object-cover"
                              alt=""/>
                            </div>
                          ):('')}
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
                                    <video controls className=" rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover">
                                      <source src={i.attachment} type="video/mp4" />
                                    </video> 
                                  </div>
                                </div>
                              ):(
                                i.attachment && i.attachment_type=="application"?(
                                  <div className="relative w-1/4 mt-2">
                                    <div className=" flex border-b w-56 p-2 justify-between ">
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
                            
                            {i.productPic?(
                              <div className="relative w-1/4 mt-2">
                                <img
                                src={i.productPic}
                                className="rounded-xl my-2 max-h-[150px] max-w-[230px] object-cover"
                                alt=""/>
                              </div>
                            ):('')}
                            <div className="text-white">{i.body} </div>
                            <div className=" flex justify-end mt-0 mr-2 text-xs text-white">{i.time}</div>
                          </div>
                          {i.user && i.user.display_photo_url?(
                            <Link href="profile">
                              <a>
                                <img
                                  className="object-cover w-[30px] h-[30px] rounded-full"
                                  src={i.user.display_photo_url}
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                              </a>
                            </Link>
                            
                          ):(
                            <Link href="profile">
                              <a>
                                <Image
                                  className="object-cover"
                                  src={ProfileAvatar}
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                              </a>
                            </Link>
                          )}
                        </div>
                      </div>
                    )
                }
              })
            }
          </InfiniteScroll>
        </div>
        {/* Messgae Send-Bar */}
        <div className=" bottom-0 bg-white">
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
              onEnter={handleOnEnter}
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