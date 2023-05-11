import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Compnylogo from "../../public/images/compny-logo.png";
import Compnylogo1 from "../../public/images/logo1.jpeg";
import Compnylogo2 from "../../public/images/logo2.jpeg";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  BookmarkIcon,
  ClipboardCopyIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { JOBS_API, USE_APPLY_JOB_API } from "../../pages/config";
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RecommendedJobs = () => {
  const [Recomend, setRecomend] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  // CopyLink
  const copylink=(postid)=>{    
    const links=window.location.href        // get Full Link
    // const links1=window.location.pathname   // get link after 
    // const copylink1 = links.split(links1)    // get link domain like(localhost..etc)
    navigator.clipboard.writeText(links+"/jobs-show?"+postid);
    alert("Link Copied to your Clipboard");
  }
  // Saved job function
  const savedJobs =(job_id,status)=>{
    fetch(USE_APPLY_JOB_API+"/create_applied_job?applied_jobs[job_id]="+job_id+"&applied_jobs[status]="+status, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          // setRecomend(result.data)
          // Recomended();
          document.getElementById(`job-${job_id}`).classList.add("hidden");
        }
      })
      .catch((err) => console.log(err));
  }
  //  GET ALL JOBS
  const Recomended =()=>{
    fetch(JOBS_API+"?page="+currentpage, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          const mergedata = [...Recomend, ...result.data]
          setRecomend(mergedata);
          console.log(result.pages.next_page)
          setcurrentpage(result.pages.next_page)
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    Recomended();
  }, []);


  const fetchMoreData = () => {
    Recomended();
  }
  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 xl:px-0 lg:px-0">
        <div className="">
          <div className="bg-white rounded-xl p-4 mb-4 ">
            <div className="heading font-bold">Recommended for you</div>
            {/* <div className="font-extralight mt-1">Based on your profile</div> */}
          </div>
          <div className="">
            {Recomend?(
              <InfiniteScroll
                dataLength={Recomend.length}
                next={fetchMoreData}
                className="grid grid-cols-2 gap-12"
                hasMore={currentpage != null}
                loader={<div className="flex justify-center "><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
              >
              {Recomend.map((i)=>(
                <div className="jobs-profile bg-white rounded-xl p-4" 
                  id={`job-${i.id}`}
                  key={i.id}
                >
                  <div className="flex  justify-between">
                    <div className="">
                          {i.company_photo?
                            (
                              <Link href={{pathname: "/jobs/jobs-show", query:i.id,}}>
                              <a>
                                <img 
                                  src={i.company_photo} 
                                  className="object-cover z-40 h-[65px] w-[65px]"
                                  alt="" />
                                  <div className="userfield font-extrabold">{i.title}</div>
                              </a>
                              </Link>
                            )
                            :
                            (
                              <Link href={{pathname: "/jobs/jobs-show", query:i.id,}}>
                              <a>
                                <Image src={Compnylogo1} width={65} height={65} alt="" />
                                <div className="userfield font-extrabold">{i.title}</div>
                              </a>
                              </Link>
                            )
                          }
                        <Link href={{pathname: "/jobs/jobs-show", query:i.id,}}>
                        <a>
                          <div className="">
                              <div className="username text-sm mt-2 font-light">
                                {i.description && i.description.length>200?i.description.slice(2,150)+"...":i.description}
                              </div>
                              <div className="userfield text-sm font-bold">
                                {i.job_location}
                              </div>
                            <div className="mt-2 font-thin">Posted Date: {i.created_at}</div>
                          </div>
                        </a>
                        </Link>
                      <div className="flex gap-4 mt-5">
                      <Link href={{pathname: "/jobs/jobs-show", query:i.id,}}>
                        <a>
                        <button className="bg-indigo-400 p-2 text-white rounded-full" >Apply Now</button>
                        </a>
                      </Link>
                        <button className="border-indigo-400 border p-2 text-indigo-400 rounded-full">Message</button>
                      </div>
                    </div>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex justify-center">
                          <DotsHorizontalIcon
                            className="-mr-1 ml-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
  
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                      <Menu.Items className="absolute top-6 w-48 right-0">
                          <div className="flex items-start flex-col gap-2 border-1 rounded-xl p-2">
                            <Menu.Item>
                              {({ active }) => (
                                <a className={classNames("text-sm flex gap-2 py-2 cursor-pointer")}onClick={()=>{savedJobs(i.id,"saved")}}>
                                  <BookmarkIcon className="h-5 w-5" />
                                  Save
                                </a>
                              )}
                            </Menu.Item>
  
                            <Menu.Item>
                              {({ active }) => (
                                <a 
                                  className={classNames(
                                    active ? "" : "",
                                    "text-sm flex gap-2 cursor-pointer"
                                  )}
                                  onClick={()=>copylink(i.id)}
                                >
                                  <ClipboardCopyIcon className="h-5 w-5" />
                                  Share
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              ))}
              </InfiniteScroll>
            ):('')}
          </div>

              {/* <div className="bg-white py-4 mt-2 rounded-xl">
                <div className="text-center">
                  <Link className="" href="">
                    <a className="text-indigo-400 underline">Search For More Jobs</a>
                  </Link>
                </div>
              </div> */}
        </div>
      </div>
    </div>
  );
};

export default RecommendedJobs;
