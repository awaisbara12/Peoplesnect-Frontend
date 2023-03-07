import{useState, useEffect, React, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import Cover from "../../public/images/main-banner.jpg";
import { ViewGridIcon, XCircleIcon, XIcon } from "@heroicons/react/solid";
import {
  CalendarIcon,
  LocationMarkerIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";
import { EVENT_API } from "../../pages/config";
import axios from "axios";

const MainEvents = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [seat, setseat] = useState();
  const [bookmarks, setBookmarks] = useState(props.bookmarks);
  const [event, setevent] = useState();
  const [id, setid] = useState();
  const [remainingSeats, setremainingSeats] = useState(0);
   
  // Barear key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  // close modal
  function closeModal() {
    setIsOpen(false);
    setseat(0);
  }
  // open modal
  function openModal(i) {
    var remain =i.total_seats-i.booked_seat;
    setremainingSeats(remain);
    setid(i.id)
    setIsOpen(true);
  }
  // Join the Event
  const JoinEvent = async () => {
    const res = await axios(EVENT_API+"/Join_seats?ids="+id+"&booking="+seat, {
      method: "GET",
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

    try {
      if (result.status == 200) {
        GetEvents();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  };
  //  hnadle input of booking seat modal
  const bookSeathandler=(e)=>{
    if(e.target.value<=remainingSeats && e.target.value>0){
      setseat(e.target.value);
    }
  }
  // Get all events 
  const GetEvents = async () => {
    const res = await axios(EVENT_API, {
      method: "GET",
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

    try {
      if (result.status == 200) {
        setevent(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  };
  useEffect(() => {
    GetEvents();
  }, []);
  return (
    <div className="w-[580px] mt-8 xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
    <div className="bg-white rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div className="heading font-semibold">Events</div>
          <div className="all-button">
            <button className="bg-indigo-400 text-white p-2 rounded-full">
              See All
            </button>
          </div>
        </div>
        <div className="">
          {/* Show All event */}
          {event?(
            event.map((i)=>{
              return(
                <div className="profile p-5 mt-5 bg-gray-100 rounded-xl" key={i.id}>
                  <div className="flex items-center gap-3">
                      {/*  Event photo */}
                    {i.cover_photo_url?(
                        <img
                          className="object-cover w-[50px] h-[50px] rounded"
                          src={i.cover_photo_url}
                          alt=""
                        />
                    ):(
                        <Image
                          className="object-cover"
                          src={ProfileAvatar}
                          width={45}
                          height={45}
                          alt=""
                        />
                    )}
                      {/* Event name and organized name  */}
                    <div className="">
                      <div className="User-Name font-bold capitalize">
                        {i.name}
                      </div>
                      <div className="Locations mt-2 font-light">
                        Event organized by{" "}
                        <Link href={{pathname:"/User-Profile",query: i.owner.id,}}>
                          <a>
                            <span className="text-indigo-400 cursor-pointer font-bold capitalize">
                              {i.owner.first_name} {i.owner.last_name}
                            </span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                        {/* Event date and time */}
                        <div className="flex gap-2 items-center font-bold">
                          <CalendarIcon className="h-5 w-5" />
                          {i.start_date} -{i.start_time} To {i.end_date} -{i.end_time}
                        </div>
                        {/* event type */}
                        {i.event_type == "online"?(
                          <div className="flex gap-2 items-center font-bold mt-1">
                            <VideoCameraIcon className="h-5 w-5" />
                            Online
                          </div>
                        )
                        :
                        (
                          <div className="flex gap-2 items-center font-bold mt-1">
                            <VideoCameraIcon className="h-5 w-5" />
                            In Person
                        </div>
                        )}

                        <div className="flex gap-2 items-center mt-1 font-bold">
                          <LocationMarkerIcon className="h-5 w-5" />
                         {i.total_seats - i.booked_seat} available
                        </div>
                  </div>
                  <div className="">
                    <div className="flex justify-end gap-3">
                      {/* Join Button and modal */}
                      <div className="">
                      
                        <div onClick={()=>openModal(i)} className="border border-indigo-400 font-bold px-4 py-2 bg-indigo-400 text-white hover:bg-transparent hover:text-indigo-400 rounded-full">
                          Join
                        </div>
                        
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
                                <div className="flex justify-between items-center mx-4">
                                  </div>
                                  <Dialog.Title
                                    as="h3"
                                    className="text-lg flex justify-between items-center font-bold text-gray-900 px-8"
                                  >
                                    Select Seats
                                    <XIcon
                                    onClick={closeModal}
                                    className="w-5 h-5 cursor-pointer"
                                  />
                                  </Dialog.Title>
                                  <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                                    <div className="bg-white px-12 py-5 rounded-xl">
                                    <form className="w-full">
                                        <div className="">
                                          <div className="">
                                            <div className="">
                                              <input
                                                className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl"
                                                placeholder="Select Seats"
                                                type="Number"
                                                name="search"
                                                value={seat}
                                                onChange = {bookSeathandler}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                    </form>
                                    <div className="flex gap-4 justify-end">
                                    {
                                      seat<=remainingSeats?(
                                        <button
                                          type="submit"
                                          className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                          onClick={()=>JoinEvent()}
                                        >
                                          Apply to Join
                                        </button>
                                      ):(
                                        <button
                                          type="submit"
                                          className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-100"
                                        >
                                          Apply to Join
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
                      <Link href={{pathname: "/events-design/event-view", query: i.news_feed_id,}}>
                        <a>
                          <div className="border border-indigo-400 font-bold px-3 py-2 hover:bg-indigo-400 hover:text-white text-indigo-400 rounded-full">
                            Details
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
            )})
          
          ):('')}











          {/* <div className="profile p-5 mt-10 bg-gray-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Link href="/news-feed">
                <a>
                  <Image
                    className="object-cover"
                    src={ProfileAvatar}
                    width={45}
                    height={45}
                    alt=""
                  />
                </a>
              </Link>
              <div className="">
                <div className="User-Name font-bold ">
                  Advanced Microsoft Teams Webinar for Assistants and Admins
                </div>
                <div className="Locations mt-2 font-light">
                  Event organized by{" "}
                  <span className="text-indigo-400 cursor-pointer font-bold">
                    Compny Name
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold">
                    <CalendarIcon className="h-5 w-5" />
                    Date & Time Of Event
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold mt-1">
                    <VideoCameraIcon className="h-5 w-5" />
                    Online/Offline?
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center mt-1 font-bold">
                    <LocationMarkerIcon className="h-5 w-5" />
                    Location Of Event
                  </div>
                </a>
              </Link>
            </div>
            <div className="">
              <div className="flex justify-end gap-3">
                <Link href="">
                  <a>
                    <div className="border border-indigo-400 font-bold px-4 py-2 bg-indigo-400 text-white hover:bg-transparent hover:text-indigo-400 rounded-full">
                      Join
                    </div>
                  </a>
                </Link>
                <Link href="/events-design/event-view">
                  <a>
                    <div className="border border-indigo-400 font-bold px-3 py-2 hover:bg-indigo-400 hover:text-white text-indigo-400 rounded-full">
                      Details
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="profile p-5 mt-10 bg-gray-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Link href="/news-feed">
                <a>
                  <Image
                    className="object-cover"
                    src={ProfileAvatar}
                    width={45}
                    height={45}
                    alt=""
                  />
                </a>
              </Link>
              <div className="">
                <div className="User-Name font-bold ">
                  Advanced Microsoft Teams Webinar for Assistants and Admins
                </div>
                <div className="Locations mt-2 font-light">
                  Event organized by{" "}
                  <span className="text-indigo-400 cursor-pointer font-bold">
                    Compny Name
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold">
                    <CalendarIcon className="h-5 w-5" />
                    Date & Time Of Event
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold mt-1">
                    <VideoCameraIcon className="h-5 w-5" />
                    Online/Offline?
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center mt-1 font-bold">
                    <LocationMarkerIcon className="h-5 w-5" />
                    Location Of Event
                  </div>
                </a>
              </Link>
            </div>
            <div className="">
              <div className="flex justify-end gap-3">
                <Link href="">
                  <a>
                    <div className="border border-indigo-400 font-bold px-4 py-2 bg-indigo-400 text-white hover:bg-transparent hover:text-indigo-400 rounded-full">
                      Join
                    </div>
                  </a>
                </Link>
                <Link href="/events-design/event-view">
                  <a>
                    <div className="border border-indigo-400 font-bold px-3 py-2 hover:bg-indigo-400 hover:text-white text-indigo-400 rounded-full">
                      Details
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="profile p-5 mt-10 bg-gray-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Link href="/news-feed">
                <a>
                  <Image
                    className="object-cover"
                    src={ProfileAvatar}
                    width={45}
                    height={45}
                    alt=""
                  />
                </a>
              </Link>
              <div className="">
                <div className="User-Name font-bold ">
                  Advanced Microsoft Teams Webinar for Assistants and Admins
                </div>
                <div className="Locations mt-2 font-light">
                  Event organized by{" "}
                  <span className="text-indigo-400 cursor-pointer font-bold">
                    Compny Name
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold">
                    <CalendarIcon className="h-5 w-5" />
                    Date & Time Of Event
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold mt-1">
                    <VideoCameraIcon className="h-5 w-5" />
                    Online/Offline?
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center mt-1 font-bold">
                    <LocationMarkerIcon className="h-5 w-5" />
                    Location Of Event
                  </div>
                </a>
              </Link>
            </div>
            <div className="">
              <div className="flex justify-end gap-3">
                <Link href="">
                  <a>
                    <div className="border border-indigo-400 font-bold px-4 py-2 bg-indigo-400 text-white hover:bg-transparent hover:text-indigo-400 rounded-full">
                      Join
                    </div>
                  </a>
                </Link>
                <Link href="/events-design/event-view">
                  <a>
                    <div className="border border-indigo-400 font-bold px-3 py-2 hover:bg-indigo-400 hover:text-white text-indigo-400 rounded-full">
                      Details
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="profile p-5 mt-10 bg-gray-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Link href="/news-feed">
                <a>
                  <Image
                    className="object-cover"
                    src={ProfileAvatar}
                    width={45}
                    height={45}
                    alt=""
                  />
                </a>
              </Link>
              <div className="">
                <div className="User-Name font-bold ">
                  Advanced Microsoft Teams Webinar for Assistants and Admins
                </div>
                <div className="Locations mt-2 font-light">
                  Event organized by{" "}
                  <span className="text-indigo-400 cursor-pointer font-bold">
                    Compny Name
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold">
                    <CalendarIcon className="h-5 w-5" />
                    Date & Time Of Event
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold mt-1">
                    <VideoCameraIcon className="h-5 w-5" />
                    Online/Offline?
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center mt-1 font-bold">
                    <LocationMarkerIcon className="h-5 w-5" />
                    Location Of Event
                  </div>
                </a>
              </Link>
            </div>
            <div className="">
              <div className="flex justify-end gap-3">
                <Link href="">
                  <a>
                    <div className="border border-indigo-400 font-bold px-4 py-2 bg-indigo-400 text-white hover:bg-transparent hover:text-indigo-400 rounded-full">
                      Join
                    </div>
                  </a>
                </Link>
                <Link href="/events-design/event-view">
                  <a>
                    <div className="border border-indigo-400 font-bold px-3 py-2 hover:bg-indigo-400 hover:text-white text-indigo-400 rounded-full">
                      Details
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="profile p-5 mt-10 bg-gray-100 rounded-xl">
            <div className="flex items-center gap-3">
              <Link href="/news-feed">
                <a>
                  <Image
                    className="object-cover"
                    src={ProfileAvatar}
                    width={45}
                    height={45}
                    alt=""
                  />
                </a>
              </Link>
              <div className="">
                <div className="User-Name font-bold ">
                  Advanced Microsoft Teams Webinar for Assistants and Admins
                </div>
                <div className="Locations mt-2 font-light">
                  Event organized by{" "}
                  <span className="text-indigo-400 cursor-pointer font-bold">
                    Compny Name
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold">
                    <CalendarIcon className="h-5 w-5" />
                    Date & Time Of Event
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center font-bold mt-1">
                    <VideoCameraIcon className="h-5 w-5" />
                    Online/Offline?
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div className="flex gap-2 items-center mt-1 font-bold">
                    <LocationMarkerIcon className="h-5 w-5" />
                    Location Of Event
                  </div>
                </a>
              </Link>
            </div>
            <div className="">
              <div className="flex justify-end gap-3">
                <Link href="">
                  <a>
                    <div className="border border-indigo-400 font-bold px-4 py-2 bg-indigo-400 text-white hover:bg-transparent hover:text-indigo-400 rounded-full">
                      Join
                    </div>
                  </a>
                </Link>
                <Link href="/events-design/event-view">
                  <a>
                    <div className="border border-indigo-400 font-bold px-3 py-2 hover:bg-indigo-400 hover:text-white text-indigo-400 rounded-full">
                      Details
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MainEvents;
