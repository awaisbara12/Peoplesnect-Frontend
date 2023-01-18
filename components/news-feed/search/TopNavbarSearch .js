import React, { Fragment , useState , useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signout } from "../../auth/signout/SignOut";
import { CogIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import ProfileAvatar2 from "../../../public/images/mira.png";
import ProfileAvatar3 from "../../../public/images/profile-avatar.png";
import {
  BellIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  LogoutIcon,
  XIcon,
} from "@heroicons/react/outline";

const TopNavbarSearch = () => {
  function openModal() {
    setisOpen(true);
  }
  function closeModal() {
    setisOpen(false);
  }
  let [isOpen, setisOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-7">
          <Link href="/">
            <a>
              <SearchIcon className="text-slate-400 h-5 w-5" />
            </a>
          </Link>
        </span>
        <div
          className="text-slate-400 hover:shadow-xl bg-gray-100 w-62 md:w-56  rounded-xl border-none pl-14 cursor-text"
          placeholder="Search"
          onClick={openModal}
          type="text"
          name="search"
        > Search
          </div>
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
                      <div className="fixed inset-0 bg-black bg-opacity-75" />
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
                          <Dialog.Panel className="w-[620px] relative bg-white rounded-xl xl:w-[580px] lg:w-[730px] md:w-[680px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title>
                              <div className="">
                                <div
                                    className="text-lg font-medium leading-6 text-gray-900 px-8"
                                    >
                                    <div
                                      className="text-slate-400 relative bg-gray-100 w-full rounded-3xl border-indigo-400 mb-2">
                                      <input 
                                      className="focus:text-slate-400 focus:border-none bg-transparent text-slate-400 w-full border-none rounded-3xl"
                                      type="text"
                                      placeHolder="Search"
                                      />
                                      <XIcon
                                    onClick={closeModal}
                                    className="w-5 h-5 cursor-pointer absolute right-3 top-2"
                                  />
                                  </div>
                                    
                                    </div>
                              </div>
                            </Dialog.Title>
                              <div className="h-44 overflow-y-scroll">
                                <div className="">
                                  <Link href="/search/users-search">
                                    <a className="flex items-center gap-2 p-2 border-b">
                                      <Image
                                        className="object-cover rounded-full"
                                        src={ProfileAvatar}
                                        width={45}
                                        height={45}
                                        alt=""
                                      />
                                      <div className="">
                                        <div className="flex gap-4 items-center">
                                        <div className="font-bold">Ibrar Zahid</div>
                                        <div className="font-extralight text-xs italic font-serif">User</div>
                                        </div>
                                        <div className="font-light text-xs">300 Connections</div>
                                      </div>
                                    </a>
                                  </Link>
                                  <Link href="/search/pages-search">
                                    <a className="flex items-center gap-2 p-2 border-b">
                                      <Image
                                        className="object-cover rounded-full"
                                        src={ProfileAvatar2}
                                        width={45}
                                        height={45}
                                        alt=""
                                      />
                                      <div className="">
                                        <div className="flex gap-4 items-center">
                                        <div className="font-bold">Mishal Javed</div>
                                        <div className="font-extralight text-xs italic font-serif">Page</div>
                                        </div>
                                        <div className="font-light text-xs">4k Likes</div>
                                      </div>
                                    </a>
                                  </Link>
                                  <Link href="/search/groups-search">
                                    <a className="flex items-center gap-2 p-2 border-b">
                                      <Image
                                        className="object-cover rounded-full"
                                        src={ProfileAvatar3}
                                        width={45}
                                        height={45}
                                        alt=""
                                      />
                                      <div className="">
                                        <div className="flex gap-4 items-center">
                                        <div className="font-bold">Iphon Users</div>
                                        <div className="font-extralight text-xs italic font-serif">Group</div>
                                        </div>
                                        <div className="font-light text-xs">300k Members</div>
                                      </div>
                                    </a>
                                  </Link>
                                  <Link href="/search/marketplace-search">
                                    <a className="flex items-center gap-2 p-2 border-b">
                                      <Image
                                        className="object-cover rounded-full"
                                        src={ProfileAvatar2}
                                        width={45}
                                        height={45}
                                        alt=""
                                      />
                                      <div className="">
                                        <div className="flex gap-4 items-center">
                                        <div className="font-bold">Xs Max</div>
                                        <div className="font-extralight text-xs italic font-serif">MarketPlace</div>
                                        </div>
                                        <div className="font-light text-xs">30 Items</div>
                                      </div>
                                    </a>
                                  </Link>
                                  <Link href="/search/jobs-search">
                                    <a className="flex items-center gap-2 p-2 border-b">
                                      <Image
                                        className="object-cover rounded-full"
                                        src={ProfileAvatar}
                                        width={45}
                                        height={45}
                                        alt=""
                                      />
                                      <div className="">
                                        <div className="flex gap-4 items-center">
                                        <div className="font-bold">Roby On Rails</div>
                                        <div className="font-extralight text-xs italic font-serif">Jobs</div>
                                        </div>
                                        <div className="font-light text-xs">3 Jobs</div>
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              </div>
                              {/* <div className="sticky bottom-0 right-0">
                                <div className="p-2 rounded-xl">
                                  <div className="flex gap-4 justify-end"> 
                                    <button
                                        onClick={closeModal}
                                        type="submit"
                                        className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                        >
                                          Close
                                    </button>
                                  </div>
                                </div>
                              </div> */}
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </div>
      </label>
    </div>
  );
};

export default TopNavbarSearch;
