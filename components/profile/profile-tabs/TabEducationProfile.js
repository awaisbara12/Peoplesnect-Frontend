import { useState, useEffect, React, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../public/images/profile-girl.jpg";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { ChevronRightIcon, XIcon, PencilAltIcon,TrashIcon } from "@heroicons/react/outline";
import {    
  CURENT_USER_LOGIN_API,USER_EDUCATION
} from "../../../pages/config";

const TabEducationProfile = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [isCreate, setIsCreateOpen] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [education, setUsereducation] = useState();
  const [education_id, setUsereducation_id] = useState();
  const [education_institution, setUsereducation_institution] = useState();
  const [education_degree, setUsereducation_degree] = useState();
  const [education_degree_type, setUsereducation_degree_type] = useState();
  const [education_study_from, setUsereducation_study_from] = useState();
  const [education_study_to, setUsereducation_study_to] = useState();
  const [update_education, setUserUpdateeducation] = useState();
  const [current_study, setcurrent_study] = useState(false);

   // For checkbox
   const chckbox =()=>{
   
    if (current_study==true){setcurrent_study(false);}
    else{setcurrent_study(true);} 
    console.log("===",current_study);
    
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
    setUsereducation_id('');
    setUsereducation_institution('');
    setUsereducation_degree('');
    setUsereducation_degree_type('');
    setUsereducation_study_from('');
    setUsereducation_study_to('');
    setcurrent_study('');
  }

  function seteducation(s){
    openModal();
    setUserUpdateeducation(s);
    setUsereducation_id(s.id);
    setUsereducation_institution(s.institution);
    setUsereducation_degree(s.degree);
    setUsereducation_degree_type(s.degree_type);
    setUsereducation_study_from(s.study_from);
    setUsereducation_study_to(s.study_to);
    setcurrent_study(s.continue);
  }

  const CreateEducation=async()=>{  // CreateEducation

    await fetch(`${USER_EDUCATION}?educations[continue]=${current_study}&educations[institution]=${education_institution}&educations[degree]=${education_degree}&educations[degree_type]=${education_degree_type}&educations[study_from]=${education_study_from}&educations[study_to]=${education_study_to}`, {
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
          setUserUpdateeducation(result.data)
          console.log("Create Education",result.data)
        }
      })
      .catch((err) => console.log(err));
      Current_User();
  }
  const deletEducation=async(delID)=>{  // UpdateEducation
     if(delID)
     {
      let a=confirm("Are you sure?")
      if(a==true)
      {
        await fetch(`${USER_EDUCATION}/${delID}`, {
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
            }
          })
          .catch((err) => console.log(err)); 
      }
     }    
  }
  const UpdateEducation=async()=>{  // UpdateEducation

    await fetch(`${USER_EDUCATION}/${education_id}?educations[continue]=${current_study}&educations[institution]=${education_institution}&educations[degree]=${education_degree}&educations[degree_type]=${education_degree_type}&educations[study_from]=${education_study_from}&educations[study_to]=${education_study_to}`, {
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
          setUserUpdateeducation(result.data)
          console.log("User Education",result.data)
        }
      })
      .catch((err) => console.log(err));
      Current_User();
  }
  
  if (typeof window !== "undefined") { // Bareer Key
    var authKey = window.localStorage.getItem("keyStore"); 
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
        setUsereducation(result.data.educations)
       // console.log(result.data.educations)
      }
    })
    .catch((err) => console.log(err)); 
  }
  useEffect(()=>{
    Current_User(); 
  },[])
  //console.log("==>",userDetails);
  return (
    <div className="bg-white rounded-xl p-10">
      <div className="flex items-center justify-between mb-5">
        <div className="font-extrabold ">Education</div>
        <div className="flex ml-auto gap-2">
          <a>
            <PlusCircleIcon onClick={openCreateModal} className="h-5 w-5 hover:text-indigo-400" />
          </a>
           {/* Update modal */}
          {update_education?(
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" static={true} onClose={closeModal}>
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div className="fixed inset-0 bg-black bg-opacity-75" />
              </Transition.Child>
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95">
                    <Dialog.Panel
                      className="w-[620px] bg-white rounded-xl xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all">
                      <div className="flex justify-end items-center mx-4">
                        <XIcon onClick={closeModal} className="w-5 h-5 cursor-pointer" />
                      </div>
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 px-8">
                        Update Education
                      </Dialog.Title>
                      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                        <div className="bg-white px-12 py-5 rounded-xl">
                          <div className="">
                          <input
                                className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                                placeholder="Institution" type="text" name="search" 
                                value={education_institution} 
                              onChange = {(e)=>setUsereducation_institution(e.target.value)}/>
                          </div>
                          <div className="mt-5 ">
                            <div className="">
                              <input
                                className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                                placeholder="Degree Title" type="text" name="search" 
                                value={education_degree} 
                                onChange = {(e)=>setUsereducation_degree(e.target.value)}/>
                            </div>
                          </div>
                          <div className="mt-5">
                            <div className="">
                            <select className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                               id="grid-state" onClick={(e)=>setUsereducation_degree_type(e.target.value)}>
                              <option>{education_degree_type}</option>
                              <option value="Middle School">Middle School</option>
                              <option value="High School">High School</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Bachelor's">Bachelor's</option>
                              <option value="Master's">Master's</option>
                              <option value="Other">Other</option>
                            </select> 
                            </div>
                          </div>
                          <div className="mt-5">
                            <div className="flex">
                            <div style={{width:'100%'}}>
                            <label style={{margin:15, color:'#8e8e8e'}}>Start Date</label>
                            <input
                              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                              type="date"
                              name="startDate"
                              value={education_study_from} 
                              onChange = {(e)=>setUsereducation_study_from(e.target.value)}
                              placeholderColor="#8e8e8e"
                            />
                            </div>
                            {current_study?(''):(
                               <div style={{width:'100%'}}>
                               <label style={{margin:15, color:'#8e8e8e'}}>End Date</label>
                               <input
                                 className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                                 type="date"
                                 name="startDate"
                                 value={education_study_to} 
                                 onChange = {(e)=>setUsereducation_study_to(e.target.value)}
                                 placeholderColor="#8e8e8e"
                               />
                               </div>
                            )

                            }
                            </div>
                            <div className="mt-5">
                            <input
                              checked={current_study}
                              id="default-radio-1"
                              type="checkbox"
                              onChange = {(e)=>chckbox()}
                              name="default-radio"
                              className="w-4 h-4 rounded-full text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-indigo-400 dark:border-indigo-400"
                            />
                            <label
                              htmlFor="default-radio-2"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Persuing
                            </label>
                          </div>
                          </div> 
                          <div className="flex gap-4 justify-end">
                            <Link href="">
                            <button type="submit" className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                              onClick={UpdateEducation}>
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
           
           {/* Add Modal */}
          <Transition appear show={isCreate} as={Fragment}>
            <Dialog as="div" className="relative z-50" static={true} onClose={closeCreateModal}>
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div className="fixed inset-0 bg-black bg-opacity-75" />
              </Transition.Child>
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95">
                    <Dialog.Panel
                      className="w-[620px] bg-white rounded-xl xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all">
                      <div className="flex justify-end items-center mx-4">
                        <XIcon onClick={closeCreateModal} className="w-5 h-5 cursor-pointer" />
                      </div>
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 px-8">
                       Add Education
                      </Dialog.Title>
                      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                        <div className="bg-white px-12 py-5 rounded-xl">
                          <div className="">
                          <input
                                className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                                placeholder="Institution" type="text" name="search" 
                                value={education_institution} 
                                onChange = {(e)=>setUsereducation_institution(e.target.value)}/>
                          </div>
                          <div className="mt-5 ">
                            <div className="">
                              <input
                                className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                                placeholder="Degree Title" type="text" name="search" 
                                value={education_degree} 
                                onChange = {(e)=>setUsereducation_degree(e.target.value)}/>
                            </div>
                          </div>
                          <div className="mt-5">
                            <div className="">
                            <select className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                               id="grid-state" onClick={(e)=>setUsereducation_degree_type(e.target.value)}>
                              <option></option>
                              <option value="Middle School">Middle School</option>
                              <option value="High School">High School</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Bachelor's">Bachelor's</option>
                              <option value="Master's">Master's</option>
                              <option value="Other">Other</option>
                            </select>     
                            </div>
                          </div>                         
                          <div className="mt-5">
                            <div className="flex">
                            <div style={{width:'100%'}}>
                            <label style={{margin:15, color:'#8e8e8e'}}>Starting Date</label>
                            <input
                              type="date"
                              name="startDate"
                              value={education_study_from}
                              placeholderColor="#8e8e8e"
                              onChange = {(e)=>setUsereducation_study_from(e.target.value)}
                              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                              />
                            </div>
                           {current_study?(""):(
                            <div style={{width:'100%'}}>                            
                             <label style={{margin:15, color:'#8e8e8e'}}>End Date</label>
                             <input
                              type="date"
                              name="endDate"
                              value={education_study_to} 
                              onChange = {(e)=>setUsereducation_study_to(e.target.value)}
                              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                             />
                            </div>
                           )       
                           }
                            
                             
                            </div>
                            <div className="mt-5">
                            <input
                              checked={current_study}
                              id="default-radio-1"
                              type="checkbox"
                              onChange = {(e)=>chckbox()}
                              name="default-radio"
                              className="w-4 h-4 rounded-full text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-indigo-400 dark:border-indigo-400"
                            />
                            <label
                              htmlFor="default-radio-2"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Persuing
                            </label>
                          </div>
                          </div>
                          <div className="flex gap-4 justify-end">
                            <Link href="">
                            <button type="submit" className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                             onClick={CreateEducation}>
                             Add Education
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
        <div className="flex flex-col">
        { education?(
          education.map((s) => (
          <div className="border-b-1 py-5" key={s.id}>
            <div className="flex justify-end">
              <a className="hover:text-indigo-400">
                <PencilAltIcon onClick={()=>seteducation(s)} className="h-5 w-5 underline" />
              </a>
              <a className="hover:text-indigo-400">
               <TrashIcon onClick={()=>deletEducation(s.id)} className="h-5 w-5 underline" />
              </a>
              
            </div>

            <div className="flex items-center gap-10">
              <Link href="">
              <a>
                <Image src={ProfileAvatar} width={66} height={66} className="object-cover rounded-full" placeholder="empty"
                  alt="profile-image" />
              </a>
              </Link>
              <div className="flex flex-col gap-1">
                <div className="font-extrabold">
                  {s.institution}
                </div>
                <div className="font-light text-sm"> {s.degree}</div>
                <div className="font-light text-sm"> {s.degree_type}</div>               
                <div className="font-extralight">{s.continue?(<p>{s.study_from} <b>To</b> Present</p>):(<p>{s.study_from} <b>To</b> {s.study_to}</p>)}</div>
              </div>
            </div>
          </div>
        ))
        ):("")} 
        </div>
        <div className="flex justify-center font-bold items-center mt-10">
          Show All Skills
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default TabEducationProfile;