import React, { useEffect, useState } from "react";
import { Fragment } from "react";

import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import { Menu, Transition } from "@headlessui/react";
import {
  DotsCircleHorizontalIcon,
  SearchCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { BLOCK_API, GROUP_API, GROUP_MEMBERS_API, PAGES_API } from "../../../../pages/config";
import { useRouter } from "next/router";

const PageMembers = () => {
  const [member, setmember] = useState();
  const [count, setcount] = useState();
  const [admincount, setadmincount] = useState(); //admins count
  const [admins, setadmins] = useState();// all Admins Details
  const [admin, setadmin] = useState();           // Creater


  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }

  const Remove_Member = (Id) => {
    const res = fetch(PAGES_API + "/removed_page?id=" + myArray[1] + "&user_id=" + Id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        GetMember();
        GetAdmins();
        alert("Removed Successfully")
      })
  }
  // Get all Admins
  const GetAdmins = () => {
    fetch(PAGES_API + "/get_page_admin?page_id=" + myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setadmins(result.data);
        // console.log("admins",result.data)
        if (result.data) {
          setadmincount(result.data.length)
        }
      })
  }
  // Get Group's Member
  const GetMember = () => {
    fetch(PAGES_API + "/page_liker?page_id=" + myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setmember(result.data);
        if (result.data) {
          setcount(result.data.length)
        }
      })
  }
  // Make & remove admin
  const makeAdmin = (id, type, name) => {
    const res = fetch(PAGES_API + "/add_remove_admin?id=" + id + "&member_types=" + type, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        GetMember();
        GetAdmins();
      })
  }
  // Get Super Admin
  const GetCreater = () => {
    const res = fetch(PAGES_API + "/" + myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setadmin(result.data);
      })
  }
  // Block
  const Block = (id, userId, type) => {
    const dataForm = new FormData();
    dataForm.append("blocks[blockable_type]", type);
    dataForm.append("blocks[blockable_id]", id);
    dataForm.append("blocks[blocked_id]", userId);
    const res = fetch(BLOCK_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        GetMember();
        GetAdmins();
        console.log(result.data);
      })
  }

  useEffect(() => {
    GetMember();
    GetCreater();
    GetAdmins()
  }, [])
  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[710px] md:w-[780px] px-5 md:px-0 lg:px-0 xl:px-0">
        <div className="bg-white rounded-xl mt-8">
          <div className="flex justify-between items-center border-b-1 p-4">
            <div className="heading">Page Members</div>
            {count || admincount ? (
              <div className="">{count + admincount}</div>
            ) : (
              <div className="">0</div>
            )}
          </div>
          <div className="relative text-gray-500 flex justify-end mt-5 mr-5">
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
          </div>
          {/* For Creater/Super-admin */}
          {admin ? (
            <div className="border-b-1">
              <div className="request-profile flex  px-4 py-3 justify-between items-center">
                <div className="flex items-center gap-3">
                  {/* display_photo_url */}
                  {admin.owner.display_photo_url ? (
                    <Link href={{ pathname: "/User-Profile", query: admin.owner.id, }}>
                      <a>
                        <img src={admin.owner.display_photo_url} className="object-cover rounded-full z-40 h-[40px] w-[40px]" />
                      </a>
                    </Link>
                  ) : (
                    <Link href={{ pathname: "/User-Profile", query: admin.owner.id, }}>
                      <a>
                        <Image src={ProfileAvatar} width={35} height={35} alt="" />
                      </a>
                    </Link>
                  )}
                  {/* <Link href="/news-feed">
                      <a>
                        <Image src={ProfileAvatar} width={35} height={35} alt="" />
                      </a>
                    </Link> */}
                  <div className="">
                    <Link href={{ pathname: "/User-Profile", query: admin.owner.id, }}>
                      <a>
                        <div className="username text-sm font-bold capitalize">{admin.owner.first_name} {admin.owner.last_name}</div>

                        <div className="userfield text-xs">Page Creater</div>
                      </a>
                    </Link>
                  </div>
                </div>
                {/* <div className="Request-button ">
                    <button className="border-1 border-indigo-400 rounded-full text-indigo-400 px-3 py-1 hover:bg-indigo-400 hover:text-white">
                      Add Friend
                    </button>
                  </div> */}
              </div>
            </div>
          ) : ('')}
          {/* Page Admins Lists */}
          {admins ? (
            admins.map((i) => {
              if (i.member_types == "admin")
                return (
                  <div className="request-profile flex  px-4 py-3 justify-between items-center" key={i.id}>
                    <div className="flex items-center gap-3">
                      {i.user && i.user.display_photo_url ? (
                        <Link href={{ pathname: "/User-Profile", query: i.user.id, }}>
                          <a>
                            <img src={i.user.display_photo_url} className="object-cover rounded-full z-40 h-[40px] w-[40px]" alt="" />
                          </a>
                        </Link>
                      ) : (
                        <Link href={{ pathname: "/User-Profile", query: i.user.id, }}>
                          <a>
                            <Image src={ProfileAvatar} width={35} height={35} alt="" />
                          </a>
                        </Link>
                      )}
                      <div className="">
                        <Link href={{ pathname: "/User-Profile", query: i.user.id, }}>
                          <a>
                            <div className="username text-sm font-bold capitalize">{i.user.first_name} {i.user.last_name}</div>
                          </a>
                        </Link>
                        <Link href={{ pathname: "/User-Profile", query: i.user.id, }}>
                          <a>
                            <div className="userfield text-xs capitalize">{i.member_types}</div>
                          </a>
                        </Link>
                        {/* <Link href={{pathname: "/User-Profile", query:i.user.id,}}>
                        <a>
                          <div className="mutual-followers text-xs">
                            Friends Add in Group
                          </div>
                        </a>
                        </Link> */}
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
                              <Menu.Item className="flex gap-1">
                                <a onClick={() => makeAdmin(i.id, "members", i.user.first_name)}>Remove From Admin</a>
                              </Menu.Item>
                              <Menu.Item className="flex gap-1 mt-2">
                                <a onClick={() => Remove_Member(i.user.id)}>Remove From Page</a>
                              </Menu.Item>
                              <Menu.Item className="flex gap-1 mt-2">
                                <a onClick={() => Block(i.id, i.user.id, "PageLike")}>Block From Page</a>
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                )
            })
          ) : ('')}

          {/* Page Member/Likers */}
          <div className="border-b-1">
            {member ? (
              member.map((i) => {
                if (i.member_types == "members")
                  return (
                    <div className="request-profile flex  px-4 py-3 justify-between items-center" key={i.id}>
                      <div className="flex items-center gap-3">
                        {i.user && i.user.display_photo_url ? (
                          <Link href={{ pathname: "/User-Profile", query: i.user.id, }}>
                            <a>
                              <img src={i.user.display_photo_url} className="object-cover rounded-full z-40 h-[40px] w-[40px]" alt="" />
                            </a>
                          </Link>
                        ) : (
                          <Link href={{ pathname: "/User-Profile", query: i.user.id, }}>
                            <a>
                              <Image src={ProfileAvatar} width={35} height={35} alt="" />
                            </a>
                          </Link>
                        )}
                        <div className="">
                          <Link href={{ pathname: "/User-Profile", query: i.user.id, }}>
                            <a>
                              <div className="username text-sm font-bold capitalize">{i.user.first_name} {i.user.last_name}</div>
                            </a>
                          </Link>
                          <Link href={{ pathname: "/User-Profile", query: i.user.id, }}>
                            <a>
                              <div className="mutual-followers text-xs">
                                Member
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
                                <Menu.Item className="flex gap-1">
                                  <a onClick={() => Remove_Member(i.user.id)}>Remove This Member</a>
                                </Menu.Item>
                                <Menu.Item className="flex gap-1 mt-2">
                                  <a onClick={() => Block(i.id, i.user.id, "PageLike")}>Block This Member</a>
                                </Menu.Item>
                                <Menu.Item className="flex gap-1 mt-2">
                                  <a onClick={() => makeAdmin(i.id, "admin", i.user.first_name)}>Make Admin</a>
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  )
              })
            ) : ('')}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PageMembers;
