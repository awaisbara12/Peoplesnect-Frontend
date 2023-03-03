import { ThumbUpIcon, XCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { LIKE_PAGES_API, PAGES_API } from "../../../pages/config";
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';
const ShowAll = () => {
  const [myPages,setmyPages] = useState();
  const [likedPages,setlikedPages] = useState();
  const [SugestPages,setSuggestedPages] = useState([]);
  const [type, setType] = useState();
  const [currentpage, setcurrentpage] = useState(1);

  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");

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
  // Hide User From Suggestion
  const hideUser=async(id)=>
  {
    await fetch(PAGES_API+"?id="+id, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setSuggestedPages(result.data);
          //console.log("All Users",result)
        }
      })
      .catch((err) => console.log(err));
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
    const res = fetch(PAGES_API+"?page="+currentpage, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
     console.log(result)
      const mergedata = [...SugestPages, ...result.data]
      setSuggestedPages(mergedata);
      setcurrentpage(result.pages.next_page)
    })
}
  // Confirm which function Is Run
   const confirms=()=>{
    if (myArray){
      if(myArray[1]=="My")MyPages();
      else if(myArray[1]=="Liked")LikedPages();
      else if(myArray[1]=="Suggested")SuggestedPages(); 
      setType(myArray[1]);
    }
  }
  useEffect(() => {
    confirms();
  },[])

  const fetchMoreData = () => {
    SuggestedPages();
  }


  return (
    <div className="mt-8">
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
       {/* My Page */}
       {type=="My"?(
        <div className="rounded-xl p-4">
          <div className="justify-between flex items-center">
            <div className="heading font-semibold">My Pages</div>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
              {myPages?(
                myPages.map((i)=>(
                  <div className="profile mt-10 border rounded-xl bg-white" key={i.id}>
                    <Link  href={{pathname: "liked-pages", query: i.id,}}>
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
                        <Link  href={{pathname: "liked-pages", query: i.id,}}>
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
       ):('')}
       
       {/* Liked Page */}
       {type=="Liked"?(
        <div className=" rounded-xl p-4 mt-10">
          <div className="justify-between flex items-center">
            <div className="heading font-semibold">Liked Pages</div>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
            {likedPages?(
                likedPages.map((i)=>(
                  <div className="profile mt-10 border rounded-xl bg-white" key={i.id}>
                    <Link  href={{pathname: "liked-pages", query: i.id,}}>
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
                        <Link  href={{pathname: "liked-pages", query: i.id,}}>
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
       ):('')}

        {/* Suggested Page */}
       {type=="Suggested"?(
        <div className="mt-8">
          <div className="rounded-xl p-4">
            <div className="justify-between flex items-center">
              <div className="heading font-semibold">Suggestions For You</div>
            </div>
            {/* <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2  md:grid-cols-2"> */}
            {SugestPages?(
                <InfiniteScroll
                  dataLength={SugestPages.length}
                  next={fetchMoreData}
                  className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2"
                  hasMore={currentpage != null}
                  loader={<div className="flex justify-center "><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                >
                 { SugestPages.map((i)=>(
                    <div className="profile mt-10 border rounded-xl bg-white" key={i.id}>
                      {/* page-design/suggested-pages */}
                      <Link  href={{pathname: "suggested-pages", query: i.id,}}>
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
                          <Link href="">
                            <a>
                              <XCircleIcon className="w-5 h-5 hover:w-10 hover:h-10 transition-all text-white" onClick={ () =>hideUser(i.id)}/>
                            </a>
                          </Link>
                        </div>
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
                      
                        <div className="flex justify-end">
                        <button onClick={()=>PageLikeFun(i.id)} className="w-20 flex gap-2 justify-center bg-indigo-400 text-white rounded-xl py-2 hover:text-indigo-400 hover:bg-transparent  border-1 border-indigo-400 mt-2 mb-4">
                          <ThumbUpIcon className="w-5 h-5" />
                          <div className="">Like</div>
                        </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </InfiniteScroll>):('')
              }
            {/* </div> */}
          </div>
        </div>
       ):("")}
      </div>
    </div>
  );
};

export default ShowAll;
