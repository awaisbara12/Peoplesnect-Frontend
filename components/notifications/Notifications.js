import React,{useEffect,useState}from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { GET_NOTIFICATIONS } from "../../pages/config.js";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Notifications = () => {
  const [notify, setnotify] = useState();

   
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
          //console.log("Current Userss",result.data.id)
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
              <div className="searech-bar">
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
              </div>
            </div>
            {notify?(
               notify.map((i)=>(
                <div className="like-on-article border-b-1" key={i.id}>
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
                          {i.user.first_name} {i.user.last_name}
                        </div>
                      </a>
                      <a href="">
                        <div className="userfield text-xs">
                          {/* <a href="" className="font-bold text-indigo-400">
                            User Name
                          </a>{" "} */}
                          {i.body}
                          {/* Likes your{" "} */}
                          {/* <a className="font-bold text-indigo-400" href="">
                            Article
                          </a> */}
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="time font-light text-xs">12:11pm</div>
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
