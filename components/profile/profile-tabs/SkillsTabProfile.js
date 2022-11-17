import { useState, useEffect, React, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { ChevronRightIcon, PencilAltIcon, XIcon } from "@heroicons/react/outline";
import { PlusCircleIcon,TrashIcon } from "@heroicons/react/solid";
import { TagsInput } from "react-tag-input-component";
import {    
  CURENT_USER_LOGIN_API,
  UPDATE_PERSONAL_INFO,
  ADD_SKILLS
} from "../../../pages/config";
const SkillsTabProfile = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [editOpen, seteditOpen] = useState(false);
  const [c_user, setcurrentuser] = useState();
  const [skill, setuserskill] = useState();
  const [editskill, seteditskill] = useState();
  const [editskillid, seteditskillid] = useState();
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); } 
  // for close modal
  function closeModal() { setIsOpen(false); setuserskill("")}
  // for Open modal
  function openModal() { setIsOpen(true);}
  // for Close  Edit-modal
  function closeeditModal() { seteditOpen(false); }
  // for Open  Edit-modal
  function openeditModal(i) { seteditOpen(true);seteditskill(i.title);seteditskillid(i.id)}
  const delSkill=async(delId)=>{
    let a=confirm("Are you sure");
    if (delId && a==true){
      await fetch(`${ADD_SKILLS}/${delId}`, {
        method: "DELETE",
         headers: {
          Accept: "application/json", 
           Authorization: `${authKey}`,
         },
        }).then((resp) => resp.json())
        .then((result) => {
          if (result) { 
            seteditOpen(false); 
            Current_User();
          }
        })
        .catch((err) => console.log(err));
    }else{alert ("Enter Your Skills");}
   
  }
  // for Update skills
  const UpdateSkill=async()=>{
    if (editskill){
      await fetch(`${ADD_SKILLS}/${editskillid}?skills[title]=${editskill}`, {
        method: "PUT",
         headers: {
          Accept: "application/json", 
           Authorization: `${authKey}`,
         },
        }).then((resp) => resp.json())
        .then((result) => {
          if (result) { 
            seteditOpen(false); 
            Current_User();
          }
        })
        .catch((err) => console.log(err));
    }else{alert ("Enter Your Skills");}
   
  }
  //for Add Skills
  const AddSkill=async()=>{    
   if(skill)
   {
     await fetch(`${ADD_SKILLS}?skills[title]=${skill}`, {
      method: "POST",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
      }).then((resp) => resp.json())
      .then((result) => {
        if (result) { 
          setIsOpen(false); 
          Current_User();
        }
      })
      .catch((err) => console.log(err));
   } 
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
          setcurrentuser(result.data.skills); 
        }
      })
      .catch((err) => console.log(err)); 
  }

  useEffect(()=>{
    Current_User()
  },[])
  return (
    <div className="bg-white rounded-xl p-10">
      <div className="flex items-center justify-between mb-5">
        <div className="font-extrabold ">Skills</div>
        <div className="flex ml-auto gap-2">
          <a>
            <PlusCircleIcon 
            onClick={openModal}
            className="h-5 w-5 hover:text-indigo-400" />
          </a>

           {/* Add Moda */}
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
                     Add Skills
                    </Dialog.Title>
                  <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                    <div className="bg-white px-12 py-5 rounded-xl">
                      <div>
                        <input
                          className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2"      
                         value={skill}
                         type="text"
                          onChange={(e)=>setuserskill(e.target.value)}
                          name="skills"
                          placeHolder="Add Skills"
                        />
                        {/* <em>press enter to add new Skill</em> */}
                      </div>
                      <div className="flex gap-4 justify-end">
                        <Link href="">
                          <button className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                            type="submit" onClick={AddSkill}  >
                             Save Skill
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

          {/* Update Modal */}
          <Transition appear show={editOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50"
              static={true}
              onClose={closeeditModal}
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
                      onClick={closeeditModal}
                      className="w-5 h-5 cursor-pointer"
                    />
                    </div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 px-8"
                    >
                      Edit Skills
                    </Dialog.Title>
                  <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                    <div className="bg-white px-12 py-5 rounded-xl">
                      <div>
                        <input
                          className="placeholder:text-md hover:shadow-lg bg-gray-100 placeholder:rounded-full border-none w-full pl-2 rounded-full py-2 "      
                          value={editskill}
                          onChange={(e)=>seteditskill(e.target.value)}
                          name="skills"
                          type="text"
                          placeHolder="Edit"
                        />
                        {/* <em>press enter to add new Skill</em> */}
                      </div>
                      <div className="flex gap-4 justify-end">
                        <Link href="">
                          <button className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                            type="submit" onClick={UpdateSkill} >
                                Update Skill
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
      <div className="font-bold uppercase px-2">
        {c_user?(
          c_user.map((i)=>(
            <div className="flex flex-col" key={i.id}>       
            <div className="border-b-1 py-5">
              <div className="flex justify-between items-center">
                <div className="">{i.title}</div>
                <div className="flex justify-end">
                  <a className="hover:text-indigo-400">
                    <PencilAltIcon onClick={()=>openeditModal(i)}
                      className="h-5 w-5 underline" />
                  </a>
                  <a className="hover:text-indigo-400">
                <TrashIcon onClick={()=>delSkill(i.id)} className="h-5 w-5 underline" />
                  </a>
                </div>
               
              </div>
            </div>
           </div>
          ))
          
        ):("")
        } 
        <div className="flex justify-center items-center mt-10">
          Show All Skills
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default SkillsTabProfile;
