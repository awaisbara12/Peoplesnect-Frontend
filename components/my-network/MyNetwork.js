import React,{useState,useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import { SearchIcon, UsersIcon } from "@heroicons/react/solid";

import {
  BLOCK_API,
  CURENT_USER_LOGIN_API, GET_CONNECTIONS
} from "../../pages/config";

function MyNetwork() {
  const [userDetails, setUserDetails] = useState();
  const [connections_count, setConnections_count] = useState();
  const [userConnections, setUserConnections] = useState();
  const [userid, setUserId] = useState();

  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
// Blocked user
  const Block =(id,userId,type)=>{
    const dataForm = new FormData();
    dataForm.append("blocks[blockable_type]", type);
    dataForm.append("blocks[blockable_id]", id);
    dataForm.append("blocks[blocked_id]", userId);
    const res = fetch(BLOCK_API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    body:dataForm,
    })
    .then((resp) => resp.json())
    .then((result) => {
      console.log(result.data);
      User_Connections();
    })
  }
  // Get All Connection
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
        console.log("hello",result)
        // setConnections_count(result.data.connections_count)
      }
    })
    .catch((err) => console.log(err)); 
  }
  // Remove Connection
  const RemoveConnection=async(delId)=>{
    let a=confirm("Are you sure");
    if (delId && a==true){
      await fetch(`${GET_CONNECTIONS}/${delId}`, {
        method: "DELETE",
         headers: {
          Accept: "application/json", 
           Authorization: `${authKey}`,
         },
        }).then((resp) => resp.json())
        .then((result) => {
          if (result) { 
            alert ("You successfully Remove Connection");
          }
        })
        .catch((err) => console.log(err));
        Current_User();
        User_Connections();
    }else{
      alert ("You cancel your Remove Request");
    }

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
            <div className=""> {userConnections?userConnections.length:0}</div>
          </div>
          {userConnections? (
            userConnections.map((user) => 
              { 
                if(userDetails.id!=user.sender.id)
                {
                  return(
                    <div className="border-b-1" key={user.id}>
                      <div className="request-profile flex  px-4 py-3 justify-between items-center">
                      <Link 
                            href={{
                              pathname: "/Friends-Profile/",
                              query: user.sender.id, // the data
                      }}>
                      <a>
                        <div className="flex items-center gap-3">
                              {user.sender && user.sender.display_photo_url?(
                                  <img
                                    src={user.sender.display_photo_url}
                                    className="object-cover rounded-full z-40 h-[35px] w-[35px]"
                                    alt=""
                                  />
                                ):(
                                  <Image
                                    src={ProfileAvatar}
                                    width={35}
                                    height={35}
                                    className="object-cover rounded-full z-40"
                                    placeholder="empty"
                                    alt="profile-image"
                                  />
                                )
                              }
                              {/* <Image src={ProfileAvatar} width={35} height={35} alt="" /> */}
                          
                          <div className="">
                              <div className="username text-sm font-bold capitalize">{user.sender.first_name} {user.sender.last_name}</div>
                              <div className="userfield text-xs capitalize">{user.sender.city},{user.sender.country}</div>
                              {/* <div className="mutual-followers text-xs">
                                Matual Friends +3
                              </div> */}
                          </div>
                        </div>
                      </a>
                      </Link> 
                        <div className="Request-button flex items-center gap-2">
                          <button className="border-1 border-indigo-400 rounded-full text-indigo-400 px-3 py-1 hover:bg-indigo-400 hover:text-white">
                            Message
                          </button>
                          <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white"
                            onClick={()=>RemoveConnection(user.sender.id)} >
                            Remove
                          </button>
                          <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white"
                            onClick={()=>Block(user.id, user.sender.id,"Connection")} >
                            Block
                          </button>
                        </div>
                      
                      </div>
                    </div>
                  )
                }
                else
                {
                  return(
                    <div className="border-b-1" key={user.id}>
                      <div className="request-profile flex  px-4 py-3 justify-between items-center">
                      <Link 
                            href={{
                              pathname: "/Friends-Profile/",
                              query: user.receiver.id, // the data
                      }}>
                      <a>
                        <div className="flex items-center gap-3">
                          {user.sender && user.receiver.display_photo_url?(
                              <img
                                src={user.receiver.display_photo_url}
                                className="object-cover rounded-full z-40 h-[35px] w-[35px]"
                                alt=""
                              />
                            ):(
                              <Image
                                src={ProfileAvatar}
                                width={35}
                                height={35}
                                className="object-cover rounded-full z-40"
                                placeholder="empty"
                                alt="profile-image"
                              />
                            )
                          }
                          <div className="">
                              <div className="username text-sm font-bold capitalize">{user.receiver.first_name} {user.receiver.last_name}</div>
                              <div className="userfield text-xs capitalize">{user.receiver.city},{user.receiver.country}</div>
                              {/* <div className="mutual-followers text-xs">
                                Matual Friends +3
                              </div> */}
                          </div>
                        </div>
                      </a>
                      </Link> 
                        <div className="Request-button flex items-center gap-2">
                          <button className="border-1 border-indigo-400 rounded-full text-indigo-400 px-3 py-1 hover:bg-indigo-400 hover:text-white">
                            Message
                          </button>
                          <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white"
                            onClick={()=>RemoveConnection(user.receiver.id)} >
                            Remove
                          </button>
                          <button className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white"
                            onClick={()=>Block(user.id, user.receiver.id,"Connection")} >
                            Block
                          </button>
                        </div>
                      
                      </div>
                    </div>
                  )
                }
              }
            )
          ):('')}
          
        </div>
      </div>
    </div>
  );
}

export default MyNetwork;
