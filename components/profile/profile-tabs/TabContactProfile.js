import { useState, useEffect, React, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import {
  CalendarIcon,
  MailIcon,
  XIcon,
  PencilAltIcon,
  PencilIcon,
  PhoneIcon,
} from "@heroicons/react/outline";
import {    
  CURENT_USER_LOGIN_API,UPDATE_CONTACT_INFO
} from "../../../pages/config";

const TabContactProfile = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(1);
  const [email, setUseremail] = useState();
  const [phone_number, setUserphone] = useState();
  const [DOB, setUserDOB] = useState();

  function closeModal() {
    setIsOpen(false);
    
  }

  function openModal() {
    setIsOpen(true);
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
          setUseremail(result.data.email)
          setUserphone(result.data.phone_number)
          setUserDOB(result.data.DOB)
        }
      })
      .catch((err) => console.log(err)); 
  }
  const Update_contact_info=async()=>{    
  
    await fetch(`${UPDATE_CONTACT_INFO}?users[email]=${email}&users[DOB]=${DOB}&users[phone_number]=${phone_number}`, {
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
          setUserDetails(result.data);  
          //console.log("Curhngnrent",result.data)
          setUseremail(result.data.email)
          setUserphone(result.data.phone_number)
          setUserDOB(result.data.DOB)
        }
      })
      .catch((err) => console.log(err)); 
  }
  useEffect(()=>{
    Current_User(); 
  },[])
  return (
    <>
      <div className="bg-white rounded-xl  p-10">
        <div className="flex items-center justify-between">
          <div className="font-extrabold mb-5">Contact Information</div>
          <a className="hover:text-indigo-400">
            <PencilAltIcon onClick={openModal}
              className="h-5 w-5 underline" />
          </a>
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
                      Contact Information
                    </Dialog.Title>
                    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                      <div className="bg-white px-12 py-5 rounded-xl">
                        <div className="">
                          <input
                            className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                            placeholder="Email Adress"
                            value={email}
                            onChange = {(e)=>setUseremail(e.target.value)}
                            type="Email"
                            name="search"
                          />
                        </div>
                        <div className="mt-5 ">
                            <div className="">
                              <input
                                className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                                placeholder="Change Your Number"
                                value={phone_number}
                                onChange = {(e)=>setUserphone(e.target.value)}
                                type="text"
                                name="search"
                              />
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="">
                            <div style={{width:'100%'}}>
                              <label style={{margin:15, color:'#8e8e8e'}}>Date Of Birth</label>
                              <input
                              type="date"
                              name="endDate"
                              value={DOB} 
                              onChange = {(e)=>setUserDOB(e.target.value)}
                              className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"
                              />
                            </div>
                          
                            </div>
                        </div>
                        <div className="flex gap-4 justify-end">
                         {email && phone_number && DOB?(
                            <button type="submit"className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400" onClick={Update_contact_info}>
                              Save Changes
                            </button>
                         ):(
                            <button type="submit"className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-100 cursor-not-allowed" >
                              Save Changes
                            </button>
                         )}
                          
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
        <div className="p-2 grid grid-cols-1">
          <div className="font-bold flex flex-col gap-4">
          {userDetails?(
            <div className="flex items-center gap-3 my-4">
            <MailIcon className="h-5 w-5" />
            <div className="hover:underline">{email}</div>
          </div>
          ):("")}
            
            { userDetails?(
              <div>
                <div className="border-1"></div>
                <div className="flex items-center gap-3 my-4">
                  <PhoneIcon className="h-5 w-5" />
                  <a className="hover:underline">
                    {phone_number}
                  </a>
                </div>
              </div>
            ):("")
            
            }
            
            <div className="border-1"></div>
            <div className="flex items-center gap-3 my-4">
              <CalendarIcon className="h-5 w-5" />
              <a className="hover:underline">
                {DOB}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabContactProfile;
