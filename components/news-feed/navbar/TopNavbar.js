import React, { Fragment, useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { signout } from "../../auth/signout/SignOut";
import NavbarLogo from "../../../public/images/logo-circle.png";
import ProfileLogo from "../../../public/images/profile-avatar.png";
import { Popover, Transition } from "@headlessui/react";
import Spinner from "../../common/Spinner";
import {
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  ChatAltIcon,
  BellIcon,
  NewspaperIcon,
} from "@heroicons/react/solid";
import {
  ChevronDownIcon,
} from "@heroicons/react/outline";
import TopNavbarSearch from "../search/TopNavbarSearch ";
import {CURENT_USER_LOGIN_API, GET_NOTIFICATIONS} from "../../../pages/config";
import { useRouter } from "next/router";


const TopNavbar = () => {
  const [count, setcount] = useState();
  const [userDetails,  setUserDetails] = useState();
  
  const router = useRouter();
  // Bareer Key
   if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore");}
   // for count notification
  const updateCount=async()=>{    
    await fetch(GET_NOTIFICATIONS+"/count_update", {
      method: "GET",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setcount(result.data);
          console.log("sdjdsad",result.data);
          // router.push("/notifications");
        }
      })
      .catch((err) => console.log(err)); 
  }

  const updateCounts=async()=>{    
    await fetch(GET_NOTIFICATIONS+"/count_updates", {
      method: "GET",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setcount(result.data);
          // router.push("/notifications");
        }
      })
      .catch((err) => console.log(err)); 
  }
  
  //  Current user
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
          setUserDetails(result.data);  
        }
      })
      .catch((err) => console.log(err)); 
  }
  useEffect(()=>{
    Current_User();
    updateCounts(); 
  },[])
  return (
    <div className="sticky top-0 z-50">
    <div className="w-[1100px] lg:w-auto hidden md:block lg:block">
      <div className="bg-white px-5 rounded-xl flex justify-between items-center py-1">
        <div className="flex gap-2">
          <div className="navbar-brand text-center">
            <Link href="/news-feed">
              <a>
                <Image
                  src={NavbarLogo}
                  width={45}
                  height={45}
                  placeholder="blur"
                  alt=""
                />
              </a>
            </Link>
          </div>
          <TopNavbarSearch />
        </div>
        <ul className="">
          <div className="flex items-center gap-4 lg:gap-6 md:gap-5">
            <Link href="/news-feed" className="">
              <a>
                <li className="flex font-normal text-xl items-center flex-col gap-1">
                  <HomeIcon className="h-5 w-5 text-indigo-400" />
                  <div className="text-sm md:text-xs">Home</div>
                </li>
              </a>
            </Link>
            <Link href="/jobs" className="">
              <a>
                <li className="flex font-normal text-xl items-center flex-col gap-1">
                  <BriefcaseIcon className="h-5 w-5 text-indigo-400" />
                  <div className="text-sm md:text-xs">Jobs</div>
                </li>
              </a>
            </Link>

            <Link href="/markeet-place" className="">
              <a>
                <li className="flex font-normal text-xl items-center flex-col gap-1">
                  <BriefcaseIcon className="h-5 w-5 text-indigo-400" />
                  <div className="text-sm md:text-xs">Marketplace</div>
                </li>
              </a>
            </Link>
            <Link href="/blog" className="">
              <a>
                <li className="flex font-normal text-xl items-center flex-col gap-1">
                  <NewspaperIcon className="h-5 w-5 text-indigo-400" />
                  <div className="text-sm md:text-xs">Articles</div>
                </li>
              </a>
            </Link>
            <Link href="/my-network" className="">
              <a>
                <li className="flex font-normal text-xl items-center flex-col gap-1">
                  <UsersIcon className="h-5 w-5 text-indigo-400" />
                  <div className="text-sm md:text-xs">My Network</div>
                </li>
              </a>
            </Link>
            <Link href="/messaging-design" className="">
              <a>
                <li className="flex font-normal text-xl items-center flex-col gap-1">
                  <ChatAltIcon className="h-5 w-5 text-indigo-400" />
                  <div className="text-sm md:text-xs">Messaging</div>
                </li>
              </a>
            </Link>
            <Link href="/notifications" className="">
              <a onClick={()=>updateCount()}>
                <li className="flex font-normal text-xl items-center flex-col gap-1">
                  <div className="relative">
                    <BellIcon className="h-5 w-5 text-indigo-400" />
                    {count && count!='0'?(
                    <div className="bg-red-400 h-3 w-3 text-white -top-1 left-3 rounded-full flex justify-center items-center absolute">
                     
                        <p className="text-[8px]">{count}</p>
                      
                      
                    </div>
                    ):('')

                  }
                  </div>
                  <div className="text-sm md:text-xs">Notifications</div>
                </li>
              </a>
            </Link>
            <div className="">
              <div className="">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={` ${
                          open
                            ? ""
                            : "text-opacity-90 focus-visible:outline-none"
                        }`}
                      >
                        <div className="">
                          {userDetails && userDetails.display_photo_url?( <img
                            src={ userDetails.display_photo_url}
                            width={30}
                            height={30}
                            placeholder="blur"
                            className="object-fit rounded-full w-[30px] h-[30px]"
                            alt=""
                          />):( <Image
                            src={ProfileLogo}
                            width={30}
                            height={30}
                            placeholder="blur"
                            className="object-fit rounded-full"
                            alt=""
                          />)
                          }
                         
                          <div className="flex gap-1 items-center">
                            <div className="text-sm md:text-xs">Me</div>
                            <ChevronDownIcon className="h-3 w-3 text-indigo-400" />
                          </div>
                        </div>
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
                        <Popover.Panel className="absolute left-1/2 z-50 mt-3 w-36 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-xl">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative bg-white py-2">
                              <Link href="/profile">
                              <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                <div className="flex text-gray-900 gap-2">
                                  <a href="">
                                    <div className="">My Profile</div>
                                  </a>
                                </div>
                              </a>
                              </Link>
                              <Link href="/settings">
                                <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                  <div className="flex text-gray-900 gap-2">
                                    <a href="">
                                      <div className="">Settings</div>
                                    </a>
                                  </div>
                                </a>
                              </Link>
                              <a className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                <div className="flex text-gray-900 gap-2">
                                  <div className="flex text-gray-900 gap-2">
                                    {signout ? (
                                      <a
                                        onClick={() => signout()}
                                        className="w-5 h-5 cursor-pointer"
                                      >
                                        <div className="">SignOut</div>
                                      </a>
                                    ) : (
                                      <Spinner />
                                    )}
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default TopNavbar;
