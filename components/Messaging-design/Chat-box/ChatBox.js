import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { createPopper } from "@popperjs/core";
import {
  ChatAlt2Icon,
  PaperAirplaneIcon,
  PhotographIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import ProfileAvatar2 from "../../../public/images/mira.png";
import InputEmoji from "react-input-emoji";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const Dropdown = ({ color }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "top-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
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
      {/* <div className="flex flex-wrap">
        <div className="absolute bottom-10 right-8">
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
                (dropdownPopoverShow ? "block " : "hidden ") +
                (color === "white" ? "bg-white " : bgColor + " ") +
                "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mb-1"
              }
              style={{ minWidth: "25rem" }}
            >
              <div className="sticky bg-white z-50 top-0">
                <div className="flex justify-between p-3 border-b">
                  <div className="font-bold flex items-center gap-2 ">
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
      </div> */}
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
