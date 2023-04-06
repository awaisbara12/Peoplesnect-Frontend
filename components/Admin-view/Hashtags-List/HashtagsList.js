import React, { Component } from 'react';
import Link from "next/link";
import Image from "next/image";
import { CogIcon, SearchIcon } from '@heroicons/react/solid';
import ProfileLogo from "../../../public/images/main-banners.jpg";
import { EyeIcon, TrashIcon } from '@heroicons/react/outline';
class HashtagsList extends Component {
  render() {
    return (
      <div className="mt-8">
        <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="mt-8">
            <div>
              <div className="text-center">
                <div className="heading text-4xl font-semibold text-indigo-400">Hashtags List</div>
                <div className="relative w-1/2 mx-auto mt-4">
                  <input
                    className="placeholder:text-md placeholder:text-indigo-500 pl-12  hover:shadow-lg bg-white placeholder:rounded-full  border-indigo-400 w-full rounded-full"
                    placeholder="Search #Hashtags "
                    type="text"
                    name="search"
                  />
                  <div className="absolute top-3 left-6">
                    <SearchIcon className="h-5 w-5 text-indigo-400" />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <div className="">
                  <div className="grid grid-cols-4 gap-6">
                    <div className="hover:shadow-2xl shadow-lg bg-white flex items-center justify-between rounded-xl p-2">
                      <div>
                        #Hashtags
                      </div>
                      <Link href="">
                        <a>
                          <div className="flex gap-1">
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

export default HashtagsList;