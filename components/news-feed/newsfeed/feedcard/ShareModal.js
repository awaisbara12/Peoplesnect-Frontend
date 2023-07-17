import React, { Fragment, Component, useEffect, useState, setState } from 'react';
import Image from "next/image";
import {
  BadgeCheckIcon,
  PlusIcon,
  GlobeIcon,
  HeartIcon,
  ChatAltIcon,
  DownloadIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  ShareIcon,
  DocumentReportIcon,
  XCircleIcon,
  XIcon,
  CalendarIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { Popover, Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import HashtagMentionInput from "../newspost/HashtagMentionInput";
import Link from "next/link";


import PostImage from "../../../../public/images/post-image.png";
import App from '../newspost/App';
import { HASHTAGS_API, POST_NEWSFEED_API_KEY, SEARCH_MULTIPLE } from '../../../../pages/config';
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 300) + (text.length > 300 ? ("......") : ('')) : text}
      {text.length > 300 ? (
        <span onClick={toggleReadMore} className="text-indigo-400 cursor-pointer ml-2 font-bold">
          {isReadMore ? "Read more" : "Show less"}
        </span>
      ) : ('')}
    </p>
  );
};

const ShareModal = (props) => {
  const [postText, setPostText] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const [tags, settags] = useState([]);
  const [mentioned, setMentioned] = useState([]);
  const [postnews, setpostnews] = useState(false);
  let [hastags, sethastags] = useState();
  let [speakerMention, setspeakerMention] = useState([]);
  function closeModal() {
    setIsOpen(false);
    setspeakerMention('');
    sethastags('');
    setMentioned('');
    settags('');
    setPostText('');
  }
  // console.log(props);

  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }

  const HashTags=async()=>{
    await fetch(HASHTAGS_API, {
      method: "GET",
       headers: {
        Accept: "application/json",
         Authorization: `${authKey}`,
       },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          let awa =[];
  
          for(let i =0; i<result.data.length ; i++)
          {
              awa[i] ={
                display: result.data[i].name  ,
                id: result.data[i].id,
    
              }
          }
         
          sethastags(awa);
        }
      })
      .catch((err) => console.log(err));
  }
  let a ='';
  const mentioneds = () => {
    // const [mention,setmention] = useState([]);
    fetch(SEARCH_MULTIPLE+"/gettags?query="+'friends', {
        method: "GET",
         headers: {
          Accept: "application/json", 
           Authorization: `${authKey}`,
         },
      })
         .then((resp) => resp.json())
        .then((result) => {
          if (result) {
            let awa =[];
            for(let i =0; i<result.data.length ; i++)
            {
                awa[i] ={
                  display: '@'+result.data[i].first_name+" "+result.data[i].last_name ,
                  link: 'Friends-Profile?'+result.data[i].id,
                  avatar: result.data[i].display_photo_url,
                  id: result.data[i].id,
                  type : 'User'
                }
            }
            a=awa;
            setspeakerMention(a);
            mentionpages();
            // console.log("grie",awa);
          }
        })
        .catch((err) => console.log(err));
  };
  const mentionpages = () => {
    fetch(SEARCH_MULTIPLE+"/gettags?query="+'pages', {
        method: "GET",
         headers: {
          Accept: "application/json", 
           Authorization: `${authKey}`,
         },
      })
         .then((resp) => resp.json())
        .then((result) => {
          if (result) {
            let awa =[];
            for(let i = 0; i<result.data.length ; i++)
            {
                awa[i] ={
                  display: '@'+result.data[i].name ,
                  link: 'Liked-Pages?'+result.data[i].id,
                  avatar: result.data[i].display_photo_url,
                  id: result.data[i].id,
                  type : 'Page'
                }
            }
            let dbc = [...a,...awa]
            setMentioned(dbc);
            // console.log(dbc);
            // setspeakerMention(dbc);
          //  console.log("ment",mentioned);
          }
        })
        .catch((err) => console.log(err));
  };

  function postNewsData(e) {
    // e.preventDefault();
    const dataForm = new FormData();
    dataForm.append("news_feeds[body]", postText.replace(/\[\@(.*?)\]\((.*?)\)/g, "@$1"));
    if(e.feed_type == "share"){
      dataForm.append("news_feeds[share_id]", e.share.id);
    }else{
      dataForm.append("news_feeds[share_id]", e.id);
    }
    dataForm.append("news_feeds[feed_type]", "share");
    if (tags.length > 0) {
      for (let i = 0; i < tags.length; i++) {
        dataForm.append("tags[]", tags[i]);
      }
    }
    
    fetch(POST_NEWSFEED_API_KEY, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          const mergedata = [...props.list,result.data]
          props.setList(mergedata);
          setPostText("");
          setpostnews(false);
          closeModal();
        }
      })
      .catch((err) => console.log(err));
  }
  
  function openModal2() {
    setIsOpen(true);
    HashTags();
    mentioneds();
  }
  return (
    <div>
      <div>
      
        <div>
          <ShareIcon
            width={24}
            height={24}
            className="text-indigo-400 cursor-pointer"
            // onClick={() => copylink(items.id)}
            onClick={openModal2}
          />

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50"
              static={true}
              onClose={closeModal}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-75" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-[620px] bg-white rounded-xl xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all">
                      <div className="flex justify-end items-center mx-4">
                        <XIcon
                          onClick={closeModal}
                          className="w-5 h-5 cursor-pointer"
                        />
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 px-8"
                      >
                        Share Post
                      </Dialog.Title>
                      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                        <div className="bg-white px-12 py-5 rounded-xl">
                          <form className="w-full">
                            <div className="bg-white py-5 rounded-xl">
                              <HashtagMentionInput postText={postText} setPostText={setPostText} mentioned={mentioned}  tags={tags} settags={settags} hastags={hastags}/>
                            </div>
                            <div className="border rounded-xl p-5">
                            <div className="flex gap-[6px] items-center font-medium">

                                {props.items && props.items.page ? (
                                  props.items.page.display_photo_url ? (
                                    <img
                                      src={props.items.page.display_photo_url}
                                      className="aspect-video object-cover rounded-full h-[42px] w-[42px]"
                                      width={45}
                                      height={45}
                                      alt=""
                                    />
                                  ) : (
                                    <Image
                                      src={PagePhoto}
                                      className="aspect-video object-cover rounded-full h-[42px] w-[42px]"
                                      width={45}
                                      height={45}
                                      alt=""
                                    />
                                  )
                                ) : (
                                  props.items && props.items.user && props.items.user.display_photo_url ? (
                                    <img
                                      src={props.items.user.display_photo_url}
                                      className="aspect-video object-cover rounded-full h-[42px] w-[42px]"
                                      width={45}
                                      height={45}
                                      alt=""
                                    />
                                  ) : (
                                    <Image
                                      src={ProfileAvatar}
                                      width={45}
                                      height={45}
                                      alt=""
                                    />
                                  )
                                )}

                              
                                {props.items.page ? (
                                  <>
                                    <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                                      {/* {props.items.user.first_name} {props.items.user.last_name} */}
                                      {/* <ChevronRightIcon
                                      width={24}
                                      height={24}
                                      className="text-indigo-400"
                                    /> */}
                                      <div className="capitalize">{props.items.page.name}</div>
                                    </h4>
                                    <div className="font-light text-gray-900 opacity-[0.8] italic">  Page Post</div>
                                  </>

                                ) : (
                                  props.items.user && props.items.group ? (
                                    <>

                                      <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                                        {props.items.user.first_name} {props.items.user.last_name}
                                        <ChevronRightIcon
                                          width={24}
                                          height={24}
                                          className="text-indigo-400"
                                        />
                                        <div className="capitalize">{props.items.group.title}</div>
                                      </h4>
                                      <div className="font-light text-gray-900 opacity-[0.8] italic">Group Post</div>
                                      {/* {items && props.items.group && props.items.user && props.items.group.owner.id==props.items.user.id?"Super Admin":GetAdmins(props.items.group.id, props.items.user.id)?"Admin":"Member"} */}
                                    </>
                                  ) : (
                                    props.items && props.items.user?(
                                      <>
                                        <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                                          {props.items.user.first_name} {props.items.user.last_name}
                                          <BadgeCheckIcon
                                            width={14}
                                            height={14}
                                            className="text-indigo-400"
                                          />
                                        </h4>
                                        <div className="font-light text-gray-900 opacity-[0.8]">
                                          {props.items.user.city ? props.items.user.city + ", " : ""}{props.items.user.state ? props.items.user.state + ", " : ""} {props.items.user.country}
                                        </div>
                                        
                                      </>
                                    ):("")
                                  )
                                )}

                              </div>

                              {props.items && props.items.user && props.items.tags && props.items.tags.length > 0 || (props.items.hashtags && props.items.hashtags.length > 0) ?
                                <App state={props.items.body} website={props.items.tags} hashtags={props.items.hashtags} />
                                : <ReadMore>
                                  {props.items.body ? props.items.body : ""}
                                </ReadMore>}

                              {props.items.attachments_link && props.items.feed_type === "image_feed" ? (
                                <div className="mt-[2px]">
                                  <AliceCarousel>
                                  {props.items.attachments_link.map((i)=>(
                                    <img
                                      key={i}
                                      src={i}
                                      width={952}
                                      height={240}
                                      layout="responsive"
                                      className="aspect-video object-cover rounded-lg mx-auto h-[390px]"
                                      alt=""
                                    />
                                  ))}
                                  </AliceCarousel>
                                </div> 
                              ) : (
                                ""
                              )}
                              
                              {props.items.feed_type && props.items.feed_type === "video_feed" ? (
                                <video controls className="aspect-video w-full rounded-xl my-4">
                                  <source src={props.items.attachments_link} type="video/mp4" />
                                </video>
                              ) : (
                                ""
                              )}
                             
                             {props.items.event && props.items.event ? (
                                <div className="rounded-xl bg-white border border-gray-100 my-2">
                                  {props.items.event.cover_photo_url ? (
                                    <img
                                      src={props.items.event.cover_photo_url}
                                      className="aspect-video object-cover rounded-t-xl h-[390px] w-[952px]"
                                      alt=""
                                    />
                                  ) : (
                                    ""
                                  )}
                                  <div className="py-3 px-3">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        {/* Date & Time */}
                                        <div className="text-red-400 text-sm">
                                          <span>{props.items.event.start_time}</span>
                                          <span>-{props.items.event.end_time}</span>&nbsp;
                                          <span>{props.items.event.start_date}</span>&nbsp;
                                        </div>
                                        {/* Name */}
                                        <div className="font-semibold text-lg">
                                          {props.items.event.name}
                                        </div>
                                        {/* Event-type */}
                                        <div className="flex items-center gap-2">
                                          <CalendarIcon
                                            width={16}
                                            height={16}
                                            className="text-gray-900"
                                          />
                                          <span className="text-gray-900 text-sm">
                                            {props.items.event.event_type}
                                          </span>
                                        </div>
                                        {props.items.event.event_type === "online" ? ('') : (
                                          <>
                                            {/* Adress */}
                                            {props.items.event.address ? (
                                              <div className="flex items-center gap-2">
                                                <CalendarIcon
                                                  width={16}
                                                  height={16}
                                                  className="text-gray-900"
                                                />
                                                <span className="text-gray-900 text-sm">
                                                  {props.items.event.address}
                                                </span>
                                              </div>
                                            ) : ('')}

                                            {/* Venue */}
                                            {props.items.event.venue ? (
                                              <div className="flex items-center gap-2">
                                                <CalendarIcon
                                                  width={16}
                                                  height={16}
                                                  className="text-gray-900"
                                                />
                                                <span className="text-gray-900 text-sm">
                                                  {props.items.event.venue}
                                                </span>
                                              </div>
                                            ) : ('')}

                                          </>
                                        )}
                                        {/* Link */}
                                        <div className="text-gray-900 flex gap-2">
                                          <CalendarIcon
                                            width={16}
                                            height={16}
                                            className="text-gray-900"
                                          />
                                          <span>{props.items.event.event_link}</span>
                                        </div>
                                        {/* Speaker */}
                                        <div className="text-gray-900">
                                          {props.items.event.tags && props.items.event.tags.length > 0 ?
                                            <App state={props.items.event.speaker} website={props.items.event.tags} />
                                            : props.items.event.body ? props.items.event.body : ""}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </form>
                          <div className="flex gap-4 justify-end">
                            <button
                              onClick={closeModal}
                              type="submit"
                              className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                              onClick={()=>postNewsData(props && props.items)}
                            >
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>

                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
}

ShareModal.propTypes = {

};

export default ShareModal;