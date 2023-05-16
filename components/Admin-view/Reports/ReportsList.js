import React, { Component, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { CogIcon, EyeIcon, SearchIcon } from '@heroicons/react/solid';
import Post from "../../../public/images/groupcover.jpg";
import { TrashIcon } from '@heroicons/react/outline';
import { ADMIN_REPORT_API } from '../../../pages/config';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const ReportsList =()=> {
  const [reports, setReports] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpage1, setcurrentpage1] = useState(1);
  const [lastpage, setlastpage] = useState(0);
  const [search, setsearch] = useState(0);
  const [search1, setsearch1] = useState([]);

  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }

  const GetReports = async()=>{      
    await fetch(ADMIN_REPORT_API+"?page=" + currentpage, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        console.log(result.data);
        const mergedata = [...reports, ...result.data]
        setReports(mergedata);
        setcurrentpage(result.pages.next_page)
        setlastpage(result.pages.total_reports)
      }
    })
    .catch((err) => console.log(err));
  }

  const searchpage = async()=>{      
    await fetch(ADMIN_REPORT_API+"?page=1", {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        setReports(result.data);
        setcurrentpage(result.pages.next_page);
        setlastpage(result.pages.total_reports);
      }
    })
    .catch((err) => console.log(err)); 
  }

  async function detelePage(pageId){
    var checks =confirm("Are you sure..?");
    if(checks){
      const res = await axios(ADMIN_REPORT_API + "/" + pageId, {
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
      await GetReports();
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
      await fetch(ADMIN_REPORT_API+"/page_search"+"?query="+event, {
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
              setReports(result.data);
              setcurrentpage(result.pages.next_page);
              setcurrentpage1(result.pages.next_page);
              setlastpage(result.pages.total_reports);
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
      await fetch(ADMIN_REPORT_API+"/page_search"+"?query="+event+"&page="+currentpage1, {
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
              const mergedata = [...reports, ...result.data]
              setReports(mergedata);
              setcurrentpage(result.reports.next_page);
              setcurrentpage1(result.reports.next_page);
              setlastpage(result.reports.total_reports);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    GetReports();
  }, []);
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
               <InfiniteScroll
                  dataLength={reports.length}
                  next={fetchMoreData}
                  hasMore={currentpage != null }
                  loader={<div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                  className="grid grid-cols-2 gap-6"
                >
                  {reports && reports.map((report)=>(
                  <div className="shadow-lg bg-white flex justify-between rounded-xl p-2"
                    id={`report-${report.id}`}
                    key={report.id}
                  >
                    <Link  
                      href={{
                            pathname: "/events-design/event-view",
                            query: report.news_feed.id
                      }}>
                    <div className="flex gap-4 items-start">
                      {/* <Link  
                      href={{
                            pathname: "/events-design/event-view",
                            query: report.news_feed.id
                      }}>
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
                      </Link> */}
                      <div>
                        <div className="text-sm">
                          <Link href={{pathname: "/User-Profile", query:report.news_feed.user.id,}}>
                            <a>
                              Posted by <b className="text-indigo-400">{report.news_feed.user.first_name+" "+report.news_feed.user.last_name}</b>
                            </a>
                          </Link>
                        </div>
                        <div className="text-xs">
                          <Link href={{pathname: "/User-Profile", query:report.user.id,}}>
                            <a>
                              Post reported by <b className="text-indigo-400">{report.user.first_name+" "+report.user.last_name}</b>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                    </Link>
                    {/* <Link href="">
                      <a> */}
                        <div className="flex">
                          <Link  
                            href={{
                                  pathname: "/events-design/event-view",
                                  query: report.news_feed.id
                            }}>
                          <EyeIcon className="h-5 w-5 text-indigo-400" />
                          </Link>
                          {/* <TrashIcon className="h-5 w-5 text-indigo-400" /> */}
                        </div>
                      {/* </a>
                    </Link> */}
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

export default ReportsList;