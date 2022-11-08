import { useState, useEffect, React, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../public/images/profile-girl.jpg";
import { PlusCircleIcon,TrashIcon } from "@heroicons/react/solid";
import { ChevronRightIcon, XIcon, PencilAltIcon } from "@heroicons/react/outline";
import {    
  CURENT_USER_LOGIN_API, UPDATE_USER_WORK_EXPERIENCE
} from "../../../pages/config";

const TabExperienceProfile = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [isCreate, setIsCreateOpen] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [work_experiences, setuserworkexperience] = useState();
  const [update_work_experience, setUserUpdate_work_experience] = useState();

  const [work_experience_id, setuser_work_experience_id] = useState();
  const [company_name, setusercompany_name] = useState();
  const [job_title, setuserjob_title] = useState();
  const [country, setusercountry] = useState();
  const [state, setuserstate] = useState();
  const [city, setusercity] = useState();
  const [job_type, setuserjob_type] = useState();
  const [current_work, setusercurrent_work] = useState();
  const [starting, setuserstarting] = useState();
  const [ending, setuserending] = useState();
  
   // Bareer Key
   if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore"); 
  }

  function closeModal() {
    setIsOpen(false);
    
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeCreateModal() {
    setIsCreateOpen(false);
  }

  function openCreateModal() {
    setIsCreateOpen(true);
    setusercompany_name('');
    setuserjob_title('');
    setusercountry('');
    setuserstate('');
    setusercity('')
    setuserjob_type('');
    setusercurrent_work('');
    setuserstarting('');
    setuserending('');
  }
  // For checkbox
  const chckbox =()=>{
   if (current_work==true){setusercurrent_work(false);}
   else{setusercurrent_work(true);} 
  }

  function set_work_experience(s){
    openModal();
    setUserUpdate_work_experience(s);
    setuser_work_experience_id(s.id);
    setusercompany_name(s.company_name);
    setuserjob_title(s.job_title);
    setusercountry(s.country);
    setuserstate(s.state);
    setusercity(s.city)
    setuserjob_type(s.job_type);
    setusercurrent_work(s.current_work);
    setuserstarting(s.starting);
    setuserending(s.ending);
  }

  const Current_User=async()=>{    //current User
  
    await fetch(CURENT_USER_LOGIN_API, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        setUserDetails(result.data);
        setuserworkexperience(result.data.work_experiences)
      }
    })
    .catch((err) => console.log(err)); 
  }

  const UpdateWorkExperience=async()=>{  // UpdateWorkExperience

  await fetch(`${UPDATE_USER_WORK_EXPERIENCE}/${work_experience_id}?work_experiences[company_name]=${company_name}&work_experiences[job_title]=${job_title}&work_experiences[country]=${country}&work_experiences[state]=${state}&work_experiences[city]=${city}&work_experiences[job_type]=${job_type}&work_experiences[current_work]=${current_work}&work_experiences[starting]=${starting}&work_experiences[ending]=${ending}`, {
    method: "Put",
      headers: {
      Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        closeModal();
        //setUserUpdate_work_experience(result.data)
      }
    })
    .catch((err) => console.log(err));
    Current_User();
  }
  //Delete Work-Experience
  const deleteWorkExperience=async(workId)=>{  // UpdateWorkExperience
    let a = confirm("Are you Sure?")
    if(workId && a){
      await fetch(`${UPDATE_USER_WORK_EXPERIENCE}/${workId}`, {
        method: "DELETE",
          headers: {
          Accept: "application/json", 
            Authorization: `${authKey}`,
          },
        }).then((resp) => resp.json())
        .then((result) => {
          if (result) {
            closeModal();
            Current_User();
            setUserUpdate_work_experience(result.data)
          }
        })
        .catch((err) => console.log(err));
    }
    
  }
  
  const CreateWorkExperience=async()=>{  // CreateWorkExperience

    await fetch(`${UPDATE_USER_WORK_EXPERIENCE}?work_experiences[company_name]=${company_name}&work_experiences[job_title]=${job_title}&work_experiences[country]=${country}&work_experiences[state]=${state}&work_experiences[city]=${city}&work_experiences[job_type]=${job_type}&work_experiences[current_work]=${current_work}&work_experiences[starting]=${starting}&work_experiences[ending]=${ending}`, {
      method: "Post",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          closeCreateModal();
          setUserUpdate_work_experience(result.data)
          //console.log("Create Education",result.data)
        }
      })
      .catch((err) => console.log(err));
      Current_User();
  }
  useEffect(()=>{
    Current_User(); 
  },[])
  return (
    <div className="bg-white rounded-xl p-10">
      <div className="flex items-center justify-between mb-5">
        <div className="font-extrabold ">Experience</div>
        <div className="flex ml-auto gap-2">
          <a>
            <PlusCircleIcon
            onClick={openCreateModal}
            className="h-5 w-5 hover:text-indigo-400" />
          </a>
          {/* For Edit */}
          {update_work_experience?(
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
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 px-8"
                      >
                        Edit Work Experience
                    </Dialog.Title>
                    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                      <div className="bg-white px-12 py-5 rounded-xl">
                        <div className="grid grid-cols-2 gap-5">
                          <div className="mt-5">
                            <input
                              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                              placeholder="Company Name"
                              type="text"
                              name="search"
                              value={company_name} 
                              onChange = {(e)=>setusercompany_name(e.target.value)}
                            />
                          </div>
                          <div className="mt-5">
                            <input
                              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                              placeholder="Job Title"
                              type="text"
                              name="search"
                              value={job_title} 
                              onChange = {(e)=>setuserjob_title(e.target.value)}
                            />
                          </div>
                          <div className="mt-5">
                            <input
                              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                              placeholder="Country"
                              type="text"
                              name="search"
                              value={country} 
                              onChange = {(e)=>setusercountry(e.target.value)}
                            />
                          </div>
                          <div className="mt-5">
                            <input
                              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                              placeholder="State"
                              type="text"
                              name="search"
                              value={state} 
                              onChange = {(e)=>setuserstate(e.target.value)}
                            />
                          </div>
                          <div className="mt-5">
                            <input
                              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                              placeholder="City"
                              type="text"
                              name="search"
                              value={city} 
                              onChange = {(e)=>setusercity(e.target.value)}
                            />
                          </div>
                          <div className="mt-5">
                          <select className="block appearance-none w-full bg-zinc-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state" onClick={(e)=>setuserjob_type(e.target.value)}>
                              <option>{job_type}</option>
                              <option value="Hybrid">Hybrid</option>
                              <option value="On Site">On Site</option>
                              <option value="Remote">Remote</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <div className="mt-8">
                              <div className="">
                              <div className="">
                                <label className="text-gray-500 pl-2">Start Date</label>
                                <input
                                  type="date"
                                  name="startDate"
                                  value={starting} 
                                  onChange = {(e)=>setuserstarting(e.target.value)}
                                  className="placeholder:text-md mt-2  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                                  />
                              </div>
                              </div>
                          </div>
                          {current_work?(""):(
                            <div className="mt-8">
                              <label className="text-gray-500 pl-2">End Date</label>
                              <input
                                type="date"
                                name="endDate"
                                value={ending} 
                                onChange = {(e)=>setuserending(e.target.value)}
                                className="placeholder:text-md mt-2 hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                                />
                            </div>)
                          }
                        </div>
                          <div className="mt-5">
                            <input
                              checked={current_work}
                              id="default-radio-1"
                              type="checkbox"
                              value={current_work} 
                              onChange = {(e)=>chckbox()}
                              name="default-radio"
                              className="w-4 h-4 rounded-full text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-indigo-400 dark:border-indigo-400"
                            />
                            <label
                              htmlFor="default-radio-2"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Current Working here
                            </label>
                          </div>
                        <div className="justify-end">
                <Link href="">
                <button
                  type="submit"
                  className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                  onClick={UpdateWorkExperience}>
                  Save Changes
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
          ):('')}

           {/* Add Modal  */}
          <Transition appear show={isCreate} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50"
              static={true}
              onClose={closeCreateModal}
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 px-8"
                  >
                      Work Experience
                  </Dialog.Title>
                  <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                      <div className="bg-white px-12 py-5 rounded-xl">
                        <div className="grid grid-cols-2 gap-5">
                          <div className="mt-5">
                            <input
                              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                              placeholder="Company Name"
                              type="text"
                              name="search"
                              value={company_name} 
                              onChange = {(e)=>setusercompany_name(e.target.value)}
                            />
                          </div>
                          <div className="mt-5">
                            <input
                              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                              placeholder="Job Title"
                              type="text"
                              name="search"
                              value={job_title} 
                              onChange = {(e)=>setuserjob_title(e.target.value)}
                            />
                          </div>
                          <div className="mt-5">
                            <input
                              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                              placeholder="Country"
                              type="text"
                              name="search"
                              value={country} 
                              onChange = {(e)=>setusercountry(e.target.value)}
                            />
                          </div>
                          <div className="mt-5">
                            <input
                              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                              placeholder="State"
                              type="text"
                              name="search"
                              value={state} 
                              onChange = {(e)=>setuserstate(e.target.value)}
                            />
                          </div>
                          <div className="mt-5">
                            <input
                              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                              placeholder="City"
                              type="text"
                              name="search"
                              value={city} 
                              onChange = {(e)=>setusercity(e.target.value)}
                            />
                          </div>
                          <div className="mt-5">
                            <select className="block appearance-none w-full bg-zinc-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state"  onClick={(e)=>setuserjob_type(e.target.value)}>
                              <option></option>
                              <option value="Hybrid">Hybrid</option>
                              <option value="On Site">On Site</option>
                              <option value="Remote">Remote</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <div className="mt-8">
                              <div className="">
                              <div className="">
                                <label className="text-gray-500 pl-2">Start Date</label>
                                <input
                                  type="date"
                                  name="startDate"
                                  value={starting} 
                                  onChange = {(e)=>setuserstarting(e.target.value)}
                                  className="placeholder:text-md mt-2  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                                  />
                              </div>
                              </div>
                          </div>
                          {current_work?(""):(
                            <div className="mt-8">
                              <label className="text-gray-500 pl-2">End Date</label>
                              <input
                                type="date"
                                name="endDate"
                                value={ending} 
                                onChange = {(e)=>setuserending(e.target.value)}
                                className="placeholder:text-md mt-2 hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                                />
                            </div>)
                          }
                        </div>
                          <div className="mt-5">
                            <input
                              checked={current_work}
                              id="default-radio-1"
                              type="checkbox"
                              value={current_work} 
                              onChange = {(e)=>chckbox()}
                              name="default-radio"
                              className="w-4 h-4 rounded-full text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-indigo-400 dark:border-indigo-400"
                            />
                            <label
                              htmlFor="default-radio-2"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Current Working here
                            </label>
                          </div>
                        <div className="justify-end">
                <Link href="">
                <button
                  type="submit"
                  className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                  onClick={CreateWorkExperience}>
                  Save Changes
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
      </div>
      <div className="px-2">
        
        <div className="">
        { work_experiences?(
          work_experiences.map((s) => (
            <div className="border-b-1 py-10">
            <div className="flex justify-end">
            <a className="hover:text-indigo-400">
              <PencilAltIcon onClick={()=>set_work_experience(s)} className="h-5 w-5 underline" />
            </a> 
            <a className="hover:text-indigo-400">
              <TrashIcon onClick={()=>deleteWorkExperience(s.id)} className="h-5 w-5 underline" />
            </a>                
                  </div>
              <div className="flex gap-5">
                <Link href="">
                  <a>
                    <Image
                      src={ProfileAvatar}
                      width={55}
                      height={55}
                      className="object-cover rounded-full"
                      placeholder="empty"
                      alt="profile-image"
                    />
                  </a>
                </Link>
                <div className="flex flex-col gap-1">
                  <div className="font-extrabold">{s.company_name}</div>
                  <div className="font-light">{s.job_title}</div>
                  <div className="font-light">
                    {s.current_work?(<p className="font-extralight"> {s.starting} <b>To</b> continue </p>):(<p className="font-extralight">{s.starting} <b>To</b> {s.ending} </p>)}</div>
                  {/* <div className="font-extralight">
                    March 2019 - Present- 3 yrs 7 mos
                  </div>
                  <div className="mt-2 font-light md:w-[775px]">
                    3 Years Ago i start my Career a Website Designer. I have
                    collaborated with companies brands for online work. Through my
                    Skills I Accompany the Client In Managing His Ideas...
                    <span className="text-indigo-400">Seen More</span>
                  </div> */}
                </div>
              </div>
            </div>
           ))
           ):("")}
        </div>
        <div className="flex justify-center font-bold items-center mt-10">
          Show All Experiences
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default TabExperienceProfile;
