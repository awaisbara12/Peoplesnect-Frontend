import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import Cover from "../../public/images/main-banner.jpg";
import { XCircleIcon } from "@heroicons/react/solid";
import { GROUP_API, JOINED_GROUP_LISTS_API, JOIN_GROUP_API} from "../../pages/config";

const Groups = () => { 
  const [joingroups,setJoinGroups] = useState();
  const [joinedgroupslist,setJoinedGroupsLists] = useState();
  const [group, setgroup] = useState();
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  
  // join group function
  const GroupJoinFun =(ID)=>event=>{
    event.currentTarget.disabled = true;
    const res = fetch(JOIN_GROUP_API +"?id="+ID, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      SuggestedGroups();
    })
  }
  // Get Joined Group Lists
  const JoinedGroupList =()=>{
    const res = fetch(JOINED_GROUP_LISTS_API, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      setJoinedGroupsLists(result.data)
    })
  }

  const GetGroup =()=>{
    const res = fetch(GROUP_API +"/"+"admingroups" , {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      setgroup(result.data);
    })
  }


  const hideUser=async(id)=>
  {
    await fetch(GROUP_API+"?id="+id, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setJoinGroups(result.data)
        }
      })
      .catch((err) => console.log(err));
  }

  // suggested Group
  const SuggestedGroups =()=>{
    const res = fetch(GROUP_API+"?page="+1, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      setJoinGroups(result.data);
      console.log(result.data)
    })
    JoinedGroupList();
  }
  useEffect(() => {
    SuggestedGroups();
    GetGroup();
  },[])
  return (
    <div className="mt-8">
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        {/* My group Section  */}
        <div className="mt-8">
          <div className="bg-white rounded-xl p-4">
            <div className="justify-between flex items-center">
              <div className="heading font-semibold">My Groups</div>
              <Link href={{pathname: "group-page/show-all", query:"My",}}
               className="all-button">
                <a className="bg-indigo-400 text-white px-3 py-2 rounded-full">
                  Show Alls
                </a>
              </Link>
            </div>
            {/* My group map */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
              {group?(
                group.map((i)=>(
                  <div className="profile mt-10 border rounded-xl" key={i.id}>
                    <Link href={{pathname: "group-page/joind-group", query: i.id,}}>
                    <a>
                      <div className="relative cover">      
                        {/* Cover Photo */}
                        {i.cover_image_url?(
                        <img
                          src={i.cover_image_url}
                          className="object-cover rounded-t-xl h-[96px] w-[620px]"
                          alt=""
                        />
                        ):(
                          <Image
                            className="object-cover rounded-t-xl"
                            src={Cover}
                            width={620}
                            height={200}
                            alt=""
                          />
                        )}   
                        {/* Dp */}
                        {i.display_image_url?(
                          <div className="absolute -bottom-8 left-2">
                            <img
                              src={i.display_image_url}
                              className="object-cover rounded-full z-40 h-[70px] w-[70px]"
                                alt=""
                            />
                          </div>
                        ):(
                          <div className="absolute -bottom-8 left-2">
                          <Image
                            className="object-cover"
                            src={ProfileAvatar}
                            width={55}
                            height={55}
                            alt=""
                          />
                          </div>
                        )}

                      </div>
                    </a>
                    </Link>
                    <div className="Details px-4 ">
                      <Link href={{pathname: "group-page/joind-group", query: i.id,}}>
                      <a>
                        <div className="ml-16">
                          <div className="User-Name font-bold capitalize">{i.title.substring(0,25)}</div>
                        </div>
                        <div className="details mt-5 font-light">
                          {i.description.substring(0,30)}
                        </div> 
                        {i.group_members_count?(
                          <div className="followers mt-2 font-extralight">
                            {i.group_members_count} Members
                          </div>
                        ):(
                          <div className="followers mt-2 font-extralight">
                            0 Members
                          </div>
                        )}
                      </a>
                      </Link>
                     
                      {/* </a> */}
                      <div className="float-right">
                        <Link
                          href={{
                            pathname: "group-page/joind-group",
                            query: i.id,}}
                            >
                        <a>
                          <button className="px-2 bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                            Open Group
                          </button>
                        </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ):('')}
            </div>
          </div>
        </div>
        {/* Joined Group Section */}
        <div className="bg-white rounded-xl p-4 mt-8">
          
          <div className="justify-between flex items-center">
            <div className="heading font-semibold">Joined Groups</div>
            <Link href={{pathname: "group-page/show-all", query:"Joined",}}
             className="all-button">
              <a className="bg-indigo-400 text-white px-3 py-2 rounded-full">
                Show All
              </a>
            </Link>
          </div>
          {/* Show Joined Group */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
            {joinedgroupslist?(
              joinedgroupslist.map((i)=>(
                <div className="profile mt-10 border rounded-xl" key={i.id}>
                  <Link href={{pathname: "group-page/joind-group", query: i.id,}}>
                  <a>
                    <div className="relative cover">      
                      {/* Cover Photo */}
                      {i.cover_image_url?(
                        <img
                        src={i.cover_image_url}
                        className="object-cover rounded-t-xl h-[96px] w-[620px]"
                        alt=""
                        />
                      ):(
                        <Image
                          className="object-cover rounded-t-xl"
                          src={Cover}
                          width={620}
                          height={200}
                          alt=""
                        />
                      )}   
                      {/* Dp */}
                      {i.display_image_url?(
                          <div className="absolute -bottom-8 left-2">
                          <img
                            src={i.display_image_url}
                            className="object-cover rounded-full z-40 h-[70px] w-[70px]"
                              alt=""
                          />
                        </div>
                      ):(
                        <div className="absolute -bottom-8 left-2">
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={55}
                          height={55}
                          alt=""
                        />
                        </div>
                      )}
                    </div>
                    <div className="Details px-4 ">
                      <div className="ml-16">
                        <div className="User-Name font-bold capitalize">{i.title.substring(0,25)}</div>
                      </div>
                      <div className="details mt-5 font-light">
                        {i.description.substring(0,30)}
                      </div>
                      {i.group_members_count?(
                        <div className="followers mt-2 font-extralight">
                          {i.group_members_count} Members
                        </div>
                      ):(
                        <div className="followers mt-2 font-extralight">
                          0 Members
                        </div>
                      )}                     
                      
                      {/* <a href="group-page/suggest-group"> */}
                      <div className="float-right">
                        <Link
                          href={{
                            pathname: "group-page/joind-group",
                            query: i.id,}}
                            >
                        <a>
                          <button className="px-2 bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                            Open Group
                          </button>
                        </a>
                        </Link>
                      </div>
                      {/* </a> */}
                    </div>
                  </a>
                  </Link>
                </div>
              ))
            ):('')}
            
            {/* <div className="profile mt-10 border rounded-xl">
              <div className="relative cover">
                <Link href="group-page/joind-group">
                  <a>
                    <Image
                      className="object-cover rounded-t-xl"
                      src={Cover}
                      width={620}
                      height={200}
                      alt=""
                    />
                  </a>
                </Link>
                <div className="absolute -bottom-8 left-2">
                  <Link href="group-page/joind-group">
                    <a>
                      <Image
                        className="object-cover"
                        src={ProfileAvatar}
                        width={55}
                        height={55}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="absolute top-2 right-1">
                  <Link href="./">
                    <a>
                      <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="Details px-4 ">
                <div className="ml-16">
                  <div className="User-Name font-bold ">Group Name</div>
                </div>
                <div className="details mt-5 font-light">
                  Group Discription And All Details About Admins
                </div>
                <div className="followers mt-2 font-extralight">
                  25,964 Members
                </div>
                <div className="float-right">
                  <a href="group-page/joind-group">
                    <button className="px-2 bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      Open Group
                    </button>
                  </a>
                </div>
              </div>
            </div>
            */}
          </div>
        </div>
        {/* Suggested Group Section */}
        <div className="mt-8">
          <div className="bg-white rounded-xl p-4">
            <div className="justify-between flex items-center">
              <div className="heading font-semibold">Suggestions For You</div>
              <Link href={{pathname: "group-page/show-all", query:"Suggested",}}
              className="all-button">
                <a className="bg-indigo-400 text-white px-3 py-2 rounded-full">
                  Show All
                </a>
              </Link>
            </div>
            {/* Show Suggested Group */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
              {joingroups?(
                joingroups.map((i)=>(
                  <div className="profile mt-10 border rounded-xl" key={i.id}>
                    <Link href={{pathname: "group-page/suggest-group", query: i.id,}}>
                    <a>
                      <div className="relative cover">      
                        {/* Cover Photo */}
                        {i.cover_image_url?(
                        <img
                          src={i.cover_image_url}
                          className="object-cover rounded-t-xl h-[96px] w-[620px]"
                          alt=""
                        />
                        ):(
                          <Image
                            className="object-cover rounded-t-xl"
                            src={Cover}
                            width={620}
                            height={200}
                            alt=""
                          />
                        )}   
                        {/* Dp */}
                        {i.display_image_url?(
                          <div className="absolute -bottom-8 left-2">
                            <img
                              src={i.display_image_url}
                              className="object-cover rounded-full z-40 h-[70px] w-[70px]"
                                alt=""
                            />
                          </div>
                        ):(
                          <div className="absolute -bottom-8 left-2">
                          <Image
                            className="object-cover"
                            src={ProfileAvatar}
                            width={55}
                            height={55}
                            alt=""
                          />
                          </div>
                        )}
                        <div className="absolute top-2 right-1">
                          <Link href="">
                            <a>
                              <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" onClick={ () =>hideUser(i.id)}/>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </a>
                    </Link>
                    <div className="Details px-4 ">
                      <Link href={{pathname: "group-page/suggest-group", query: i.id,}}>
                      <a>
                        <div className="ml-16">
                          <div className="User-Name font-bold capitalize">{i.title.substring(0,25)}</div>
                        </div>
                        <div className="details mt-5 font-light">
                          {i.description.substring(0,30)}
                        </div> 
                        {i.group_members_count?(
                          <div className="followers mt-2 font-extralight">
                            {i.group_members_count} Members
                          </div>
                        ):(
                          <div className="followers mt-2 font-extralight">
                            0 Members
                          </div>
                        )}                     
                        {i.group_type=="private_group"?(
                          <div className="Group-type float-right my-2">
                            Group:{" "}
                            <span className="text-indigo-400 font-bold">Private</span>
                          </div>
                        ):('')}
                        {i.group_type=="public_group"?(
                          <div className="Group-type float-right my-2">
                            Group:{" "}
                            <span className="text-indigo-400 font-bold">Public</span>
                          </div>
                        ):('')}
                        {/* <a href="group-page/suggest-group"> */}
                      </a>
                      </Link>
                      <button 
                        className="w-full bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4"
                        onClick={GroupJoinFun(i.id)}>
                          Join Group
                      </button>
                      {/* </a> */}
                    </div>
                  </div>
                ))
              ):('')}
              
              {/* <div className="profile mt-10 border rounded-xl">
                <div className="relative cover">
                  <Link href="group-page/suggest-group">
                    <a>
                      <Image
                        className="object-cover rounded-t-xl"
                        src={Cover}
                        width={620}
                        height={200}
                        alt=""
                      />
                    </a>
                  </Link>
                  <div className="absolute -bottom-8 left-2">
                    <Link href="group-page/suggest-group">
                      <a>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={55}
                          height={55}
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="absolute top-2 right-1">
                    <Link href="./">
                      <a>
                        <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="Details px-4 ">
                  <a href="group-page/suggest-group">
                    <div className="ml-16">
                      <div className="User-Name font-bold ">Group Name</div>
                    </div>
                    <div className="details mt-5 font-light">
                      Group Discription And All Details About Admins
                    </div>
                  </a>
                  <div className="followers mt-2 font-extralight">
                    25,964 Members
                  </div>
                  <div className="Group-type float-right my-2">
                    Group:{" "}
                    <a href="">
                      <span className="text-indigo-400 font-bold">Private</span>
                    </a>
                  </div>
                  <a href="group-page/suggest-group">
                    <button className="w-full bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      Join Group
                    </button>
                  </a>
                </div>
              </div>
              */}
            </div>
          </div>
        </div>
    </div>
    </div>
  );
};

export default Groups;
