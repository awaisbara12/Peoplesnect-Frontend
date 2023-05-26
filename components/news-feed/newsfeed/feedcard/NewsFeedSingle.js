import React, { Fragment, useEffect, useState, setState } from "react";
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
} from "@heroicons/react/outline";
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";

import PagePhoto from "../../../../public/images/752126.jpg";
import PostImage from "../../../../public/images/post-image.png";
// import PostComments from "../comments/PostComments";
// import FilterComments from "../comments/FilterComments";
// import ReplyComments from "../comments/ReplyComments";


import PostComments from "../../../profile/comments/PostComments";
import FilterComments from "../../../profile/comments/FilterComments";
import ReplyComments from "../../../profile/comments/ReplyComments";
import axios from "axios";
import {
  BOOKMARK_NEWSFEED_API_KEY,
  REACTION_NEWSFEED_API_KEY,
  COMMENT_API_KEY,
  NEWSFEED_COMMENT_POST_KEY,
  CURENT_USER_LOGIN_API,
  GROUP_API,
  REPORT_API,
} from "../../../../pages/config";
import App from "../newspost/App";
import HashtagMentionInput from "../newspost/HashtagMentionInput";
import ShareModal from "./ShareModal";
// import Spinner from "../../../common/Spinner";

const cardDropdown = [
  {
    name: "Share",
    href: "#",
    icon: ShareIcon,
  },
  {
    name: "Report",
    href: "#",
    icon: DocumentReportIcon,
  },
];
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

const NewsFeedSingle = (singleItem) => {
  const [items, setItems] = useState(singleItem.items);
  const [comments, setComments] = useState([]);
  const [comments_count, setComments_count] = useState([]);
  const [is_deleted, setIs_deleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState('');
  const [CurrentUser, setCurrentUser] = useState();
  const [postText, setPostText] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const [tags, settags] = useState([]);
  const [mentioned, setMentioned] = useState([]);
  const [hashtaged, setHashtaged] = useState([]);
  let [hastags, sethastags] = useState();



  const [admins, setadmins] = useState();
  // console.log("items = >",items)
  // Bareer key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }
  // copy link to clipboard
  const copylink = (postid) => {
    const links = window.location.href        // get Full Link
    const links1 = window.location.pathname   // get link after localhost
    const copylink = links.split(links1)    // get link domain like(localhost..etc)
    navigator.clipboard.writeText(copylink[0] + "/events-design/event-view?" + postid);
    alert("Link Copied to your Clipboard");
  }
  // Add Heart
  function addHeart(feedId) {
    const dataForm = new FormData();
    dataForm.append("reactionable_id", feedId);
    dataForm.append("reaction_type", "heart");
    dataForm.append("reactionable_type", "NewsFeed");
    fetch(REACTION_NEWSFEED_API_KEY, {
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
          setItems(result.data);
        }
      })
      .catch((err) => console.log(err));
  }
  // Create Bookmark
  function createBookmark(feedId) {
    const dataForm = new FormData();
    dataForm.append("bookmarkable_id", feedId);
    dataForm.append("bookmarkable_type", "NewsFeed");
    fetch(BOOKMARK_NEWSFEED_API_KEY, {
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
          setItems(result.data);
        }
      })
      .catch((err) => console.log(err));
  }
  // delete Bookmark
  async function deteleBookmark(bookmarkId) {
    const res = await axios(BOOKMARK_NEWSFEED_API_KEY + "/" + bookmarkId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        Authorization: authKey,
      },
      credentials: "same-origin",
    });
    const result = await res;

    try {
      if (result) {
        setItems(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // delete heart
  async function deteleHeart(heartId) {
    const res = await axios(REACTION_NEWSFEED_API_KEY + "/" + heartId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        Authorization: authKey,
      },
      credentials: "same-origin",
    });
    const result = await res;

    try {
      if (result) {
        setItems(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const Current_User = async () => {
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
          setCurrentUser(result.data);
        }
      })
      .catch((err) => console.log(err));
  }

  function createReport(feedId) {
    const dataForm = new FormData();
    dataForm.append("reportable_id", feedId);
    dataForm.append("reportable_type", "NewsFeed");
    fetch(REPORT_API, {
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
          // console.log("Hello");
          alert("Your report send to Admin");
        }
      })
      .catch((err) => console.log(err));
  }

  const optionConfirm = (name, item) => {
    if (name == "Report") {
      var a = confirm(name);
      if (a) {
        createReport(item.id);
      }
    } else if (name == "Share") {
      const links = window.location.href        // get Full Link
      const links1 = window.location.pathname   // get link after localhost
      const copylink = links.split(links1)    // get link domain like(localhost..etc)
      navigator.clipboard.writeText(copylink[0] + "/events-design/event-view?" + item.id);
      alert("Link Copied to your Clipboard");
    }
  };

  useEffect(() => {
    setLoading(true);
    Current_User();
    const getFeedComments = async () => {
      const res = await axios(
        NEWSFEED_COMMENT_POST_KEY + "/" + items.id + "/comments",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            Authorization: authKey,
          },
          credentials: "same-origin",
        }
      );
      const result = await res;

      try {
        if (result.status == 200) {
          setNextPage(result.data.pages.next_page)
          setComments(result.data);
          setIs_deleted(false);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      return result;
    };
    getFeedComments();
  }, []);

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  // const GetAdmins =async(id,user_id)=>{
  //   await fetch(GROUP_API +"/get_group_admin?group_id="+id , {
  //   method: "GET",
  //   headers: {
  //     Accept: "application/json",
  //     Authorization: `${authKey}`,
  //   },
  //   })
  //   .then((resp) => resp.json())
  //   .then((result) => {
  //     // setadmins(result.data);
  //     isadmin(result.data, user_id)
  //     console.log("group",result.data)
  //   })
  // }


  // function isadmin(admin , user_id)
  // {
  //   for(var i=0; i < admin.length; i++){
  //    if (admin[i].group_member.id == user_id)
  //    {
  //     return true;
  //    }
  //   }
  //   return false;
  // }
  function closeModal() {
    setIsOpen(false);
  }

  function openModal2() {
    setIsOpen(true);
  }


  return (
    <>
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] pb-4 mt-[14px] bg-white rounded-xl">
        <div className="flex gap-2 justify-between items-center px-[22px] py-[14px]">
          <div className="flex gap-2 items-center">

            {items && items.page ? (
              items.page.display_photo_url ? (
                <Link href={{ pathname: "/page-design/suggested-pages", query: items.page.id,}}>
                <a>
                  <img
                    src={items.page.display_photo_url}
                    className="aspect-video object-cover rounded-full h-[42px] w-[42px]"
                    width={45}
                    height={45}
                    alt=""
                  />
                </a>
                </Link>
              ) : (
                <Link href={{ pathname: "/page-design/suggested-pages", query: items.page.id,}}>
                <a>
                  <Image
                    src={PagePhoto}
                    className="aspect-video object-cover rounded-full h-[42px] w-[42px]"
                    width={45}
                    height={45}
                    alt=""
                  />
                </a>
                </Link>
              )
            ) : (
              items && items.user && items.user.display_photo_url ? (
                CurrentUser && CurrentUser.id==items.user.id?(
                  <Link href="/profile">
                    <a>
                      <img
                        src={items.user.display_photo_url}
                        className="aspect-video object-cover rounded-full h-[42px] w-[42px]"
                        width={45}
                        height={45}
                        alt=""
                      />
                    </a>
                  </Link>
                ):(
                  <Link href={{ pathname: "/User-Profile", query: items.user.id,}}>
                    <a>
                      <img
                        src={items.user.display_photo_url}
                        className="aspect-video object-cover rounded-full h-[42px] w-[42px]"
                        width={45}
                        height={45}
                        alt=""
                      />
                    </a>
                  </Link>
                )
                
              ) : (
                CurrentUser && CurrentUser.id==items.user.id?(
                  <Link href="/profile">
                  <a>
                    <Image
                      src={ProfileAvatar}
                      width={45}
                      height={45}
                      alt=""
                    />
                  </a>
                </Link>
                ):(
                  <Link href={{ pathname: "/User-Profile", query: items.user.id,}}>
                    <a>
                      <Image
                        src={ProfileAvatar}
                        width={45}
                        height={45}
                        alt=""
                      />
                    </a>
                  </Link>
                )
              )
            )}

            <div>
              {items.page ? (
                <>
                  <Link href={{ pathname: "/page-design/suggested-pages", query: items.page.id,}}>
                  <a>
                  <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                    {/* {items.user.first_name} {items.user.last_name} */}
                    {/* <ChevronRightIcon
                    width={24}
                    height={24}
                    className="text-indigo-400"
                  /> */}
                    
                    <div className="capitalize">{items.page.name}</div>
                  </h4>
                  <div className="font-light text-gray-900 opacity-[0.8] italic">  Page Post</div>
                  </a>
                  </Link>
                </>

              ) : (
                items.group ? (
                  <>
                    <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                      {CurrentUser && CurrentUser.id==items.user.id?(
                         <Link href="/profile">
                         <a>
                           {items.user.first_name} {items.user.last_name}
                         </a>
                       </Link>
                      ):(
                        <Link href={{ pathname: "/User-Profile", query: items.user.id,}}>
                          <a>
                            {items.user.first_name} {items.user.last_name}
                          </a>
                        </Link>
                      )}
                      <ChevronRightIcon
                        width={24}
                        height={24}
                        className="text-indigo-400"
                      />
                      <Link href={{ pathname: "/group-page/joind-group", query: items.group.id,}}>
                        <a>
                          <div className="capitalize">{items.group.title}</div>
                        </a>
                      </Link>
                    </h4>
                    <div className="font-light text-gray-900 opacity-[0.8] italic">Group Post</div>
                    {/* {items && items.group && items.user && items.group.owner.id==items.user.id?"Super Admin":GetAdmins(items.group.id, items.user.id)?"Admin":"Member"} */}
                  </>
                ) : (
                  <>
                    {CurrentUser && CurrentUser.id==items.user.id?(
                      <Link href="/profile">
                      <a>
                        <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                        {items.user.first_name} {items.user.last_name}
                        <BadgeCheckIcon
                          width={14}
                          height={14}
                          className="text-indigo-400"
                        />
                        </h4>
                      </a>
                    </Link>
                    ):(
                      <Link href={{ pathname: "/User-Profile", query: items.user.id,}}>
                        <a>
                          <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                          {items.user.first_name} {items.user.last_name}
                          <BadgeCheckIcon
                            width={14}
                            height={14}
                            className="text-indigo-400"
                          />
                          </h4>
                        </a>
                      </Link>
                    )}
                    
                    <div className="font-light text-gray-900 opacity-[0.8]">
                      {items.user.city ? items.user.city + ", " : ""}{items.user.state ? items.user.state + ", " : ""} {items.user.country}
                    </div>
                  </>
                )
              )}

            </div>
          </div>
          <div className="">
            <div className="">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={` ${open ? "" : "text-opacity-90 focus-visible:outline-none"
                        }`}
                    >
                      <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                        <DotsHorizontalIcon className="w-5 h-5" />
                      </div>
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-72 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative bg-white py-2">
                            {cardDropdown.map((card) => (
                              <a
                                key={card.name}
                                onClick={() => optionConfirm(card.name, items)}
                                href={card.id}
                                className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12 pl-2">
                                  <card.icon className="h-6 w-6 text-gray-900" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {card.name}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </div>
        </div>
        <div className="px-[22px] py-[14px]">
          {/* <Link 
            href={{
            pathname: "/events-design/event-view",
            query: items.id,
          }} > 
          <a> */}
          {/* <App state={items.body}/> */}

          {items.tags && items.tags.length > 0 || (items.hashtags && items.hashtags.length > 0) ?
            <App state={items.body} website={items.tags} hashtags={items.hashtags} />
            : <ReadMore>
              {items.body ? items.body : ""}
            </ReadMore>}
          {/* </a>
          
          </Link> */}
          {items.event && items.event ? (
            <Link
              href={{
                pathname: "/events-design/event-view",
                query: items.id,
              }} >
              <a>
                <div className="rounded-xl bg-white border border-gray-100 my-2">
                  {items.event.cover_photo_url ? (
                    <img
                      src={items.event.cover_photo_url}
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
                          <span>{items.event.start_time}</span>
                          <span>-{items.event.end_time}</span>&nbsp;
                          <span>{items.event.start_date}</span>&nbsp;
                        </div>
                        {/* Name */}
                        <div className="font-semibold text-lg">
                          {items.event.name}
                        </div>
                        {/* Event-type */}
                        <div className="flex items-center gap-2">
                          <CalendarIcon
                            width={16}
                            height={16}
                            className="text-gray-900"
                          />
                          <span className="text-gray-900 text-sm">
                            {items.event.event_type}
                          </span>
                        </div>
                        {items.event.event_type === "online" ? ('') : (
                          <>
                            {/* Adress */}
                            {items.event.address ? (
                              <div className="flex items-center gap-2">
                                <CalendarIcon
                                  width={16}
                                  height={16}
                                  className="text-gray-900"
                                />
                                <span className="text-gray-900 text-sm">
                                  {items.event.address}
                                </span>
                              </div>
                            ) : ('')}

                            {/* Venue */}
                            {items.event.venue ? (
                              <div className="flex items-center gap-2">
                                <CalendarIcon
                                  width={16}
                                  height={16}
                                  className="text-gray-900"
                                />
                                <span className="text-gray-900 text-sm">
                                  {items.event.venue}
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
                          <span>{items.event.event_link}</span>
                        </div>
                        {/* Speaker */}
                        <div className="text-gray-900">
                          {items.event.tags && items.event.tags.length > 0 ?
                            <App state={items.event.speaker} website={items.event.tags} />
                            : items.event.body ? items.event.body : ""}
                        </div>
                      </div>
                      <Link
                        href={{
                          pathname: "/events-design/event-view",
                          query: items.id,
                        }}
                      >
                        <a className="text-sm text-gray-600 cursor-pointer flex items-center border border-gray-100 rounded-full py-1 px-3">
                          View Event
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ) : (
            ""
          )}
          {items.feed_type && items.feed_type === "video_feed" ? (
            <Link
              href={{
                pathname: "/events-design/event-view",
                query: items.id,
              }} >
              <a>
                <video controls className="aspect-video w-full rounded-xl my-4">
                  <source src={items.attachments_link} type="video/mp4" />
                </video>
              </a>
            </Link>
          ) : (
            ""
          )}
          {items.attachments_link && items.feed_type === "image_feed" ? (
            <Link
              href={{
                pathname: "/events-design/event-view",
                query: items.id,
              }} >
              <a>
                <div className="mt-[14px]">
                  <img
                    src={items.attachments_link}
                    width={952}
                    height={240}
                    layout="responsive"
                    className="aspect-video object-cover rounded-lg mx-auto h-[390px]"
                    alt=""
                  />
                </div>
              </a>
            </Link>
          ) : (
            ""
          )}

          {items.feed_type && items.feed_type === "share" ? (
            <div className="border p-4 m-2">
              <div className="flex gap-2 items-center">

                {items && items.share.page ? (
                  items.share.page.display_photo_url ? (
                    <Link href={{ pathname: "/page-design/suggested-pages", query: items.share.page.id,}}>
                      <a>
                        <img
                          src={items.share.page.display_photo_url}
                          className="aspect-video object-cover rounded-full h-[42px] w-[42px]"
                          width={45}
                          height={45}
                          alt=""
                        />
                      </a>
                    </Link>
                  ) : (
                    <Link href={{ pathname: "/page-design/suggested-pages", query: items.share.page.id,}}>
                      <a>
                        <Image
                          src={PagePhoto}
                          className="aspect-video object-cover rounded-full h-[42px] w-[42px]"
                          width={45}
                          height={45}
                          alt=""
                        />
                      </a>
                    </Link>
                  )
                ) : (
                  items && items.share.user && items.share.user.display_photo_url ? (
                    CurrentUser && CurrentUser.id==items.share.user.id?(
                      <Link href="/profile">
                        <a>
                          <img
                            src={items.share.user.display_photo_url}
                            className="aspect-video object-cover rounded-full h-[42px] w-[42px]"
                            width={45}
                            height={45}
                            alt=""
                          />
                        </a>
                      </Link>
                    ):(
                      <Link href={{ pathname: "/User-Profile", query: items.share.user.id,}}>
                        <a>
                          <img
                            src={items.share.user.display_photo_url}
                            className="aspect-video object-cover rounded-full h-[42px] w-[42px]"
                            width={45}
                            height={45}
                            alt=""
                          />
                        </a>
                      </Link>
                    )
                  ) : (
                    CurrentUser && CurrentUser.id==items.share.user.id?(
                      <Link href="/profile">
                        <a>
                          <Image
                            src={ProfileAvatar}
                            width={45}
                            height={45}
                            alt=""
                          />
                        </a>
                      </Link>
                    ):(
                      <Link href={{ pathname: "/User-Profile", query: items.share.user.id,}}>
                        <a>
                          <Image
                            src={ProfileAvatar}
                            width={45}
                            height={45}
                            alt=""
                          />
                        </a>
                      </Link>
                    )
                   
                  )
                )}

                <div>
                  {items.share.page ? (
                    <>
                    <Link href={{ pathname: "/page-design/suggested-pages", query: items.share.page.id,}}>
                    <a>
                      <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">

                        <div className="capitalize">{items.share.page.name}</div>
                      </h4>
                      <div className="font-light text-gray-900 opacity-[0.8] italic">  Page Post</div>
                    </a>
                    </Link>
                    </>

                  ) : (
                    items.share.group ? (
                      <>
                        <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                          {CurrentUser && CurrentUser.id==items.share.user.id?(
                            <Link href="/profile">
                              <a>
                                {items.share.user.first_name} {items.share.user.last_name}
                              </a>
                            </Link>
                          ):(
                            <Link href={{ pathname: "/User-Profile", query: items.share.user.id,}}>
                              <a>
                                {items.share.user.first_name} {items.share.user.last_name}
                              </a>
                            </Link>
                          )}
                          <ChevronRightIcon
                            width={24}
                            height={24}
                            className="text-indigo-400"
                          />
                          <Link href={{ pathname: "/group-page/joind-group", query: items.share.group.id,}}>
                            <a>
                              <div className="capitalize">{items.share.group.title}</div>
                            </a>
                          </Link>
                        </h4>
                        <div className="font-light text-gray-900 opacity-[0.8] italic">Group Post</div>

                      </>
                    ) : (
                      <>
                      {CurrentUser && CurrentUser.id==items.user.id?(
                        <Link href="/profile">
                          <a>
                            <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                              {items.share.user.first_name} {items.share.user.last_name}
                              <BadgeCheckIcon
                                width={14}
                                height={14}
                                className="text-indigo-400"
                              />
                            </h4>
                            <div className="font-light text-gray-900 opacity-[0.8]">
                              {items.share.user.city ? items.share.user.city + ", " : ""}{items.share.user.state ? items.share.user.state + ", " : ""} {items.share.user.country}
                            </div>
                          </a>
                        </Link>
                      ):(
                        <Link href={{ pathname: "/User-Profile", query: items.share.user.id,}}>
                          <a>
                            <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                              {items.share.user.first_name} {items.share.user.last_name}
                              <BadgeCheckIcon
                                width={14}
                                height={14}
                                className="text-indigo-400"
                              />
                            </h4>
                            <div className="font-light text-gray-900 opacity-[0.8]">
                              {items.share.user.city ? items.share.user.city + ", " : ""}{items.share.user.state ? items.share.user.state + ", " : ""} {items.share.user.country}
                            </div>
                          </a>
                        </Link>
                      )}
                      
                      </>
                    )
                  )}

                </div>
              </div>
              <div className="p-2 pb-2">
                {items.share.tags && items.share.tags.length > 0 || (items.share.hashtags && items.share.hashtags.length > 0) ?
                  <App state={items.share.body} website={items.share.tags} hashtags={items.share.hashtags} />
                  : <ReadMore>
                    {items.share.body ? items.share.body : ""}
                  </ReadMore>}
              </div>
              <div className="mt-[14px] mx-auto">
                {items.share.event && items.share.event ? (
                  <Link
                    href={{
                      pathname: "/events-design/event-view",
                      query: items.id,
                    }} >
                    <a>
                      <div className="rounded-xl bg-white border border-gray-100 my-2">
                        {items.share.event.cover_photo_url ? (
                          <img
                            src={items.share.event.cover_photo_url}
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
                                <span>{items.share.event.start_time}</span>
                                <span>-{items.share.event.end_time}</span>&nbsp;
                                <span>{items.share.event.start_date}</span>&nbsp;
                              </div>
                              {/* Name */}
                              <div className="font-semibold text-lg">
                                {items.share.event.name}
                              </div>
                              {/* Event-type */}
                              <div className="flex items-center gap-2">
                                <CalendarIcon
                                  width={16}
                                  height={16}
                                  className="text-gray-900"
                                />
                                <span className="text-gray-900 text-sm">
                                  {items.share.event.event_type}
                                </span>
                              </div>
                              {items.share.event.event_type === "online" ? ('') : (
                                <>
                                  {/* Adress */}
                                  {items.share.event.address ? (
                                    <div className="flex items-center gap-2">
                                      <CalendarIcon
                                        width={16}
                                        height={16}
                                        className="text-gray-900"
                                      />
                                      <span className="text-gray-900 text-sm">
                                        {items.share.event.address}
                                      </span>
                                    </div>
                                  ) : ('')}

                                  {/* Venue */}
                                  {items.share.event.venue ? (
                                    <div className="flex items-center gap-2">
                                      <CalendarIcon
                                        width={16}
                                        height={16}
                                        className="text-gray-900"
                                      />
                                      <span className="text-gray-900 text-sm">
                                        {items.share.event.venue}
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
                                <span>{items.share.event.event_link}</span>
                              </div>
                              {/* Speaker */}
                              <div className="text-gray-900">
                                {items.share.event.tags && items.share.event.tags.length > 0 ?
                                  <App state={items.share.event.speaker} website={items.share.event.tags} />
                                  : items.share.event.body ? items.share.event.body : ""}
                              </div>
                            </div>
                            <Link
                              href={{
                                pathname: "/events-design/event-view",
                                query: items.id,
                              }}
                            >
                              <a className="text-sm text-gray-600 cursor-pointer flex items-center border border-gray-100 rounded-full py-1 px-3">
                                View Event
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                ) : (
                  ""
                )}
                {items.share.feed_type && items.share.feed_type === "video_feed" ? (
                  <Link
                    href={{
                      pathname: "/events-design/event-view",
                      query: items.id,
                    }} >
                    <a>
                      <video controls className="aspect-video w-full rounded-xl my-4">
                        <source src={items.share.attachments_link} type="video/mp4" />
                      </video>
                    </a>
                  </Link>
                ) : (
                  ""
                )}
                {items.share.attachments_link && items.share.feed_type === "image_feed" ? (
                  <Link
                    href={{
                      pathname: "/events-design/event-view",
                      query: items.id,
                    }} >
                    <a>
                      <div className="mt-[14px]">
                        <img
                          src={items.share.attachments_link}
                          width={952}
                          height={240}
                          layout="responsive"
                          className="aspect-video object-cover rounded-lg mx-auto h-[390px]"
                          alt=""
                        />
                      </div>
                    </a>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>) : ("")}

          <div className="flex justify-between mt-[14px]">
            <div className="flex gap-6">
              <div className="flex gap-2 items-center">
                {items.is_heart && items.is_heart == true ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="Red"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => deteleHeart(items.heart_id)}
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                    <span className="font-light text-gray-900">
                      {items.reactions_count}
                    </span>
                  </>
                ) : (
                  <>
                    <HeartIcon
                      width={24}
                      height={24}
                      className="text-gray-600 cursor-pointer"
                      onClick={() => addHeart(items.id)}
                    />
                    <span className="font-light text-gray-600 cursor-pointer">
                      {items.reactions_count}
                    </span>
                  </>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <ChatAltIcon
                  width={24}
                  height={24}
                  className="text-gray-600 cursor-pointer"
                />
                <span className="font-light text-gray-600 cursor-pointer">{comments_count >= 0 && is_deleted == true ? (comments_count) : (items.comments_count == 0 ? (0) : (items.comments_count))}</span>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex gap-2 items-center">
                {items.is_bookmark && items.is_bookmark == true ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-indigo-400 cursor-pointer"
                      onClick={() => deteleBookmark(items.bookmark_id)}
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-light text-indigo-400">
                      {items.bookmarks_count}
                    </span>
                  </>
                ) : (
                  <>
                    <BookmarkIcon
                      width={24}
                      height={24}
                      className="text-indigo-400 cursor-pointer"
                      onClick={() => createBookmark(items.id)}
                    />
                    <span className="font-light text-indigo-400">
                      {items.bookmarks_count}
                    </span>
                  </>
                )}
              </div>

              <ShareModal items={items && items.feed_type == "share" ? (items.share) : (items)} currentuser={CurrentUser && CurrentUser} />
            </div>
          </div>

          <Fragment>
            {CurrentUser && items && items.page && items.page.can_comment != "all_member" && (CurrentUser.id != items.page.user_id) ? ('') : (
              <PostComments news_feed_id={items.id} setComments={setComments} setComments_count={setComments_count} setIs_deleted={setIs_deleted} dp={items.user.display_photo_url} />
            )}
            <FilterComments news_feed_id={items.id} comments={comments.data} setComments_count={setComments_count} setComments={setComments} next_page={nextPage} setNextPage={setNextPage} />
            {!loading && <ReplyComments news_feed_id={items.id} comments={comments.data} comments_count={comments_count} setComments_count={setComments_count} setComments={setComments} setIs_deleted={setIs_deleted} items={items} />}
          </Fragment>
        </div>

      </div>
      {/* <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] pb-4 mt-[14px] bg-white rounded-xl">
        <div className="flex gap-2 justify-between items-center px-[22px] py-[14px]">
          <div className="flex gap-2 items-center">
          {items && items.user && items.user.display_photo_url?(
             <img
             src={items.user.display_photo_url} 
             className="aspect-video object-cover rounded-full h-[42px] w-[42px]"
                  
             width={45} 
             height={45} 
             alt="" />
          ):(<Image 
            src={ProfileAvatar} 
            width={45} 
            height={45} 
            alt="" />)}
           
            <div>
              <h4 className="flex gap-[6px] items-center font-medium text-gray-900">
                {items.user.first_name} {items.user.last_name}
                <ChevronRightIcon
                  width={24}
                  height={24}
                  className="text-indigo-400"
                />
                <div>Goup & Page Name</div>
              </h4>
              <div className="font-light text-gray-900 opacity-[0.8]">
                {items.user.recent_job}
              </div>
            </div>
          </div>
         
          <div className="">
            <div className="">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={` ${
                        open ? "" : "text-opacity-90 focus-visible:outline-none"
                      }`}
                    >
                      <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                        <DotsHorizontalIcon className="w-5 h-5" />
                      </div>
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-72 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative bg-white py-2">
                            {cardDropdown.map((card) => (
                              <a
                                key={card.name}
                                href={card.id}
                                className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12 pl-2">
                                  <card.icon className="h-6 w-6 text-gray-900" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {card.name}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>NewsFeedSingle
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </div>
        </div>
       
        <div className="px-[22px] py-[14px]">
        <Link 
            href={{
            pathname: "/events-design/event-view",
            query: items.id,
          }} > 
          <a>
          <p>{items.body ? items.body : ""}</p>
          </a>
          
            </Link>
          {items.event && items.event ? (
            <Link 
            href={{
            pathname: "/events-design/event-view",
            query: items.id,
          }} > 
          <a>
            <div className="rounded-xl bg-white border border-gray-100 my-2">
              {items.event.cover_photo_url ? (
                <img
                  src={items.event.cover_photo_url}
                  className="aspect-video object-cover rounded-t-xl h-[390px] w-[952px]"
                  alt=""
                />
              ) : (
                ""
              )}
              <div className="py-3 px-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-red-400 text-sm">
                      <span>{items.event.start_time}</span>
                      <span>-{items.event.end_time}</span>&nbsp;
                      <span>{items.event.start_date}</span>&nbsp;
                    </div>
                    <div className="font-semibold text-lg">
                      {items.event.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon
                        width={16}
                        height={16}
                        className="text-gray-900"
                      />
                      <span className="text-gray-900 text-sm">
                        {items.event.event_type}
                      </span>
                    </div>
                    <div className="text-gray-900"></div>
                  </div>
                  <Link 
                    href={{
                    pathname: "/events-design/event-view",
                    query: items.id,
                  }}
                   >
                    <a className="text-sm text-gray-600 cursor-pointer flex items-center border border-gray-100 rounded-full py-1 px-3">
                      View Event
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            </a>
            </Link>
          ) : (
            ""
          )}
          {items.feed_type && items.feed_type === "video_feed" ? (
            <Link 
            href={{
            pathname: "/events-design/event-view",
            query: items.id,
          }} > 
          <a>
              <video controls className="aspect-video w-full rounded-xl my-4">
                <source src={items.attachments_link} type="video/mp4" />
              </video>
          </a>
          </Link>
          ) : (
            ""
          )}
          {items.attachments_link && items.feed_type === "image_feed" ? (
            <Link 
            href={{
            pathname: "/events-design/event-view",
            query: items.id,
          }} > 
          <a>
            <div className="mt-[14px]">
              <img
                src={items.attachments_link}
                width={952}
                height={240}
                layout="responsive"
                className="aspect-video object-cover rounded-lg mx-auto h-[390px]"
                alt=""
              />
            </div>
            </a>
            </Link>
          ) : (
            ""
          )}
          <div className="flex justify-between mt-[14px]">
            <div className="flex gap-6">
              <div className="flex gap-2 items-center">
                {items.is_heart && items.is_heart == true ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="Red"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => deteleHeart(items.heart_id)}
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                    <span className="font-light text-gray-900">
                      {items.reactions_count}
                    </span>
                  </>
                ) : (
                  <>
                    <HeartIcon
                      width={24}
                      height={24}
                      className="text-gray-600 cursor-pointer"
                      onClick={() => addHeart(items.id)}
                    />
                    <span className="font-light text-gray-600 cursor-pointer">
                      {items.reactions_count}
                    </span>
                  </>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <ChatAltIcon
                  width={24}
                  height={24}
                  className="text-gray-600 cursor-pointer"
                />
                <span className="font-light text-gray-600 cursor-pointer">{comments_count>=0 && is_deleted==true?(comments_count):(items.comments_count==0?(0):(items.comments_count))}</span>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex gap-2 items-center">
                {items.is_bookmark && items.is_bookmark == true ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-indigo-400 cursor-pointer"
                      onClick={() => deteleBookmark(items.bookmark_id)}
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-light text-indigo-400">
                      {items.bookmarks_count}
                    </span>
                  </>
                ) : (
                  <>
                    <BookmarkIcon
                      width={24}
                      height={24}
                      className="text-indigo-400 cursor-pointer"
                      onClick={() => createBookmark(items.id)}
                    />
                    <span className="font-light text-indigo-400">
                      {items.bookmarks_count}
                    </span>
                  </>
                )}
              </div>
              <div>
                <ShareIcon
                  width={24}
                  height={24}
                  className="text-indigo-400 cursor-pointer"
                  onClick={() => copylink(items.id)}
                />
              </div>
            </div>
          </div>
          <Fragment>
            <PostComments news_feed_id={items.id} setComments={setComments} setComments_count={setComments_count} setIs_deleted={setIs_deleted} dp={items.user.display_photo_url}/>
            <FilterComments news_feed_id={items.id} comments={comments.data} setComments_count={setComments_count} setComments={setComments} next_page={nextPage} setNextPage={setNextPage} />
            {!loading && <ReplyComments news_feed_id={items.id} comments={comments.data} comments_count={comments_count} setComments_count={setComments_count} setComments={setComments} setIs_deleted={setIs_deleted} items={items}/>}
          </Fragment>
        </div>
      </div> */}
    </>
  );
};

export default NewsFeedSingle;
