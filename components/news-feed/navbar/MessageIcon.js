import React, { Fragment, useEffect, useState } from "react";
import { ChatAltIcon } from "@heroicons/react/solid";
import { CONVERSATION_API, WS_PUBLIC_API } from "../../../pages/config";
import Link from "next/link";


const MessageIcon = () => {
  const [userDetails, setUserDetails] = useState();
    const [Conversation, setConversation] = useState();
    // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }
  
    // ActionCable
  function createConversationAlertSub(CableApp , c_id) {
    CableApp.subscriptions.create(
      {
        channel: 'AlertChannel',
        id: c_id,
      },
      {
        connected: () => console.log('alert connected'),
        disconnected: () => console.log('alert disconnected'),
        received: data => {  console.log('alert received');GetConversation();
         },
      } 
    );
  }
  // converstion Alert
  const GetConversation=async()=>{     
    await fetch(CONVERSATION_API+"/conversation_alert", {
      method: "GET",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result && result.data) {
          setConversation(result.data);
        }
      })
      .catch((err) => console.log(err)); 
  }
  //  Current user
  const Current_User = async (CableApp) => {
    var c = window.localStorage.getItem("currentuser");
    var Details=JSON.parse(c);
    // await fetch(CURENT_USER_LOGIN_API, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `${authKey}`,
    //   },
    // })
    //   .then((resp) => resp.json())
    //   .then((result) => {
        if (Details &&  Details.id) {
          setUserDetails(Details);
          createConversationAlertSub(CableApp, Details.id)
        }
    //   })
    //   .catch((err) => console.log(err));
  }
  useEffect(() => {
    let actionCable;
    if (typeof window !== 'undefined') {
      actionCable = require('actioncable');
      const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
      Current_User(CableApp);
    }
    const CableApp= actionCable.createConsumer(WS_PUBLIC_API);
    Current_User(CableApp);
    GetConversation();
  }, [])
    return(
      <Link href="/messaging-design" className="">
              <a>
                  <li className="flex font-normal text-xl items-center flex-col gap-1">
                  {/* <ChatAltIcon className="h-5 w-5 text-indigo-400" /> */}
                  <div className="relative">
                      <ChatAltIcon className="h-5 w-5 text-indigo-400" />
                      {Conversation && Conversation== 'true' ? (
                      <div className="bg-red-400 h-3 w-3 text-white -top-1 left-3 rounded-full flex justify-center items-center absolute">
                      </div>
                      ) : ('')

                      }
                  </div>
                  <div className="text-sm md:text-xs">Messaging</div>
                  </li>
              </a>
      </Link>
    )
}

export default MessageIcon;