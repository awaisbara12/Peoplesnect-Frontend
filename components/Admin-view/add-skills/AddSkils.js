import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CogIcon, EyeIcon, PencilAltIcon, PhotographIcon, SearchIcon, XIcon } from '@heroicons/react/solid';
import Post from "../../../public/images/groupcover.jpg";
import { TrashIcon } from '@heroicons/react/outline';
import { ADMIN_SKILLS, CURENT_USER_LOGIN_API, skills_API } from "../../../pages/config";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from 'react-spinners/ClipLoader';
import Router from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { TagsInput } from "react-tag-input-component";

const AddSkils =()=> {
  
  const [skills, setskills] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpage1, setcurrentpage1] = useState(1);
  const [lastpage, setlastpage] = useState(0);
  const [search, setsearch] = useState(0);
  const [search1, setsearch1] = useState([]);

  // For edit Modala
  const [Title, setTitle] = useState("");
  const [skill, setskill] = useState("");
  const [updateId, setupdateId] = useState();
  let [isOpen, setIsOpen] = useState(false);
  let [isOpen1, setIsOpen1] = useState(false);

  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }

  const Getskills = async()=>{      
    await fetch(ADMIN_SKILLS+"?page=" + currentpage, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        console.log("skills",result.data)
        const mergedata = [...skills, ...result.data]
        setskills(mergedata);
        setcurrentpage(result.pages.next_page)
        setlastpage(result.pages.total_pages)
      }
    })
    .catch((err) => console.log(err)); 
  }

  const CreateSkill = async()=>{   
    const dataForm = new FormData();
    dataForm.append("suggested_skills[title]", Title);
    fetch(ADMIN_SKILLS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        if (result.data) {
          closeCreateModal();
          setTitle('');
          const mergedata = [result.data, ...skills]
          setskills(mergedata);
        }else{
          alert(result.error);
        }
      })
      .catch((err) => {
        setTitle('');
        console.log(err)
      });   
  }

  const searchJob = async()=>{      
    await fetch(ADMIN_SKILLS+"?page=1", {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setskills(result.data);
          setcurrentpage(result.pages.next_page);
          setlastpage(result.pages.total_pages);
        }
      })
      .catch((err) => console.log(err)); 
  }

  async function deteleskill(skillId){
    var checks =confirm("Are you sure..?");
    if(checks){
      const res = await axios(ADMIN_SKILLS + "/" + skillId, {
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
        document.getElementById(`skill-${skillId}`).classList.add("hidden");
      }
    }
  }

  const fetchMoreData = async()=>{
    if(search == "0"){
      setcurrentpage1(1);
      await Getskills();
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
      await fetch(ADMIN_SKILLS+"/skill_search"+"?query="+event, {
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
              setskills(result.data);
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
      await fetch(ADMIN_SKILLS+"/job_search"+"?query="+event+"&page="+currentpage1, {
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
              const mergedata = [...skills, ...result.data]
              setskills(mergedata);
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
    setTitle('');
    setIsOpen(false);
  }

  function openModal(i) {
    setIsOpen(true);
    setTitle(i.title);
    setupdateId(i.id);
    // setQuestion('');
  }

  function openCreate(){
    setIsOpen1(true);
  }

  function closeCreateModal() {
    setTitle('');
    setIsOpen1(false);
  }

  // Update/manage Job
  function updateJob() {
    const dataForm = new FormData();
    dataForm.append("suggested_skills[title]", Title);
    fetch(ADMIN_SKILLS+"/"+updateId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result.data) {
        setIsOpen(false);
        setTitle("");
        const updatedJob = result.data;
        const updatedskills = skills.map(job => {
          if (job.id === updatedJob.id) {
            return updatedJob;
          }
          return job;
        });
        setskills(updatedskills);
      }else{
        alert(result.error);
      }
    })
    .catch((err) => {
      setTitle('');
      console.log(err)
    });
  }

  useEffect(() => {
    Getskills();
  }, []);

  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="mt-8">
          <div className="">
            <div className="text-center">
              <div className="heading text-4xl font-semibold text-indigo-400">Skills List</div>
            </div>
            <div className="flex relative w-1/2 mx-auto mt-4">
              <input
                className="placeholder:text-md placeholder:text-indigo-500 pl-12  hover:shadow-lg bg-white placeholder:rounded-full  border-indigo-400 w-full rounded-full"
                placeholder="Search Skills Here"
                type="text"
                name="search"
                onChange={handlechange}
                onScroll={handlechange}
              />
              <div className="absolute top-5 left-6">
                <SearchIcon className="h-5 w-5 text-indigo-400" />
              </div>
              
              <div className="flex justify-end ml-10">
                  <Link href="">
                    <button
                          onClick={() => openCreate()}
                          type="submit"
                          className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                        >
                          Create
                    </button>
                  </Link>   
                </div>
              
            </div>
            <div className="mt-8">
              <div className="">
                <InfiniteScroll
                    dataLength={skills.length}
                    next={fetchMoreData}
                    hasMore={currentpage != null }
                    loader={<div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                    className="grid grid-cols-2 gap-6"
                  >
                    {skills && skills.map((skill)=>(
                      <div 
                        className="hover:shadow-2xl shadow-lg bg-white flex items-start justify-between rounded-xl p-2"
                        id={`skill-${skill.id}`}
                        key={skill.id}>
                      <Link href={{pathname: "/skills/skills-show", query: skill.id}}>
                        <a>
                          <div className="flex gap-2 items-start">
                            <div className="text-sm">
                              <div className="font-bold text-indigo-400">{skill.title}</div>
                            </div>
                          </div>
                        </a>
                      </Link>
                      <div className="flex gap-1 pl-2">
                        <button
                          key="Delete"
                          onClick={() => openModal(skill)}
                        >
                          <PencilAltIcon className="h-5 w-5 text-indigo-400" />
                        </button>
                        <button
                          key="Delete"
                          onClick={() => deteleskill(skill.id)}
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
                        </div>
                          <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900 px-8"
                            >
                              Update Skills
                            </Dialog.Title>
                            <div className="">
                              <div className="bg-white px-12 py-5 rounded-xl">
                                <form className="w-full">
                                    <div className="relative flex items-center justify-center">
                                    </div>  
                                    <div className="">
                                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-first-name">
                                        Skills Title
                                      </label>
                                      <input 
                                      id="grid-first-name" 
                                      type="text" 
                                      value={Title}
                                      className="appearance-none block w-full bg-zinc-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                      onChange={(e)=>setTitle(e.target.value)}
                                      placeholder="Skill Title" 
                                      />
                                    </div>

                                </form>
                                <div className="flex justify-end">
                                      <Link href="">
                                      <button
                                            onClick={() => updateJob()}
                                            type="submit"
                                            className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                          >
                                            Update
                                      </button>
                                      </Link>   
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

            <div className="add_new_button sticky top-16 text-right">
              <Transition appear show={isOpen1} as={Fragment}>
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
                              onClick={closeCreateModal}
                              className="w-5 h-5 cursor-pointer"
                            />
                          </div>
                          <div>
                        </div>
                          <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900 px-8"
                            >
                              Create Skill
                            </Dialog.Title>
                            <div className="">
                              <div className="bg-white px-12 py-5 rounded-xl">
                                <form className="w-full">
                                    <div className="relative flex items-center justify-center">
                                    </div>  
                                    <div className="">
                                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmfor="grid-first-name">
                                        Skill Title
                                      </label>
                                      <input 
                                      id="grid-first-name" 
                                      type="text" 
                                      value={Title}
                                      className="appearance-none block w-full bg-zinc-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                      onChange={(e)=>setTitle(e.target.value)}
                                      placeholder="Skill Title" 
                                      />
                                    </div>

                                </form>
                                <div className="flex justify-end">
                                      <Link href="">
                                      <button
                                            onClick={() => CreateSkill()}
                                            type="submit"
                                            className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                          >
                                            Create
                                      </button>
                                      </Link>   
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

export default AddSkils;