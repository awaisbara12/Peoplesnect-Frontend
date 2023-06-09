import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CogIcon, PencilAltIcon, SearchIcon } from '@heroicons/react/solid';
import ProfileLogo from "../../../public/images/main-banners.jpg";
import { EyeIcon, TrashIcon } from '@heroicons/react/outline';
import { ADMIN_PAGE_API, CURENT_USER_LOGIN_API } from "../../../pages/config";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from 'react-spinners/ClipLoader';
import axios from "axios";
import Router from "next/router";

const PagesList =()=> {
  const [pages, setPages] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpage1, setcurrentpage1] = useState(1);
  const [lastpage, setlastpage] = useState(0);
  const [search, setsearch] = useState(0);
  const [search1, setsearch1] = useState([]);

  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }

  const GetPages = async()=>{      
    await fetch(ADMIN_PAGE_API+"?page=" + currentpage, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        const mergedata = [...pages, ...result.data]
        setPages(mergedata);
        setcurrentpage(result.pages.next_page)
        setlastpage(result.pages.total_pages)
      }
    })
    .catch((err) => console.log(err));
  }

  const searchpage = async()=>{      
    await fetch(ADMIN_PAGE_API+"?page=1", {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        setPages(result.data);
        setcurrentpage(result.pages.next_page);
        setlastpage(result.pages.total_pages);
      }
    })
    .catch((err) => console.log(err)); 
  }

  async function detelePage(pageId){
    var checks =confirm("Are you sure..?");
    if(checks){
      const res = await axios(ADMIN_PAGE_API + "/" + pageId, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: authKey,
        },
        credentials: "same-origin",
      });
      const result = await res;
      if(result){
        document.getElementById(`page-${pageId}`).classList.add("hidden");
      }
    }
  }

  const fetchMoreData = async()=>{
    if(search == "0"){
      setcurrentpage1(1);
      await GetPages();
    }else{
      await searchmultiples2(search1);
    }
  }

  const handlechange = (event)=>{
    if( event.target.value !==undefined){
      setsearch1(event.target.value);
      searchmultiples(event.target.value);
    }
  }

  const searchmultiples  = async(event) =>{
    if (!event?.length>0){
      setcurrentpage(1);
      setcurrentpage1(1);
      setsearch(0);
      searchpage();
    }else{
      await fetch(ADMIN_PAGE_API+"/page_search"+"?query="+event, {
        method: "GET",
         headers: {
          Accept: "application/json", 
           Authorization: `${authKey}`,
         },
      })
         .then((resp) => resp.json())
        .then(async (result) => {
          if (result) {
            if (!event){
              setsearch(0);
              searchpage();
            }else{
              setsearch(1);
              setPages(result.data);
              setcurrentpage(result.pages.next_page);
              setcurrentpage1(result.pages.next_page);
              setlastpage(result.pages.total_pages);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }

  const searchmultiples2  = async(event) =>{
    if (!event?.length>0){
      setcurrentpage(1);
      setcurrentpage1(1);
      setsearch(0);
      searchpage();
    }else{
      await fetch(ADMIN_PAGE_API+"/page_search"+"?query="+event+"&page="+currentpage1, {
        method: "GET",
         headers: {
          Accept: "application/json", 
           Authorization: `${authKey}`,
         },
      })
         .then((resp) => resp.json())
        .then(async (result) => {
          if (result) {
            if (!event){
              setsearch(0);
              searchpage();
            }else{
              setsearch(1);
              const mergedata = [...pages, ...result.data]
              setPages(mergedata);
              setcurrentpage(result.pages.next_page);
              setcurrentpage1(result.pages.next_page);
              setlastpage(result.pages.total_pages);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    GetPages();
  }, []);

  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="mt-8">
          <div>
            <div className="text-center">
              <div className="heading text-4xl font-semibold text-indigo-400">Pages List</div>
              <div className="relative w-1/2 mx-auto mt-4">
                <input
                  className="placeholder:text-md placeholder:text-indigo-500 pl-12  hover:shadow-lg bg-white placeholder:rounded-full  border-indigo-400 w-full rounded-full"
                  placeholder="Search Page Name"
                  type="text"
                  name="search"
                  onChange={handlechange}
                  onScroll={handlechange}
                />
                <div className="absolute top-3 left-6">
                  <SearchIcon className="h-5 w-5 text-indigo-400" />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="">
                <InfiniteScroll
                  dataLength={pages.length}
                  next={fetchMoreData}
                  hasMore={currentpage != null }
                  loader={<div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                  className="grid grid-cols-2 gap-6"
                >
                  {pages && pages.map((page)=>(
                    <div 
                      className="hover:shadow-2xl shadow-lg bg-white flex items-start justify-between rounded-xl p-2"
                      id={`page-${page.id}`}
                      key={page.id}>
                    <Link href={{pathname: "/page-design/liked-pages", query: page.id}}>
                      <a>
                        <div className="flex items-start gap-2 items-center">
                          {page && page.display_photo_url?(
                            <img
                              src={page.display_photo_url}
                              className="object-cover rounded-full h-[40px] w-[40px]"
                              placeholder="empty"
                              alt="profile-image"
                            />
                            ):( 
                            <Image
                              src={ProfileLogo}
                              className="object-cover rounded-xl"
                              width={40}
                              height={40}
                              alt=""
                            />
                          )}
                          <div className="text-sm">
                            <div className="font-bold text-indigo-400">{page.name}</div>
                            <div className="font-extralight">Created by <b className="font-bold text-indigo-400">{page.owner.first_name+" "+page.owner.last_name}</b></div>
                          </div>
                        </div>
                      </a>
                    </Link>
                    <div className="flex items-start gap-1">
                      <Link href={{pathname: "/Admin/pages-list/Edit-Pages", query: page.id,}}>
                          <a className="flex gap-1 ">
                            <PencilAltIcon className="h-5 w-5 text-indigo-400" />
                          </a>
                      </Link>
                      <Link href={{pathname: "/page-design/liked-pages", query: page.id}}>
                        <a>
                          <EyeIcon className="h-5 w-5 text-indigo-400" />
                        </a>
                      </Link>
                      <button
                        key="Delete"
                        onClick={() => detelePage(page.id)}
                      >
                        <TrashIcon className="h-5 w-5 text-indigo-400" />
                      </button>
                    </div>  
                  </div>
                  ))}
                </InfiniteScroll>
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

export default PagesList;