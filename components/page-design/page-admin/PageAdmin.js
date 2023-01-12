import React from "react";
import Link from "next/link";
import Image from "next/image";
import postimage from "../../../public/images/groupcover.jpg";
import postimage1 from "../../../public/images/post-image.png";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import ProfileAvatar from "../../../public/images/brand.jpeg";
import {
  BellIcon,
  BookmarkAltIcon,
  BookmarkIcon,
  ChatAlt2Icon,
  CogIcon,
  DotsHorizontalIcon,
  LockClosedIcon,
  LogoutIcon,
  MailIcon,
  PencilIcon,
  UserAddIcon,
  UserGroupIcon,
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
import { CURENT_USER_LOGIN_API, PAGES_API, POST_NEWSFEED_API_KEY } from "../../../pages/config";
import Spinner from "../../common/Spinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import {
  GlobeIcon,
  HeartIcon,
  ChatAltIcon,
  ShareIcon,
  DocumentReportIcon,
} from "@heroicons/react/outline";
import PostComments from "./PostComments";
import FilterComments from "./FilterComments";
import {
  PencilAltIcon,
  ThumbUpIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import ProfileFeed from "../liked-pages/ProfileFeed";

// import Spinner from "../../../common/Spinner";

const cardDropdown = [
  {
    name: "Edit",
    href: "#",
    icon: PencilAltIcon,
  },
  {
    name: "Save",
    href: "#",
    icon: BookmarkIcon,
  },
  {
    name: "Delet Post",
    href: "",
    icon: TrashIcon,
  },
];

const PageAdmin = (setList, singleItem) => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const [loading, setLoading] = useState(false);
  const [postText, setPostText] = useState("");
  const [eventCoverImage, setEventCoverImage] = useState([]);
  const [previewEventCoverImage, setPreviewEventCoverImage] = useState();
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [inPerson, setInPerson] = useState(false);
  const [online, setOnline] = useState(false);
  const [feedType, setFeedType] = useState("basic");
  const [eventType, setEventType] = useState();
  const [videoSrc, setVideoSrc] = useState([]);
  const [videoPreview, setVideoPreview] = useState();
  const [currentUser, setCurrentUser] = useState();
  // const [loading, setLoading] = useState(false);
  const [admins,setadmins] = useState();
    

  const [postImagePreview, setpostImagePreview] = useState(); // cover preview
  const [postdpPreview, setpostdpPreview] = useState();   // dp Preview
  const [GroupData, setGroupData] = useState({});            
  let [isOpen, setIsOpen] = useState(false);
  const [member, setmember] = useState();
  const handleImageSelect = (e) => {
    setEventCoverImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setPreviewEventCoverImage(window.URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleCoverReomve = (e) => {
    setpostImagePreview(window.URL.revokeObjectURL(e.target.files));
    setPreviewEventCoverImage(window.URL.revokeObjectURL(e.target.files));
    setVideoPreview(window.URL.revokeObjectURL(e.target.files));
  };

  const handleVideo = (e) => {
    setFeedType("video_feed");
    setVideoSrc(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setVideoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = () => {
    resetForm();
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    resetForm,
  } = useFormik({
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

  function postNewsData(e) {
    e.preventDefault();

    setLoading(true);
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
          setList(result);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
    setFeedType("basic");
    setPostText("");
    setpostImagePreview("");
    setEventCoverImage("");
    setVideoSrc("");
    setVideoPreview("");
    onSubmit();
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  
  const [items, setItems] = useState(singleItem.items);

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }


  








  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Handle dp
  const handledpPost = (e) => {
    if (e.target.files.length !== 0) {
      setpostdpPreview(window.URL.createObjectURL(e.target.files[0]));
    }
    UpdateGroup(e.target.files[0], "dp");
  };
  // handle cover
  const handleImagePost = (e) => {
    if (e.target.files.length !== 0) {
      setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
    }
    UpdateGroup(e.target.files[0], "cover");
  };
  // Update Dp/Cover of Page
  const UpdateGroup =(file,type)=>{
    const dataForm = new FormData();
    if(type=="dp"){dataForm.append("pages[display_photo]", file);}
    if(type=="cover"){dataForm.append("pages[cover_photo]", file);}
      const res = fetch(PAGES_API +"/"+myArray[1], {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
      })
      .then((resp) => resp.json())
      .then((result) => {
        PageDetail();
      })
  }
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

      setGroupData(result.data);
      
    })
  }
  // Current User
  const Current_User=async()=>{  
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
  // Get all Admins
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
      GetMember();
    })
  };
  // Check admins
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
  // Get Group's Member
  const GetMember =()=>{
    fetch(PAGES_API +"/page_liker?page_id="+myArray[1] , {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if(result.data){
        setmember(result.data)
        }
    })
  }

  useEffect(() => {
    PageDetail();
    Current_User();
    GetAdmins();
  },[])


  return (
    <div className="mt-8">
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="blogs bg-white rounded-xl">
          <div className="group relative w-full">
              {postImagePreview?(
                <img
                  src={postImagePreview}
                  className="object-cover rounded-xl h-[350px] w-[1030px]"
                  width={1000}
                  height={350}
                  alt=""
                />      
              ):(
                <span>
                  {GroupData && GroupData.cover_photo_url?(
                  <img
                    src={GroupData.cover_photo_url}
                    className="object-cover rounded-xl h-[350px] w-[1030px]"
                    width={1000}
                    height={350}
                    alt=""
                  /> 
                  ):(
                  <Image
                    src={postimage}
                    className="object-cover rounded-xl"
                    width={1000}
                    height={350}
                    alt=""
                  />
                  )}
                </span>
              )}
              <div className="absolute rounded-xl top-0 z-50 left-0 bg-gray-600 bg-opacity-60 w-full h-0 flex flex-col justify-center items-center opacity-0 group-hover:h-full group-hover:opacity-100 duration-1000">
                <div className="relative flex items-center justify-center">
                  <div className="">
                    <div className="flex cursor-pointer gap-2 items-center p-2 rounded-xl border-2 border-white text-white">
                      <PhotographIcon width={22} height={22} />
                      Change Cover Photo
                    </div>
                  </div>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="opacity-0 absolute w-6 h-6 -z-0"
                    onChange={handleImagePost}
                    title={""}
                    multiple
                  />
                </div>
              </div>
          </div>
          <div className="absolute  p-2 -mt-11 ml-14 rounded-full bg-white">
            <div className="relative">
              <Link href="">
                <a>
                  {/* className="object-cover rounded-full z-40" */}
                  {postdpPreview? (
                    <Image
                      src={postdpPreview}
                      width={96}
                      height={96}
                      className="object-cover rounded-full z-40"
                      placeholder="empty"
                      alt="profile-image"
                    />
                  ):(
                      <span>
                      {GroupData && GroupData.display_photo_url?(
                      <img
                        src={GroupData.display_photo_url}
                        className="object-cover rounded-full z-40 h-[100px] w-[100px]"
                        alt=""
                      /> 
                      ):(
                      <Image
                        src={postimage}
                        className="object-cover rounded-full z-40"
                        width={96}
                        height={96}
                        alt=""
                      />
                      )}
                        </span>
                    )
                  }
                </a>
              </Link>
              <div className="absolute top-0 left-0 right-0 bottom-0 w-full rounded-full h-full bg-black bg-opacity-0 z-50 flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-opacity-70 duration-500">
                <div className="flex gap-1 text-sm text-white rounded-full  cursor-pointer">
                  <PencilIcon className="w-4 h-4" />
                  Edit Profile
                  <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handledpPost}
                  className="opacity-0 absolute w-6 h-6 -z-0"
                  title={""}
                  multiple
                />
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 pt-1 ml-10">
            <div className=" flex justify-between items-center">
              <div className="heading ml-28 text-2xl text-indigo-400 font-bold">
                {GroupData?(GroupData.name):('')}
              </div>
              <div className="">
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
                        <Menu.Item className="">
                          <Link href="/page-design/page-admin/page-notifications">
                            <a className="flex gap-1">
                              <BellIcon className="h-5 w-5" />
                              Page Notifications
                            </a>
                          </Link>
                        </Menu.Item>
                        <Menu.Item className="">
                          <Link href="">
                            <a className="flex gap-1 mt-2">
                              <ChatAlt2Icon className="w-5 h-5" />
                              Page Messages
                            </a>
                          </Link>
                        </Menu.Item>
                        <Menu.Item className="">
                          <Link href={{pathname: "/page-design/page-admin/page-settings", query: myArray[1],}}>
                            <a className="flex gap-1 mt-2">
                              <CogIcon className="w-5 h-5" />
                              Page Settings
                            </a>
                          </Link>
                        </Menu.Item>
                        <Menu.Item className="">
                        <Link href={{pathname: "/page-design/page-admin/Block-members", query: myArray[1],}}>
                            <a className="flex gap-1 mt-2">
                              <CogIcon className="w-5 h-5" />
                              Block Members
                            </a>
                          </Link>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className="Details -mt-1 pl-14 ml-14">
            <Link href={{pathname: "/page-design/page-admin/page-members", query: myArray[1],}}>
                <a className="flex gap-1 mt-2">
                  <ThumbUpIcon className="h-5 w-5" />
                  {admins?(
                  <div className=""> {member?admins.length + member.length:admins.length} Likes</div>
                  ):(<div className=""> {member?member.length:0} Likes</div>)}
                </a>
              </Link>
            </div>
          </div>
        </div>
        {currentUser && GroupData ?(
          <ProfileFeed currentUser={currentUser} group={GroupData} admins={admins}/>
        ):("")}
      </div>
    </div>
  );
};

export default PageAdmin;
