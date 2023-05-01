import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import ProfileAvatar from "../../../public/images/profile-avatar.png";
import ProfileAvatar1 from "../../../public/images/mira.png";

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
} from "@heroicons/react/outline";

const Messages = () => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const [setLoading] = useState(false);
  const [postText, setPostText] = useState("");
  const [eventCoverImage, setEventCoverImage] = useState([]);
  const [postImage, setPostImage] = useState([]);
  const [setpostImagePreview] = useState();
  const [selectedTimezone] = useState({});
  const [feedType, setFeedType] = useState("basic");
  const [eventType] = useState();
  const [videoSrc, setVideoSrc] = useState([]);
  const [videoPreview, setVideoPreview] = useState();
  let [setIsOpen] = useState(false);

  const [text, setText] = useState("");

  function handleOnEnter(text) {
  }

  const handleImagePost = (e) => {
    setPostImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
    }
    setFeedType("image_feed");
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
        <div className="flex justify-between bg-white sticky top-0 p-3 z-40 border-b rounded-tr-xl">
          <div className="font-bold flex items-center gap-2 ">User Name</div>
          <Link href="">
            <a>
              <QuestionMarkCircleIcon className="h-5 w-5" />
            </a>
          </Link>
        </div>
        <div className="overflow-y-scroll h-[650px]">
          <div className="ml-2 mt-3">
            <Link href="">
              <a className="flex items-center gap-2">
                <Image
                  className="object-cover"
                  src={ProfileAvatar1}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
          </div>
          <div className="flex justify-end mt-7 mr-2">
            <Link href="">
              <a className="flex items-center gap-2">
                <div className=" bg-indigo-400 p-2 border w-60 rounded-xl">
                  <div className="text-white">user text as show as popup</div>
                </div>
                <Image
                  className="object-cover"
                  src={ProfileAvatar}
                  width={30}
                  height={30}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="ml-2 mt-3">
            <Link href="">
              <a className="flex items-center gap-2">
                <Image
                  className="object-cover"
                  src={ProfileAvatar1}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
          </div>
          <div className="flex justify-end mt-7 mr-2">
            <Link href="">
              <a className="flex items-center gap-2">
                <div className=" bg-indigo-400 p-2 border w-60 rounded-xl">
                  <div className="text-white">user text as show as popup</div>
                </div>
                <Image
                  className="object-cover"
                  src={ProfileAvatar}
                  width={30}
                  height={30}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="ml-2 mt-3">
            <Link href="">
              <a className="flex items-center gap-2">
                <Image
                  className="object-cover"
                  src={ProfileAvatar1}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
          </div>
          <div className="flex justify-end mt-7 mr-2">
            <Link href="">
              <a className="flex items-center gap-2">
                <div className=" bg-indigo-400 p-2 border w-60 rounded-xl">
                  <div className="text-white">user text as show as popup</div>
                </div>
                <Image
                  className="object-cover"
                  src={ProfileAvatar}
                  width={30}
                  height={30}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="ml-2 mt-3">
            <Link href="">
              <a className="flex items-center gap-2">
                <Image
                  className="object-cover"
                  src={ProfileAvatar1}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                  <div className="">
                    user text user text as show as popup as show as user text as
                    show as popup popup
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className="flex justify-end mt-7 mr-2">
            <Link href="">
              <a className="flex items-center gap-2">
                <div className=" bg-indigo-400 p-2 border w-60 rounded-xl">
                  <div className="text-white">
                    user text user text as show as popup as show user text as
                    show as popup as popup
                  </div>
                </div>
                <Image
                  className="object-cover"
                  src={ProfileAvatar}
                  width={30}
                  height={30}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="ml-2 mt-3">
            <Link href="">
              <a className="flex items-center gap-2">
                <Image
                  className="object-cover"
                  src={ProfileAvatar1}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
          </div>
          <div className="flex justify-end mt-7 mr-2">
            <Link href="">
              <a className="flex items-center gap-2">
                <div className=" bg-indigo-400 p-2 border w-60 rounded-xl">
                  <div className="text-white">user text as show as popup</div>
                </div>
                <Image
                  className="object-cover"
                  src={ProfileAvatar}
                  width={30}
                  height={30}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="ml-2 mt-3">
            <Link href="">
              <a className="flex items-center gap-2">
                <Image
                  className="object-cover"
                  src={ProfileAvatar1}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
          </div>
          <div className="flex justify-end mt-7 mr-2">
            <Link href="">
              <a className="flex items-center gap-2">
                <div className=" bg-indigo-400 p-2 border w-60 rounded-xl">
                  <div className="text-white">user text as show as popup</div>
                </div>
                <Image
                  className="object-cover"
                  src={ProfileAvatar}
                  width={30}
                  height={30}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="ml-2 mt-3">
            <Link href="">
              <a className="flex items-center gap-2">
                <Image
                  className="object-cover"
                  src={ProfileAvatar1}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                  <div className="">
                    user text user text as show as popup as show as user text as
                    show as popup popup
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className="flex justify-end mt-7 mr-2">
            <Link href="">
              <a className="flex items-center gap-2">
                <div className=" bg-indigo-400 p-2 border w-60 rounded-xl">
                  <div className="text-white">
                    user text user text as show as popup as show user text as
                    show as popup as popup
                  </div>
                </div>
                <Image
                  className="object-cover"
                  src={ProfileAvatar}
                  width={30}
                  height={30}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="ml-2 mt-3">
            <Link href="">
              <a className="flex items-center gap-2">
                <Image
                  className="object-cover"
                  src={ProfileAvatar1}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
          </div>
          <div className="flex justify-end mt-7 mr-2">
            <Link href="">
              <a className="flex items-center gap-2">
                <div className=" bg-indigo-400 p-2 border w-60 rounded-xl">
                  <div className="text-white">user text as show as popup</div>
                </div>
                <Image
                  className="object-cover"
                  src={ProfileAvatar}
                  width={30}
                  height={30}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="ml-2 mt-3">
            <Link href="">
              <a className="flex items-center gap-2">
                <Image
                  className="object-cover"
                  src={ProfileAvatar1}
                  width={30}
                  height={30}
                  alt=""
                />
                <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                  <div className="">user text as show as popup</div>
                </div>
              </a>
            </Link>
          </div>
          <div className="flex justify-end mt-7 mr-2">
            <Link href="">
              <a className="flex items-center gap-2">
                <div className=" bg-indigo-400 p-2 border w-60 rounded-xl">
                  <div className="text-white">user text as show as popup</div>
                </div>
                <Image
                  className="object-cover"
                  src={ProfileAvatar}
                  width={30}
                  height={30}
                  alt=""
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white">
          <div className="flex items-center px-2">
            <InputEmoji
              type="text"
              react-emoji="w-{100%}"
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Type Your Message"
            />
            <PhotographIcon className="h-10 w-10 opacity-40" />
            <PaperAirplaneIcon className="h-10 w-10 rotate-90 opacity-40 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
