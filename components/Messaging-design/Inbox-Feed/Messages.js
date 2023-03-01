import React, { useState, Fragment, useEffect } from "react";
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
import { CURENT_USER_LOGIN_API, MESSAGES_API } from "../../../pages/config";
import { useRouter } from "next/router";

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
  const [messages, setmessages] = useState();
  const [senderDetails, setsenderDetails] = useState("");

  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");

  function handleOnEnter(text) {
  }

  const handleImagePost = (e) => {
    setPostImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
    }
  };

  const SendMessage=async()=>{
    const dataForm = new FormData();
    dataForm.append("body", text);
    dataForm.append("recipient_id",myArray[1] );      
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
          setText('');
          setmessages(result.data);
        }
      })
      .catch((err) => console.log(err)); 
  }

  const GetConversation=async()=>{     
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
        }
        else{setmessages('');}
      })
      .catch((err) => console.log(err)); 
  }
  const Current_User=async()=>{   
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
          GetConversation();
          setsenderDetails(result.data);
        }
      })
      .catch((err) => console.log(err)); 
  }

  useEffect(() => {
    Current_User();
  }, [myArray[1]]);
  return (
    <div>
      <div className="w-[340px] xl:w-[780px] lg:w-[419px] md:w-[540px] bg-white rounded-r-xl">
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
        <div className="overflow-y-scroll h-[650px]">
          
        {messages &&
          messages.map((i)=>{
            if(i.user.id==senderDetails.id)
            {
              return(
                <div className="ml-2 mt-3" key={i.id}>
                  
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
                        <div className="">{i.body}</div>
                      </div>
                    </div>
                </div>
              )
            }
            else{
              return(
                <div className="flex justify-end mt-7 mr-2" key={i.id}>
                  
                    <div className="flex items-center gap-2">
                      <div className=" bg-indigo-400 p-2 border w-60 rounded-xl">
                        <div className="text-white">{i.body}</div>
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
          
          


          {/* <div className="ml-2 mt-3">
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
          </div> */}
        </div>
        <div className="sticky bottom-0 bg-white">
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
            <PhotographIcon className="h-10 w-10 opacity-40" />
            <PaperAirplaneIcon className="h-10 w-10 rotate-90 opacity-40 ml-2" onClick={()=>{SendMessage()}}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
