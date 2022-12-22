import React from "react";
import Link from "next/link";
import Image from "next/image";
import postimage1 from "../../../public/images/752126.jpg";
import postimage from "../../../public/images/post-image.png";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import {
  BellIcon,
  BookmarkAltIcon,
  BookmarkIcon,
  CogIcon,
  DotsHorizontalIcon,
  LockClosedIcon,
  LogoutIcon,
  MailIcon,
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
import { GROUP_API, CURENT_USER_LOGIN_API } from "../../../pages/config";
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
import { PencilAltIcon, PencilIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import ProfileFeed from "../joind-group/ProfileFeed";

// import Spinner from "../../../common/Spinner";

const cardDropdown = [
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
  {
    name: "Delet And Block User",
    href: "#",
    icon: XIcon,
  },
];

const AdminView = (setList, singleItem) => {
  const [name,setname] = useState();
  const [des,setdes] = useState();
  const [postImage, setPostImage] = useState([]);              // cover Post Image
  const [postImagePreview, setpostImagePreview] = useState();  // Cover Preview photo
  const [GroupData, setGroupData] = useState({});              // Group Data
  const [postdp, setPostdp] = useState([]);                    // dp Post Image
  const [postdpPreview, setpostdpPreview] = useState();        // dp Preview photo
  const [currentUser, setCurrentUser] = useState();
  const [admins,setadmins] = useState();

  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore");}
  // Update Group
  const UpdateGroup =(file,type)=>{
    const dataForm = new FormData();
    dataForm.append("groups[title]", name);
    dataForm.append("groups[description]", des);
    
    if(type=="dp"){dataForm.append("groups[display_image]", file);}
    if(type=="cover"){dataForm.append("groups[cover_image]", file);}
      const res = fetch(GROUP_API +"/"+myArray[1], {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
      })
      .then((resp) => resp.json())
      .then((result) => {
        GetGroupDetails();
        //alert("Your Setting has been updated!")
       
      })
  }
  // Dp Photo
   const handldpPost = (e) => {
    if (e.target.files.length !== 0) {
      setpostdpPreview(window.URL.createObjectURL(e.target.files[0]));
      UpdateGroup(e.target.files[0],"dp");
    }
    
  };
  // Cover Photo
  const handleImagePost = (e) => {
    setPostImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
      UpdateGroup(e.target.files[0],"cover");
    }
    
  };
  // Get Group
  const GetGroupDetails =()=>{
      const res = fetch(GROUP_API +"/"+myArray[1] , {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      })
      .then((resp) => resp.json())
      .then((result) => {
        setGroupData(result.data)
        setPostImage('');
        setpostImagePreview('')
        setname(result.data.title)
        setdes(result.data.description)
        
      })
  }
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
          // console.log("user",result.data);
        }
      })
      .catch((err) => console.log(err)); 
  }

  const GetAdmins =()=>{
    fetch(GROUP_API +"/get_group_admin?group_id="+myArray[1] , {
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
  useEffect(() => {
    Current_User();
    GetGroupDetails();
    GetAdmins();
  },[])
  const [items, setItems] = useState(singleItem.items);
  return (
    <div className="mt-8 w-[600px] xl:w-[980px] lg:w-[710px] md:w-[780px] px-5 md:px-0 lg:px-0 xl:px-0">
      <div className="">
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
                {GroupData && GroupData.cover_image_url?(
                <img
                  src={GroupData.cover_image_url}
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
                      {GroupData && GroupData.display_image_url?(
                      <img
                        src={GroupData.display_image_url}
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
                  onChange={handldpPost}
                  className="opacity-0 absolute w-6 h-6 -z-0"
                  title={""}
                  multiple
                />
                </div>
              </div>
            </div>
          </div>
          {/* Name and option */}
          <div className=" flex justify-between items-center p-5 mt-0 ml-28">
            
            {GroupData && GroupData.title?(
              <div className="heading text-2xl text-indigo-400 font-bold ml-14">
                {GroupData.title}
              </div>
            ):(
             <div className="heading text-2xl text-indigo-400 font-bold">
                No Name
             </div>
            )}
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
                  <Menu.Items className="absolute left-1/2 z-10 mt-3 w-64 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                    <div className="flex items-start flex-col gap-2 border-1 bg-white rounded-xl p-3">
                      <Menu.Item className="">
                        <Link href={{pathname: "/group-page/admin-view/group-members", query: myArray[1],}}>
                          <a className="flex gap-1">
                            <UserGroupIcon className="h-5 w-5" />
                            Members
                          </a>
                        </Link>
                      </Menu.Item>
                      <Menu.Item className="">
                        {/* <Link href="/group-page/admin-view/group-setting"> */}
                        <Link href={{pathname: "/group-page/admin-view/group-setting", query: myArray[1],}}>
                          <a className="flex gap-1 mt-2">
                            <CogIcon className="w-5 h-5" />
                            Group Settings
                          </a>
                        </Link>
                      </Menu.Item>
                      <Menu.Item className="">
                      <Link href={{pathname: "/group-page/admin-view/group-members/group-admins", query: myArray[1],}}>
                        <a className="flex gap-1 mt-2">
                          <UserAddIcon className="w-5 h-5" />
                          Admin
                        </a>
                        </Link>
                    </Menu.Item>
                      {GroupData && GroupData.group_type=="private_group"?(
                      <Menu.Item className="">
                      <Link href={{pathname: "/group-page/admin-view/pending-request", query: myArray[1],}}>
                        <a className="flex gap-1 mt-2">
                          <UserAddIcon className="w-5 h-5" />
                          Pending Request
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
        </div>
      </div>
      {/* <div className="mt-7">
        <div className="border hover:bg-gray-50 mt-4 p-4 bg-white hover:shadow-lg rounded-xl">
          <a href="" className="flex justify-between text-lg font-medium">
            <div className="username flex gap-2 items-center">
              <UserAddIcon className="w-5 h-5" />
              Post Request
            </div>
            <div className="">99+</div>
          </a>
        </div>
      </div> */}
     {currentUser && GroupData ?(
        <ProfileFeed currentUser={currentUser} group={GroupData} admins={admins}/>
      ):("")}
    </div>
  );
};

export default AdminView;
