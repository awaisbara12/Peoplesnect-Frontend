import React, { useEffect, useState } from "react";
import { Fragment } from "react";

import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import { Menu, Transition } from "@headlessui/react";
import {
  DotsCircleHorizontalIcon,
  SearchCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { BLOCK_API, GROUP_API, GROUP_MEMBERS_API, PAGES_API } from "../../../../pages/config";
import { useRouter } from "next/router";

const PageMembers = () => {
  const [member,setmember] = useState();
  const [count,setcount] = useState();
  const [admincount,setadmincount] = useState();  //admins count
  const [admins,setadmins] = useState();          // all Admins Details
  const [admin,setadmin] = useState();            // Creater
  

  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore");}
  // Get Pages Block Member
  const GetBlockMember =()=>{
    fetch(PAGES_API +"/blocked?id="+myArray[1] , {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if(result.data){
        console.log("Block ",result.data)
        setmember(result.data);
        setcount(result.data.length)
      }
    })
  }
  // UnBlock
  const UnBlock =(id)=>{
    const res = fetch(BLOCK_API+"/"+id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      GetBlockMember();
    })
    
  }
  useEffect(() => {
    GetBlockMember();
  },[])
  return (
    <div className="mt-8">
    <div className="w-[600px] xl:w-[980px] lg:w-[710px] md:w-[780px] px-5 md:px-0 lg:px-0 xl:px-0">
        <div className="bg-white rounded-xl mt-8">
          <div className="flex justify-between items-center border-b-1 p-4">
            <div className="heading">Block Members</div>
            {count?(
              <div className="">{count}</div>  
            ):(
              <div className="">0</div>
            )}
          </div>
          <div className="relative text-gray-500 flex justify-end mt-5 mr-5">
            <input
              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-48 xs:w-auto placeholder:pl-2 rounded-full placeholder:py-2"
              placeholder="Search by Name"
              type="text"
              name="search"
            />
            <Link href="">
              <a>
                <SearchIcon className="w-5 h-5 absolute top-3 right-3" />
              </a>
            </Link>
          </div>
          {/* Page Member/Likers */}
          <div className="border-b-1">
            {member?(
              member.map((i)=>{
                return(
                <div className="request-profile flex  px-4 py-3 justify-between items-center" key={i.id}>
                  <div className="flex items-center gap-3">
                    {i.page_member &&i.page_member.user && i.page_member.user.display_photo_url?(
                      <Link href={{pathname: "/User-Profile", query:i.page_member.user.id,}}>
                      <a>
                        <img src={i.page_member.user.display_photo_url} className="object-cover rounded-full z-40 h-[40px] w-[40px]" alt="" />
                      </a>
                    </Link>
                    ):(
                      <Link href={{pathname: "/User-Profile", query:i.page_member.user.id,}}>
                        <a>
                          <Image src={ProfileAvatar} width={35} height={35} alt="" />
                        </a>
                      </Link>
                    )}
                    <div className="">
                      <Link href={{pathname: "/User-Profile", query:i.page_member.user.id,}}>
                      <a>
                        <div className="username text-sm font-bold capitalize">{i.page_member.user.first_name} {i.page_member.user.last_name}</div>
                      </a>
                      </Link>
                      <Link href={{pathname: "/User-Profile", query:i.page_member.user.id,}}>
                      <a>
                        <div className="mutual-followers text-xs capitalize">
                           {i.page_member.member_types=="members"?"member":i.page_member.member_types}
                        </div>
                      </a>
                      </Link>
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
                            <Menu.Item className="flex gap-1 -mt-2">
                              <a 
                              onClick={()=>UnBlock(i.id)}
                              >
                                UnBlock Member
                              </a>
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              )})
            ):('')}
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default PageMembers;
