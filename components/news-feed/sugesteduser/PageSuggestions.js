import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DotsHorizontalIcon, PlusIcon } from "@heroicons/react/outline";
import { ThumbUpIcon } from "@heroicons/react/solid";
import { PAGES_API } from "../../../pages/config";

const PageSuggesions = () => {
  const [SugestPages,setSuggestedPages] = useState();
// Bareer Key
if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  
  // Get Suggested Group Lists
  const SuggestedPages =()=>{
    const res = fetch(PAGES_API+"?page="+2, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      setSuggestedPages(result.data)
      console.log(result.data)
    })
  }

  useEffect(() => {
    SuggestedPages();
  },[])
  return (
    <>
      <div className="bg-white p-5 mt-5 rounded-xl">
        <div className="text-base font-bold leading-5">Page Suggestions For You </div>
        {SugestPages && 
          SugestPages.map((i)=>(
            <Link href={{pathname:"/page-design/suggested-pages",query:i.id}} key={i.id}>
              <a >
                <div className="px-3 py-2 hover:bg-gray-100 rounded-xl flex justify-between items-center mt-4">
                  <div className="flex gap-2 items-center">
                    <ThumbUpIcon className="w-5 h-5" />
                    <p className="text-base font-semibold">{i.name}</p>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        
        
        {/* <Link href="/page-design/liked-pages">
          <a href="">
            <div className="px-3 py-2 hover:bg-gray-100 rounded-xl flex justify-between items-center mt-4">
              <div className="flex gap-2 items-center">
                <ThumbUpIcon className="w-5 h-5" />
                <p className="text-base font-semibold">Page Name</p>
              </div>
            </div>
          </a>
        </Link>
        <Link href="/page-design/liked-pages">
          <a href="">
            <div className="px-3 py-2 hover:bg-gray-100 rounded-xl flex justify-between items-center mt-4">
              <div className="flex gap-2 items-center">
                <ThumbUpIcon className="w-5 h-5" />
                <p className="text-base font-semibold">Page Name</p>
              </div>
            </div>
          </a>
        </Link> */}
        
        <Link href="/page-design/new-page">
          <a className="mt-2 flex gap-1 border bg-gray-100 justify-center rounded-full p-2">
            <PlusIcon className="h-5 w-5" />
            Create New Page
          </a>
        </Link>
      </div>
    </>
  );
};

export default PageSuggesions;
