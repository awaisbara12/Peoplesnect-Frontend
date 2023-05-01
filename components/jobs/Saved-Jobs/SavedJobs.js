import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Compnylogo from "../../../public/images/compny-logo.png";
import Compnylogo1 from "../../../public/images/logo1.jpeg";
import Compnylogo2 from "../../../public/images/logo2.jpeg";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ClipboardCopyIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/solid";
import { USE_APPLY_JOB_API, WS_PUBLIC_API} from "../../../pages/config";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SavedJobs = () => {
  const [Applied_list, setApplied_list] = useState();

  
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}

  // CopyLink
  const copylink=(postid)=>{    
    const links=window.location.href        // get Full Link
    const links1=window.location.pathname   // get link after 
    const copylink1 = links.split(links1)    // get link domain like(localhost..etc)
    navigator.clipboard.writeText(copylink1[0]+"/jobs/jobs-show?"+postid);
    alert("Link Copied to your Clipboard ");
  }
  // Removed saved_Jobs
  const removeSavedJob =(ID)=>{
    fetch(USE_APPLY_JOB_API+"/"+ID, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          SavedJobList("saved");
        }
      })
      .catch((err) => console.log(err));
  }
  //  GET ALL JOBS on which user applied
  const SavedJobList =(status)=>{
    fetch(USE_APPLY_JOB_API+"?status="+status, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setApplied_list(result.data)
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    SavedJobList("saved");
  }, []);
  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 xl:px-0 lg:px-0">
        <div className="bg-white rounded-xl">
          <div className="border-b-1 p-4">
            <div className="heading font-bold">Saved Jobs</div>
          </div>
          
          {Applied_list?(
            Applied_list.map((i)=>(
              <div className="border-b-1" key={i.jobs.id}>
                <div className="jobs-profile px-4 py-10 ">
                  <div className="flex  justify-between">
                    <Link href={{pathname: "/jobs/jobs-show", query:i.jobs.id,}}>
                      <a>
                        <div className="flex items-center gap-5">
                          {i.jobs.company_photo?
                          ( <img src={i.jobs.company_photo} className="object-cover z-40 h-[92px] w-[92px]" alt="" />)
                          :
                          (<Image src={Compnylogo1} width={92} height={92} alt="" />)}
                          <div className="">
                            <div className="username text-sm font-bold">{i.jobs.title}</div>
                            <div className="userfield font-light">{i.jobs.employeement_type}</div>
                            <div className="userfield font-extralight">{i.jobs.job_location}</div>
                            <div className=" font-thin">job Posted: {i.jobs.created_at}</div>
                          </div>
                        </div>
                      </a>
                    </Link>
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
                                <a onClick={()=>removeSavedJob(i.id)} className={classNames("cursor-pointer text-sm flex py-2 border-b gap-2")}>
                                  <BookmarkIcon className="h-5 w-5" />
                                  Remove From Saved
                                </a>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  onClick={()=>copylink(i.jobs.id)}
                                  className={classNames(
                                    active ? "" : "",
                                    "text-sm flex gap-2 cursor-pointer"
                                  )}
                                >
                                  <ClipboardCopyIcon className="h-5 w-5" />
                                  Copy Link To Share
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            ))
          ):('')}
          
          {/* Load button */}
          {/* <div className="border-b-1 py-4">
            <div className="text-center">
              <Link className="" href="">
                <a className="text-indigo-400">Load More</a>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
