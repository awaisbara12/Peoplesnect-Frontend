import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import Cover from "../../public/images/main-banner.jpg";
import { XCircleIcon } from "@heroicons/react/solid";
import { ThumbUpIcon } from "@heroicons/react/outline";

const MainPage = () => {
  return (
    <div className="mt-8">
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="bg-white rounded-xl p-4">
          <div className="justify-between flex items-center">
            <div className="heading font-semibold">Liked Pages</div>
            <div className="all-button">
              <button className="bg-indigo-400 text-white px-3 py-2 rounded-full">
                Show All
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
            <div className="profile mt-10 border rounded-xl">
              <div className="relative cover">
                <Link href="page-design/liked-pages">
                  <a>
                    <Image
                      className="object-cover rounded-t-xl"
                      src={Cover}
                      width={620}
                      height={200}
                      alt=""
                    />
                  </a>
                </Link>
                <div className="absolute -bottom-10 left-2">
                  <Link href="page-design/liked-pages">
                    <a>
                      <Image
                        className="object-cover"
                        src={ProfileAvatar}
                        width={55}
                        height={55}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="absolute top-2 right-1">
                  <Link href="./">
                    <a>
                      <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="Details px-4 ">
                <div className="ml-16">
                  <div className="User-Name font-bold ">Page Title</div>
                </div>
                <div className="details mt-6 font-light">
                  Page, Brands And Prducts Details
                </div>
                <div className="followers mt-2 font-extralight">
                  25,964 Liked
                </div>
                <div className="float-right">
                  <a href="page-design/liked-pages">
                    <button className="px-2 bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      Show Page
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="profile mt-10 border rounded-xl">
              <div className="relative cover">
                <Link href="page-design/liked-pages">
                  <a>
                    <Image
                      className="object-cover rounded-t-xl"
                      src={Cover}
                      width={620}
                      height={200}
                      alt=""
                    />
                  </a>
                </Link>
                <div className="absolute -bottom-10 left-2">
                  <Link href="page-design/liked-pages">
                    <a>
                      <Image
                        className="object-cover"
                        src={ProfileAvatar}
                        width={55}
                        height={55}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="absolute top-2 right-1">
                  <Link href="./">
                    <a>
                      <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="Details px-4 ">
                <div className="ml-16">
                  <div className="User-Name font-bold ">Page Title</div>
                </div>
                <div className="details mt-6 font-light">
                  Page, Brands And Prducts Details
                </div>
                <div className="followers mt-2 font-extralight">
                  25,964 Liked
                </div>
                <div className="float-right">
                  <a href="page-design/liked-pages">
                    <button className="px-2 bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      Show Page
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="profile mt-10 border rounded-xl">
              <div className="relative cover">
                <Link href="page-design/liked-pages">
                  <a>
                    <Image
                      className="object-cover rounded-t-xl"
                      src={Cover}
                      width={620}
                      height={200}
                      alt=""
                    />
                  </a>
                </Link>
                <div className="absolute -bottom-10 left-2">
                  <Link href="page-design/liked-pages">
                    <a>
                      <Image
                        className="object-cover"
                        src={ProfileAvatar}
                        width={55}
                        height={55}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="absolute top-2 right-1">
                  <Link href="./">
                    <a>
                      <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="Details px-4 ">
                <div className="ml-16">
                  <div className="User-Name font-bold ">Page Title</div>
                </div>
                <div className="details mt-6 font-light">
                  Page, Brands And Prducts Details
                </div>
                <div className="followers mt-2 font-extralight">
                  25,964 Liked
                </div>
                <div className="float-right">
                  <a href="page-design/liked-pages">
                    <button className="px-2 bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      Show Page
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="profile mt-10 border rounded-xl">
              <div className="relative cover">
                <Link href="page-design/liked-pages">
                  <a>
                    <Image
                      className="object-cover rounded-t-xl"
                      src={Cover}
                      width={620}
                      height={200}
                      alt=""
                    />
                  </a>
                </Link>
                <div className="absolute -bottom-10 left-2">
                  <Link href="page-design/liked-pages">
                    <a>
                      <Image
                        className="object-cover"
                        src={ProfileAvatar}
                        width={55}
                        height={55}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="absolute top-2 right-1">
                  <Link href="./">
                    <a>
                      <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="Details px-4 ">
                <div className="ml-16">
                  <div className="User-Name font-bold ">Page Title</div>
                </div>
                <div className="details mt-6 font-light">
                  Page, Brands And Prducts Details
                </div>
                <div className="followers mt-2 font-extralight">
                  25,964 Liked
                </div>
                <div className="float-right">
                  <a href="page-design/liked-pages">
                    <button className="px-2 bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      Show Page
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="bg-white rounded-xl p-4">
            <div className="justify-between flex items-center">
              <div className="heading font-semibold">Suggestions For You</div>
              <div className="all-button">
                <button className="bg-indigo-400 text-white px-3 py-2 rounded-full">
                  Show All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2  md:grid-cols-2">
              <div className="profile mt-10 border rounded-xl">
                <div className="relative cover">
                  <Link href="page-design/suggested-pages">
                    <a>
                      <Image
                        className="object-cover rounded-t-xl"
                        src={Cover}
                        width={620}
                        height={200}
                        alt=""
                      />
                    </a>
                  </Link>
                  <div className="absolute -bottom-8 left-2">
                    <Link href="page-design/suggested-pages">
                      <a>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={55}
                          height={55}
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="absolute top-2 right-1">
                    <Link href="./">
                      <a>
                        <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="Details px-4 ">
                  <a href="page-design/suggested-pages">
                    <div className="ml-16">
                      <div className="User-Name font-bold ">Page Title</div>
                    </div>
                    <div className="details mt-5 font-light">
                      Page, Brands And Prducts Details
                    </div>
                  </a>
                  <div className="followers mt-2 font-extralight">
                    25,964 Liked
                  </div>
                  <a href="" className="flex justify-end">
                    <button className="w-20 flex gap-2 justify-center bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      <ThumbUpIcon className="w-5 h-5" />
                      <div className="">Like</div>
                    </button>
                  </a>
                </div>
              </div>
              <div className="profile mt-10 border rounded-xl">
                <div className="relative cover">
                  <Link href="page-design/suggested-pages">
                    <a>
                      <Image
                        className="object-cover rounded-t-xl"
                        src={Cover}
                        width={620}
                        height={200}
                        alt=""
                      />
                    </a>
                  </Link>
                  <div className="absolute -bottom-8 left-2">
                    <Link href="page-design/suggested-pages">
                      <a>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={55}
                          height={55}
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="absolute top-2 right-1">
                    <Link href="./">
                      <a>
                        <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="Details px-4 ">
                  <a href="page-design/suggested-pages">
                    <div className="ml-16">
                      <div className="User-Name font-bold ">Page Title</div>
                    </div>
                    <div className="details mt-5 font-light">
                      Page, Brands And Prducts Details
                    </div>
                  </a>
                  <div className="followers mt-2 font-extralight">
                    25,964 Liked
                  </div>
                  <a href="" className="flex justify-end">
                    <button className="w-20 flex gap-2 justify-center bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      <ThumbUpIcon className="w-5 h-5" />
                      <div className="">Like</div>
                    </button>
                  </a>
                </div>
              </div>
              <div className="profile mt-10 border rounded-xl">
                <div className="relative cover">
                  <Link href="page-design/suggested-pages">
                    <a>
                      <Image
                        className="object-cover rounded-t-xl"
                        src={Cover}
                        width={620}
                        height={200}
                        alt=""
                      />
                    </a>
                  </Link>
                  <div className="absolute -bottom-8 left-2">
                    <Link href="page-design/suggested-pages">
                      <a>
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={55}
                          height={55}
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="absolute top-2 right-1">
                    <Link href="./">
                      <a>
                        <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="Details px-4 ">
                  <a href="page-design/suggested-pages">
                    <div className="ml-16">
                      <div className="User-Name font-bold ">Page Title</div>
                    </div>
                    <div className="details mt-5 font-light">
                      Page, Brands And Prducts Details
                    </div>
                  </a>
                  <div className="followers mt-2 font-extralight">
                    25,964 Liked
                  </div>
                  <a href="" className="flex justify-end">
                    <button className="w-20 flex gap-2 justify-center bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                      <ThumbUpIcon className="w-5 h-5" />
                      <div className="">Like</div>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
