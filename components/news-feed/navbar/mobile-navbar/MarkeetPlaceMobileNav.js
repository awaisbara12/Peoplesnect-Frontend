import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavbarLogo from "../../../../public/images/logo-circle.png";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import { signout } from "../../../auth/signout/SignOut";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CATEGORY_API } from "../../../../pages/config";
import {
  BookmarkIcon,
  ChevronDoubleDownIcon,
  CogIcon,
  HashtagIcon,
  LogoutIcon,
  UserAddIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import {
  SearchIcon,
  UserGroupIcon,
  VideoCameraIcon,
  StarIcon,
} from "@heroicons/react/outline";
import Spinner from "../../../common/Spinner";
import TopNavbarSearch from "../../../markeetplace/MarketPlace-Header/TopNavbarSearch ";
import { MenuAlt4Icon } from "@heroicons/react/solid";
const MarkeetPlaceMobileNav = () => {
  const [category, setcategory] = useState();
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }

  function getCategory() {
    fetch(CATEGORY_API, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setcategory(result.data)
          // console.log("cata",result.data);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCategory();
  }, [])
  const [open, setOpen] = useState(true);
  return (
    <div className="fixed top-0 block lg:hidden md:hidden bg-white w-full rounded-b-2xl z-50">
      <div className="h-14 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="">
            <Link href="/news-feed">
              <a>
                <Image src={NavbarLogo} width={35} height={35} alt="" />
              </a>
            </Link>
          </div>
          <div className="w-full">
            <TopNavbarSearch />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex gap-6 items-center">
            <Link href="/markeet-place/my-listing" className="">
              <a>
                <div className="flex flex-col items-center">
                  <StarIcon className="h-5 w-5" />
                  <div className="">My Listing</div>
                </div>
              </a>
            </Link>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex flex-col items-center">
                  <MenuAlt4Icon className="h-7 w-7" aria-hidden="true" />
                  <div className="">Categories</div>
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
                <Menu.Items className="absolute top-14 w-44 right-0 bg-white border-2 border-gray-400 rounded-xl p-3 pb-0 text-gray-400">
                  <div className="flex gap-3 flex-col justify-center">
                    <Menu.Item>
                      {({ active }) => (
                        <ul>
                          {category &&
                            category.map((i) => (
                              <Link href={{ pathname: "/markeet-place/category", query: i.id }} className="" key={i.id}>
                                <a>
                                  <li className="flex text-sm items-center justify-between  border-b py-3 gap-3">
                                    <div className="">{i.name}</div>
                                    {/* <TruckIcon className="h-5 w-5 text-indigo-400" /> */}
                                  </li>
                                </a>
                              </Link>
                            ))
                          }
                        </ul>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="relative">
            <Image
              src={ProfileAvatar}
              width={35}
              height={35}
              alt=""
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
            <div
              className={`${open ? "w-0" : "w-96"
                } absolute h-screen z-50 right-0 overflow-hidden duration-500 rounded-xl bg-white`}
            >
              <div className="p-5">
                <div>
                  <Link href="/profile">
                    <a className="flex items-center mb-8 gap-2">
                      <UserIcon className="h-7 w-7" />
                      <div className="font-bold">Profile</div>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/news-feed">
                    <a className="flex items-center mb-8 gap-2">
                      <BookmarkIcon className="h-7 w-7" />
                      <div className="font-bold">Saved Items</div>
                    </a>
                  </Link>
                </div>

                <div>
                  <Link href="/markeet-place">
                    <a className="flex items-center mb-8 gap-2">
                      <StarIcon className="h-7 w-7" />
                      <div className="font-bold">MarketPlace</div>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/group-page">
                    <a className="flex items-center mb-8 gap-2">
                      <UserGroupIcon className="h-7 w-7" />
                      <div className="font-bold">Groups</div>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/page-design">
                    <a className="flex items-center mb-8 gap-2">
                      <VideoCameraIcon className="h-7 w-7" />
                      <div className="font-bold">Pages</div>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/hashtag-design">
                    <a className="flex items-center mb-8 gap-2">
                      <HashtagIcon className="h-7 w-7" />
                      <div className="font-bold">Hashtags</div>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/settings">
                    <a className="flex items-center mb-8 gap-2">
                      <CogIcon className="h-7 w-7" />
                      <div className="font-bold">Setting</div>
                    </a>
                  </Link>
                </div>
                <div className="flex gap-2">
                  {signout ? (
                    <a
                      onClick={() => signout()}
                      className="flex gap-2 cursor-pointer"
                    >
                      <LogoutIcon className="h-5 w-5" />
                      <div className="font-bold">SignOut</div>
                    </a>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkeetPlaceMobileNav;
