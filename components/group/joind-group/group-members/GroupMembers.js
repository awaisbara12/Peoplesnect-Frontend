import React, { useEffect, useState } from "react";
import { Fragment } from "react";

import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import postimage1 from "../../../../public/images/752126.jpg";
import { Menu, Transition } from "@headlessui/react";
import {
  DotsCircleHorizontalIcon,
  SearchCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { GROUP_API, GROUP_MEMBERS_API } from "../../../../pages/config";

const GroupMembers = () => {
  const [member,setmember] = useState();
  const [group,setgroup] = useState();
  const [count,setcount] = useState();           //member count
  const [admincount,setadmincount] = useState(); //admins count
  const [admins,setadmins] = useState();         // all Admins Details
  const [admin,setadmin] = useState();           // Creater
  // group_details
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore");}
  //  Remover Member From Group
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
      GetMember();
     alert("Member has been Removed")
    })
  } 
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
      setadmin(result.data);
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
      setadmins(result.data);
      if(result.data){
        setadmincount(result.data.length)
        }
    })
  }
  // Get Group's Member
   const GetMember =()=>{
    fetch(GROUP_MEMBERS_API +"?group_id="+myArray[1] , {
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
      setcount(result.data.length)}
    })
  }
  useEffect(() => {
    GetMember();
    GetCreater();
    GetAdmins();
  },[])
  return (
    <div className="mt-8">
        <div className="image">
          {/* Cover Photo */}
          {admin?(
            admin.cover_image_url?(
              <img
                src={admin.cover_image_url}
                className="object-cover rounded-xl h-[350px] w-[980px]"
                alt=""
              />
            ):(
              <Image
              src={postimage1}
              className="object-cover rounded-xl"
              width={980}
              height={400}
              alt=""
            />
            )
          )
          :(<Image
              src={postimage1}
              className="object-cover rounded-xl"
              width={980}
              height={450}
              alt=""
            />
          )}
        </div>
        <div className="absolute  p-2 -mt-16 ml-14  rounded-full bg-white">
          <div className="relative">
            {/* For dp */}
            {admin && admin.display_image_url?(
            <img
              src={admin.display_image_url}
              className="object-cover rounded-full z-40 h-[100px] w-[100px]"
              alt=""
            /> 
            ):(
            <Image
              src={ProfileAvatar}
              className="object-cover rounded-full z-40"
              width={96}
              height={96}
              alt=""
            />
            )}
          </div>
        </div>
        <div className="w-[600px] xl:w-[980px] lg:w-[710px] md:w-[780px] px-5 md:px-0 lg:px-0 xl:px-0 mt-14">
          <div className="bg-white rounded-xl mt-8">
            <div className="flex justify-between items-center border-b-1 p-4">
              <div className="heading">Group Members</div>
              {count?(
                <div className="">{count+admincount+1}</div>  
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
            <div className="border-b-1">
              {/* For Creater */}
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
                              <Image src={ProfileAvatar} width={40} height={40} alt="" />
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
              {/* For Admin lists */}
              {admins?(
                admins.map((i)=>{
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
                            <Image src={ProfileAvatar} width={40} height={40} alt="" />
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
                      </div>
                    </div>
                  </div>
                )})
              ):('')}
              {/* For Member lists */}
              {member?(
                member.map((i)=>(
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
                            <Image src={ProfileAvatar} width={40} height={40} alt="" />
                          </a>
                        </Link>
                      )}
                      <div className="py-2">
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
                          <div className="mutual-followers text-xs capitalize">
                            {i.member_type}
                          </div>
                        </a>
                        </Link> */}
                      </div>
                    </div>
                  </div>
                ))
              ):('')}
              
            </div>
          </div>
        </div>
    </div>
  );
};

export default GroupMembers;
