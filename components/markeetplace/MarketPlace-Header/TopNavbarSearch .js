import React, { Fragment , useState , useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signout } from "../../auth/signout/SignOut";
import { CogIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import ProfileAvatar2 from "../../../public/images/mira.png";
import ProfileAvatar3 from "../../../public/images/profile-avatar.png";

import Compnylogo1 from "../../../public/images/logo1.jpeg";
import {
  BellIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  LogoutIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SEARCH_MULTIPLE } from "../../../pages/config";
import { useRouter } from "next/router";

const TopNavbarSearch = () => {
  let [isOpen, setisOpen] = useState(false);
  let [results, setresults] = useState();
  let [value, setvalue] = useState();
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");

  function openModal() {
    setisOpen(true);
  }
  function closeModal() {
    setresults('');
    setisOpen(false);
  }

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  const pagemove =()=>{
    router.push('/search?'+value);
    closeModal();
  }

  const handleKeypress = event => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      router.push('/search?'+value);
      closeModal();
    }
  };

  const searchmultiples  = async(event) =>{
    setvalue(event.target.value);
    if (event.target.value.length == 0)
    {
      setresults('');
    }else{
      await fetch(SEARCH_MULTIPLE+"?query="+event.target.value+"&type=Product", {
        method: "GET",
         headers: {
          Accept: "application/json", 
           Authorization: `${authKey}`,
         },
      })
         .then((resp) => resp.json())
        .then((result) => {
          if (result) {
            if (event.target.value.length == 0)
            {
              setresults('');
            }else{
              setresults(result.data);
              console.log(result.data)
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="flex items-center gap-2">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-7 cursor-pointer">
              <SearchIcon className="text-slate-400 h-5 w-5" />
        </span>
        <div
          className="text-slate-400 hover:shadow-xl bg-gray-100 w-64 md:w-56  rounded-xl border-none pl-14 cursor-text"
          placeholder="Search"
          onClick={openModal}
          type="text"
          name="search"
        > Search Products
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
                          <Dialog.Panel className="w-[620px] relative bg-white rounded-xl xl:w-[580px] lg:w-[730px] md:w-[680px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title>
                              <div className="">
                                <div
                                    className="text-lg font-medium leading-6 text-gray-900 px-8"
                                    >
                                    <div
                                      className="text-slate-400 relative bg-gray-100 w-full rounded-3xl border-indigo-400 mb-2">
                                      <input 
                                      className="focus:text-slate-400 focus:border-none bg-transparent text-slate-400 w-full border-none rounded-3xl"
                                      type="text"
                                      placeHolder="Search Products"
                                      onChange={searchmultiples}
                                      onKeyPress={handleKeypress}
                                      />
                                      <XIcon
                                    onClick={closeModal}
                                    className="w-5 h-5 cursor-pointer absolute right-3 top-2"
                                  />
                                  </div>
                                    
                                    </div>
                              </div>
                            </Dialog.Title>
                              <div className="h-44 overflow-y-scroll">
                              {results && results.map((i)=>(
                                <div className="" key={i.id} onClick={closeModal}>
                                  {i.searchable_type && i.searchable_type=="User"?(
                                    <Link href={{pathname: "/User-Profile", query: i.user.id,} }>
                                      <a className="flex items-center gap-2 p-2 border-b" >
                                        {i.user && i.user.display_photo_url ?
                                          (
                                            <img
                                              src={i.user.display_photo_url}
                                              className="object-cover rounded-full z-40 h-[42px] w-[42px]"
                                              alt=""
                                            />
                                          ) : (
                                            <Image
                                              src={ProfileAvatar}
                                              width={45}
                                              height={45}
                                              alt=""
                                            />
                                          )
                                        }
                                        <div className="">
                                        <div className="flex gap-4 items-center">
                                        <div className="font-bold">{i.user.first_name} {i.user.last_name}</div>
                                        <div className="font-extralight text-xs italic font-serif">User</div>
                                        </div>
                                        <div className="font-light text-xs">{i.user.connections_count} Connections {i.user.followers_count} Followers</div>
                                      </div>
                                      </a>
                                    </Link>

                                  ):(
                                    i.searchable_type && i.searchable_type=="Page"?(
                                      <Link href={{pathname: "/page-design/suggested-pages", query: i.page.id,} }>
                                      <a className="flex items-center gap-2 p-2 border-b">
                                        {i.page && i.page.display_photo_url ?
                                            (
                                              <img
                                                src={i.page.display_photo_url}
                                                className="object-cover rounded-full z-40 h-[42px] w-[42px]"
                                                alt=""
                                              />
                                            ) : (
                                              <Image
                                                src={ProfileAvatar}
                                                width={45}
                                                height={45}
                                                alt=""
                                              />
                                            )
                                          }
                                        <div className="">
                                          <div className="flex gap-4 items-center">
                                          <div className="font-bold">{i.page.name}</div>
                                          <div className="font-extralight text-xs italic font-serif">Page</div>
                                          </div>
                                          <div className="font-light text-xs">{i.page.page_likes_count} Likes</div>
                                        </div>
                                      </a>
                                    </Link>
                                    ):(
                                      i.searchable_type && i.searchable_type=="Group"?(
                                        <Link href={{pathname: "/group-page/joind-group", query: i.group.id,} }>
                                          <a className="flex items-center gap-2 p-2 border-b">
                                          {i.group && i.group.display_image_url ?
                                            (
                                              <img
                                                src={i.group.display_image_url}
                                                className="object-cover rounded-full z-40 h-[42px] w-[42px]"
                                                alt=""
                                              />
                                            ) : (
                                              <Image
                                                src={ProfileAvatar}
                                                width={45}
                                                height={45}
                                                alt=""
                                              />
                                            )
                                          }
                                            <div className="">
                                              <div className="flex gap-4 items-center">
                                              <div className="font-bold">{i.group.title}</div>
                                              <div className="font-extralight text-xs italic font-serif">Group</div>
                                              </div>
                                              <div className="font-light text-xs">{i.group.group_members_count} Members</div>
                                            </div>
                                          </a>
                                        </Link>
                                      ):(
                                        i.searchable_type && i.searchable_type=="Blog"?(
                                          <Link href={{pathname: "/blog/show", query: i.blog.id,}}>
                                            <a className="flex items-center gap-2 p-2 border-b">
                                            {i.blog && i.blog.photos_link[0] ?
                                              (
                                                <img
                                                  src={i.blog.photos_link[0]}
                                                  className="object-cover rounded-full z-40 h-[42px] w-[42px]"
                                                  alt=""
                                                />
                                              ) : (
                                                <Image
                                                  src={ProfileAvatar}
                                                  width={45}
                                                  height={45}
                                                  alt=""
                                                />
                                              )
                                            }
                                              <div className="">
                                                <div className="flex gap-4 items-center">
                                                <div className="font-bold">{i.blog.title}</div>
                                                <div className="font-extralight text-xs italic font-serif">Blog</div>
                                                </div>
                                                <div className="font-light text-xs"> {i.blog.reaction_count == null ?(0):(i.blog.reaction_count)} Likes</div>
                                              </div>
                                            </a>
                                          </Link>
                                        ):(
                                          i.searchable_type && i.searchable_type=="Hashtag"?(
                                          <Link  href={{pathname: "hashtag-design/hashtags-show", query: i.hashtag.id}} key={i.hashtag.id}>
                                            <a className="flex items-center gap-2 p-2 border-b">
                                              <div className="flex justify-between items-center hover:bg-gray-100" >
                                                <div className="py-2 px-4 rounded-full hover:bg-gray-100">
                                                  <div className="font-bold">{i.hashtag.name}</div>
                                                  <div className="mt-1">{i.hashtag.count} tags</div>
                                                </div>
                                              </div>
                                            </a>
                                          </Link>
                                        ):(
                                            i.searchable_type && i.searchable_type=="Job"?(
                                              <Link  href={{pathname: "/jobs/jobs-show", query: i.jobs.id}} key={i.jobs.id}>
                                                <a className="flex items-center gap-2 p-2 border-b" >
                                                  {i.jobs && i.jobs.company_photo ?
                                                    (
                                                      <img
                                                        src={i.jobs.company_photo}
                                                        className="object-cover rounded-full z-40 h-[42px] w-[42px]"
                                                        alt=""
                                                      />
                                                    ) : (
                                                      <Image
                                                        src={Compnylogo1}
                                                        width={45}
                                                        height={45}
                                                        alt=""
                                                      />
                                                    )
                                                  }
                                                  <div className="">
                                                  <div className="flex gap-4 items-center">
                                                  <div className="font-bold">{i.jobs.title} </div>
                                                  <div className="font-extralight text-xs italic font-serif">Jobs</div>
                                                  </div>
                                                  <div className="font-light text-xs">{i.jobs.employeement_type}</div>
                                                </div>
                                                </a>
                                              </Link>
                                            ):(
                                              i.searchable_type && i.searchable_type=="Product"?(
                                                <Link  href={{pathname: "/markeet-place/marketplace-show", query: i.product.id}} key={i.product.id}>
                                                  <a className="flex items-center gap-2 p-2 border-b" >
                                                    {i.product && i.product.product_pic?
                                                      (
                                                        <img
                                                          src={i.product.product_pic[0]}
                                                          className="object-cover rounded-full z-40 h-[42px] w-[42px]"
                                                          alt=""
                                                        />
                                                      ) : (
                                                        <Image
                                                          src={Compnylogo1}
                                                          width={45}
                                                          height={45}
                                                          alt=""
                                                        />
                                                      )
                                                    }
                                                    <div className="">
                                                    <div className="flex gap-4 items-center">
                                                    <div className="font-bold">{i.product.name} </div>
                                                    <div className="font-extralight text-xs italic font-serif">MarketPlace</div>
                                                    </div>
                                                    <div className="font-light text-xs">{i.product.category.name}</div>
                                                  </div>
                                                  </a>
                                                </Link>
                                              ):('')
                                            )
                                        ))
                                      )
                                    )
                                  )
                                  }
                                  
                                   
                                      
                                  
                                 
                                  
                                  {/* <Link href="/search/marketplace-search">
                                    <a className="flex items-center gap-2 p-2 border-b">
                                      <Image
                                        className="object-cover rounded-full"
                                        src={ProfileAvatar2}
                                        width={45}
                                        height={45}
                                        alt=""
                                      />
                                      <div className="">
                                        <div className="flex gap-4 items-center">
                                        <div className="font-bold">Xs Max</div>
                                        <div className="font-extralight text-xs italic font-serif">MarketPlace</div>
                                        </div>
                                        <div className="font-light text-xs">30 Items</div>
                                      </div>
                                    </a>
                                  </Link>
                                  <Link href="/search/jobs-search">
                                    <a className="flex items-center gap-2 p-2 border-b">
                                      <Image
                                        className="object-cover rounded-full"
                                        src={ProfileAvatar}
                                        width={45}
                                        height={45}
                                        alt=""
                                      />
                                      <div className="">
                                        <div className="flex gap-4 items-center">
                                        <div className="font-bold">Roby On Rails</div>
                                        <div className="font-extralight text-xs italic font-serif">Jobs</div>
                                        </div>
                                        <div className="font-light text-xs">3 Jobs</div>
                                      </div>
                                    </a>
                                  </Link> */}
                                </div>
                                ))}
                              </div>
                              {/* <div className="sticky bottom-0 right-0">
                                <div className="p-2 rounded-xl">
                                  <div className="flex gap-4 justify-end"> 
                                    <button
                                        onClick={closeModal}
                                        type="submit"
                                        className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                        >
                                          Close
                                    </button>
                                  </div>
                                </div>
                              </div> */}
                              {results && results.length>0?(
                                 <div className="text-right border-t px-6">
                                 {/* <Link href={{pathname: "/search", query: value,}}>
                                 <a href=""> */}
                                   <button className="mt-2 border-indigo-400 border text-indigo-400 px-2 py-1 rounded-full font-small"
                                    onClick={()=>pagemove()} >
                                     Show more
                                   </button>
                                 {/* </a>
                                 </Link> */}
                               </div>
                              ):('')
                               
                              }
                              
                          </Dialog.Panel>
                          
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </div>
      </label>
    </div>
  );
};

export default TopNavbarSearch;
