import React, { Fragment, useEffect, useState } from "react";
import { UPDATE_PERSONAL_INFO, CURENT_USER_LOGIN_API, GROUP_API, FOLLOW_USER_API, BLOCK_API, GET_CONNECTIONS } from "../../../pages/config";
import { Country, City } from 'country-state-city';
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import { SearchIcon } from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { current } from "@reduxjs/toolkit";
const Blocked = () => {
  const [User, setcurrentuser] = useState();
  const [member, setmember] = useState();
  const [userConnections, setUserConnections] = useState();
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }

  // UnBlock
  const UnBlock = (id,check) => {
    const res = fetch(BLOCK_API + "/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if(check && check=="connection"){
        User_Connections();
        }else{ShowBlocked();}
        
      })

  }
  // Get All Blocked Connection
  const User_Connections = async () => {
    await fetch(GET_CONNECTIONS + "/blocked", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setUserConnections(result.data)
        }
      })
      .catch((err) => console.log(err));
  }
  // Get All Blocked Follower/Following
  const ShowBlocked = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { Accept: "application/json", Authorization: `${authKey}` },
    };
    const response = await fetch(`${FOLLOW_USER_API}/blocked`, requestOptions);
    const data = await response.json();
    setmember(data.data);
  }
  //current User
  const Current_User = async () => {
    var c = window.localStorage.getItem("currentuser");
    var Details = JSON.parse(c);
    // await fetch(CURENT_USER_LOGIN_API, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `${authKey}`,
    //   },
    // })
    //   .then((resp) => resp.json())
    //   .then((result) => {
    //     if (result) {
          setcurrentuser(Details);
    //     }
    //   })
    //   .catch((err) => console.log(err));
  }

  useEffect(() => {
    Current_User();
    ShowBlocked();
    User_Connections();
  }, [])
  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[710px] md:w-[780px] px-5 md:px-0 lg:px-0 xl:px-0">
        <div className="bg-white rounded-xl mt-8">
          <div className="flex justify-between items-center border-b-1 p-4">
            <div className="heading">User Block List</div>
            {userConnections && userConnections.length && member && member.length ? (
              <div className="">{userConnections.length + member.length}</div>
            ) : (
              userConnections && userConnections.length ? (
                <div className="">{userConnections.length}</div>
              ) : (
                member && member.length ? (
                  <div className="">{member.length}</div>
                ) :
                  (
                    <div className="">0</div>
                  )
              )
            )
            }
          </div>

          {/* <div className="relative text-gray-500 flex justify-end mt-5 mr-5">
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
          </div> */}

          {/* Blocked Follower/Following */}
          <div className="border-b-1">
            {member ? (
              member.map((i) => {
                if (User && User.id != i.follower.follower.id) {
                  return (
                    <div className="request-profile flex  px-4 py-3 justify-between items-center" key={i.id}>
                      <div className="flex items-center gap-3">
                        {i.follower && i.follower.follower && i.follower.follower.display_photo_url ? (
                          <Link href={{ pathname: "/User-Profile", query: i.follower.follower.id, }}>
                            <a>
                              <img src={i.follower.follower.display_photo_url} className="object-cover rounded-full z-40 h-[40px] w-[40px]" alt="" />
                            </a>
                          </Link>
                        ) : (
                          <Link href={{ pathname: "/User-Profile", query: i.follower.follower.id, }}>
                            <a>
                              <Image src={ProfileAvatar} width={35} height={35} alt="" />
                            </a>
                          </Link>
                        )}
                        <div className="">
                          <Link href={{ pathname: "/User-Profile", query: i.follower.follower.id, }}>
                            <a>
                              <div className="username text-sm font-bold capitalize">{i.follower.follower.first_name} {i.follower.follower.last_name}</div>
                            </a>
                          </Link>
                          <Link href={{ pathname: "/User-Profile", query: i.follower.follower.id, }}>
                            <a>
                              <div className="mutual-followers text-xs capitalize">
                                {i.follower.follower.city}, {i.follower.follower.country}
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
                                    onClick={() => UnBlock(i.id, "")}
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
                  )
                } else {
                  return (
                    <div className="request-profile flex  px-4 py-3 justify-between items-center" key={i.id}>
                      <div className="flex items-center gap-3">
                        {i.follower && i.follower.followee && i.follower.followee.display_photo_url ? (
                          <Link href={{ pathname: "/User-Profile", query: i.follower.followee.id, }}>
                            <a>
                              <img src={i.follower.followee.display_photo_url} className="object-cover rounded-full z-40 h-[40px] w-[40px]" alt="" />
                            </a>
                          </Link>
                        ) : (
                          <Link href={{ pathname: "/User-Profile", query: i.follower.followee.id, }}>
                            <a>
                              <Image src={ProfileAvatar} width={35} height={35} alt="" />
                            </a>
                          </Link>
                        )}
                        <div className="">
                          <Link href={{ pathname: "/User-Profile", query: i.follower.followee.id, }}>
                            <a>
                              <div className="username text-sm font-bold capitalize">{i.follower.followee.first_name} {i.follower.followee.last_name}</div>
                            </a>
                          </Link>
                          <Link href={{ pathname: "/User-Profile", query: i.follower.followee.id, }}>
                            <a>
                              <div className="mutual-followers text-xs capitalize">
                                {i.follower.followee.city}, {i.follower.followee.country}
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
                                    onClick={() => UnBlock(i.id, "")}
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
                  )
                }
              })
            ) : ('')}

            {/* Blocked Connection */}
            {userConnections ? (
              userConnections.map((i) => {
                if (User && User.id != i.connection.receiver.id) {
                  return (
                    <div className="request-profile flex  px-4 py-3 justify-between items-center" key={i.id}>
                      <div className="flex items-center gap-3">
                        {i.connection && i.connection.receiver && i.connection.receiver.display_photo_url ? (
                          <Link href={{ pathname: "/User-Profile", query: i.connection.receiver.id, }}>
                            <a>
                              <img src={i.connection.receiver.display_photo_url} className="object-cover rounded-full z-40 h-[40px] w-[40px]" alt="" />
                            </a>
                          </Link>
                        ) : (
                          <Link href={{ pathname: "/User-Profile", query: i.connection.receiver.id, }}>
                            <a>
                              <Image src={ProfileAvatar} width={35} height={35} alt="" />
                            </a>
                          </Link>
                        )}
                        <div className="">
                          <Link href={{ pathname: "/User-Profile", query: i.connection.receiver.id, }}>
                            <a>
                              <div className="username text-sm font-bold capitalize">{i.connection.receiver.first_name} {i.connection.receiver.last_name}</div>
                            </a>
                          </Link>
                          <Link href={{ pathname: "/User-Profile", query: i.connection.receiver.id, }}>
                            <a>
                              <div className="mutual-followers text-xs capitalize">
                                {i.connection.receiver.city}, {i.connection.receiver.country}
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
                                    onClick={() => UnBlock(i.id, "connection")}
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
                  )
                } else {
                  return (
                    <div className="request-profile flex  px-4 py-3 justify-between items-center" key={i.id}>
                      <div className="flex items-center gap-3">
                        {i.connection && i.connection.sender && i.connection.sender.display_photo_url ? (
                          <Link href={{ pathname: "/User-Profile", query: i.connection.sender.id, }}>
                            <a>
                              <img src={i.connection.sender.display_photo_url} className="object-cover rounded-full z-40 h-[40px] w-[40px]" alt="" />
                            </a>
                          </Link>
                        ) : (
                          <Link href={{ pathname: "/User-Profile", query: i.connection.sender.id, }}>
                            <a>
                              <Image src={ProfileAvatar} width={35} height={35} alt="" />
                            </a>
                          </Link>
                        )}
                        <div className="">
                          <Link href={{ pathname: "/User-Profile", query: i.connection.sender.id, }}>
                            <a>
                              <div className="username text-sm font-bold capitalize">{i.connection.sender.first_name} {i.connection.sender.last_name}</div>
                            </a>
                          </Link>
                          <Link href={{ pathname: "/User-Profile", query: i.connection.sender.id, }}>
                            <a>
                              <div className="mutual-followers text-xs capitalize">
                                {i.connection.sender.city}, {i.connection.sender.country}
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
                                    onClick={() => UnBlock(i.id, "connection")}
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
                  )
                }
              }
              )
            ) : ('')}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Blocked;
