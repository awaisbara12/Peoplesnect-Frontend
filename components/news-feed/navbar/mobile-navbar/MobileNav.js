import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavbarLogo from "../../../../public/images/logo-circle.png";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import { signout } from "../../../auth/signout/SignOut";
import {
  AcademicCapIcon,
  BookmarkIcon,
  CogIcon,
  HashtagIcon,
  LogoutIcon,
  MenuAlt4Icon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/outline";
import {
  SearchIcon,
  UserGroupIcon,
  VideoCameraIcon,
  StarIcon,
} from "@heroicons/react/outline";
import Spinner from "../../../common/Spinner";
import TopNavbarSearch from "../../search/TopNavbarSearch ";
import TopNavbarJobSearch from "../../../jobs/Job-Header/TopNavbarJobSearch ";
import { useRouter } from "next/router";
import TopNavbarMarketplaceSearch from "../../../markeetplace/MarketPlace-Header/TopNavbarMarketplaceSearch";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CATEGORY_API } from "../../../../pages/config";

const MobileNav = () => {
  const [open, setOpen] = useState(true);
  const [currentuser, setcurrentuser] = useState();
  const router = useRouter();
  const data = router.asPath;
  const screen = data.split("/");
  const [category, setcategory] = useState();
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }

  function getCategory() {
    if(screen[1]=="markeet-place"){
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
    
  }

  useEffect(() => {
    var c = window.localStorage.getItem("currentuser");
    setcurrentuser(JSON.parse(c));
    getCategory();
  }, [])
  return (
    <div className="fixed top-0 z-50 w-full">
      <div className="block lg:hidden md:hidden bg-white rounded-b-2xl">
      <div className="h-14 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="">
            <Link href="/news-feed">
              <a>
                <Image src={NavbarLogo} width={35} height={35} alt="" />
              </a>
            </Link>
          </div>

          {/* <TopNavbarSearch /> */}
          {/* <TopNavbarJobSearch/> */}

          {
            screen[1]=="markeet-place"?(
              <TopNavbarMarketplaceSearch />
            ):(
              screen[1]=="jobs"?(
                <TopNavbarJobSearch/>
              ):(
                  <TopNavbarSearch />
                )
              )
            }
        </div>
        <div className="flex gap-6">
          {screen[1]=="jobs"?(
            <div className="flex gap-6 items-center">
              <Link href="/jobs/saved-jobs" className="">
                <a>
                  <div className="flex flex-col items-center">
                    <BookmarkIcon className="h-3 w-3" />
                    <div className="text-xs">Saved</div>
                  </div>
                </a>
              </Link>
              <Link href="/jobs/applied-jobs" className="">
                <a>
                  <div className="flex flex-col items-center">
                    <ShieldCheckIcon className="h-3 w-3" />
                    <div className="text-xs">Applied</div>
                  </div>
                </a>
              </Link>
              <Link href="/jobs/posted-jobs" className="">
                <a>
                  <div className="flex flex-col items-center">
                    <AcademicCapIcon className="h-3 w-3" />
                    <div className="text-xs">Posted</div>
                  </div>
                </a>
              </Link>
            </div>
          ):(screen[1]=="markeet-place"?(
            <div className="flex gap-6 items-center">
              <Link href="/markeet-place/my-listing" className="">
                <a>
                  <div className="flex flex-col items-center">
                    <StarIcon className="h-3 w-3" />
                    <div className="text-xs">My Listing</div>
                  </div>
                </a>
              </Link>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex flex-col items-center">
                    <MenuAlt4Icon className="h-3 w-3" aria-hidden="true" />
                    <div className="text-xs">Categories</div>
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
          ):(""))}
          <div className="relative">
          {currentuser && currentuser.display_photo_url?(
            <img
              src={currentuser.display_photo_url}
              alt=""
              className="cursor-pointer w-[35px] h-[35px]"
              onClick={() => setOpen(!open)}
            />
          ):(
            <Image
              src={ProfileAvatar}
              width={35}
              height={35}
              alt=""
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />)}
            <div
              className={`${open ? "w-0" : "w-52"
                } absolute h-auto text-white z-50 top-10 right-0 overflow-y-scroll duration-500 rounded-xl bg-indigo-400`}
            >
              <div className="p-5">
                <div>
                  <Link href="/profile">
                    <a className="flex items-center mb-6 gap-2">
                      <UserIcon className="h-5 w-5" />
                      <div className="font-bold text-xs">Profile</div>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/news-feed">
                    <a className="flex items-center mb-6 gap-2">
                      <BookmarkIcon className="h-5 w-5" />
                      <div className="font-bold text-xs">Saved Items</div>
                    </a>
                  </Link>
                </div>

                <div>
                  <Link href="/markeet-place">
                    <a className="flex items-center mb-6 gap-2">
                      <StarIcon className="h-5 w-5" />
                      <div className="font-bold text-xs">MarketPlace</div>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/group-page">
                    <a className="flex items-center mb-6 gap-2">
                      <UserGroupIcon className="h-5 w-5" />
                      <div className="font-bold text-xs">Groups</div>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/page-design">
                    <a className="flex items-center mb-6 gap-2">
                      <VideoCameraIcon className="h-5 w-5" />
                      <div className="font-bold text-xs">Pages</div>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/hashtag-design">
                    <a className="flex items-center mb-6 gap-2">
                      <HashtagIcon className="h-5 w-5" />
                      <div className="font-bold text-xs">Hashtags</div>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/settings">
                    <a className="flex items-center mb-6 gap-2">
                      <CogIcon className="h-5 w-5" />
                      <div className="font-bold text-xs">Setting</div>
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
                      <div className="font-bold text-xs">SignOut</div>
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
    </div>
  );
};

export default MobileNav;
