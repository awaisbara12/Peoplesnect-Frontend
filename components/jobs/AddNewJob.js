import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TagsInput } from "react-tag-input-component";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Spinner from "../../components/common/Spinner";

import {
  BellIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  LogoutIcon,
  MailIcon,
} from "@heroicons/react/outline";
import { Popover } from "@headlessui/react";

import { useState, useEffect } from "react";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import {
  PhotographIcon,
  VideoCameraIcon,
  CalendarIcon,
  NewspaperIcon,
  XIcon,
  CameraIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { useFormik } from "formik";
import { Dialog } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import {
  GlobeIcon,
  HeartIcon,
  ChatAltIcon,
  DocumentReportIcon,
} from "@heroicons/react/outline";
import {
  ThumbDownIcon,
  ThumbUpIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { eventScheema } from "../auth/schemas/CreateEventScheema";
import { JOBS_API } from "../../pages/config";
import ApplyJob from "./ApplyJob";
import { useRouter } from "next/router";


// const cardDropdown = [
//   {
//     name: "Turn Off Notifications",
//     href: "",
//     icon: BellIcon,
//   },
//   {
//     name: "Save",
//     href: "#",
//     icon: BookmarkIcon,
//   },
// ];

const AddNewJob = (setList, singleItem) => {
  const [spinner, setSpinner] = useState(false);
  const [Title, setTitle] = useState();
  const [Company, setCompany] = useState();
  const [Workplace, setWorkplace] = useState();
  const [Location, setLocation] = useState();
  const [Type, setType] = useState();
  const [Discripation, setDiscripation] = useState();
  const [Skills, setSkills] = useState([]);
  const [Email, setEmail] = useState("random.com");
  const [Question, setQuestion] = useState("");
  const [PostImage, setPostImage] = useState([]);
  const [postImagePreview, setpostImagePreview] = useState();
  let [isOpen, setIsOpen] = useState(false);
  let [isOpen1, setIsOpen1] = useState(false);
  let [isOpen2, setIsOpen2] = useState(false);
  const router = useRouter();
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  // Create Job
  function CreateJob() {
    const dataForm = new FormData();
    dataForm.append("jobs[email_address]", Email);
    dataForm.append("jobs[title]", Title);
    dataForm.append("jobs[description]", Discripation);
    dataForm.append("jobs[job_company]", Company)
    dataForm.append("jobs[job_location]", Location);
    dataForm.append("jobs[workplace_type]", Workplace);
    dataForm.append("jobs[employeement_type]", Type);
    setEmail('');
    // dataForm.append("jobs[job_questions]", Question);
    dataForm.append("jobs[job_skills]", Skills);
    if(PostImage){dataForm.append("jobs[company_photo]", PostImage);}
    fetch(JOBS_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result && result.data) {
          router.push("/jobs/jobs-show?"+result.data.id);
          setIsOpen(false)
          setIsOpen1(false)
          setIsOpen2(false)
        }
      })
      .catch((err) => console.log(err));
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
 
  const onSubmit = () => {
    resetForm();
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      eventOnline: "online",
      eventInPerson: "In person",
      eventName: "",
      timezone: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      address: "",
      venue: "",
      externalLink: "",
      description: "",
      speakers: "",
    },
    validationSchema: eventScheema,
  });
  
//**********/ Modals **********//
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    setTitle('');
    setCompany ('');
    setLocation ('');
    setWorkplace ('');
    setType ('');
    setDiscripation('');
    setSkills('');
    setEmail();
    setpostImagePreview('');
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
  return (
    <div className="add_new_button sticky top-16 text-right">
      <Link href="" className="">
        <a>
          <button
          onClick={openModal}
            type="submit"
            className="shadow-lg shadow-indigo-400 text-white text-md cursor-pointer font-bold p-4 rounded-full mt-6 bg-indigo-400 hover:text-white"
          >
            Add New Job
          </button>
        </a>
      </Link>
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
                        Add New Job
                      </Dialog.Title>
                      <div className="">
                        <div className="bg-white px-12 py-5 rounded-xl">
                          <form className="w-full">
                          <div className="relative flex items-center justify-center">
                          {postImagePreview?(''):(
                            <div className="relative flex gap-1 md:gap-2 items-center justify-center">
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
                                onChange={(e)=>setWorkplace(e.target.value)}
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
                                 onChange={(e)=>setType(e.target.value)}
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
                                                  Email && Skills.length?(
                                                    <Link href="">
                                                    <button
                                                          onClick={()=>CreateJob()}
                                                          type="submit"
                                                          className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                                        >
                                                          Save
                                                    </button>
                                                    </Link>   
                                                  ):(
                                                    <button
                                                          type="submit"
                                                          className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-200 cursor-not-allowed"
                                                        >
                                                          Save
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
  );
};

export default AddNewJob;
