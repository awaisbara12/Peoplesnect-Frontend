import React,{useEffect,useState}from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { GET_NOTIFICATIONS, InviteFriends } from "../../pages/config.js";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Notifications = () => {
  const [notify, setnotify] = useState();
  // const [notify, setpro] = useState();

   
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore");  }

  // get all notifications 
  const allNotifications=async()=>{    
    await fetch(GET_NOTIFICATIONS, {
      method: "GET",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          console.log("===",result.data);
          setnotify(result.data);  
          console.log("Current Userss",result.data.id)
        }
      })
      .catch((err) => console.log(err)); 
  }

  function joingroups(id, status) {
    const dataForm = new FormData();
    dataForm.append("invite_friends[status]", status);
    // dataForm.append("news_feeds[feed_type]", feedType);
    fetch(InviteFriends+"/"+id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          // console.log(result.data);
          allNotifications();
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(()=>{
    allNotifications();
  },[])
  return (
    <div>
      <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="bg-white rounded-xl">
            <div className="flex justify-between items-center border-b-1 p-4">
              <div className="heading">Notifications</div>
              {/* <div className="searech-bar">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded text-indigo-400 border-indigo-400 border px-3 py-2">
                      Filter
                      <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 bg-white border w-40 mt-1">
                      <div className="">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? " bg-indigo-400 text-white "
                                  : "bg-white",
                                "block p-2 text-xs"
                              )}
                            >
                              Unread
                            </a>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? " bg-indigo-400 text-white "
                                  : "",
                                "block p-2 text-xs"
                              )}
                            >
                              Likes
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-indigo-400 text-white"
                                  : "",
                                "block p-2 text-xs"
                              )}
                            >
                              Comments
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div> */}
            </div>
            {notify?(
               notify.map((i)=>(
                <div className="like-on-article border-b-1" key={i.id}>
                <div className="request-profile flex  px-4 py-3 justify-between items-center">
                  <div className="flex items-center gap-3">
                  <Link href={{
                          pathname: "/Friends-Profile",
                          query: i.invite_friend ? (i.invite_friend.sender.id):(i.sender?(i.sender.id):(''))
                        }}>
                      <a>
                        {i.sender && i.sender.display_photo_url?(
                          <img
                            src={i.sender.display_photo_url}
                            className="object-cover rounded-full z-40 h-[35px] w-[35px]"
                            alt=""
                          />
                          ):(
                            i.invite_friend && i.invite_friend.sender?(
                              <img
                              src={i.invite_friend.sender.display_photo_url}
                              className="object-cover rounded-full z-40 h-[35px] w-[35px]"
                              alt=""
                            />
                            ):(
                              <Image
                              src={ProfileAvatar}
                              width={35}
                              height={35}
                              alt=""
                            />
                            )
                           
                          )
                        }
                        
                        {/* <Image
                          src={ProfileAvatar}
                          width={35}
                          height={35}
                          alt=""
                        /> */}
                      </a>
                    </Link>
                    <div className="">
                    <Link href={{
                          pathname: "/Friends-Profile",
                          query: i.invite_friend ? (i.invite_friend.sender.id):(i.sender?(i.sender.id):(''))
                        }}>
                        <a>
                        <div className="username text-sm font-bold">
                          {i.sender?(
                            i.sender.first_name+' '+i.sender.last_name
                          ):(
                            i.follower?(
                              i.sender.first_name+' '+i.sender.last_name
                            ):
                            (i.invite_friend && i.invite_friend.sender?(
                              i.invite_friend.sender.first_name+' '+i.invite_friend.sender.last_name
                            ):(''))
                          )}
                          
                        </div>
                      </a>
                      </Link>
                        <div className="userfield text-xs">
                          {/* <a href="" className="font-bold text-indigo-400">
                            User Name
                          </a>{" "} */}
                          
                          {/* Likes your{" "} */}
                          {/* <a className="font-bold text-indigo-400" href="">
                            Article
                          </a> */}
                          {i.invite_friend && i.invite_friend.group && i.invite_friend.status == "pending"?(
                            <div className="flex justify-end gap-4">
                            <div className="py-2 font-bold">
                            <Link href={{pathname: "group-page/suggest-group", query: i.invite_friend.group.id,}}>
                              <a>
                              {i.body}
                              </a>
                              </Link>
                            </div>
                            <button className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium"
                            onClick={ () =>joingroups(i.invite_friend.id, "accepted")}>
                              Accept
                            </button>
                            <button className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium"
                            onClick={ () =>joingroups(i.invite_friend.id, "cancelled")}>
                              Ignore
                            </button>
                          </div>
                          ):(i.invite_friend && i.invite_friend.group.group_type == "private_group" && i.invite_friend.status == "accepted"?(
                            <div className="flex justify-end gap-4">
                              <Link href={{pathname: "group-page/suggest-group", query: i.invite_friend.group.id,}}>
                              <a>
                            <div className="py-2">
                              {i.body}
                            </div>
                            <div className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium">
                              Your Request is send to {i.invite_friend.group.title}
                              </div>
                              </a>
                              </Link>
                          </div>
                          ):(i.invite_friend && i.invite_friend.group.group_type == "public_group" && i.invite_friend.status == "accepted"?(
                            <div className="flex justify-end gap-4">
                              <Link href={{pathname: "group-page/joind-group", query: i.invite_friend.group.id,}}>
                              <a>
                            <div className="py-2 font-bold">
                              {i.body }
                            </div>
                            <div className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium">
                             You joined group {i.invite_friend.group.title}
                            </div>
                            </a>
                              </Link>
                          </div>
                          ):(i.invite_friend && i.invite_friend.status == "cancelled"?(
                            <div className="flex justify-end gap-4">
                            
                            <Link href={{pathname: "group-page/suggest-group", query: i.invite_friend.group.id,}}>
                              <a>
                              <div className="py-2 font-bold">
                              {i.body }
                            </div>
                            <div className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium">
                             You cancelled joined request for group {i.invite_friend.group.title}
                            </div>
                            </a>
                              </Link>
                          </div>):(i.body))))}
                        </div>
                      
                    </div>
                  </div>
                  <div className="time font-light text-xs">{i.date} {i.time}</div>
                </div>
                </div>
                
               ))
               
            ):('')

            }
            
            {/* <div className="Comment-on-post border-b-1">
              <div className="request-profile flex  px-4 py-3 justify-between items-center">
                <div className="flex items-center gap-3">
                  <Link href="/news-feed">
                    <a>
                      <Image
                        src={ProfileAvatar}
                        width={35}
                        height={35}
                        alt=""
                      />
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm font-bold">
                        User Name
                      </div>
                    </a>
                    <a href="">
                      <div className="userfield text-xs">
                        <a href="" className="font-bold text-indigo-400">
                          User Name
                        </a>{" "}
                        Commented on ur{" "}
                        <a className="font-bold " href="">
                          Post
                        </a>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="time font-light text-xs">12:11pm</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
