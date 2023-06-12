import React from "react";
import Link from "next/link";
import Image from "next/image";
import postimage from "../../../public/images/pagecover.jpg";
import postimage1 from "../../../public/images/post-image.png";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import ProfileAvatar from "../../../public/images/brand.jpeg";
import Profileuser from "../../../public/images/profile-avatar.png";
import {
  BellIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  LogoutIcon,
  MailIcon,
} from "@heroicons/react/outline";
import { Popover } from "@headlessui/react";
import { useState, useEffect } from "react";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import {
  PhotographIcon,
  VideoCameraIcon,
  CalendarIcon,
  NewspaperIcon,
  XIcon,
  CameraIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { useFormik } from "formik";
import { eventScheema } from "../../auth/schemas/CreateEventScheema";
import { Dialog } from "@headlessui/react";
import { CURENT_USER_LOGIN_API, GET_USER_FOLLOWEES, InviteFriends, PAGES_API, POST_NEWSFEED_API_KEY } from "../../../pages/config";
import Spinner from "../../common/Spinner";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import {
  GlobeIcon,
  HeartIcon,
  ChatAltIcon,
  DocumentReportIcon,
} from "@heroicons/react/outline";
import PostComments from "./PostComments";
import FilterComments from "./FilterComments";
import {
  ThumbDownIcon,
  ThumbUpIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import ProfileFeed from "./ProfileFeed";
import InviteFriendsGroup from "./InviteFriendsGroup/InviteFriendsGroup";
import axios from "axios";
const cardDropdown = [
  {
    name: "Turn Off Notifications",
    href: "",
    icon: BellIcon,
  },
  {
    name: "Save",
    href: "#",
    icon: BookmarkIcon,
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
      {isReadMore ? text.slice(0, 355) + (text.length > 355?("......"):('')) : text}
      {text.length > 355?(
        <span onClick={toggleReadMore} className="text-indigo-400 cursor-pointer ml-2 font-bold">
          {isReadMore ? "Read more" : "Show less"}
        </span>
      ):('')}
    </p>
  );
};

const LikedPages = (setList, singleItem) => {
  const [Page, setPage] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [admins,setadmins] = useState();
  const [InviteUser,setInviteUser] = useState();
  const [isCheck, setIsCheck] = useState([]);
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  //  Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  // Page details
  const PageDetail =()=>{
    const res = fetch(PAGES_API +"/"+myArray[1], {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      setPage(result.data);
    })
  }
  // Current User
  const Current_User=async()=>{    
    var c = window.localStorage.getItem("currentuser");
    var Details =JSON.parse(c);
    // await fetch(CURENT_USER_LOGIN_API, {
    //   method: "GET",
    //    headers: {
    //     Accept: "application/json", 
    //      Authorization: `${authKey}`,
    //    },
    // })
    //    .then((resp) => resp.json())
    //   .then((result) => {
    //     if (result) {
          setCurrentUser(Details);
    //     }
    //   })
    //   .catch((err) => console.log(err)); 
  }
  // Get All admins
  const GetAdmins =()=>{
    fetch(PAGES_API +"/get_page_admin?page_id="+myArray[1] , {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      setadmins(result.data);
    })
  };
  // Unlike Page
  const UnlikePage =()=>{
    const res = fetch(PAGES_API +"/unlike_page?id="+myArray[1] , {
    method: "Delete",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      router.push("/page-design");
    })
  }
  // chech either is admin or not
  function isadmin(admin,user_id)
  {
    for(var i=0; i < admin.length; i++){
     if (admin[i].user.id == user_id)
     {
      return true;
     }
    }
    return false;
  }

  function closeinviteModal(){
    setIsCheck([]);
    setIsOpen(false);
  }
  const SendInviteRequest = async () => {
    const res = await axios(InviteFriends+"/invite_friend?page_id="+myArray[1]+"&invite_list="+isCheck, {
      method: "GET",
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
      if (result.status == 200) {
        console.log(result.data);
        // setList(result.data.data);
        setIsCheck([]);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  };

  function inviteModal(){
    if (isCheck.length > 0)
    {
      SendInviteRequest();
    }
    else
    {
      alert("Select Friend to Invite");
    }
  }

  useEffect(() => {
    PageDetail();
    Current_User();
    GetAdmins();
    GetInviteFriends();
    
  },[])
  // invite modal for close
  function closeModal() {
    setIsOpen(false);
  }
  // invite modal for open
  function openModal() {
    setIsOpen(true);
  }

  // Show Friends Invite 
  const GetInviteFriends=async()=>
  {      
    const requestOptions = {
      method: 'GET',
      headers:{Accept: "application/json", Authorization: `${authKey}` },
    };
    const response = await fetch(`${GET_USER_FOLLOWEES}`,requestOptions);
    const data = await response.json();
    // console.log("Total Followeee", data.data );
    setInviteUser(data.data);
  }

  return (
    <div className="mt-8">
      <div className="w-full xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className=" flex justify-between items-center">
          <div className="w-full xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
            <div className="blogs bg-white rounded-xl">
              <div className="image relative">
                  {Page && Page.cover_photo_url?(
                    <img
                      src={Page.cover_photo_url} 
                      className="object-cover rounded-xl h-[300px] w-[1350px]"
                      alt=""
                    />
                  ):(
                    <Image
                      src={postimage}
                      className="object-cover rounded-xl"
                      width={1050}
                      height={300}
                      alt=""
                    />
                  )}
                {Page && Page.display_photo_url?(
                  <div className="absolute -bottom-16 left-5">
                    <img
                      src={Page.display_photo_url}
                      className="object-cover rounded-full z-40 h-[100px] w-[100px]"
                      alt=""
                    />
                  </div>
                  ):(
                  <div className="absolute -bottom-16 left-5">
                    <Image
                      src={ProfileAvatar}
                      className="rounded-full object-cover"
                      width={85}
                      height={85}
                      alt=""
                    />
                  </div>
                  )}
              </div>
              <div className="flex justify-between">
                <div className="p-5 pt-1">
                  <div className=" flex justify-between items-center">
                    {Page && Page.name?(
                    <div className="heading ml-28 text-2xl text-indigo-400 font-bold capitalize cursor-pointer">
                    {Page.name}
                    </div>
                    ):('')}
                  </div>
                  <div className="Details">
                  {Page && Page.page_likes_count>0?(
                    <div className="flex gap-1 mt-2 ml-28 cursor-pointer">{Page.page_likes_count} Liked</div>
                  ):(
                    <div className="flex gap-1 mt-2 ml-28">0 Liked</div>
                  )}
                  </div>
                </div>
                <div className="mr-5">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="">
                        <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                          <DotsHorizontalIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Menu.Items className="absolute left-1/2 z-10 mt-3 w-48 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                        <div className="flex items-start flex-col gap-2 border-1 bg-white rounded-xl p-3">
                        {currentUser && Page && admins && (isadmin(admins,currentUser.id)!=true && Page.owner && currentUser.id!=Page.owner.id)?(
                          <>
                            <Menu.Item className="flex gap-1 mt-2">
                              <a href="">
                                <MailIcon className="h-5 w-5" />
                                Report
                              </a>
                            </Menu.Item>
                            <Menu.Item className="flex gap-1 mt-2">
                              <a onClick={()=>UnlikePage()}>
                                <ThumbDownIcon className="h-5 w-5" />
                                Unlike
                              </a>
                            </Menu.Item>
                          </>
                          ):('')} 
                         {currentUser && Page && admins && (isadmin(admins,currentUser.id)  ||Page.owner && currentUser.id==Page.owner.id)?(
                          <Menu.Item className="flex gap-1 mt-2">
                            <Link href={{pathname: "page-admin", query: Page.id,}}>
                            {/* <Link href="page-admin"> */}
                              <a className="flex gap-1 mt-2">
                                <UserCircleIcon className="h-5 w-5" />
                                View As Admin
                              </a>
                            </Link>
                          </Menu.Item>
                          ):('')}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="Details m-2 ml-10 mr-10 pb-5" >
              <div className="font-extralight">
                <ReadMore>
                  {Page?(Page.description):('')}
                </ReadMore>
              <div className="">
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
                          <Dialog.Panel className="w-[620px] relative bg-white rounded-xl xl:w-[580px] lg:w-[730px] md:w-[680px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all h-[700px] overflow-y-scroll">
                              <Dialog.Title>
                            <div className="sticky top-10 flex justify-between items-center mx-4">
                              <div
                                  className="text-lg font-medium leading-6 text-gray-900 px-8"
                                  >
                                  Invite Friends
                                  </div>
                                  <XIcon
                                  onClick={closeinviteModal}
                                  className="w-5 h-5 cursor-pointer"
                                />
                              </div>
                              </Dialog.Title>
                              <div className="p-8">
                              <InviteFriendsGroup page={Page} isCheck={isCheck} setIsCheck={setIsCheck}/>
                              </div>
                              <div className="sticky bottom-0 right-0">
                                <div className="p-2 rounded-xl">
                                  <div className="flex gap-4 justify-end"> 
                                    <button
                                        onClick={closeinviteModal}
                                        type="submit"
                                        className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                        >
                                          Close
                                    </button>
                                    <button
                                      onClick={inviteModal}
                                      type="submit"
                                      className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                      >
                                      Invite
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
              <div className="flex justify-end">
                <a>
                  <button
                    onClick={openModal}
                    type="submit"
                    className=" bg-indigo-400 text-sm text-white rounded-br-lg p-3 cursor-pointer"
                  >
                    Invite Friends
                  </button>
                </a>
              </div>
            </div>
            </div>
          </div>
        </div>
        {currentUser && Page ?(
          <ProfileFeed currentUser={currentUser} group={Page} admins={admins}/>
        ):("")}
      </div>
    </div>
  );
};

export default LikedPages;
