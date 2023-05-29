import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import {
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  ChatAltIcon,
  BellIcon,
  LibraryIcon,
  UserGroupIcon,
  UserAddIcon,
  BookmarkIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
} from "@heroicons/react/solid";
import { CONVERSATION_API, CURENT_USER_LOGIN_API, GET_NOTIFICATIONS,WS_PUBLIC_API } from "../../../pages/config";

const MobileBottomBar = () => {
  const [count, setcount] = useState();
  const [userDetails, setUserDetails] = useState();
  const [Conversation, setConversation] = useState();
  const router = useRouter();
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }
  // for count notification (on-click)
  const updateCount = async () => {
    await fetch(GET_NOTIFICATIONS + "/count_update", {
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
          console.log("sdjdsad", result.data);
          // router.push("/notifications");
        }
      })
      .catch((err) => console.log(err));
  }
  // by-Default
  const updateCounts = async () => {
    await fetch(GET_NOTIFICATIONS + "/count_updates", {
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
  // ActionCable
  function createConversationAlertSub(CableApp , c_id) {
    CableApp.subscriptions.create(
      {
        channel: 'AlertChannel',
        id: c_id,
      },
      {
        connected: () => console.log('alert connected'),
        disconnected: () => console.log('alert disconnected'),
        received: data => {  console.log('alert received');GetConversation();
         },
      } 
    );
  }
  // converstion Alert
  const GetConversation=async()=>{     
    await fetch(CONVERSATION_API+"/conversation_alert", {
      method: "GET",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result && result.data) {
          setConversation(result.data);
          console.log(result.data);
        }
      })
      .catch((err) => console.log(err)); 
  }
  //  Current user
  const Current_User = async (CableApp) => {
    await fetch(CURENT_USER_LOGIN_API, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result && result.data &&  result.data.id) {
          setUserDetails(result.data);
          createConversationAlertSub(CableApp, result.data.id)
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    // Current_User();
    let actionCable;
    if (typeof window !== 'undefined') {
      actionCable = require('actioncable');
      const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
      Current_User(CableApp);
    }
    const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
    Current_User(CableApp);
    GetConversation();
    updateCounts();
  }, [])
  return (
    <div className="fixed bottom-0 block lg:hidden md:hidden bg-white w-full rounded-t-2xl">
      <div className="h-14 px-4 flex justify-between items-center">
        <div className="">
          <Link href="/news-feed">
            <a className="flex flex-col items-center">
              <HomeIcon className="text-gray-900 h-7 w-7" />
              <div className="">Home</div>
            </a>
          </Link>
        </div>
        <div className="">
          <Link href="/blog">
            <a className="flex flex-col items-center">
              <LibraryIcon className="h-7 w-7" />
              <div className="">Articles</div>
            </a>
          </Link>
        </div>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex flex-col items-center">
              <BriefcaseIcon className="h-7 w-7" aria-hidden="true" />
              <div className="">Jobs</div>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute -top-24 w-96 -left-36 bg-white border-2 border-indigo-400 rounded-full py-3 px-4 text-indigo-400">
              <div className="flex justify-between items-center">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/jobs/saved-jobs" className="">
                      <a>
                        <div className="flex flex-col items-center">
                          <BookmarkIcon className="h-7 w-7" />
                          <div className="">Saved Jobs</div>
                        </div>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/jobs/applied-jobs" className="">
                      <a>
                        <div className="flex flex-col items-center">
                          <ShieldCheckIcon className="h-7 w-7" />
                          <div className="">Applied Jobs</div>
                        </div>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/jobs/posted-jobs" className="">
                      <a>
                        <div className="flex flex-col items-center">
                          <AcademicCapIcon className="h-7 w-7" />
                          <div className="">Posted Jobs</div>
                        </div>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex flex-col items-center">
              <UsersIcon className="h-7 w-7" aria-hidden="true" />
              <div className="">My Network</div>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute -top-24 w-96 -left-36 bg-white border-2 border-indigo-400 rounded-full p-3 text-indigo-400">
              <div className="flex gap-3 justify-between items-center">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/my-network/Peending-Request" className="">
                      <a>
                        <div className="flex flex-col items-center">
                          <UserAddIcon className="h-7 w-7" />
                          <div className="">Pending Requests</div>
                        </div>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/my-network" className="">
                      <a>
                        <div className="flex flex-col items-center">
                          <UserGroupIcon className="h-7 w-7" />
                          <div className="">Connections</div>
                        </div>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/my-network/Followings" className="">
                      <a>
                        <div className="flex flex-col items-center">
                          <UsersIcon className="h-7 w-7" />
                          <div className="">Followings</div>
                        </div>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="">
          <Link href="/messaging-design" className="">
            <a className="flex flex-col items-center">
              <div className="relative">
                <ChatAltIcon className="h-7 w-7" />
                {Conversation && Conversation== 'true' ? (
                  <div className="bg-red-400 h-3 w-3 text-white -top-1 left-3 rounded-full flex justify-center items-center absolute">
                  </div>
                ) : ('')
                }
                <div className="text-sm md:text-xs">chat</div>
              </div>
            </a>
          </Link>
        </div>
        <div className="">
          <Link href="/notifications" className="">
            <a onClick={() => updateCount()} className="flex flex-col items-center" >
              <div className="relative">
                <BellIcon className="h-7 w-7" />
                {count && count != '0' ? (
                  <div className="bg-red-400 h-4 w-4 text-white -top-1 left-3 rounded-full flex justify-center items-center absolute">
                    <p className="text-[8px]">{count}</p>
                  </div>
                ) : ('')}
              </div>
              <div className="text-sm md:text-xs">Notifications</div>
            </a>
          </Link>
        </div>
       
      </div>
    </div>
  );
};

export default MobileBottomBar;
