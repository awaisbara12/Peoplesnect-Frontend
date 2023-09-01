import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CogIcon, EyeIcon, PencilAltIcon, PhotographIcon, SearchIcon, XIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/outline';
import { CONTACT_US_API, MESSAGES_API } from "../../../../pages/config";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from 'react-spinners/ClipLoader';
import Router from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { TagsInput } from "react-tag-input-component";
import { useRouter } from "next/router";


const NewLetterList =()=> {
  
  const [newsletter, setnewsletter] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpage1, setcurrentpage1] = useState(1);
  const [lastpage, setlastpage] = useState(0);
  const [search, setsearch] = useState(0);
  const [search1, setsearch1] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  const [subject, setsubject] = useState();
  const [email, setemail] = useState([]);
  const [email_type, setemail_type] = useState();
  const [body, setbody] = useState();
  const [status, setstatus] = useState();
  const [user, setuser] = useState();
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");


  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }

  const Getnewsletter = async()=>{      
    await fetch(MESSAGES_API+"/messenger_news_letters?id="+myArray[1]+"&type=Group&"+"page=" + currentpage, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          console.log(result.data);
          const mergedata = [...newsletter, ...result.data]
          setnewsletter(mergedata);
          setcurrentpage(result.pages.next_page)
          setlastpage(result.pages.total_pages)
        }
      })
      .catch((err) => console.log(err)); 
  }
 //**********/ Modals **********//
 function closeModal() {
  setIsOpen(false);
  setbody("");
  setemail_type("");
  setemail("");
  setsubject("");
  setstatus("");
  setuser("");
}

function openModal(i) {
  setIsOpen(true);
  setbody(i.body);
  setemail_type(i.email_type);
  setemail(i.custom_emails);
  setsubject(i.subject);
  setstatus(i.news_letter_status);
  setuser(i.user);
}
  const searchJob = async()=>{      
    await fetch(MESSAGES_API+"/messenger_news_letters?id="+myArray[1]+"&type=Group&"+"page=1", {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setnewsletter(result.data);
          setcurrentpage(result.pages.next_page);
          setlastpage(result.pages.total_pages);
        }
      })
      .catch((err) => console.log(err)); 
  }

  async function detelenewsletter(newsletsletterId){
    var checks =confirm("Are you sure..?");
    if(checks){
      const res = await axios(CONTACT_US_API + "/" + newsletsletterId, {
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
        document.getElementById(`newslet-${newsletsletterId}`).classList.add("hidden");
      }
    }
  }

  const fetchMoreData = async()=>{
    if(search == "0"){
      setcurrentpage1(1);
      await Getnewsletter();
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
      await fetch(MESSAGES_API+"/messenger_news_letters_search"+"?type=Group"+"&id="+myArray[1]+"&query="+event, {
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
              setnewsletter(result.data);
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
      await fetch(MESSAGES_API+"/messenger_news_letters_search"+"?type=Group"+"&id="+myArray[1]+"&query="+event+"&page="+currentpage1, {
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
              const mergedata = [...newsletter, ...result.data]
              setnewsletter(mergedata);
              setcurrentpage(result.pages.next_page);
              setcurrentpage1(result.pages.next_page);
              setlastpage(result.pages.total_pages);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    Getnewsletter();
  }, []);

  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="mt-8">
          <div className="">
            <div className="text-center">
              <div className="heading text-4xl font-semibold text-indigo-400">NewsLetter</div>
            </div>
            <div className="flex justify-end">
              <Link href={{ pathname: "/AddNewsLetter/NewsLetter-List", query: myArray[1], }}>
              <button  className="border bg-indigo-400 text-white font-bold hover:border-indigo-400 px-4 py-3 hover:bg-transparent rounded-full hover:text-indigo-400">
                Add NewsLetter
              </button>
              </Link>
            </div>
            <div className="relative w-1/2 mx-auto mt-4">
              <input
                className="placeholder:text-md placeholder:text-indigo-500 pl-12  hover:shadow-lg bg-white placeholder:rounded-full  border-indigo-400 w-full rounded-full"
                placeholder="Search NewsLetter Here"
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
                    dataLength={newsletter.length}
                    next={fetchMoreData}
                    hasMore={currentpage != null }
                    loader={<div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                    className="grid grid-cols-2 gap-6"
                  >
                    {newsletter && newsletter.map((newslet)=>(
                      <div
                        className="hover:shadow-2xl shadow-lg bg-white flex items-start justify-between rounded-xl p-2"
                        id={`newslet-${newslet.id}`}
                        key={newslet.id}>
                        <Link href="">
                          <a>
                            <div className="flex gap-2 items-start">
                              <div className="text-sm">
                                <div className="font-extralight "> <b className="font-bold text-indigo-400">Subject: </b>{newslet.subject}</div>
                                {/* <div className="font-extralight"><b className="font-bold text-indigo-400">Email Type: </b>{newslet.email_type}</div>
                                <div className="font-extralight"><b className="font-bold text-indigo-400">Send Status: </b>{newslet.news_letter_status}</div> */}
                              </div>
                            </div>
                          </a>
                        </Link>
                        <div className="flex gap-1 pl-2">
                          {/* <button
                          >
                            <Link href={{pathname: "/Admin/Newsletter-list/Addnewsletter", query:newslet.id,}}>
                              <a>
                                <PencilAltIcon className="h-5 w-5 text-indigo-400" />
                              </a>
                            </Link>
                          </button> */}
                          <button onClick={() => openModal(newslet)}>
                              <EyeIcon className="h-5 w-5 text-indigo-400" />
                          </button>
                          {/* <button
                            key="Delete"
                            onClick={() => detelenewsletter(newslet.id)}
                          >
                            <TrashIcon className="h-5 w-5 text-indigo-400" />
                          </button> */}
                        </div>
                      </div>
                    ))}
                  </InfiniteScroll>
              </div>
                                          
              <div className="">
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
                              <Dialog.Title >
                                <div className="flex justify-between items-center mx-4">
                                    <div
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 px-8">
                                      NewsLetter
                                    </div>
                                    <XIcon
                                      onClick={closeModal}
                                      className="w-5 h-5 cursor-pointer"/>
                                </div>
                              </Dialog.Title>
                              <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                                <div className="bg-white px-12 py-5 rounded-xl">
                                  <div>
                                  <b>Subject: </b>{subject && subject}
                                  </div>
                                  <div className="border p-2 rounded-xl text-sm">
                                    <b>Body: </b> <div dangerouslySetInnerHTML={{ __html: body }} />
                                  </div>
                                  {/* <div className="border p-2 rounded-xl text-sm">
                                    <b>Status: </b> {status && status}
                                  </div>
                                  <div className="border p-2 rounded-xl text-sm">
                                    <b>Custom Emails: </b> {email && email}
                                  </div>
                                  <div className="border p-2 rounded-xl text-sm">
                                    <b>Email Type: </b> {email_type && email_type}
                                  </div> */}
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
        </div>
      </div>
    </div>
  );
}

export default NewLetterList;