import React, { useState, useEffect, setState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import Cover from "../../../../public/images/main-banner.jpg";
import { XCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import dynamic from 'next/dynamic'

function PageSearch() {
  return (
    <div className="mt-8">
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="bg-white rounded-xl">
          <div className="flex justify-between items-center border-b-1 p-4">
            <div className="heading">Search Pages</div>
          </div>
          <div className="border-b-1">
            <div className="request-profile flex  px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <Link 
                  href="/User-Profile/"
                  >
                  <a>
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                  </a>
                </Link>
                <div className="">
                <Link href="/User-Profile/">
                  <a>
                    <div className="username text-sm font-bold">Page Name</div>
                    <div className="mutual-followers text-xs">3k Likes</div>
                  </a>
                  </Link>
                </div>
              </div>
              <div className="Request-button flex items-center gap-2">
                <button className="border-1 border-indigo-400 rounded-full text-indigo-400 px-3 py-1 hover:bg-indigo-400 hover:text-white"
                  >
                  Like
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageSearch;
