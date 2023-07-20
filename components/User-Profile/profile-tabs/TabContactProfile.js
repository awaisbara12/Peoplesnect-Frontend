import { useState, useEffect, React, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import {
  CalendarIcon,
  MailIcon,
  XIcon,
  PencilAltIcon,
  PencilIcon,
  PhoneIcon,
} from "@heroicons/react/outline";
import {    
  CURENT_USER_LOGIN_API,UPDATE_CONTACT_INFO
} from "../../../pages/config";

const TabContactProfile = (props) => {
  return (
    <>
      <div className="bg-white rounded-xl  p-10">
        
        <div className="p-2 grid grid-cols-1">
          <div className="font-bold flex flex-col gap-4">
          
          <div className="flex items-center gap-3 my-4">
            <MailIcon className="h-5 w-5" />
            <div className="hover:underline">{props && props.user && props.user.email}</div>
          </div>  
          <div>
            <div className="border-1"></div>
            <div className="flex items-center gap-3 my-4">
              <PhoneIcon className="h-5 w-5" />
              <a className="hover:underline">
                {props && props.user && props.user.phone_number}
              </a>
            </div>
          </div>
            <div className="border-1"></div>
            <div className="flex items-center gap-3 my-4">
              <CalendarIcon className="h-5 w-5" />
              <a className="hover:underline">
                {props && props.user && props.user.DOB}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabContactProfile;
