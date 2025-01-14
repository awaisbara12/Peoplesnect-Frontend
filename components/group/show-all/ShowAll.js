import { XCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GROUP_API, JOINED_GROUP_LISTS_API, JOIN_GROUP_API } from "../../../pages/config";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';

const ShowAll = () => { 
  const [joingroups,setJoinGroups] = useState([]);
  const [joinedgroupslist,setJoinedGroupsLists] = useState([]);
  const [group, setgroup] = useState([]);
  const [type, setType] = useState();
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpagemy, setcurrentpagemy] = useState(1);
  
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
 
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
  // Cross Group from suggested
  const hideUser=async(id)=>{
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
  // Get My-Group
  const GetGroup =()=>{
    const res = fetch(GROUP_API +"/"+"admingroups?page="+currentpagemy , {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      // setgroup(result.data);
      const mergedata = [...group, ...result.data]
      setgroup(mergedata)
      setcurrentpagemy(result.pages.next_page)
    })
  }
  // Get Joined Group Lists
  const JoinedGroupList =()=>{
    const res = fetch(JOINED_GROUP_LISTS_API+"?page="+currentpage, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      // setJoinedGroupsLists(result.data)
      const mergedata = [...joinedgroupslist, ...result.data]
      setJoinedGroupsLists(mergedata)
      setcurrentpage(result.pages.next_page)
    })
  }
  // suggested Group
  const SuggestedGroups =()=>{
    const res = fetch(GROUP_API+"?page="+currentpage, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      const mergedata = [...joingroups, ...result.data]
      setJoinGroups(mergedata)
      setcurrentpage(result.pages.next_page)
    })
    // JoinedGroupList();
  }
  //  Confirm which function Is Run
  const confirms=()=>{
    if (myArray){
      if(myArray[1]=="My")GetGroup();
      else if(myArray[1]=="Joined")JoinedGroupList();
      else if(myArray[1]=="Suggested")SuggestedGroups(); 
      setType(myArray[1]);
    }
  }
  useEffect(() => {
    confirms();
  },[])


  const fetchMoreData = () => {
    SuggestedGroups();
  }
  const fetchMoreMyData = () => {
    GetGroup();
  }
  const fetchMoreJoinData = () => {
    JoinedGroupList();
  }

  return (
    <div className="mt-8">
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        {/* My group Section  */}
        {type=="My"?(
          <div className="mt-8">
            <div className=" rounded-xl p-4">
              <div className="justify-between flex items-center">
                <div className="heading font-semibold">My Groups</div>
              </div>
              {/* My group map */}
              {/* <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2"> */}
                {group?(
                  <InfiniteScroll
                    dataLength={joingroups.length}
                    next={fetchMoreMyData}
                    className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2"
                    hasMore={currentpagemy != null}
                    loader={<div className="flex justify-center "><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                  >
                  {group.map((i)=>(
                    <div className="bg-white profile mt-10 border rounded-xl" key={i.id}>
                      <Link href={{pathname: "joind-group", query: i.id,}}>
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
                              src={ProfileAvatar}
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
                        <Link href={{pathname: "joind-group", query: i.id,}}>
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
                              pathname: "joind-group",
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
                  ))}
                  </InfiniteScroll>):('')}
              {/* </div> */}
            </div>
          </div>
         ):('')}
        {/* Joined Group Section */}
        {type=="Joined"?(
          <div className=" rounded-xl p-4 mt-8">
            <div className="justify-between flex items-center">
              <div className="heading font-semibold">Joined Groups</div>
            </div>
            {/* Show Joined Group */}
            {/* <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2"> */}
              {joinedgroupslist?(
                <InfiniteScroll
                  dataLength={joingroups.length}
                  next={fetchMoreJoinData}
                  className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2"
                  hasMore={currentpage != null}
                  loader={<div className="flex justify-center "><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                >
                {joinedgroupslist.map((i)=>(
                  <div className="profile bg-white mt-10 border rounded-xl" key={i.id}>
                    <Link href={{pathname: "joind-group", query: i.id,}}>
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
                              pathname: "joind-group",
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
                ))}
              </InfiniteScroll>):('')}
            {/* </div> */}
          </div>
        ):('')}
        {/* Suggested Group Section */}
        {type=="Suggested"?(
          <div className="mt-8">
            <div className=" rounded-xl p-4">
              <div className="justify-between flex items-center">
                <div className="heading font-semibold">Suggestions For You</div>
              </div>
              {/* Show Suggested Group */}
              {/* <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2"> */}
                {joingroups?(
                  <InfiniteScroll
                      dataLength={joingroups.length}
                      next={fetchMoreData}
                      className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2"
                      hasMore={currentpage != null}
                      loader={<div className="flex justify-center "><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                    >
                    {joingroups.map((i)=>(
                        <div className=" bg-white profile mt-10 border rounded-xl" key={i.id}>
                          <Link href={{pathname: "/group-page/joind-group", query: i.id,}}>
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
                            <Link href={{pathname: "/group-page/joind-group", query: i.id,}}>
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
                      ))}
                  </InfiniteScroll>):('')}
              {/* </div> */}
            </div>
          </div>
       ):('')}
    </div>
    </div>
  );
};

export default ShowAll;
