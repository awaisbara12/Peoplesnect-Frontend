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
  DeviceTabletIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { BriefcaseIcon, Lock, LockClosedIcon } from "@heroicons/react/solid";
import { USE_APPLY_JOB_API } from "../../../pages/config";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AppliedJobs = () => {
  const [Applied_list, setApplied_list] = useState();
  
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}

  //  GET ALL JOBS on which user applied
  const AppliedJobList =(applied)=>{
    fetch(USE_APPLY_JOB_API+"?status="+applied, {
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
          console.log("data",result.data)
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    AppliedJobList("applied");
  }, []);
  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 xl:px-0 lg:px-0">
        <div className="bg-white rounded-xl">
          <div className="border-b-1 p-4">
            <div className="heading font-bold">Applied Jobs</div>
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
                          (<img src={i.jobs.company_photo} className="object-cover z-40 h-[92px] w-[92px]" alt="" />)
                          :
                          (<Image src={Compnylogo1} width={92} height={92} alt="" />)}
                          <div className="">
                            <div className="username text-sm font-bold">{i.jobs.title}</div>
                            <div className="userfield font-light">{i.jobs.employeement_type}</div>
                            <div className="userfield font-extralight">{i.jobs.job_location}</div>
                            <div className="mt-8 font-thin">job Posted 2days Ago</div>
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
                                <a href="#" className={classNames("text-sm flex py-2 gap-2")}>
                                  <BriefcaseIcon className="h-5 w-5" />
                                  Application Status
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link href={{pathname: "/jobs/jobs-show", query:i.jobs.id,}}>
                                <a
                                  className={classNames(
                                    active ? "" : "",
                                    "text-sm flex gap-2"
                                  )}
                                >
                                  <DeviceTabletIcon className="h-5 w-5" />
                                  Details Of Job
                                </a>
                                </Link>
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
          {/* <div className="border-b-1">
            <div className="jobs-profile px-4 py-10 ">
              <div className="flex  justify-between">
                <div className="flex items-center gap-5">
                  <Link href="/news-feed">
                    <a>
                      <Image src={Compnylogo} width={92} height={92} alt="" />
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm font-bold">
                        Software Development Engineer - Graduate 2021/2022,
                        Trilogy (Remote) - $60,000/year USD
                      </div>
                    </a>
                    <a href="">
                      <div className="userfield font-light">Company Type</div>
                    </a>
                    <a href="">
                      <div className="userfield font-extralight">
                        Company Location
                      </div>
                    </a>

                    <div className="mt-8 font-thin">Applied 2days Ago</div>
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
                            <a href="#" className={classNames("text-sm flex py-2 gap-2")}>
                              <BriefcaseIcon className="h-5 w-5" />
                              Application Status
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "" : "",
                                "text-sm flex gap-2"
                              )}
                            >
                              <DeviceTabletIcon className="h-5 w-5" />
                              Details Of Job
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
          <div className="border-b-1">
            <div className="jobs-profile px-4 py-10 ">
              <div className="flex  justify-between">
                <div className="flex items-center gap-5">
                  <Link href="/news-feed">
                    <a>
                      <Image src={Compnylogo1} width={92} height={92} alt="" />
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm font-bold">
                        Social Media Evaluation Project for Online Mystery
                        Shoppers for Punjabi Speakers in Pakistan
                      </div>
                    </a>
                    <a href="">
                      <div className="userfield font-light">Company Type</div>
                    </a>
                    <a href="">
                      <div className="userfield font-extralight">
                        Company Location
                      </div>
                    </a>

                    <div className="mt-8 font-thin">Applied 2days Ago</div>
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
                            <a href="#" className={classNames("text-sm flex py-2 gap-2")}>
                              <BriefcaseIcon className="h-5 w-5" />
                              Application Status
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "" : "",
                                "text-sm flex  pb-2 gap-2"
                              )}
                            >
                              <DeviceTabletIcon className="h-5 w-5" />
                              Details Of Job
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
          <div className="border-b-1">
            <div className="jobs-profile px-4 py-10 ">
              <div className="flex  justify-between">
                <div className="flex items-center gap-5">
                  <Link href="/news-feed">
                    <a>
                      <Image src={Compnylogo2} width={92} height={92} alt="" />
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm font-bold">
                        UI/UX Designer / Frontend Developer
                      </div>
                    </a>
                    <a href="">
                      <div className="userfield font-light">Company Type</div>
                    </a>
                    <a href="">
                      <div className="userfield font-extralight">
                        Company Location
                      </div>
                    </a>

                    <div className="mt-8 font-thin">Applied 2days Ago</div>
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
                            <a href="#" className={classNames("text-sm flex py-2 gap-2")}>
                              <BriefcaseIcon className="h-5 w-5" />
                              Application Status
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "" : "",
                                "text-sm flex gap-2"
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
          </div> */}
          <div className="border-b-1 py-4">
            <div className="text-center">
              <Link className="" href="">
                <a className="text-indigo-400">Show More Applied Jobs</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
