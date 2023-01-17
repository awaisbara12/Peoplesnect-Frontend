import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CogIcon, DotsHorizontalIcon } from "@heroicons/react/outline";
import { HashtagIcon } from "@heroicons/react/solid";
import { HASHTAGS_API } from "../../pages/config";
const Hashtags = () => {
  let [hastags, sethastags] = useState();
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  // Get All Hashtags
  const HashTags=async()=>{
    await fetch(HASHTAGS_API, {
      method: "GET",
       headers: {
        Accept: "application/json",
         Authorization: `${authKey}`,
       },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          sethastags(result.data);
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    HashTags();
  },[]);
  return (
    <div>
      <div className="mt-8">
      <div className="mt-8 w-[600px] xl:w-[980px] lg:w-[710px] md:w-[780px] px-5 md:px-0 lg:px-0 xl:px-0">
          <div className="">
            <div className="relative">
              <input
                className="placeholder:text-md text-gray-500 pl-12  hover:shadow-lg bg-white placeholder:rounded-full  border-none w-full rounded-full py-3"
                placeholder="Hashtags Search"
                type="text"
                name="search"
              />
              <div className="absolute top-3.5 left-6">
                <HashtagIcon className="h-5 w-5 opacity-40" />
              </div>
              <div className="absolute top-3.5 right-4">
                <CogIcon className="h-5 w-5 opacity-40" />
              </div>
            </div>
            <div className=" border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="text-lg font-bold">Top Trending Hashtags</div>
              <div className="mt-4">
                {hastags?(
                  hastags.map((i)=>(
                    <Link  href={{pathname: "hashtag-design/hashtags-show", query: i.id}} key={i.id}>
                      <a >
                        <div className="flex justify-between items-center hover:bg-gray-100" >
                          <div className="py-2 px-4 rounded-full hover:bg-gray-100">
                            <div className="font-bold">{i.name}</div>
                            <div className="mt-1">{i.count} tags</div>
                          </div>
                          <DotsHorizontalIcon className="h-5 w-5" />
                        </div>
                      </a>
                    </Link>
                  ))
                ):('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hashtags;