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
  PhotographIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { BriefcaseIcon, Lock, LockClosedIcon, StarIcon } from "@heroicons/react/solid";
import { JOBS_API, USE_APPLY_JOB_API } from "../../../pages/config";
import { useRouter } from "next/router";
import ShowAlert from "../../Alerts/Alertss";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const JobsShow = () => {
  const [Recomend, setRecomend] = useState();
  const [can_apply, setcan_apply] = useState();
  const [PostImage, setPostImage] = useState([]);
  const [postImagePreview, setpostImagePreview] = useState();
  const [openalert, setopenalert] = useState(false); // For Alert Show
  const [alertbody, setalertbody] = useState(); // For Alert Body
  
  var dateString = '';
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }

  const handleImagePost = (e) => {
    var checkType = e.target.files[0].type.split("/");
    if (checkType[0] == "application") {
      setPostImage(e.target.files[0]);
      if (e.target.files.length !== 0) {
        setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
      }
    } else {
        setopenalert(true);
        setalertbody("Invalid File ( Select pdf/docx.. )")
      }
  };
  const handleCoverReomve = (e) => {
    setpostImagePreview(window.URL.revokeObjectURL(e.target.files));
    setPostImage([]);
  };
  // can_apply or not
  const canApply = () => {
    fetch(USE_APPLY_JOB_API + "/can_apply?job_id=" + myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setcan_apply(result.data)
        }
      })
      .catch((err) => console.log(err));
  }

  const UnApplied=async()=>{
    const requestOptions = {
      method: 'DELETE',
      headers:{Accept: "application/json", Authorization: `${authKey}`},
    };
    const response = await fetch(`${USE_APPLY_JOB_API}/${myArray[1]}`,requestOptions);
    setopenalert(true);
    setalertbody("You Unapplied on this Job")
    setTimeout(()=>{
      canApply();
    },2000)
  }
  // Show Job Data
  const ShowJobs = () => {
    fetch(JOBS_API + "/" + myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setRecomend(result.data);
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    ShowJobs();
    canApply();
  }, [myArray[1]]);

  // Apply job function
  const ApplyJobs = (status) => {
    setcan_apply('');
    const dataForm = new FormData();
    dataForm.append("applied_jobs[job_id]", myArray[1]);
    dataForm.append("applied_jobs[status]", status);
    if (PostImage) { dataForm.append("applied_jobs[updated_cv]", PostImage); }
    fetch(USE_APPLY_JOB_API + "/create_applied_job", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setopenalert(true);
          setalertbody("You Applied on Job")
          setTimeout(()=>{
            ShowJobs();
            canApply();
          },2000)
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="mt-8">
      {openalert?(
        <ShowAlert openalert={openalert} setopenalert={setopenalert} body={alertbody}/>
      ):("")}
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 xl:px-0 lg:px-0">
        <div className="">
          {/* <div className="">
            <div className="heading font-bold">Job Details</div>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              {Recomend ? (
                <div className="bg-white rounded-xl p-4">
                  <div className="grid grid-cols-5 md:grid-cols-3 gap-2">
                    {Recomend.company_photo ? (
                      <img src={Recomend.company_photo} className="object-cover z-40 h-[92px] w-[92px] border" alt="" />
                    ) : (
                      <Link href="">
                        <a>
                          <Image src={Compnylogo1} width={92} height={92} alt="" className="" />
                        </a>
                      </Link>
                    )}

                    {/*  1st Box */}
                    <div className="col-span-4 md:col-span-2">
                      <div className="font-extrabold capitalize">
                        {Recomend.job_company}
                      </div>

                  {/* <div className="flex justify-between items-center mt-2 py-4 text-slate-500 italic">
                    <a href="mailto:Recomend.email_address" className="underline">
                      {Recomend.email_address}
                    </a>
                  </div> */}
                      {/* <div className="mt-2 flex text-sm font-light">
                      <StarIcon className="text-amber-400 w-5 h-5" />
                      Rating is 4.3
                    </div> */}
                    </div>
                  </div>
                  {/* Job Posted */}
                  <div className="flex justify-between items-center mt-2 py-4 border-t-1">
                    <div className="font-bold text-sm">Job Posted on</div>
                    <div className="text-sm font-light"> {Recomend.created_at}</div>
                  </div>

                  {/* 3rd Box */}
                  <div className="py-4 border-t-1">

                    {/* Job location */}
                    {Recomend.job_location ? (
                      <div className="flex justify-between items-center mt-2 capitalize">
                        <div className="font-bold text-sm">Location</div>
                        <div className="text-sm font-light">{Recomend.job_location}</div>
                      </div>
                    ) : ('')}
                    {/* Workplace */}
                    {Recomend.workplace_type ? (
                      <div className="flex justify-between items-center mt-2 capitalize">
                        <div className="font-bold text-sm">Job Type</div>
                        <div className="text-sm font-light">{Recomend.workplace_type}</div>
                      </div>
                    ) : ('')}
                    {/* Employment Type */}
                    {Recomend.employeement_type ? (
                      <div className="flex justify-between items-center mt-2 capitalize">
                        <div className="font-bold text-sm">
                          {/* Minimum Salary */}
                          Employeement Type

                        </div>
                        <div className="text-sm font-light">
                          {/* 400$ */}
                          {Recomend.employeement_type}
                        </div>
                      </div>
                    ) : ('')}
                  </div>

                  {/* Skills */}
                  <div className="pt-4 border-t-1">
                    <div className="font-bold text-sm">Skills</div>
                  </div>
                  {Recomend.skills ? (
                    Recomend.skills.map((i) => (
                      <div className="text-sm font-light uppercase m-2" key={i.id}> <li className="border-b pb-2 font-bold text-slate-600">{i.title}</li></div>
                    ))
                  ) : ('')}

                </div>
              ) : ('')}
            </div>
            <div className="col-span-1 md:col-span-2">
              <div className="bg-white rounded-xl p-8">
                {/* <div>
                  <div className="font-bold">Hiring Process</div>
                  <div className="grid grid-cols-3">
                    <div className="text-white bg-gradient-to-r border-left from-cyan-500 to-blue-500 font-bold flex justify-center items-center h-[50px] ">
                      Interview
                    </div>
                  </div>
                </div> */}
                <div className="font-bold  capitalize flex gap-4 ">
                  <div className="font-bold">Job Title:</div>
                  {/* Job description */}
                  {Recomend ? Recomend.title : ''}
                </div>
                <div className="mt-4">
                  <div className="font-bold">Discripation:</div>
                  {Recomend && Recomend.description ? (
                    <div className="text-justify indent-20">
                      {Recomend.description}
                    </div>
                  ) : ('')}
                </div>
                {Recomend && Recomend.status == "open" && can_apply == "true" ? (
                  <div className="mt-8 flex gap-4 justify-end items-center text-right">
                    {postImagePreview ? ('') : (
                      <div className="relative flex gap-1 md:gap-2 items-center justify-center">
                        <div className="relative flex items-center justify-center  hover:underline">
                          <PhotographIcon
                            width={22}
                            height={22}
                            className="text-indigo-400"
                          />

                          <input
                            type="file"
                            name="image"
                            id="image"
                            className="opacity-0 absolute w-36 h-6 -z-0"
                            onChange={handleImagePost}
                            title={""}
                            multiple
                          />
                          <div className="font-extralight">Upload Resume</div>
                        </div>
                      </div>
                    )}
                    {postImagePreview ? (
                      <div className="flex items-start gap-2">
                        <div className="object-cover" alt="">{PostImage.name}</div>
                        <div onClick={handleCoverReomve} className="bg-indigo-100 cursor-pointer rounded-full" >
                          <TrashIcon className="w-5 h-5 text-indigo-600" />
                        </div>
                      </div>

                    ) : ('')}
                    <button onClick={() => ApplyJobs("applied")} className="bg-indigo-400 text-white rounded-full p-3">
                      Apply On Job
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 text-right">
                    <button className="bg-indigo-200 cursor-not-allowed text-slate-400 rounded-full p-3">Applied</button>
                    <button className="bg-indigo-400 text-white rounded-full p-3 ml-5" onClick={() => UnApplied()} >UnApplied</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsShow;
