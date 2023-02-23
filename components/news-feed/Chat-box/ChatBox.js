import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { createPopper } from "@popperjs/core";
import {
  ArrowLeftIcon,
  ChatAlt2Icon,
  PaperAirplaneIcon,
  PhotographIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import ProfileAvatar2 from "../../../public/images/mira.png";
import InputEmoji from "react-input-emoji";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const Dropdown = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [dropdownPopoverShow1, setDropdownPopoverShow1] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const btnDropdownRef1 = React.createRef();
  const popoverDropdownRef1 = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "top-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const openDropdownPopover1 = () => {
    createPopper(btnDropdownRef1.current, popoverDropdownRef1.current, {
      placement: "top-end",
    });
    setDropdownPopoverShow1(true);
  };
  const closeDropdownPopover1 = () => {
    setDropdownPopoverShow1(false);
  };
  function handleOnEnter(text) {
  }
  const handleImagePost = (e) => {
    setPostImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
    }
    setFeedType("image_feed");
  };
  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-indigo-400")
    : (bgColor = "bg-" + color + "-500");
  const [text, setText] = useState("");

  return (
    <>
      <div className="flex flex-wrap">
        <div className="fixed bottom-4 right-4">
          <div className="relative inline-flex align-middle w-full">
            <a
              className={
                "text-white px-3 py-3 rounded-full shadow-lg bg-indigo-400 "
              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              <ChatAlt2Icon className="h-10 w-10" />
            </a>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block" : "hidden ") +
                (color === "white" ? "bg-white " : bgColor + " ") +
                "text-base border border-indigo-400 z-50 chat_DropDown float-left list-none text-left shadow-lg mb-1 transform-gpu translate-x-0 translate-y-0"
              }
              style={{ minWidth: "20rem" }}
            >
              <div className="w-full bg-white h-[380px]">
                <div className="sticky bg-white z-40 top-0">
                  <div className="flex justify-between p-3 border-b">
                    <div className="font-bold flex items-center gap-2 ">
                      Users
                    </div>
                    <div ref={btnDropdownRef1}
                      onClick={() => {
                        dropdownPopoverShow
                        : closeDropdownPopover();
                      }}>
                      <a>
                        <XIcon className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
                <ul className="flex justify-between items-center" role="tablist">
                  <li className="w-1/2 text-center">
                    <a
                      className={
                        "" +
                        (openTab === 1
                          ? "py-2 font-bold border-b-2 pr-4 border-r-2 text-indigo-400 border-indigo-400"
                          : "w-full py-2 pr-4")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(1);
                      }}
                      data-toggle="tab"
                      href="#link1"
                      role="tablist"
                    >
                      Recent Chats
                    </a>
                  </li>
                  <li className="w-1/2 text-center">
                    <a
                      className={
                        "" +
                        (openTab === 2
                          ? "py-2 font-bold border-b-2 border-l-2 pl-4 text-indigo-400 border-indigo-400"
                          : "w-full py-2 pl-4")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(2);
                      }}
                      data-toggle="tab"
                      href="#link2"
                      role="tablist"
                    >
                      New Message
                    </a>
                  </li>
                </ul>
                <div className="tab-content tab-space pt-2.5">
                  <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <div>
                      <input placeholder="Search Chat.." className="border-1 border-indigo-400 w-full p-2 placeholder:font-light focus:border-indigo-400 active:border-indigo-400 focus-visible:border-indigo-400 " />
                    </div>
                    <div className="h-[256px] overflow-y-scroll">
                      <div className=" bg-gray-100 p-2 border-b"
                        ref={btnDropdownRef1}
                        onClick={() => {
                          dropdownPopoverShow1
                          : openDropdownPopover1();
                        }}>
                        <Link href="">
                          <a className="flex items-center gap-2">
                            <Image
                              className="object-cover"
                              src={ProfileAvatar}
                              width={40}
                              height={40}
                              alt=""
                            />
                            <div>
                              <div className="font-bold">Ibrar Zahid</div>
                              <div className="font-light">Dissapear Message</div></div>
                          </a>
                        </Link>
                      </div>
                      <div className=" bg-gray-100 p-2 border-b"
                        ref={btnDropdownRef1}
                        onClick={() => {
                          dropdownPopoverShow1
                          : openDropdownPopover1();
                        }}>
                        <Link href="">
                          <a className="flex items-center gap-2">
                            <Image
                              className="object-cover"
                              src={ProfileAvatar}
                              width={40}
                              height={40}
                              alt=""
                            />
                            <div>
                              <div className="font-bold">Ibrar Zahid</div>
                              <div className="font-light">Dissapear Message</div></div>
                          </a>
                        </Link>
                      </div>
                      <div className=" bg-gray-100 p-2 border-b"
                        ref={btnDropdownRef1}
                        onClick={() => {
                          dropdownPopoverShow1
                          : openDropdownPopover1();
                        }}>
                        <Link href="">
                          <a className="flex items-center gap-2">
                            <Image
                              className="object-cover"
                              src={ProfileAvatar}
                              width={40}
                              height={40}
                              alt=""
                            />
                            <div>
                              <div className="font-bold">Ibrar Zahid</div>
                              <div className="font-light">Dissapear Message</div></div>
                          </a>
                        </Link>
                      </div>
                      <div className=" bg-gray-100 p-2 border-b"
                        ref={btnDropdownRef1}
                        onClick={() => {
                          dropdownPopoverShow1
                          : openDropdownPopover1();
                        }}>
                        <Link href="">
                          <a className="flex items-center gap-2">
                            <Image
                              className="object-cover"
                              src={ProfileAvatar}
                              width={40}
                              height={40}
                              alt=""
                            />
                            <div>
                              <div className="font-bold">Ibrar Zahid</div>
                              <div className="font-light">Dissapear Message</div></div>
                          </a>
                        </Link>
                      </div>
                      <div className=" bg-gray-100 p-2 border-b"
                        ref={btnDropdownRef1}
                        onClick={() => {
                          dropdownPopoverShow1
                          : openDropdownPopover1();
                        }}>
                        <Link href="">
                          <a className="flex items-center gap-2">
                            <Image
                              className="object-cover"
                              src={ProfileAvatar}
                              width={40}
                              height={40}
                              alt=""
                            />
                            <div>
                              <div className="font-bold">Ibrar Zahid</div>
                              <div className="font-light">Dissapear Message</div></div>
                          </a>
                        </Link>
                      </div>
                      <div className=" bg-gray-100 p-2 border-b"
                        ref={btnDropdownRef1}
                        onClick={() => {
                          dropdownPopoverShow1
                          : openDropdownPopover1();
                        }}>
                        <Link href="">
                          <a className="flex items-center gap-2">
                            <Image
                              className="object-cover"
                              src={ProfileAvatar}
                              width={40}
                              height={40}
                              alt=""
                            />
                            <div>
                              <div className="font-bold">Ibrar Zahid</div>
                              <div className="font-light">Dissapear Message</div></div>
                          </a>
                        </Link>
                      </div>
                      <div className=" bg-gray-100 p-2 border-b"
                        ref={btnDropdownRef1}
                        onClick={() => {
                          dropdownPopoverShow1
                          : openDropdownPopover1();
                        }}>
                        <Link href="">
                          <a className="flex items-center gap-2">
                            <Image
                              className="object-cover"
                              src={ProfileAvatar}
                              width={40}
                              height={40}
                              alt=""
                            />
                            <div>
                              <div className="font-bold">Ibrar Zahid</div>
                              <div className="font-light">Dissapear Message</div></div>
                          </a>
                        </Link>
                      </div>
                      <div className=" bg-gray-100 p-2 border-b"
                        ref={btnDropdownRef1}
                        onClick={() => {
                          dropdownPopoverShow1
                          : openDropdownPopover1();
                        }}>
                        <Link href="">
                          <a className="flex items-center gap-2">
                            <Image
                              className="object-cover"
                              src={ProfileAvatar}
                              width={40}
                              height={40}
                              alt=""
                            />
                            <div>
                              <div className="font-bold">Ibrar Zahid</div>
                              <div className="font-light">Dissapear Message</div></div>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <div>
                      <input placeholder="Search New Friends.." className="border-1 border-indigo-400 w-full p-2 placeholder:font-light focus:border-indigo-400 active:border-indigo-400 focus-visible:border-indigo-400 " />
                    </div>
                    <div className="h-[256px] overflow-y-scroll">
                      <div className=" bg-gray-100 p-2 border-b"
                        ref={btnDropdownRef1}
                        onClick={() => {
                          dropdownPopoverShow1
                          : openDropdownPopover1();
                        }}>
                        <Link href="">
                          <a className="flex items-center gap-2">
                            <Image
                              className="object-cover"
                              src={ProfileAvatar}
                              width={40}
                              height={40}
                              alt=""
                            />
                            <div>
                              <div className="font-bold">Ibrar Zahid</div>
                              <div className="font-light">Dissapear Message</div></div>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    ref={popoverDropdownRef1}
                    className={
                      (dropdownPopoverShow1 ? "block" : "hidden ") +
                      (color === "white" ? "bg-white " : bgColor + " ") +
                      "text-base z-50 float-left list-none text-left absolute top-0 rounded shadow-lg mb-1"
                    }
                    style={{ minWidth: "20rem" }}
                  >
                    <div className="sticky bg-white z-50 top-0">
                      <div className="flex justify-between p-3 border-b">
                        <div className="font-bold cursor-pointer flex items-center gap-2"
                          ref={btnDropdownRef1}
                          onClick={() => {
                            dropdownPopoverShow1
                            : closeDropdownPopover1();
                          }}>
                          <ArrowLeftIcon className="h-4 w-4" />
                          User Name
                        </div>
                        <div ref={btnDropdownRef1}
                          onClick={() => {
                            dropdownPopoverShow
                            : closeDropdownPopover();
                          }}>
                          <a>
                            <XIcon className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="w-full bg-white h-[280px] overflow-y-scroll">
                        <div className="">
                          <div className="ml-2 mt-3">
                            <Link href="">
                              <a className="flex items-center gap-2">
                                <Image
                                  className="object-cover"
                                  src={ProfileAvatar}
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                                <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                                  <div className="">user text as show as popup</div>
                                </div>
                              </a>
                            </Link>
                          </div>
                          <div className="flex justify-end mt-7 mr-2">
                            <Link href="">
                              <a className="flex items-center gap-2">
                                <div className=" bg-gray-100 p-2 border w-60 rounded-xl">
                                  <div className="">user text as show as popup</div>
                                </div>
                                <Image
                                  className="object-cover"
                                  src={ProfileAvatar2}
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="ml-2 mt-3">
                            <Link href="">
                              <a className="flex items-center gap-2">
                                <Image
                                  className="object-cover"
                                  src={ProfileAvatar}
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                                <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                                  <div className="">user text as show as popup</div>
                                </div>
                              </a>
                            </Link>
                          </div>
                          <div className="flex justify-end mt-7 mr-2">
                            <Link href="">
                              <a className="flex items-center gap-2">
                                <div className=" bg-gray-100 p-2 border w-60 rounded-xl">
                                  <div className="">user text as show as popup</div>
                                </div>
                                <Image
                                  className="object-cover"
                                  src={ProfileAvatar2}
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="ml-2 mt-3">
                            <Link href="">
                              <a className="flex items-center gap-2">
                                <Image
                                  className="object-cover"
                                  src={ProfileAvatar}
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                                <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                                  <div className="">user text as show as popup</div>
                                </div>
                              </a>
                            </Link>
                          </div>
                          <div className="flex justify-end mt-7 mr-2">
                            <Link href="">
                              <a className="flex items-center gap-2">
                                <div className=" bg-gray-100 p-2 border w-60 rounded-xl">
                                  <div className="">user text as show as popup</div>
                                </div>
                                <Image
                                  className="object-cover"
                                  src={ProfileAvatar2}
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="ml-2 mt-3">
                            <Link href="">
                              <a className="flex items-center gap-2">
                                <Image
                                  className="object-cover"
                                  src={ProfileAvatar}
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                                <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                                  <div className="">
                                    user text user text as show as popup as show as user
                                    text as show as popup popup
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </div>
                          <div className="flex justify-end mt-7 mr-2">
                            <Link href="">
                              <a className="flex items-center gap-2">
                                <div className=" bg-gray-100 p-2 border w-60 rounded-xl">
                                  <div className="">
                                    user text user text as show as popup as show user
                                    text as show as popup as popup
                                  </div>
                                </div>
                                <Image
                                  className="object-cover"
                                  src={ProfileAvatar2}
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="ml-2 mt-3">
                            <Link href="">
                              <a className="flex items-center gap-2">
                                <Image
                                  className="object-cover"
                                  src={ProfileAvatar}
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                                <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                                  <div className="">
                                    user text user text as show as popup as show as user
                                    text as show as popup popup
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="sticky bottom-0 bg-white">
                        <div className="flex items-center px-2">
                          <InputEmoji
                            type="text"
                            react-emoji="w-{100%}"
                            onChange={setText}
                            cleanOnEnter
                            onEnter={handleOnEnter}
                            placeholder="Type Your Message"
                          />
                          <PhotographIcon className="h-10 w-10 opacity-40" />
                          <PaperAirplaneIcon className="h-10 w-10 rotate-90 opacity-40 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={popoverDropdownRef1}
              className={
                (dropdownPopoverShow1 ? "block" : "hidden ") +
                (color === "white" ? "bg-white " : bgColor + " ") +
                "text-base hidden z-50 float-left list-none text-left rounded shadow-lg mb-1"
              }
              style={{ minWidth: "25rem" }}
            >
              <div className="sticky bg-white z-50 top-0">
                <div className="flex justify-between p-3 border-b">
                  <div className="font-bold flex items-center gap-2"
                    ref={btnDropdownRef1}
                    onClick={() => {
                      dropdownPopoverShow1
                      : closeDropdownPopover1();
                    }}>

                    User Name
                  </div>
                  <Link href="">
                    <a>
                      <QuestionMarkCircleIcon className="h-5 w-5" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="w-full bg-white h-[360px] overflow-y-scroll">
                <div className="">
                  <div className="ml-2 mt-3">
                    <Link href="">
                      <a className="flex items-center gap-2">
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={30}
                          height={30}
                          alt=""
                        />
                        <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                          <div className="">user text as show as popup</div>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div className="flex justify-end mt-7 mr-2">
                    <Link href="">
                      <a className="flex items-center gap-2">
                        <div className=" bg-gray-100 p-2 border w-60 rounded-xl">
                          <div className="">user text as show as popup</div>
                        </div>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar2}
                          width={30}
                          height={30}
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="ml-2 mt-3">
                    <Link href="">
                      <a className="flex items-center gap-2">
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={30}
                          height={30}
                          alt=""
                        />
                        <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                          <div className="">user text as show as popup</div>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div className="flex justify-end mt-7 mr-2">
                    <Link href="">
                      <a className="flex items-center gap-2">
                        <div className=" bg-gray-100 p-2 border w-60 rounded-xl">
                          <div className="">user text as show as popup</div>
                        </div>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar2}
                          width={30}
                          height={30}
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="ml-2 mt-3">
                    <Link href="">
                      <a className="flex items-center gap-2">
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={30}
                          height={30}
                          alt=""
                        />
                        <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                          <div className="">user text as show as popup</div>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div className="flex justify-end mt-7 mr-2">
                    <Link href="">
                      <a className="flex items-center gap-2">
                        <div className=" bg-gray-100 p-2 border w-60 rounded-xl">
                          <div className="">user text as show as popup</div>
                        </div>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar2}
                          width={30}
                          height={30}
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="ml-2 mt-3">
                    <Link href="">
                      <a className="flex items-center gap-2">
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={30}
                          height={30}
                          alt=""
                        />
                        <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                          <div className="">
                            user text user text as show as popup as show as user
                            text as show as popup popup
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div className="flex justify-end mt-7 mr-2">
                    <Link href="">
                      <a className="flex items-center gap-2">
                        <div className=" bg-gray-100 p-2 border w-60 rounded-xl">
                          <div className="">
                            user text user text as show as popup as show user
                            text as show as popup as popup
                          </div>
                        </div>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar2}
                          width={30}
                          height={30}
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="ml-2 mt-3">
                    <Link href="">
                      <a className="flex items-center gap-2">
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={30}
                          height={30}
                          alt=""
                        />
                        <div className=" bg-gray-100 w-60 p-2 border rounded-xl">
                          <div className="">
                            user text user text as show as popup as show as user
                            text as show as popup popup
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-white">
                <div className="flex items-center px-2">
                  <InputEmoji
                    type="text"
                    react-emoji="w-{100%}"
                    onChange={setText}
                    cleanOnEnter
                    onEnter={handleOnEnter}
                    placeholder="Type Your Message"
                  />
                  <PhotographIcon className="h-10 w-10 opacity-40" />
                  <PaperAirplaneIcon className="h-10 w-10 rotate-90 opacity-40 ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function DropdownRender() {
  return (
    <>
      <Dropdown color="white" />
    </>
  );
}
