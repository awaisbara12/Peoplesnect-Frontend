import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CogIcon, SearchIcon } from '@heroicons/react/solid';
import ProfileLogo from "../../public/images/profile-avatar.png";
import { TrashIcon } from '@heroicons/react/outline';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ADMIN_SEARCH_USER_API, ADMIN_USER_API, CURENT_USER_LOGIN_API, SEARCH_MULTIPLE } from "../../pages/config"
import ClipLoader from 'react-spinners/ClipLoader';
import axios from "axios";
import { Popover, Transition } from '@headlessui/react';
import { DotsHorizontalIcon} from '@heroicons/react/outline';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpage1, setcurrentpage1] = useState(1);
  const [lastpage, setlastpage] = useState(0);
  const [search, setsearch] = useState(0);
  const [search1, setsearch1] = useState([]);


  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  const GetUsers = async()=>{      
    await fetch(ADMIN_USER_API+"?page=" + currentpage, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          const mergedata = [...users, ...result.data]
          setUsers(mergedata);
          setcurrentpage(result.pages.next_page)
          setlastpage(result.pages.total_pages)
        }
      })
      .catch((err) => console.log(err)); 
  }

  const searchuser = async()=>{      
    await fetch(ADMIN_USER_API+"?page=1", {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setUsers(result.data);
          setcurrentpage(result.pages.next_page);
          setlastpage(result.pages.total_pages);
        }
      })
      .catch((err) => console.log(err)); 
  }

  async function deteleUser(userId){
    var checks =confirm("Are you sure..?");
    if(checks){
      const res = await axios(ADMIN_USER_API + "/" + userId, {
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
        document.getElementById(`user-${userId}`).classList.add("hidden");
      }
    }
  }

  async function UpdateRole(userId, role){
    var checks =confirm("Are you sure..?");
    if(checks){
      const res = await axios(ADMIN_USER_API + "/role_update?id="+ userId +"&role=" + role, {
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
      if(result){
        if(result.data.role !="user"){
          // const currentuserSting = JSON.stringify(result.data.data);     // convert json into string
          // localStorage.setItem("currentuser", currentuserSting);    // save currentuser in localstorage as string      
          // console.log(result.data);
          document.getElementById(`user-${userId}`).classList.add("hidden");
        }
      }
    }
  }

  const fetchMoreData = async()=>{
    if(search == "0"){
      setcurrentpage1(1);
      await GetUsers();
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
      searchuser();
    }else{
      await fetch(ADMIN_USER_API+"/user_search"+"?query="+event, {
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
              searchuser();
            }else{
              setsearch(1);
              setUsers(result.data);
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
      searchuser();
    }else{
      await fetch(ADMIN_USER_API+"/user_search"+"?query="+event+"&page="+currentpage1, {
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
              searchuser();
            }else{
              setsearch(1);
              const mergedata = [...users, ...result.data]
              setUsers(mergedata);
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
    GetUsers();
  }, []);

  return (
    <>
      <div className="mt-8">
        <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="mt-8">
            <div>
              <div className="text-center">
                <div className="heading text-4xl font-semibold text-indigo-400">Users List</div>
                <div className="relative w-1/2 mx-auto mt-4">
                  <input
                    className="placeholder:text-md placeholder:text-indigo-500 pl-12  hover:shadow-lg bg-white placeholder:rounded-full  border-indigo-400 w-full rounded-full"
                    placeholder="Users Search"
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
                    dataLength={users.length}
                    next={fetchMoreData}
                    hasMore={currentpage != null }
                    loader={<div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                    className="grid grid-cols-2 gap-6"
                  >
                    {users && users.map((user)=>(
                      <div 
                        className="hover:shadow-2xl shadow-lg bg-white flex items-start justify-between rounded-xl p-2"
                        id={`user-${user.id}`}
                        key={user.id}>
                        <Link href={{pathname: "/User-Profile", query: user.id}}>
                          <a>
                            <div className="flex gap-2 items-start" >
                              {user && user.display_photo_url?(
                                <img
                                  src={user.display_photo_url}
                                  className="object-cover rounded-full h-[40px] w-[40px]"
                                  placeholder="empty"
                                  alt="profile-image"
                                />
                                ):( 
                                <Image
                                  src={ProfileLogo}
                                  className="object-cover rounded-xl"
                                  width={40}
                                  height={40}
                                  alt=""
                                />
                              )}
                              <div className="text-sm">
                                <div className="font-bold text-indigo-400">{user.first_name+" "+user.last_name}</div>
                                <div className="font-extralight">{user.city+", "+user.country}</div>
                                <div className="font-extralight">email: {user.email}</div>
                              </div>
                            </div>
                          </a>
                        </Link>
                        <div className="flex gap-1 y-2 ">
                        <Link href="">
                          <a>
                            <div className="">
                              <Popover className="absolute ">
                                {({ open }) => (
                                  <>
                                    <Popover.Button
                                      className={` ${open
                                        ? ""
                                        : "text-opacity-90 focus-visible:outline-none"
                                        }`}
                                    >
                                      <DotsHorizontalIcon className="h-5 w-5 text-indigo-400" />
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
                                      <Popover.Panel className="absolute left-3 z-50 mt-2 w-36 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-xl">
                                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                          <div className="relative bg-white py-2">
                                            <Link href="">
                                              <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                                <div className="flex text-gray-900 gap-2">
                                                  <button
                                                    key="Update"
                                                    onClick={() => UpdateRole(user.id, "marketplace_admin")}
                                                  >
                                                    <div className="">Marketplace Admin</div>
                                                  </button>
                                                </div>
                                              </a>
                                            </Link>
                                            <Link href="">
                                              <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                                <div className="flex text-gray-900 gap-2">
                                                  <button
                                                    key="Update"
                                                    onClick={() => UpdateRole(user.id, "job_admin")}
                                                  >
                                                    <div className="">Job Admin</div>
                                                  </button>
                                                </div>
                                              </a>
                                            </Link>
                                            <Link href="">
                                              <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                                <div className="flex text-gray-900 gap-2">
                                                  <button
                                                    key="Update"
                                                    onClick={() => UpdateRole(user.id, "job_marketplace_admin")}
                                                  >
                                                    <div className="">Job&Marketplace Admin</div>
                                                  </button>
                                                </div>
                                              </a>
                                            </Link>
                                          </div>
                                        </div>
                                      </Popover.Panel>
                                    </Transition>
                                  </>
                                )}
                              </Popover>
                            </div>
                          </a>
                        </Link>
                          <button
                            key="Delete"
                            onClick={() => deteleUser(user.id)}
                            className="ml-5"
                          >
                            <div className="">
                              <TrashIcon className="h-5 w-5 text-indigo-400" />
                            </div>
                          </button>
                        </div>
                      </div>
                    ))}
                  </InfiniteScroll>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default UsersList;