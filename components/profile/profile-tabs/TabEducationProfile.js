import { useState, useEffect, React, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../public/images/profile-girl.jpg";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { ChevronRightIcon, XIcon, PencilAltIcon } from "@heroicons/react/outline";
import {    
  CURENT_USER_LOGIN_API
} from "../../../pages/config";

const TabEducationProfile = () => {
let [isOpen, setIsOpen] = useState(false);
const [userDetails, setUserDetails] = useState();
const [education, setUsereducation] = useState();
const [update_education, setUserUpdateeducation] = useState();


function closeModal() {
  setIsOpen(false);
}

function openModal() {
  setIsOpen(true);
}

function seteducation(s){
  openModal();
  console.log("Current Userskdgvs",s);
  setUserUpdateeducation(s);
}
// Bareer Key
if (typeof window !== "undefined") {
  // Bareer Key
  var authKey = window.localStorage.getItem("keyStore"); 
}

//current User
const Current_User=async()=>{    
 
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
        //console.log("Current Userskdgvs",result.data.id)
        setUsereducation(result.data.educations)
      }
    })
    .catch((err) => console.log(err)); 
}
useEffect(()=>{
  Current_User(); 
},[])
 console.log("==>",userDetails);
return (
<div className="bg-white rounded-xl p-10">
  <div className="flex items-center justify-between mb-5">
    <div className="font-extrabold ">Education</div>
    <div className="flex ml-auto gap-2">
      <a>
        <PlusCircleIcon onClick={openModal} className="h-5 w-5 hover:text-indigo-400" />
      </a>
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
                    Education
                  </Dialog.Title>
                  <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                    <div className="bg-white px-12 py-5 rounded-xl">
                      <div className="">
                        <input
                          className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                          placeholder="University Name" type="text" name="search" 
                          value={update_education.institution}/>
                      </div>
                      <div className="mt-5 ">
                        <div className="">
                          <input
                            className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                            placeholder="Degree Title" type="text" name="search" 
                            value={update_education.degree}/>
                        </div>
                      </div>
                      <div className="mt-5">
                        <div className="">
                          <input
                            className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                            placeholder="Degree Type" type="text" name="search"
                            value={update_education.degree_type} />
                        </div>
                      </div>
                      <div className="mt-5">
                        <div className="">
                          <input
                            className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                            placeholder="Starting From" type="text" name="search"
                            value={update_education.study_from} />
                        </div>
                      </div>
                      <div className="mt-5">
                        <div className="">
                          <input
                            className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                            placeholder="Ended To" type="text" name="search" 
                            value={update_education.study_to}/>
                        </div>
                      </div>
                      <div className="flex gap-4 justify-end">
                        <Link href="">
                        <button type="submit" className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400">
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
    </div>
  </div>
  <div className="px-2">
    <div className="flex flex-col">
    { education?(
      education.map((s) => (
      <div className="border-b-1 py-5">
        <div className="flex justify-end">
          <a className="hover:text-indigo-400">
            <PencilAltIcon onClick={()=>seteducation(s)} className="h-5 w-5 underline" />
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
            <div className="font-extralight">Started From: {s.study_from}</div>
            <div className="font-extralight">Ended to: {s.study_to}</div>
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