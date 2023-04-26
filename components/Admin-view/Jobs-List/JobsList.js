import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CogIcon, EyeIcon, PencilAltIcon, PhotographIcon, SearchIcon, XIcon } from '@heroicons/react/solid';
import Post from "../../../public/images/groupcover.jpg";
import { TrashIcon } from '@heroicons/react/outline';
import { ADMIN_JOB_API, CURENT_USER_LOGIN_API, JOBS_API } from "../../../pages/config";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from 'react-spinners/ClipLoader';
import Router from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { TagsInput } from "react-tag-input-component";

const JobsList =()=> {
  
  const [jobs, setJobs] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpage1, setcurrentpage1] = useState(1);
  const [lastpage, setlastpage] = useState(0);
  const [search, setsearch] = useState(0);
  const [search1, setsearch1] = useState([]);

  const [posted, setposted] = useState(); // all post job

  // For edit Modala
  const [spinner, setSpinner] = useState(false);
  const [Title, setTitle] = useState("");
  const [Company, setCompany] = useState("");
  const [Workplace, setWorkplace] = useState();
  const [Location, setLocation] = useState("");
  const [Type, setType] = useState();
  const [Discripation, setDiscripation] = useState("");
  const [Skills, setSkills] = useState([]);
  const [Email, setEmail] = useState("");
  const [Question, setQuestion] = useState("");
  const [PostImage, setPostImage] = useState([]);
  const [postImagePreview, setpostImagePreview] = useState();
  const [EditImage, setEditImage] = useState(); // Default Image
  const [updateId, setupdateId] = useState();
  let [isOpen, setIsOpen] = useState(false);
  let [isOpen1, setIsOpen1] = useState(false);
  let [isOpen2, setIsOpen2] = useState(false);

  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }

  const GetJobs = async()=>{      
    await fetch(ADMIN_JOB_API+"?page=" + currentpage, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          const mergedata = [...jobs, ...result.data]
          setJobs(mergedata);
          setcurrentpage(result.pages.next_page)
          setlastpage(result.pages.total_pages)
        }
      })
      .catch((err) => console.log(err)); 
  }

  const searchJob = async()=>{      
    await fetch(ADMIN_JOB_API+"?page=1", {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setJobs(result.data);
          setcurrentpage(result.pages.next_page);
          setlastpage(result.pages.total_pages);
        }
      })
      .catch((err) => console.log(err)); 
  }

  async function deteleJob(jobId){
    var checks =confirm("Are you sure..?");
    if(checks){
      const res = await axios(ADMIN_JOB_API + "/" + jobId, {
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
        document.getElementById(`job-${jobId}`).classList.add("hidden");
      }
    }
  }

  const fetchMoreData = async()=>{
    if(search == "0"){
      setcurrentpage1(1);
      await GetJobs();
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
      searchJob();
    }else{
      await fetch(ADMIN_JOB_API+"/job_search"+"?query="+event, {
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
              searchJob();
            }else{
              setsearch(1);
              setJobs(result.data);
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
      searchJob();
    }else{
      await fetch(ADMIN_JOB_API+"/job_search"+"?query="+event+"&page="+currentpage1, {
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
              searchJob();
            }else{
              setsearch(1);
              const mergedata = [...jobs, ...result.data]
              setJobs(mergedata);
              setcurrentpage(result.pages.next_page);
              setcurrentpage1(result.pages.next_page);
              setlastpage(result.pages.total_pages);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }

  //**********/ Modals **********//
function closeModal() {
  setIsOpen(false);
}

function openModal(i) {
  setIsOpen(true);
  setupdateId(i.id);
  setTitle(i.title);
  setCompany (i.job_company);
  setLocation (i.job_location);
  setWorkplace (i.workplace_type);
  setType (i.employeement_type);
  setDiscripation(i.description);
  setEmail(i.email_address);
  setEditImage(i.company_photo);
  var skillArray=[];
  for(var j=0; j<i.skills.length; j++){skillArray[j]=i.skills[j].title;}
  setSkills(skillArray);
  // setQuestion('');
}

function closeModal1() {
  setIsOpen1(false);
}

function openModal1() {
  setIsOpen1(true);
}

function closeModal2() {
  setIsOpen2(false);
}

function openModal2() {
  setIsOpen2(true);
}

const handleImagePost = (e) => {
  setPostImage(e.target.files[0]);
  if (e.target.files.length !== 0) {
    setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
  }
};

const handleCoverReomve = (e) => {
  setpostImagePreview(window.URL.revokeObjectURL(e.target.files));
  setPostImage([]);
};

// Update/manage Job
function updateJob() {
  const dataForm = new FormData();
  dataForm.append("jobs[email_address]", Email);
  dataForm.append("jobs[title]", Title);
  dataForm.append("jobs[description]", Discripation);
  dataForm.append("jobs[job_company]", Company)
  dataForm.append("jobs[job_location]", Location);
  dataForm.append("jobs[workplace_type]", Workplace);
  dataForm.append("jobs[employeement_type]", Type);
  setEmail('');
  dataForm.append("jobs[job_skills]", Skills);
  if(PostImage){dataForm.append("jobs[company_photo]", PostImage);}

  fetch(JOBS_API+"/"+updateId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    body: dataForm,
  })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        setIsOpen(false);
        setIsOpen(false)
        setIsOpen1(false)
        setIsOpen2(false)
        setupdateId('');
        setTitle('');
        setCompany ('');
        setLocation ('');
        setWorkplace ('');
        setType ('');
        setDiscripation('');
        setEmail('');
        setEditImage('');
        setSkills([]);
        setPostImage([]);
        setpostImagePreview('');
        const updatedJob = result.data;
          const updatedJobs = jobs.map(job => {
            if (job.id === updatedJob.id) {
              return updatedJob;
            }
            return job;
          });
          setJobs(updatedJobs);
      }
    })
    .catch((err) => {
      setSkills([]);
      setPostImage([]);
      console.log(err)
    });
   
}

  useEffect(() => {
    GetJobs();
  }, []);

  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="mt-8">
          <div className="">
            <div className="text-center">
              <div className="heading text-4xl font-semibold text-indigo-400">Jobs List</div>
            </div>
            <div className="relative w-1/2 mx-auto mt-4">
              <input
                className="placeholder:text-md placeholder:text-indigo-500 pl-12  hover:shadow-lg bg-white placeholder:rounded-full  border-indigo-400 w-full rounded-full"
                placeholder="Search Jobs Here"
                type="text"
                name="search"
                onChange={handlechange}
                onScroll={handlechange}
              />
              <div className="absolute top-3 left-6">
                <SearchIcon className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <div className="mt-8">
              <div className="">
                <InfiniteScroll
                    dataLength={jobs.length}
                    next={fetchMoreData}
                    hasMore={currentpage != null }
                    loader={<div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                    className="grid grid-cols-2 gap-6"
                  >
                    {jobs && jobs.map((job)=>(
                      <div 
                        className="hover:shadow-2xl shadow-lg bg-white flex items-center justify-between rounded-xl p-2"
                        id={`job-${job.id}`}
                        key={job.id}>
                      <Link href={{pathname: "/jobs/jobs-show", query: job.id}}>
                        <a>
                          <div className="flex gap-2 items-start">
                            {job && job.company_photo?(
                              <img
                                src={job.company_photo}
                                className="object-cover rounded-full h-[40px] w-[40px]"
                                placeholder="empty"
                                alt="profile-image"
                              />
                              ):( 
                              <Image
                                src={Post}
                                className="object-cover rounded-xl"
                                width={40}
                                height={40}
                                alt=""
                              />
                            )}
                            <div className="text-sm">
                              <div className="font-bold text-indigo-400">{job.title}</div>
                              <div className="font-extralight"><b className="font-bold text-indigo-400">discription:</b> {job.description}
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                      <div className="flex gap-1 pl-2">
                        <button
                          key="Delete"
                          onClick={() => openModal(job)}
                        >
                          <PencilAltIcon className="h-5 w-5 text-indigo-400" />
                        </button>
                        <Link href={{pathname: "/jobs/jobs-show", query: job.id}}>
                          <a>
                            <EyeIcon className="h-5 w-5 text-indigo-400" />
                          </a>
                        </Link>
                        <button
                          key="Delete"
                          onClick={() => deteleJob(job.id)}
                        >
                          <TrashIcon className="h-5 w-5 text-indigo-400" />
                        </button>
                      </div>
                    </div>
                    ))}
                  </InfiniteScroll>
              </div>
            </div>
            <div className="add_new_button sticky top-16 text-right">
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-50"
                  static={true}
                  onClose={closeModal}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-75" />
                  </Transition.Child>
                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-[620px] bg-white rounded-xl xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all">
                          <div className="flex justify-end items-center mx-4">
                            <XIcon
                              onClick={closeModal}
                              className="w-5 h-5 cursor-pointer"
                            />
                          </div>
                          <div>
                          <div className="w-full flex flex-row items-center justify-center px-24 py-6">
                            <div className="stepper-item w-8 h-8 font-medium border-2 rounded-full bg-indigo-400 text-white flex justify-center items-center">
                              <a href="">1</a>
                            </div>
                            <div className="flex-auto border-t-2"></div>
                            <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full flex justify-center items-center">
                              2
                            </div>
                            <div className="flex-auto border-t-2"></div>
                            <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full flex justify-center items-center">
                              3
                            </div>
                          </div>
                        </div>
                          <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900 px-8"
                            >
                              Update Job
                            </Dialog.Title>
                            <div className="">
                              <div className="bg-white px-12 py-5 rounded-xl">
                                <form className="w-full">
                                <div className="relative flex items-center justify-center">
                                {postImagePreview?(''):(
                                  <div className="relative flex gap-1 md:gap-2 items-center justify-center">
                                    {EditImage?(
                                    <img src={EditImage}  className="object-cover z-40 h-[100px] w-[100px] " alt=""/>
                                    ):('')}
                                  <div className="relative flex items-center justify-center">
                                      <PhotographIcon
                                      width={22}
                                      height={22}
                                      className="text-indigo-400"
                                    />
                                    <input
                                      type="file"
                                      name="image"
                                      id="image"
                                      className="opacity-0 absolute w-6 h-6 -z-0"
                                      onChange={handleImagePost}
                                      title={""}
                                      multiple
                                    />
                                  </div>
                                  <div className="font-extralight">Photo Upload</div>
                                </div>
                                )}
                                  {postImagePreview?(
                                    <div className={`relative`}>
                                      <img src={postImagePreview}  className="object-cover z-40 h-[100px] w-[100px] " alt=""/>
                                      <div onClick={handleCoverReomve} className="bg-indigo-100 absolute top-0 right-0 z-50 w-6 h-6 cursor-pointer flex justify-center items-center rounded-full" >
                                        <TrashIcon className="w-5 h-5 text-indigo-600" />
                                      </div>
                                    </div>
                                  
                                  ):('')}
                                </div>  
                                    <div className="">
                                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-first-name">
                                        Job Title
                                      </label>
                                      <input 
                                      id="grid-first-name" 
                                      type="text" 
                                      value={Title}
                                      className="appearance-none block w-full bg-zinc-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                      onChange={(e)=>setTitle(e.target.value)}
                                      placeholder="Job Title" 
                                      />
                                    </div>
                                  
                                    <div className="grid grid-cols-2 gap-4 mt-8">
                                    <div className="">
                                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-last-name"
                                      
                                      >
                                        Company Name
                                      </label>
                                      <input className="appearance-none block w-full bg-zinc-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                      id="grid-last-name" type="text" placeholder="Company Name"
                                      value={Company}
                                      onChange={(e)=>setCompany(e.target.value)}/>
                                    </div>
                                    <div className="">
                                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-state">
                                        Workplace Type
                                      </label>
                                      <div className="relative">
                                        <select className="block appearance-none w-full bg-zinc-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                          value={Workplace} onChange={(e)=>setWorkplace(e.target.value)}
                                        id="grid-state">
                                          <option></option>
                                          <option>Hybrid</option>
                                          <option>On Site</option>
                                          <option>Remote</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 mt-8">
                                    <div className="">
                                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-last-name">
                                        Job Location
                                      </label>
                                      <input className="appearance-none block w-full bg-zinc-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        value={Location} onChange={(e)=>setLocation(e.target.value)}
                                      id="grid-last-name" type="text" placeholder="Job Location"/>
                                    </div>
                                    <div className="">
                                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-state">
                                        Employment Type
                                      </label>
                                      <div className="relative">
                                        <select className="block appearance-none w-full bg-zinc-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                          value={Type} onChange={(e)=>setType(e.target.value)}
                                        id="grid-state">
                                          <option></option>
                                          <option>Internship</option>
                                          <option>Temporary</option>
                                          <option>Full Time</option>
                                          <option>Part Time</option>
                                          <option>Contract</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                                <div className="flex justify-end">
                                  {
                                    Title && Company && Workplace && Location && Type?(
                                      <Link href="">
                                      <button
                                            onClick={openModal1}
                                            type="submit"
                                            className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                          >
                                            Next
                                      </button>
                                      </Link>   
                                    ):(
                                      <button
                                            type="submit"
                                            className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-200 cursor-not-allowed"
                                          >
                                            Next
                                      </button>
                                    )
                                  }
                                <Transition appear show={isOpen1} as={Fragment}>
                                  <Dialog
                                    as="div"
                                    className="relative z-50"
                                    static={true}
                                    onClose={closeModal1}
                                  >
                                    <Transition.Child
                                      as={Fragment}
                                      enter="ease-out duration-300"
                                      enterFrom="opacity-0"
                                      enterTo="opacity-100"
                                      leave="ease-in duration-200"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <div className="fixed inset-0 bg-black bg-opacity-75" />
                                    </Transition.Child>

                                    <div className="fixed inset-0 overflow-y-auto">
                                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                          as={Fragment}
                                          enter="ease-out duration-300"
                                          enterFrom="opacity-0 scale-95"
                                          enterTo="opacity-100 scale-100"
                                          leave="ease-in duration-200"
                                          leaveFrom="opacity-100 scale-100"
                                          leaveTo="opacity-0 scale-95"
                                        >
                                          <Dialog.Panel className="w-[620px] bg-white rounded-xl xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all">
                                          <div className="flex justify-end items-center mx-4">
                                          <XIcon
                                            onClick={closeModal1}
                                            className="w-5 h-5 cursor-pointer"
                                          />
                                          </div>
                                          <div>
                                            <div className="w-full flex flex-row items-center justify-center px-24 py-6">
                                              <div className="stepper-item w-8 h-8 font-medium border-2 rounded-full flex justify-center items-center">
                                                <button
                                                onClick={closeModal1}
                                                >1</button>
                                              </div>
                                              <div className="flex-auto border-t-2"></div>
                                              <div className="stepper-item w-8 h-8 text-center font-medium border-2  bg-indigo-400 text-white  rounded-full flex justify-center items-center">
                                                2
                                              </div>
                                              <div className="flex-auto border-t-2"></div>
                                              <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full flex justify-center items-center">
                                                3
                                              </div>
                                            </div>
                                          </div>
                                          <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900 px-8"
                                          >
                                            Step Two
                                          </Dialog.Title>
                                          <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                                            <div className="mt-8 bg-white px-12 py-5 rounded-xl">
                                              <form className="w-full">
                                                  <div className="">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-first-name">
                                                      Add a Description
                                                    </label>
                                                    <textarea
                                                      rows={5}
                                                      cols={80}
                                                      value={Discripation}
                                                      onChange={(e)=>setDiscripation(e.target.value)}
                                                      className="appearance-none block w-full bg-zinc-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    />
                                                    </div>
                                                    {/* <div className="mt-8">
                                                      <div>
                                                        <h1 className="mb-2">Add Skills</h1>
                                                        <TagsInput
                                                          value={Skills}
                                                          onChange={setSkills}
                                                          name="skills"
                                                          placeHolder="Add Skills"
                                                        />
                                                        <em>press enter to add new Skill</em>
                                                      </div>
                                                    </div> */}
                                              </form>
                                              <div className="flex gap-4 justify-end">

                                              <button
                                                onClick={closeModal1}
                                                    type="submit"
                                                    className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                                  >
                                                    Back
                                              </button>
                                              {
                                                Discripation?(
                                                  <Link href="">
                                                  <button
                                                        onClick={openModal2}
                                                        type="submit"
                                                        className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                                      >
                                                        Next
                                                  </button>
                                                  </Link>   
                                                ):(
                                                  <button
                                                        type="submit"
                                                        className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-200 cursor-not-allowed"
                                                      >
                                                        Next
                                                  </button>
                                                )
                                              }
                                              <Transition appear show={isOpen2} as={Fragment}>
                                                <Dialog
                                                  as="div"
                                                  className="relative z-50"
                                                  static={true}
                                                  onClose={closeModal2}
                                                >
                                              <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                              >
                                                <div className="fixed inset-0 bg-black bg-opacity-75" />
                                              </Transition.Child>

                                              <div className="fixed inset-0 overflow-y-auto">
                                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                                  <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0 scale-95"
                                                    enterTo="opacity-100 scale-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100 scale-100"
                                                    leaveTo="opacity-0 scale-95"
                                                  >
                                                    <Dialog.Panel className="w-[620px] bg-white rounded-xl xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all">
                                                    <div className="flex justify-end items-center mx-4">
                                                      <XIcon
                                                        onClick={closeModal2}
                                                        className="w-5 h-5 cursor-pointer"
                                                      />
                                                      </div>
                                                      <div>
                                                        <div className="w-full flex flex-row items-center justify-center px-24 py-6">
                                                          <div className="stepper-item w-8 h-8 font-medium border-2 rounded-full flex justify-center items-center">
                                                            1
                                                          </div>
                                                          <div className="flex-auto border-t-2"></div>
                                                          <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full flex justify-center items-center">
                                                          <button
                                                            onClick={closeModal2}
                                                            >2</button>
                                                          </div>
                                                          <div className="flex-auto border-t-2"></div>
                                                          <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full  bg-indigo-400 text-white flex justify-center items-center">
                                                            3
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <Dialog.Title
                                                        as="h3"
                                                        className="text-lg font-medium leading-6 text-gray-900 px-8"
                                                      >
                                                        Last Step
                                                      </Dialog.Title>
                                                      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                                                        <div className="bg-white px-12 py-5 rounded-xl">
                                                        <form className="w-full">
                                                            <div className="">
                                                              <div className="">
                                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-last-name">
                                                                  Email
                                                                </label>
                                                                <input
                                                                  value={Email} onChange={(e)=>setEmail(e.target.value)}
                                                                className="appearance-none block w-full bg-zinc-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="email" placeholder="Email"/>
                                                              </div>
                                                              {/* <div className="mt-8">
                                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-last-name">
                                                                  Add Your Question
                                                                </label>
                                                                <input className="appearance-none block w-full bg-zinc-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                                                id="grid-last-name" type="text" placeholder="Add Your Question"
                                                                value={Question} onChange={e=>setQuestion(e.target.value)}
                                                                />
                                                              </div> */}
                                                              <div className="mt-8">
                                                                <div>
                                                                  <h1 className="mb-2">Add Skills</h1>
                                                                  <TagsInput
                                                                    value={Skills}
                                                                    onChange={setSkills}
                                                                    name="skills"
                                                                    placeHolder="Add Skills"
                                                                  />
                                                                  <em>press enter to add new Skill</em>
                                                                </div>
                                                              </div>
                                                            </div>
                                                        </form>
                                                        <div className="flex gap-4 justify-end">
                                                        <button
                                                          onClick={closeModal2}
                                                              type="submit"
                                                              className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                                            >
                                                              Back
                                                        </button>
                                                        {
                                                        Email && Skills && Skills.length?(
                                                          <Link href="">
                                                          <button
                                                                onClick={()=>updateJob()}
                                                                type="submit"
                                                                className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                                              >
                                                                Update Job
                                                          </button>
                                                          </Link>   
                                                        ):(
                                                          <button
                                                                type="submit"
                                                                className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-200 cursor-not-allowed"
                                                              >
                                                                Update Job
                                                          </button>
                                                        )
                                                      }
                                                        </div>
                                                        </div>
                                                      </div>
                                                    </Dialog.Panel>
                                                  </Transition.Child>
                                                  
                                                </div>
                                              </div>
                                            </Dialog>
                                          </Transition>
                                              </div>
                                              </div>
                                          </div>
                                          </Dialog.Panel>
                                        </Transition.Child>
                                        
                                      </div>
                                    </div>
                                  </Dialog>
                                </Transition>
                                </div>
                              </div>
                            </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
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

export default JobsList;