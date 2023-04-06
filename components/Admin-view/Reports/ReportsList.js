import React, { Component } from 'react';
import Link from "next/link";
import Image from "next/image";
import { CogIcon, EyeIcon, SearchIcon } from '@heroicons/react/solid';
import Post from "../../../public/images/groupcover.jpg";
import { TrashIcon } from '@heroicons/react/outline';
class ReportsList extends Component {
  render() {
    return (
      <div className="mt-8">
        <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="mt-8">
            <div className="">
              <div className="text-center">
                <div className="heading text-4xl font-semibold text-indigo-400">Reported Posts</div>
              </div>
              <div className="mt-8">
                <div className="">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="shadow-lg bg-white flex justify-between rounded-xl p-2">
                      <div className="flex gap-4 items-start">
                        <Link href="/User-Profile">
                          <a>
                            <Image
                              src={Post}
                              width={100}
                              height={100}
                              placeholder="blur"
                              className="object-fit rounded-xl"
                              alt=""
                            />
                          </a>
                        </Link>
                        <div>
                          <div className="text-sm">
                            Posted by <b className="text-indigo-400">User Name</b>
                          </div>
                          <div className="text-xs">
                            Post reported by <b className="text-indigo-400">User Name</b>
                          </div>
                        </div>
                      </div>
                      <Link href="">
                        <a>
                          <div className="flex">
                            <EyeIcon className="h-5 w-5 text-indigo-400" />
                            <TrashIcon className="h-5 w-5 text-indigo-400" />
                          </div>
                        </a>
                      </Link>
                    </div>

                    <div className="shadow-lg bg-white flex justify-between rounded-xl p-2">
                      <div className="flex gap-4 items-start">
                        <Link href="/User-Profile">
                          <a>
                            <Image
                              src={Post}
                              width={100}
                              height={100}
                              placeholder="blur"
                              className="object-fit rounded-xl"
                              alt=""
                            />
                          </a>
                        </Link>
                        <div>
                          <div className="text-sm">
                            Posted by <b className="text-indigo-400">User Name</b>
                          </div>
                          <div className="text-xs">
                            Post reported by <b className="text-indigo-400">User Name</b>
                          </div>
                        </div>
                      </div>
                      <Link href="">
                        <a>
                          <div className="flex">
                            <EyeIcon className="h-5 w-5 text-indigo-400" />
                            <TrashIcon className="h-5 w-5 text-indigo-400" />
                          </div>
                        </a>
                      </Link>
                    </div>

                    <div className="shadow-lg bg-white flex justify-between rounded-xl p-2">
                      <div className="flex gap-4 items-start">
                        <Link href="/User-Profile">
                          <a>
                            <Image
                              src={Post}
                              width={100}
                              height={100}
                              placeholder="blur"
                              className="object-fit rounded-xl"
                              alt=""
                            />
                          </a>
                        </Link>
                        <div>
                          <div className="text-sm">
                            Posted by <b className="text-indigo-400">User Name</b>
                          </div>
                          <div className="text-xs">
                            Post reported by <b className="text-indigo-400">User Name</b>
                          </div>
                        </div>
                      </div>
                      <Link href="">
                        <a>
                          <div className="flex">
                            <EyeIcon className="h-5 w-5 text-indigo-400" />
                            <TrashIcon className="h-5 w-5 text-indigo-400" />
                          </div>
                        </a>
                      </Link>
                    </div>

                    <div className="shadow-lg bg-white flex justify-between rounded-xl p-2">
                      <div className="flex gap-4 items-start">
                        <Link href="/User-Profile">
                          <a>
                            <Image
                              src={Post}
                              width={100}
                              height={100}
                              placeholder="blur"
                              className="object-fit rounded-xl"
                              alt=""
                            />
                          </a>
                        </Link>
                        <div>
                          <div className="text-sm">
                            Posted by <b className="text-indigo-400">User Name</b>
                          </div>
                          <div className="text-xs">
                            Post reported by <b className="text-indigo-400">User Name</b>
                          </div>
                        </div>
                      </div>
                      <Link href="">
                        <a>
                          <div className="flex">
                            <EyeIcon className="h-5 w-5 text-indigo-400" />
                            <TrashIcon className="h-5 w-5 text-indigo-400" />
                          </div>
                        </a>
                      </Link>
                    </div>

                    <div className="shadow-lg bg-white flex justify-between rounded-xl p-2">
                      <div className="flex gap-4 items-start">
                        <Link href="/User-Profile">
                          <a>
                            <Image
                              src={Post}
                              width={100}
                              height={100}
                              placeholder="blur"
                              className="object-fit rounded-xl"
                              alt=""
                            />
                          </a>
                        </Link>
                        <div>
                          <div className="text-sm">
                            Posted by <b className="text-indigo-400">User Name</b>
                          </div>
                          <div className="text-xs">
                            Post reported by <b className="text-indigo-400">User Name</b>
                          </div>
                        </div>
                      </div>
                      <Link href="">
                        <a>
                          <div className="flex">
                            <EyeIcon className="h-5 w-5 text-indigo-400" />
                            <TrashIcon className="h-5 w-5 text-indigo-400" />
                          </div>
                        </a>
                      </Link>
                    </div>

                    <div className="shadow-lg bg-white flex justify-between rounded-xl p-2">
                      <div className="flex gap-4 items-start">
                        <Link href="/User-Profile">
                          <a>
                            <Image
                              src={Post}
                              width={100}
                              height={100}
                              placeholder="blur"
                              className="object-fit rounded-xl"
                              alt=""
                            />
                          </a>
                        </Link>
                        <div>
                          <div className="text-sm">
                            Posted by <b className="text-indigo-400">User Name</b>
                          </div>
                          <div className="text-xs">
                            Post reported by <b className="text-indigo-400">User Name</b>
                          </div>
                        </div>
                      </div>
                      <Link href="">
                        <a>
                          <div className="flex">
                            <EyeIcon className="h-5 w-5 text-indigo-400" />
                            <TrashIcon className="h-5 w-5 text-indigo-400" />
                          </div>
                        </a>
                      </Link>
                    </div>

                    <div className="shadow-lg bg-white flex justify-between rounded-xl p-2">
                      <div className="flex gap-4 items-start">
                        <Link href="/User-Profile">
                          <a>
                            <Image
                              src={Post}
                              width={100}
                              height={100}
                              placeholder="blur"
                              className="object-fit rounded-xl"
                              alt=""
                            />
                          </a>
                        </Link>
                        <div>
                          <div className="text-sm">
                            Posted by <b className="text-indigo-400">User Name</b>
                          </div>
                          <div className="text-xs">
                            Post reported by <b className="text-indigo-400">User Name</b>
                          </div>
                        </div>
                      </div>
                      <Link href="">
                        <a>
                          <div className="flex">
                            <EyeIcon className="h-5 w-5 text-indigo-400" />
                            <TrashIcon className="h-5 w-5 text-indigo-400" />
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="mt-8 text-center">
                <Button className="border-indigo-400 border text-indigo-400 rounded-full">Show More </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportsList;