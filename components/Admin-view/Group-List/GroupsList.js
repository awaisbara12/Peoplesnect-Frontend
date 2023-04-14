import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CogIcon, SearchIcon } from '@heroicons/react/solid';
import ProfileLogo from "../../../public/images/main-banners.jpg";
import { EyeIcon, TrashIcon } from '@heroicons/react/outline';
import { ADMIN_GROUP_API, CURENT_USER_LOGIN_API } from "../../../pages/config";
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from "axios";
import Router from "next/router";

const GroupsList =()=> {
  const [groups, setGroups] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpage1, setcurrentpage1] = useState(1);
  const [lastpage, setlastpage] = useState(0);
  const [search, setsearch] = useState(0);
  const [search1, setsearch1] = useState([]);

  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }

  const GetGroups = async()=>{      
    await fetch(ADMIN_GROUP_API+"?page=" + currentpage, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        const mergedata = [...groups, ...result.data]
        setGroups(mergedata);
        setcurrentpage(result.pages.next_page)
        setlastpage(result.pages.total_pages)
      }
    })
    .catch((err) => console.log(err));
  }

  const searchgroup = async()=>{      
    await fetch(ADMIN_GROUP_API+"?page=1", {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        setGroups(result.data);
        setcurrentpage(result.pages.next_page);
        setlastpage(result.pages.total_pages);
      }
    })
    .catch((err) => console.log(err)); 
  }

  async function deteleGroup(groupId){
    var checks =confirm("Are you sure..?");
    if(checks){
      const res = await axios(ADMIN_GROUP_API + "/" + groupId, {
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
      if(result){
        document.getElementById(`group-${groupId}`).classList.add("hidden");
      }
    }
  }

  const fetchMoreData = async()=>{
    if(search == "0"){
      setcurrentpage1(1);
      await GetGroups();
    }else{
      await searchmultiples2(search1);
    }
  }

  const handlechange = (event)=>{
    if( event.target.value !==undefined){
      setsearch1(event.target.value);
      searchmultiples(event.target.value);
    }
  }

  const searchmultiples  = async(event) =>{
    if (!event?.length>0){
      setcurrentpage(1);
      setcurrentpage1(1);
      setsearch(0);
      searchgroup();
    }else{
      await fetch(ADMIN_GROUP_API+"/group_search"+"?query="+event, {
        method: "GET",
         headers: {
          Accept: "application/json", 
           Authorization: `${authKey}`,
         },
      })
         .then((resp) => resp.json())
        .then(async (result) => {
          if (result) {
            if (!event){
              setsearch(0);
              searchgroup();
            }else{
              setsearch(1);
              setGroups(result.data);
              setcurrentpage(result.pages.next_page);
              setcurrentpage1(result.pages.next_page);
              setlastpage(result.pages.total_pages);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }

  const searchmultiples2  = async(event) =>{
    if (!event?.length>0){
      setcurrentpage(1);
      setcurrentpage1(1);
      setsearch(0);
      searchgroup();
    }else{
      await fetch(ADMIN_GROUP_API+"/group_search"+"?query="+event+"&page="+currentpage1, {
        method: "GET",
         headers: {
          Accept: "application/json", 
           Authorization: `${authKey}`,
         },
      })
         .then((resp) => resp.json())
        .then(async (result) => {
          if (result) {
            if (!event){
              setsearch(0);
              searchgroup();
            }else{
              setsearch(1);
              const mergedata = [...groups, ...result.data]
              setGroups(mergedata);
              setcurrentpage(result.pages.next_page);
              setcurrentpage1(result.pages.next_page);
              setlastpage(result.pages.total_pages);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    GetGroups();
  }, []);
  
  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="mt-8">
          <div>
            <div className="text-center">
              <div className="heading text-4xl font-semibold text-indigo-400">Groups List</div>
              <div className="relative w-1/2 mx-auto mt-4">
                <input
                  className="placeholder:text-md placeholder:text-indigo-500 pl-12  hover:shadow-lg bg-white placeholder:rounded-full  border-indigo-400 w-full rounded-full"
                  placeholder="Search Group Name"
                  type="text"
                  name="search"
                  onChange={handlechange}
                  onScroll={handlechange}
                />
                <div className="absolute top-3 left-6">
                  <SearchIcon className="h-5 w-5 text-indigo-400" />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="">
                <InfiniteScroll
                  dataLength={groups.length}
                  next={fetchMoreData}
                  hasMore={currentpage != null }
                  loader={<div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                  className="grid grid-cols-2 gap-6"
                >
                  {groups && groups.map((group)=>(
                    <div 
                      className="hover:shadow-2xl shadow-lg bg-white flex items-center justify-between rounded-xl p-2"
                      id={`group-${group.id}`}
                      key={group.id}>
                      <Link href={{pathname: "/group-page/joind-group", query: group.id}}>
                        <a>
                          <div className="flex gap-2 items-center">
                            {group && group.display_image_url?(
                                <img
                                  src={group.display_image_url}
                                  className="object-cover rounded-full h-[40px] w-[40px]"
                                  placeholder="empty"
                                  alt="profile-image"
                                />
                                ):( 
                                <Image
                                  src={ProfileLogo}
                                  width={40}
                                  height={40}
                                  placeholder="blur"
                                  className="object-fit rounded-full"
                                  alt=""
                                />
                              )}
                            <div className="text-sm">
                              <div className="font-bold text-indigo-400">{group.title}</div>
                              <div className="font-extralight">Created by <b className="font-bold text-indigo-400">{group.owner.first_name+" "+group.owner.last_name}</b></div>
                            </div>
                          </div>
                        </a>
                      </Link>
                      <div className="flex gap-1">
                        <Link href={{pathname: "/group-page/joind-group", query: group.id}}>
                          <a>
                            <EyeIcon className="h-5 w-5 text-indigo-400" />
                          </a>
                        </Link>
                        <button
                          key="Delete"
                          onClick={() => deteleGroup(group.id)}
                        >
                          <TrashIcon className="h-5 w-5 text-indigo-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            </div>
            {/* <div className="mt-8 text-center">
              <Button className="border-indigo-400 border text-indigo-400 rounded-full">Show More </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupsList;