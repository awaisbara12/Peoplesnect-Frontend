import React,{useState,useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import { SearchIcon } from "@heroicons/react/solid";

import {
  CURENT_USER_LOGIN_API, GET_CONNECTIONS
} from "../../pages/config";

function MyNetwork() {
  const [userDetails, setUserDetails] = useState();
  const [connections_count, setConnections_count] = useState();
  const [userConnections, setUserConnections] = useState();

  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }

  const User_Connections=async()=>{    
   
    await fetch(GET_CONNECTIONS, {
      method: "GET",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setUserConnections(result.data)
          console.log("hello",result.data)
          // setConnections_count(result.data.connections_count)
        }
      })
      .catch((err) => console.log(err)); 
  }

  //For Current User
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
          setUserDetails(result.data)
          setConnections_count(result.data.connections_count)
        }
      })
      .catch((err) => console.log(err)); 
      User_Connections();
  }

  useEffect(()=>{
    Current_User();
  },[])

  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="bg-white rounded-xl">
          <div className="flex justify-between items-center border-b-1 p-4">
            <div className="heading">Total Connections</div>
            <div className=""> {connections_count}</div>
          </div>
          {userConnections? (
            userConnections.map((user) => (
              <div className="border-b-1" key={user.id}>
              <div className="request-profile flex  px-4 py-3 justify-between items-center">
                <div className="flex items-center gap-3">
                  <Link href="/news-feed">
                    <a>
                      <Image src={ProfileAvatar} width={35} height={35} alt="" />
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm font-bold">{user.first_name} {user.last_name}</div>
                    </a>
                    <a href="">
                      <div className="userfield text-xs">{user.city},{user.country}</div>
                    </a>
                    <a href="">
                      <div className="mutual-followers text-xs">
                        Matual Friends +3
                      </div>
                    </a>
                  </div>
                </div>
                <div className="Request-button flex items-center gap-2">
                  <button className="border-1 border-indigo-400 rounded-full text-indigo-400 px-3 py-1 hover:bg-indigo-400 hover:text-white">
                    Message
                  </button>
                  <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                    Remove
                  </button>
                </div>
              </div>
            </div>
            ))
          ):('')}
          {}
        </div>
      </div>
    </div>
  );
}

export default MyNetwork;
