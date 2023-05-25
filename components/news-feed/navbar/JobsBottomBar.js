import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";
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
import { PlusSmIcon, XIcon } from "@heroicons/react/outline";
import ApplyJob from "../../jobs/ApplyJob";
import { CONVERSATION_API, CURENT_USER_LOGIN_API, GET_NOTIFICATIONS,WS_PUBLIC_API } from "../../../pages/config";

const JobsBottomBar = (singleItem) => {
  const [jobpost] = useState();
  let [isOpen, setIsOpen] = useState(false);
  let [isOpen1, setIsOpen1] = useState(false);
  let [isOpen2, setIsOpen2] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeModal1() {
    setIsOpen1(false);
  }
  function openModal1() {
    setIsOpen1(true);
  }
  function closeModal2() {
    setIsOpen2(false);
  }
  function openModal2() {
    setIsOpen2(true);
  }
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
//**********/ Modals **********//
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
                    <Link href="/jobs" className="">
                      <a>
                        <div className="flex flex-col items-center">
                          <BookmarkIcon className="h-7 w-7" />
                          <div className="">My Jobs</div>
                        </div>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/jobs" className="">
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
                    <Link href="/jobs" className="">
                      <a>
                        <div className="flex flex-col items-center">
                          <AcademicCapIcon className="h-7 w-7" />
                          <div className="">Find Jobs</div>
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
                <ChatAltIcon className="h-5 w-7" />
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
        <div className="">
          <Link href="/jobs">
            <a className="flex flex-col items-center">
              <PlusSmIcon className="h-7 w-7" />
              <button
            onClick={openModal}
            type="submit"
            className=""
          >
            Add Job
          </button>
            </a>
          </Link>
          <div className="">
            <div className="">
              <Transition appear show={isOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-50"
                    static={true}
                    onClose={closeModal}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-15" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-[570px] bg-white rounded-xl xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all">
                            <div className="flex justify-end items-center mx-4">
                              <XIcon
                                onClick={closeModal}
                                className="w-5 h-5 cursor-pointer"
                              />
                            </div>
                            <div>
                            <div className="w-full flex flex-row items-center justify-center px-24 py-6">
                              <div className="stepper-item w-8 h-8 font-medium border-2 rounded-full bg-indigo-400 text-white flex justify-center items-center">
                                <a href="">1</a>
                              </div>
                              <div className="flex-auto border-t-2"></div>
                              <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full flex justify-center items-center">
                                2
                              </div>
                              <div className="flex-auto border-t-2"></div>
                              <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full flex justify-center items-center">
                                3
                              </div>
                            </div>
                          </div>
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900 px-8"
                              >
                                Add New Job
                              </Dialog.Title>
                              <div className="">
                                <div className="bg-white px-12 py-5 rounded-xl">
                                  <form className="w-full">
                                      <div className="">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-first-name">
                                          Job Title
                                        </label>
                                        <input className="appearance-none block w-full bg-zinc-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Job Title"/>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4 mt-8">
                                      <div className="">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-last-name">
                                          Company Name
                                        </label>
                                        <input className="appearance-none block w-full bg-zinc-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Company Name"/>
                                      </div>
                                      <div className="">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-state">
                                          Workplace Type
                                        </label>
                                        <div className="relative">
                                          <select className="block appearance-none w-full bg-zinc-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                            <option>Hybrid</option>
                                            <option>On Site</option>
                                            <option>Remote</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-8">
                                      <div className="">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-last-name">
                                          Job Location
                                        </label>
                                        <input className="appearance-none block w-full bg-zinc-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Job Location"/>
                                      </div>
                                      <div className="">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-state">
                                          Employment Type
                                        </label>
                                        <div className="relative">
                                          <select className="block appearance-none w-full bg-zinc-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                            <option>Internship</option>
                                            <option>Temporary</option>
                                            <option>Full Time</option>
                                            <option>Part Time</option>
                                            <option>Contract</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                  <div className="flex justify-end">
                                  <Link href="">
                                  <button
                                        onClick={openModal1}
                                        type="submit"
                                        className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                      >
                                        Next
                                  </button>
                                  </Link>
                                  <Transition appear show={isOpen1} as={Fragment}>
                                    <Dialog
                                      as="div"
                                      className="relative z-50"
                                      static={true}
                                      onClose={closeModal1}
                                    >
                                      <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                      >
                                        <div className="fixed inset-0 bg-black bg-opacity-15" />
                                      </Transition.Child>

                                      <div className="fixed inset-0 overflow-y-auto">
                                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                                          <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                          >
                                            <Dialog.Panel className="w-[570px] bg-white rounded-xl xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all">
                                            <div className="flex justify-end items-center mx-4">
                                            <XIcon
                                              onClick={closeModal1}
                                              className="w-5 h-5 cursor-pointer"
                                            />
                                            </div>
                                            <div>
                                              <div className="w-full flex flex-row items-center justify-center px-24 py-6">
                                                <div className="stepper-item w-8 h-8 font-medium border-2 rounded-full bg-indigo-400 text-white  flex justify-center items-center">
                                                  <button
                                                  onClick={closeModal1}
                                                  >1</button>
                                                </div>
                                                <div className="flex-auto border-t-2 border-indigo-400"></div>
                                                <div className="stepper-item w-8 h-8 text-center font-medium border-2  bg-indigo-400 text-white  rounded-full flex justify-center items-center">
                                                  2
                                                </div>
                                                <div className="flex-auto border-t-2"></div>
                                                <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full flex justify-center items-center">
                                                  3
                                                </div>
                                              </div>
                                            </div>
                                            <Dialog.Title
                                              as="h3"
                                              className="text-lg font-medium leading-6 text-gray-900 px-8"
                                            >
                                              Step Two
                                            </Dialog.Title>
                                            <div className="w-[570px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                                              <div className="mt-8 bg-white px-12 py-5 rounded-xl">
                                                <form className="w-full">
                                                    <div className="">
                                                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-first-name">
                                                        Add a Description
                                                      </label>
                                                      <textarea
                                                        rows={5}
                                                        cols={80}
                                                        className="appearance-none block w-full bg-zinc-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                      />
                                                      </div>
                                                      <div className="mt-8">
                                                        <ApplyJob />
                                                      </div>
                                                </form>
                                                <div className="flex gap-4 justify-end">

                                                <button
                                                  onClick={closeModal1}
                                                      type="submit"
                                                      className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                                    >
                                                      Back
                                                </button>
                                                <button
                                                      onClick={openModal2}
                                                      type="submit"
                                                      className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                                    >
                                                      Next
                                                </button>
                                                <Transition appear show={isOpen2} as={Fragment}>
                                                  <Dialog
                                                    as="div"
                                                    className="relative z-50"
                                                    static={true}
                                                    onClose={closeModal2}
                                                  >
                                                <Transition.Child
                                                  as={Fragment}
                                                  enter="ease-out duration-300"
                                                  enterFrom="opacity-0"
                                                  enterTo="opacity-100"
                                                  leave="ease-in duration-200"
                                                  leaveFrom="opacity-100"
                                                  leaveTo="opacity-0"
                                                >
                                                  <div className="fixed inset-0 bg-black bg-opacity-15" />
                                                </Transition.Child>

                                                <div className="fixed inset-0 overflow-y-auto">
                                                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                                                    <Transition.Child
                                                      as={Fragment}
                                                      enter="ease-out duration-300"
                                                      enterFrom="opacity-0 scale-95"
                                                      enterTo="opacity-100 scale-100"
                                                      leave="ease-in duration-200"
                                                      leaveFrom="opacity-100 scale-100"
                                                      leaveTo="opacity-0 scale-95"
                                                    >
                                                      <Dialog.Panel className="w-[570px] bg-white rounded-xl xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all">
                                                      <div className="flex justify-end items-center mx-4">
                                                        <XIcon
                                                          onClick={closeModal2}
                                                          className="w-5 h-5 cursor-pointer"
                                                        />
                                                        </div>
                                                        <div>
                                                          <div className="w-full flex flex-row items-center justify-center px-24 py-6">
                                                            <div className="stepper-item w-8 h-8 font-medium border-2 rounded-full  bg-indigo-400 text-white flex justify-center items-center">
                                                              1
                                                            </div>
                                                            <div className="flex-auto border-t-2  border-indigo-400"></div>
                                                            <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full  bg-indigo-400 text-white flex justify-center items-center">
                                                            <button
                                                              onClick={closeModal2}
                                                              >2</button>
                                                            </div>
                                                            <div className="flex-auto border-t-2  border-indigo-400"></div>
                                                            <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full  bg-indigo-400 text-white flex justify-center items-center">
                                                              3
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <Dialog.Title
                                                          as="h3"
                                                          className="text-lg font-medium leading-6 text-gray-900 px-8"
                                                        >
                                                          Last Step
                                                        </Dialog.Title>
                                                        <div className="w-[570px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                                                          <div className="bg-white px-12 py-5 rounded-xl">
                                                          <form className="w-full">
                                                              <div className="">
                                                                <div className="">
                                                                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-last-name">
                                                                    Email
                                                                  </label>
                                                                  <input className="appearance-none block w-full bg-zinc-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="email" placeholder="Email"/>
                                                                </div>
                                                                <div className="mt-8">
                                                                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-last-name">
                                                                    Add Your Question
                                                                  </label>
                                                                  <input className="appearance-none block w-full bg-zinc-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Add Your Question"/>
                                                                </div>
                                                              </div>
                                                          </form>
                                                          <div className="flex gap-4 justify-end">
                                                          <button
                                                            onClick={closeModal2}
                                                                type="submit"
                                                                className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                                              >
                                                                Back
                                                          </button>
                                                          <button
                                                                type="submit"
                                                                className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                                              >
                                                                Save
                                                          </button>
                                                          </div>
                                                          </div>
                                                        </div>
                                                      </Dialog.Panel>
                                                    </Transition.Child>
                                                    
                                                  </div>
                                                </div>
                                              </Dialog>
                                            </Transition>
                                                </div>
                                                </div>
                                            </div>
                                            </Dialog.Panel>
                                          </Transition.Child>
                                          
                                        </div>
                                      </div>
                                    </Dialog>
                                  </Transition>
                                  </div>
                                </div>
                              </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsBottomBar;
