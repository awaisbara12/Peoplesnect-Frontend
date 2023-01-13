import React,{useState,useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import { SearchIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { 
  FOLLOW_USER_API, 
  CURENT_USER_LOGIN_API
} from "../../pages/config";
import { Button } from "@material-tailwind/react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Followings = () => {
  const [followee, setfollowee] = useState();
   // Bareer Key
   if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
   const confirmation=(userId)=>{
    let a =confirm("Are you Sure ?")
    if(a){UnFollow(userId);}
   }
   //UnFollow 
   const UnFollow=async(userId)=>
  {      
    const requestOptions = {
      method: 'DELETE',
      headers:{Accept: "application/json", Authorization: `${authKey}` },
    };
    const response = await fetch(`${FOLLOW_USER_API}/${userId}`,requestOptions);
    const data = await response.json();
    setfollowee(data.data);
    ShowFollowing();
  }
  // Show Following
  const ShowFollowing=async()=>
  {      
    const requestOptions = {
      method: 'GET',
      headers:{Accept: "application/json", Authorization: `${authKey}` },
    };
    const response = await fetch(`${FOLLOW_USER_API}`,requestOptions);
    const data = await response.json();
    setfollowee(data.data);
  }
  useEffect(() => {
     ShowFollowing();
  },[]);
  return (
    <div className="">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="bg-white rounded-b-xl">
          <div className="flex justify-between items-center border-b-1 p-4">
            <div className="heading">Total Followings</div>
            <div className="">{followee?(followee.length):('')}</div>
          </div>

          {followee?(
            followee.map((i)=>(
            <div className="border-b-1" key={i.id}>
            <div className="Followings-profile flex  px-4 py-10 justify-between items-center">
            <Link 
              href={{
              pathname: "/Friends-Profile",
              query: i.followee.id,
            }}>
            <a>
              <div className="flex items-center gap-3">
                {i.followee.display_photo_url?(
                     <img 
                     src={i.followee.display_photo_url}
                     className="object-cover rounded-full z-40 h-[35px] w-[35px]"        
                     alt="" />
                ):(
                <Image 
                     src={ProfileAvatar}
                     width={35} 
                     height={35} 
                     alt="" />
                )}
                <div className="">
                 <div className="username text-sm font-bold capitalize">{i.followee.first_name} {i.followee.last_name}</div>
                 <div className="userfield text-xs">{i.followee.city}, {i.followee.country}</div>
                </div>
              </div>
            </a>
            </Link> 
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-full  text-indigo-400 border-1 hover:bg-indigo-400 hover:text-white border-indigo-400 px-3 py-2">
                    Following
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-full border-1 text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "" : "",
                              "block px-4 text-sm"
                            )}
                            onClick={()=>confirmation(i.id)}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            </div> 
            ))
          ):('')}
          
          
        </div>
      </div>
    </div>
  );
};

export default Followings;
