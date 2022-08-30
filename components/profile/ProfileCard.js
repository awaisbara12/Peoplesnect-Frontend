import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import postimage from "../../public/images/cover.jpg";
import photos from "../../public/images/pagecover.jpg";
import photos1 from "../../public/images/brand.jpg";
import photos2 from "../../public/images/product1.png";
import photos3 from "../../public/images/groupcover.jpg";

import ProfileAvatar from "../../public/images/profile-girl.jpg";
import {
  BookmarkAltIcon,
  ChatAlt2Icon,
  CogIcon,
  LocationMarkerIcon,
  PencilIcon,
  PhoneIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/solid";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const ProfileCard = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="mt-8">
      <div className="max-w-[1340px] xl:w-full">
        <div className="blogs bg-white rounded-xl pt-8">
          <div className="pl-32">
            <div className="flex justify-between">
              <div className="mt-5 flex gap-14">
                <div className="relative">
                  <Link href="">
                    <a>
                      <Image
                        src={ProfileAvatar}
                        width={260}
                        height={350}
                        className="object-cover"
                        placeholder="empty"
                        alt="profile-image"
                      />
                    </a>
                  </Link>
                  <div className="absolute top-0 left-0 right-0 bottom-0 w-44 h-44 bg-black bg-opacity-0 flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-opacity-70 duration-500">
                    <div className="flex gap-2 text-white rounded-full  cursor-pointer">
                      <PencilIcon className="w-4 h-4" />
                      Edit Profile
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <div className="group relative">
                      <div className="text-2xl text-blue-500 font-bold">
                        Javeriya Ibrar
                      </div>
                      <div className="absolute right-44 top-2 opacity-0 group-hover:opacity-100 cursor-pointer">
                        <PencilIcon className="h-4 w-4 text-blue-500" />
                      </div>
                    </div>
                    <Link href="">
                      <a className="text-gray-500 text-xs font-semibold">
                        <div className="flex items-center gap-1">
                          <LocationMarkerIcon className="w-5 h-5" />
                          Your Location
                        </div>
                      </a>
                    </Link>
                    <Link href="">
                      <a className="text-blue-500 text-xs font-semibold">
                        Recent Job And Position
                      </a>
                    </Link>
                    <div className="mt-2 w-1/2">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </div>
                  </div>
                  <div className="flex gap-2 mt-8">
                    <Link href="">
                      <a className="flex items-center text-blue-500 border border-blue-500 px-2 rounded text-xs font-semibold">
                        <UserIcon className="w-5 h-5" />
                        440 connections
                      </a>
                    </Link>
                    <Link href="">
                      <a className="flex items-center bg-blue-500 text-white py-1 px-2 rounded text-xs font-semibold">
                        <ChatAlt2Icon className="w-5 h-5" />
                        Message
                      </a>
                    </Link>
                    <Link href="">
                      <a className="flex items-center text-blue-500 border border-blue-500 px-2 rounded text-xs font-semibold">
                        <XIcon className="w-5 h-5" />
                        Report User
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-wrap">
              <div className="w-full">
                <ul
                  className="flex ml-32 mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                  role="tablist"
                >
                  <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                      className={
                        "flex justify-center gap-2 text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-xl leading-normal " +
                        (openTab === 1
                          ? "text-white bg-blue-500"
                          : "text-blue-500 bg-gray-100")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(1);
                      }}
                      data-toggle="tab"
                      href="#link1"
                      role="tablist"
                    >
                      <UserIcon className="w-4 h-4" /> About
                    </a>
                  </li>
                  <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                      className={
                        "flex justify-center gap-2 text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-xl leading-normal " +
                        (openTab === 2
                          ? "text-white bg-blue-500"
                          : "text-blue-500 bg-gray-100")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(2);
                      }}
                      data-toggle="tab"
                      href="#link2"
                      role="tablist"
                    >
                      <BookmarkIcon className="h-4 w-4" /> Saved Items
                    </a>
                  </li>
                  <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                      className={
                        "flex justify-center gap-2 text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-xl leading-normal " +
                        (openTab === 3
                          ? "text-white bg-blue-500"
                          : "text-blue-500 bg-gray-100")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(3);
                      }}
                      data-toggle="tab"
                      href="#link3"
                      role="tablist"
                    >
                      Options
                    </a>
                  </li>
                </ul>
                <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-b-xl">
                  <div className="flex-auto">
                    <div className="tab-content tab-space">
                      <div
                        className={openTab === 1 ? "block" : "hidden"}
                        id="link1"
                      >
                        <div className="bg-gray-100 rounded-b-xl">
                          <div className="font-bold text-lg p-5">
                            User Details
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-12 py-5 border-r">
                              <div className="flex items-center gap-3 my-4">
                                <div className="font-bold">State Name:</div>
                                <div className="">Arizona</div>
                              </div>
                              <hr />
                              <div className="flex items-center gap-3 my-4">
                                <div className="font-bold">City Name:</div>
                                <div className="">Phoenix</div>
                              </div>
                              <hr />
                              <div className="flex items-center gap-3 my-4">
                                <div className="font-bold">Company Name:</div>
                                <div className="">
                                  <a href="" className="hover:underline">
                                    Neptune Technologies
                                  </a>
                                </div>
                              </div>
                              <hr />
                              <div className="flex items-center gap-3 my-4">
                                <div className="font-bold">
                                  Position in Company:
                                </div>
                                <div className="">
                                  <a href="" className="">
                                    Senior Websits developers
                                  </a>
                                </div>
                              </div>
                              <hr />
                              <div className="flex items-center gap-3 my-4">
                                <div className="font-bold">
                                  Your Company Adress:
                                </div>
                                <div className="">
                                  <a href="" className="hover:underline">
                                    2000 East Rio Salado Parkway Phoenix Arizona
                                  </a>
                                </div>
                              </div>
                              <hr />
                              <div className="flex items-center gap-3 my-4">
                                <div className="font-bold">
                                  Current Job Title:
                                </div>
                                <div className="">Rubby and Rails Devolper</div>
                              </div>
                              <hr />
                            </div>
                            <div className="px-4 py-5">
                              <div className="flex items-center gap-3 my-4">
                                <div className="font-bold">Email Adress:</div>
                                <div className="">abc123@gmail.com</div>
                              </div>
                              <hr />
                              <div className="flex items-center gap-3 my-4">
                                <div className="font-bold">Phon Number:</div>
                                <a
                                  href=""
                                  className="flex gap-2 hover:underline"
                                >
                                  <PhoneIcon className="h-5 w-5" />
                                  +1 844-962-2802
                                </a>
                              </div>
                              <hr />
                              <div className="flex items-center gap-3 my-4">
                                <div className="font-bold">Birthday:</div>
                                <div className="">25-August-1998</div>
                              </div>
                              <hr />
                              <div className="flex items-center gap-3 my-4">
                                <div className="font-bold">Your Adress:</div>
                                <div className="">
                                  <a href="" className="hover:underline">
                                    15091 South Komatke Lane Laveen Village,
                                    Phoenix
                                  </a>
                                </div>
                              </div>
                              <hr />
                            </div>
                          </div>
                          <div className="flex gap-2 justify-center items-center p-4">
                            <div className="font-bold">Join PeoplesNect:</div>
                            <div className="font-normal">2-11-1992</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={openTab === 2 ? "block" : "hidden"}
                        id="link2"
                      >
                        <p>
                          Completely synergize resource taxing relationships via
                          premier niche markets. Professionally cultivate
                          one-to-one customer service with robust ideas.
                          <br />
                          <br />
                          Dynamically innovate resource-leveling customer
                          service for state of the art customer service.
                        </p>
                      </div>
                      <div
                        className={openTab === 3 ? "block" : "hidden"}
                        id="link3"
                      >
                        <p>
                          Efficiently unleash cross-media information without
                          cross-media value. Quickly maximize timely
                          deliverables for real-time schemas.
                          <br />
                          <br /> Dramatically maintain clicks-and-mortar
                          solutions without functional solutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="justify-end flex -mt-20">
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
                        <a href="">
                          <PencilIcon className="w-5 h-5" />
                          Edit Profile
                        </a>
                      </Menu.Item>
                      <Menu.Item className="flex gap-1 mt-2">
                        <a href="">
                          <CogIcon className="h-5 w-5" />
                          Profile Settings
                        </a>
                      </Menu.Item>
                      <Menu.Item className="flex gap-1 mt-2">
                        <a href="admin-view">
                          <UserCircleIcon className="h-5 w-5" />
                          View As User
                        </a>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div> */}
          {/* 
          <div className="">
            <div className="border-t">
              <div className="flex justify-center font-semibold my-2">Bio</div>
            </div>
            <div className="border-t">
              <div className="p-5 text-center">
                The following is an excellent collection of profile page design
                templates and mockups for web designers
              </div>
            </div>
          </div>
          <div className="">
            <div className="border-t">
              <div className="flex justify-center font-semibold my-2">
                About
              </div>
            </div>
            <div className="border-t">
              <div className="p-5 text-center">
                The following is an excellent collection of profile page design
                templates and mockups for web designers
              </div>
            </div>
          </div>
          <div className="">
            <div className="border-t">
              <div className="flex justify-center font-semibold my-2">
                Photos
              </div>
            </div>
            <div className="border-t">
              <div className="p-5 flex justify-center gap-3">
                <Link href="/">
                  <a>
                    <Image
                      src={photos}
                      className="object-cover rounded-xl"
                      width={50}
                      height={70}
                      alt=""
                    />
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <Image
                      src={photos1}
                      className="object-cover rounded-xl"
                      width={50}
                      height={70}
                      alt=""
                    />
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <Image
                      src={photos2}
                      className="object-cover rounded-xl"
                      width={50}
                      height={70}
                      alt=""
                    />
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <Image
                      src={photos3}
                      className="object-cover rounded-xl"
                      width={50}
                      height={70}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
