import { PencilAltIcon } from "@heroicons/react/outline";
import React,{useState} from "react";
import NewsPostProfile from "../NewsPostProfile";

const TabProfile = (props) => {
  console.log(props.user)
  return (
    <>
      <div className="bg-white rounded-xl p-10">
        <div className="flex items-center justify-between">
          <div className="font-extrabold">About</div>
        </div>
        <div className="w-auto">
          {props.user && props.user.description?(
             <div className="my-4 leading-8 text-justify font-extralight">
              <p>{props.user.description}</p> 
             <span className="text-indigo-400 cursor-pointer ml-2 font-bold">
               Read More
             </span>
           </div>
          ):(
             <div className="my-4 leading-8 text-justify font-extralight">
             No Description is Available
             <span className="text-indigo-400 cursor-pointer ml-2 font-bold">
               Read More
             </span>
           </div>
          )}
         
        </div>
      </div>
       {props.user && props.user.profile_type=="private_profile"?(
         <NewsPostProfile />
       ):(
        <p>Public Account</p>
       )} 
    </>
  );
};

export default TabProfile;
