import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import Cover from "../../public/images/main-banner.jpg";
import { XCircleIcon } from "@heroicons/react/solid";
import { ThumbUpIcon } from "@heroicons/react/outline";
import { LIKE_PAGES_API, PAGES_API } from "../../pages/config";

const MainPage = () => {
  const [myPages,setmyPages] = useState();
  const [likedPages,setlikedPages] = useState();
  const [SugestPages,setSuggestedPages] = useState();
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  // page like function
  const PageLikeFun =(ID)=>{
    const res = fetch(LIKE_PAGES_API +"?page_id="+ID, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      SuggestedPages();
      LikedPages();
    })
  }
  // Get My_Pages lists
  const MyPages =()=>{
    const res = fetch(PAGES_API+"/my_pages", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      setmyPages(result.data)
    })
  }
  // Get Liked Pages lists
   const LikedPages =()=>{
    const res = fetch(PAGES_API+"/liked_pages", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      setlikedPages(result.data)
    })
  }
  // Get Suggested Group Lists
  const SuggestedPages =()=>{
      const res = fetch(PAGES_API, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      })
      .then((resp) => resp.json())
      .then((result) => {
        setSuggestedPages(result.data)
      })
  }
  useEffect(() => {
    SuggestedPages();
    LikedPages();
    MyPages();
  },[])
  return (
    <div className="mt-8">
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
       {/* My Page */}
        <div className="bg-white rounded-xl p-4">
          <div className="justify-between flex items-center">
            <div className="heading font-semibold">My Pages</div>
            <div className="all-button">
              <button className="bg-indigo-400 text-white px-3 py-2 rounded-full">
                Show All
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
              {myPages?(
                myPages.map((i)=>(
                  <div className="profile mt-10 border rounded-xl" key={i.id}>
                    <Link  href={{pathname: "page-design/liked-pages", query: i.id,}}>
                     <a>
                      <div className="relative cover">      
                        {/* Cover Photo */}
                        {i.cover_photo_url?(
                        <img
                          src={i.cover_photo_url}
                          className="object-cover rounded-t-xl h-[96px] w-[620px]"
                          alt=""
                        />
                        ):(
                          <Image
                            className="object-cover rounded-t-xl"
                            src={Cover}
                            width={620}
                            height={200}
                            alt=""
                          />
                        )}   
                        {/* Dp */}
                        {i.display_photo_url?(
                          <div className="absolute -bottom-8 left-2">
                            <img
                              src={i.display_photo_url}
                              className="object-cover rounded-full z-40 h-[70px] w-[70px]"
                                alt=""
                            />
                          </div>
                        ):(
                          <div className="absolute -bottom-8 left-2">
                          <Image
                            className="object-cover"
                            src={ProfileAvatar}
                            width={55}
                            height={55}
                            alt=""
                          />
                          </div>
                        )}
                      </div>
                     </a>
                    </Link>
                    <div className="Details px-4 ">
                      <div className="ml-16">
                        <div className="User-Name font-bold capitalize">{i.name.substring(0,23)}</div>
                      </div>
                      <div className="details mt-5 font-light">
                        {i.description.substring(0,30)}
                      </div>
                      {i.page_likes_count?(
                        <div className="followers mt-2 font-extralight">
                          {i.page_likes_count} Liked
                        </div>
                      ):(
                        <div className="followers mt-2 font-extralight">
                          0 Liked
                        </div>
                      )}      
                      <div className="float-right">
                        <Link  href={{pathname: "page-design/liked-pages", query: i.id,}}>
                        <a >
                          <button className="px-2 bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                            Show Page
                          </button>
                        </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ):('')}
            
            {/* <div className="profile mt-10 border rounded-xl">
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
            </div> */}
          </div>
        </div>
       
       {/* Liked Page */}
        <div className="bg-white rounded-xl p-4 mt-10">
          <div className="justify-between flex items-center">
            <div className="heading font-semibold">Liked Pages</div>
            <div className="all-button">
              <button className="bg-indigo-400 text-white px-3 py-2 rounded-full">
                Show All
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
            {/* <div className="profile mt-10 border rounded-xl">
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
            </div> */}
            {likedPages?(
                likedPages.map((i)=>(
                  <div className="profile mt-10 border rounded-xl" key={i.id}>
                    <Link  href={{pathname: "page-design/liked-pages", query: i.id,}}>
                     <a>
                      <div className="relative cover">      
                        {/* Cover Photo */}
                        {i.cover_photo_url?(
                        <img
                          src={i.cover_photo_url}
                          className="object-cover rounded-t-xl h-[96px] w-[620px]"
                          alt=""
                        />
                        ):(
                          <Image
                            className="object-cover rounded-t-xl"
                            src={Cover}
                            width={620}
                            height={200}
                            alt=""
                          />
                        )}   
                        {/* Dp */}
                        {i.display_photo_url?(
                          <div className="absolute -bottom-8 left-2">
                            <img
                              src={i.display_photo_url}
                              className="object-cover rounded-full z-40 h-[70px] w-[70px]"
                                alt=""
                            />
                          </div>
                        ):(
                          <div className="absolute -bottom-8 left-2">
                          <Image
                            className="object-cover"
                            src={ProfileAvatar}
                            width={55}
                            height={55}
                            alt=""
                          />
                          </div>
                        )}
                      </div>
                     </a>
                    </Link>
                    <div className="Details px-4 ">
                      <div className="ml-16">
                        <div className="User-Name font-bold capitalize">{i.name.substring(0,23)}</div>
                      </div>
                      <div className="details mt-5 font-light">
                        {i.description.substring(0,30)}
                      </div>
                      {i.page_likes_count?(
                        <div className="followers mt-2 font-extralight">
                          {i.page_likes_count} Liked
                        </div>
                      ):(
                        <div className="followers mt-2 font-extralight">
                          0 Liked
                        </div>
                      )}      
                      <div className="float-right">
                        <Link  href={{pathname: "page-design/liked-pages", query: i.id,}}>
                        <a >
                          <button className="px-2 bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                            Show Page
                          </button>
                        </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ):('')}
          </div>
        </div>

        {/* Suggested Page */}
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
            {SugestPages?(
                SugestPages.map((i)=>(
                  <div className="profile mt-10 border rounded-xl" key={i.id}>
                    {/* page-design/suggested-pages */}
                    <Link  href={{pathname: "page-design/suggested-pages", query: i.id,}}>
                    <a>
                    <div className="relative cover">      
                      {/* Cover Photo */}
                      {i.cover_photo_url?(
                       <img
                        src={i.cover_photo_url}
                        className="object-cover rounded-t-xl h-[96px] w-[620px]"
                        alt=""
                       />
                      ):(
                        <Image
                          className="object-cover rounded-t-xl"
                          src={Cover}
                          width={620}
                          height={200}
                          alt=""
                        />
                      )}   
                      {/* Dp */}
                      {i.display_photo_url?(
                         <div className="absolute -bottom-8 left-2">
                          <img
                            src={i.display_photo_url}
                            className="object-cover rounded-full z-40 h-[70px] w-[70px]"
                              alt=""
                          />
                        </div>
                      ):(
                        <div className="absolute -bottom-8 left-2">
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={55}
                          height={55}
                          alt=""
                        />
                        </div>
                      )}
                      <div className="absolute top-2 right-1">
                        <Link href="./">
                          <a>
                            <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" />
                          </a>
                        </Link>
                      </div>
                    </div>
                    </a>
                    </Link>
                    <div className="Details px-4 ">
                      <a href="group-page/suggest-group">
                        <div className="ml-16">
                          <div className="User-Name font-bold capitalize">{i.name.substring(0,23)}</div>
                        </div>
                        <div className="details mt-5 font-light">
                         {i.description.substring(0,30)}
                        </div>
                      </a>
                      {i.page_likes_count?(
                        <div className="followers mt-2 font-extralight">
                          {i.page_likes_count} Liked
                        </div>
                      ):(
                        <div className="followers mt-2 font-extralight">
                          0 Liked
                        </div>
                      )}
                     
                      <div className="flex justify-end">
                      <button onClick={()=>PageLikeFun(i.id)} className="w-20 flex gap-2 justify-center bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                        <ThumbUpIcon className="w-5 h-5" />
                        <div className="">Like</div>
                      </button>
                      </div>
                    </div>
                  </div>
                ))
              ):('')}
             
             
             
             
             
              {/* <div className="profile mt-10 border rounded-xl">
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
              </div> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
