import React, { Component } from 'react';
import Link from "next/link";
import Image from "next/image";
import { CogIcon, EyeIcon, SearchIcon } from '@heroicons/react/solid';
import Post from "../../../public/images/groupcover.jpg";
import { TrashIcon } from '@heroicons/react/outline';
class ProductsList extends Component {
  render() {
    return (
      <div className="mt-8">
        <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="mt-8">
            <div className="">
              <div className="text-center">
                <div className="heading text-4xl font-semibold text-indigo-400">Productst List</div>
              </div>
              <div className="relative w-1/2 mx-auto mt-4">
                <input
                  className="placeholder:text-md placeholder:text-indigo-500 pl-12  hover:shadow-lg bg-white placeholder:rounded-full  border-indigo-400 w-full rounded-full"
                  placeholder="Search Products"
                  type="text"
                  name="search"
                />
                <div className="absolute top-3 left-6">
                  <SearchIcon className="h-5 w-5 text-indigo-400" />
                </div>
              </div>
              <div className="mt-8">
                <div className="">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="hover:shadow-2xl shadow-lg bg-white rounded-xl">
                      <div className="">
                        <Link href="/jobs">
                          <a>
                            <Image
                              src={Post}
                              width={330}
                              height={180}
                              placeholder="blur"
                              className="object-fit rounded-t-xl"
                              alt=""
                            />
                          </a>
                        </Link>
                        <div className="p-3">
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-bold text-indigo-400">Products Name</div>
                            <Link href="">
                              <a>
                                <div className="flex gap-1">
                                  <EyeIcon className="h-5 w-5 text-indigo-400" />
                                  <TrashIcon className="h-5 w-5 text-indigo-400" />
                                </div>
                              </a>
                            </Link>
                          </div>
                          <div className="font-extralight"><b className="font-bold text-indigo-400">discription:</b> This will perform the include at the server level, making the request for it happen at the file system level on the server,
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hover:shadow-2xl shadow-lg bg-white rounded-xl">
                      <div className="">
                        <Link href="/jobs">
                          <a>
                            <Image
                              src={Post}
                              width={330}
                              height={180}
                              placeholder="blur"
                              className="object-fit rounded-t-xl"
                              alt=""
                            />
                          </a>
                        </Link>
                        <div className="p-3">
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-bold text-indigo-400">Products Name</div>
                            <Link href="">
                              <a>
                                <div className="flex gap-1">
                                  <EyeIcon className="h-5 w-5 text-indigo-400" />
                                  <TrashIcon className="h-5 w-5 text-indigo-400" />
                                </div>
                              </a>
                            </Link>
                          </div>
                          <div className="font-extralight"><b className="font-bold text-indigo-400">discription:</b> This will perform the include at the server level, making the request for it happen at the file system level on the server,
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hover:shadow-2xl shadow-lg bg-white rounded-xl">
                      <div className="">
                        <Link href="/jobs">
                          <a>
                            <Image
                              src={Post}
                              width={330}
                              height={180}
                              placeholder="blur"
                              className="object-fit rounded-t-xl"
                              alt=""
                            />
                          </a>
                        </Link>
                        <div className="p-3">
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-bold text-indigo-400">Products Name</div>
                            <Link href="">
                              <a>
                                <div className="flex gap-1">
                                  <EyeIcon className="h-5 w-5 text-indigo-400" />
                                  <TrashIcon className="h-5 w-5 text-indigo-400" />
                                </div>
                              </a>
                            </Link>
                          </div>
                          <div className="font-extralight"><b className="font-bold text-indigo-400">discription:</b> This will perform the include at the server level, making the request for it happen at the file system level on the server,
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hover:shadow-2xl shadow-lg bg-white rounded-xl">
                      <div className="">
                        <Link href="/jobs">
                          <a>
                            <Image
                              src={Post}
                              width={330}
                              height={180}
                              placeholder="blur"
                              className="object-fit rounded-t-xl"
                              alt=""
                            />
                          </a>
                        </Link>
                        <div className="p-3">
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-bold text-indigo-400">Products Name</div>
                            <Link href="">
                              <a>
                                <div className="flex gap-1">
                                  <EyeIcon className="h-5 w-5 text-indigo-400" />
                                  <TrashIcon className="h-5 w-5 text-indigo-400" />
                                </div>
                              </a>
                            </Link>
                          </div>
                          <div className="font-extralight"><b className="font-bold text-indigo-400">discription:</b> This will perform the include at the server level, making the request for it happen at the file system level on the server,
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hover:shadow-2xl shadow-lg bg-white rounded-xl">
                      <div className="">
                        <Link href="/jobs">
                          <a>
                            <Image
                              src={Post}
                              width={330}
                              height={180}
                              placeholder="blur"
                              className="object-fit rounded-t-xl"
                              alt=""
                            />
                          </a>
                        </Link>
                        <div className="p-3">
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-bold text-indigo-400">Products Name</div>
                            <Link href="">
                              <a>
                                <div className="flex gap-1">
                                  <EyeIcon className="h-5 w-5 text-indigo-400" />
                                  <TrashIcon className="h-5 w-5 text-indigo-400" />
                                </div>
                              </a>
                            </Link>
                          </div>
                          <div className="font-extralight"><b className="font-bold text-indigo-400">discription:</b> This will perform the include at the server level, making the request for it happen at the file system level on the server,
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hover:shadow-2xl shadow-lg bg-white rounded-xl">
                      <div className="">
                        <Link href="/jobs">
                          <a>
                            <Image
                              src={Post}
                              width={330}
                              height={180}
                              placeholder="blur"
                              className="object-fit rounded-t-xl"
                              alt=""
                            />
                          </a>
                        </Link>
                        <div className="p-3">
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-bold text-indigo-400">Products Name</div>
                            <Link href="">
                              <a>
                                <div className="flex gap-1">
                                  <EyeIcon className="h-5 w-5 text-indigo-400" />
                                  <TrashIcon className="h-5 w-5 text-indigo-400" />
                                </div>
                              </a>
                            </Link>
                          </div>
                          <div className="font-extralight"><b className="font-bold text-indigo-400">discription:</b> This will perform the include at the server level, making the request for it happen at the file system level on the server,
                          </div>
                        </div>
                      </div>
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

export default ProductsList;