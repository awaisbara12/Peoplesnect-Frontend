import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SugestionProfile from "../../../public/images/profile-avatar.png";
import MariaProfile from "../../../public/images/mariamomo.png";
import MiraProfile from "../../../public/images/mira.png";
import {
  PlusIcon,
  DotsHorizontalIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { GROUP_API } from "../../../pages/config";

const GroupsSuggesions = () => {
  const [joingroups,setJoinGroups] = useState();

  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  
  // suggested Group
  const SuggestedGroups =()=>{
    const res = fetch(GROUP_API+"?page="+2, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      console.log(result)
      setJoinGroups(result.data)
    })
  }
  useEffect(() => {
    SuggestedGroups();
  },[])
  return (
    <>
      <div className="bg-white p-5 mt-5 rounded-xl">
        <div className="text-base font-bold leading-5">Suggested Groups for you</div>
        
        
        {joingroups && joingroups.map((i)=>(
             <Link href={{pathname:"/group-page/suggest-group", query:i.id}} key={i.id}>
                <a>
                  <div className="px-3 py-2 hover:bg-gray-100 rounded-xl flex justify-between items-center mt-4">
                    <div className="flex gap-2 items-center">
                      <UserGroupIcon className="w-5 h-5" />
                      <p className="text-base font-semibold">{i.title}</p>
                    </div>
                  </div>
                </a>
              </Link>
        ))}
       




        {/* <Link href="/group-page/joind-group">
          <a href="">
            <div className="px-3 py-2 hover:bg-gray-100 rounded-xl flex justify-between items-center mt-4">
              <div className="flex gap-2 items-center">
                <UserGroupIcon className="w-5 h-5" />
                <p className="text-base font-semibold">Group Name</p>
              </div>
            </div>
          </a>
        </Link>
        <Link href="/group-page/joind-group">
          <a href="">
            <div className="px-3 py-2 hover:bg-gray-100 rounded-xl flex justify-between items-center mt-4">
              <div className="flex gap-2 items-center">
                <UserGroupIcon className="w-5 h-5" />
                <p className="text-base font-semibold">Group Name</p>
              </div>
            </div>
          </a>
        </Link> */}
        
        {/* Button Create New Page */}
        <Link href="/group-page/new-group">
          <a className="mt-2 flex gap-1 border bg-gray-100 justify-center rounded-full p-2">
            <PlusIcon className="h-5 w-5" />
            Create New Group
          </a>
        </Link>
      </div>
    </>
  );
};

export default GroupsSuggesions;
