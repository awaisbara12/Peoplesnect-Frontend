import React, { useEffect, useState } from "react";
import { Fragment } from "react";

import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../../../public/images/profile-avatar.png";
import { Menu, Transition } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { GROUP_API, GROUP_MEMBERS_API } from "../../../../../pages/config";
import { useRouter } from "next/router";

const GrooupAdmins = () => {
  const [member,setmember] = useState();
  const [count,setcount] = useState();
  const [admin,setadmin] = useState();
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore");}
  // Get Super Admin
  const GetCreater =()=>{
    const res = fetch(GROUP_API +"/"+myArray[1] , {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      setadmin(result.data)
    })
  }
  // Get all Admins
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
      setmember(result.data);
      if(result.data){
        setcount(result.data.length)
        }
    })
  }
  // Remove Member from group
  const Remove_Member =(Id)=>{
    const res = fetch(GROUP_API +"/remove_member?group_id="+myArray[1]+"&user_id="+Id , {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      GetAdmins();
     alert("Admin has been Removed from Group")
    })
  }
  // remove admin
  const removeAdmin =(id,type, name)=>{
    const res = fetch(GROUP_API +"/add_remove_admin?id="+id+"&member_type="+type , {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
     GetAdmins();
     alert("Now "+name+" is  Group Member")
    })
  }
  useEffect(() => {
   GetAdmins();
   GetCreater();
  },[])
  return (
    <div className="mt-8">
    <div className="w-[600px] xl:w-[980px] lg:w-[710px] md:w-[780px] px-5 md:px-0 lg:px-0 xl:px-0">
        <div className="bg-white rounded-xl mt-8">
          <div className="flex justify-between items-center border-b-1 p-4">
            <div className="heading">Group Admins</div>
            <div className="">{count+1}</div>
          </div>
          {/* For Creater/Super-admin */}
          {admin?(
              <div className="border-b-1">
                <div className="request-profile flex  px-4 py-3 justify-between items-center">
                  <div className="flex items-center gap-3">
                    {/* display_photo_url */}
                    {admin.owner.display_photo_url?(
                      <Link href={{pathname: "/User-Profile", query:admin.owner.id,}}>
                        <a>
                          <img src={admin.owner.display_photo_url} className="object-cover rounded-full z-40 h-[40px] w-[40px]" />
                        </a>
                      </Link>
                    ):(
                      <Link href={{pathname: "/User-Profile", query:admin.owner.id,}}>
                        <a>
                          <Image src={ProfileAvatar} width={35} height={35} alt="" />
                        </a>
                      </Link>
                    )}
                    {/* <Link href="/news-feed">
                      <a>
                        <Image src={ProfileAvatar} width={35} height={35} alt="" />
                      </a>
                    </Link> */}
                    <div className="">
                    <Link href={{pathname: "/User-Profile", query:admin.owner.id,}}>
                      <a>
                        <div className="username text-sm font-bold capitalize">{admin.owner.first_name} {admin.owner.last_name}</div>
                      
                        <div className="userfield text-xs">Group Creater</div>
                      </a>
                    </Link>
                    </div>
                  </div>
                  {/* <div className="Request-button ">
                    <button className="border-1 border-indigo-400 rounded-full text-indigo-400 px-3 py-1 hover:bg-indigo-400 hover:text-white">
                      Add Friend
                    </button>
                  </div> */}
                </div>
            </div>
          ):('')}
          {/* For all Admins */}
          {member?(
              member.map((i)=>{
                if(i.member_type=="admin")
                return(
                <div className="request-profile flex  px-4 py-3 justify-between items-center" key={i.id}>
                  <div className="flex items-center gap-3">
                    {i.group_member && i.group_member.display_photo_url?(
                      <Link href={{pathname: "/User-Profile", query:i.group_member.id,}}>
                      <a>
                        <img src={i.group_member.display_photo_url} className="object-cover rounded-full z-40 h-[40px] w-[40px]" alt="" />
                      </a>
                    </Link>
                    ):(
                      <Link href={{pathname: "/User-Profile", query:i.group_member.id,}}>
                        <a>
                          <Image src={ProfileAvatar} width={35} height={35} alt="" />
                        </a>
                      </Link>
                    )}
                    <div className="">
                      <Link href={{pathname: "/User-Profile", query:i.group_member.id,}}>
                      <a>
                        <div className="username text-sm font-bold capitalize">{i.group_member.first_name} {i.group_member.last_name}</div>
                      </a>
                      </Link>
                      <Link href={{pathname: "/User-Profile", query:i.group_member.id,}}>
                      <a>
                        <div className="userfield text-xs capitalize">{i.member_type}</div>
                      </a>
                      </Link>
                      {/* <Link href={{pathname: "/User-Profile", query:i.group_member.id,}}>
                      <a>
                        <div className="mutual-followers text-xs">
                          Friends Add in Group
                        </div>
                      </a>
                      </Link> */}
                    </div>
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
                            <Menu.Item className="flex gap-1">
                              <a onClick={()=>removeAdmin(i.id,"member",i.group_member.first_name)}>Remove From Admin</a>
                            </Menu.Item>
                            <Menu.Item className="flex gap-1 mt-2">
                              <a onClick={()=>Remove_Member(i.group_member.id)}>Remove From Group</a>
                            </Menu.Item>
                            <Menu.Item className="flex gap-1 mt-2">
                              <a href="">Block From Group</a>
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              )})
            ):('')}
          {/* <div className="border-b-1">
            <div className="request-profile flex  px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <Link href="/news-feed">
                  <a>
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                  </a>
                </Link>
                <div className="">
                  <a href="">
                    <div className="username text-sm font-bold">User Name</div>
                  </a>
                  <a href="">
                    <div className="userfield text-xs">Group Admin</div>
                  </a>
                  <a href="">
                    <div className="mutual-followers text-xs">
                      Friends Added in Group
                    </div>
                  </a>
                </div>
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
                        <Menu.Item className="flex gap-1">
                          <a href="">Remove From Admin</a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">Remove From Group</a>
                        </Menu.Item>
                        <Menu.Item className="flex gap-1 mt-2">
                          <a href="">Block From Group</a>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default GrooupAdmins;
