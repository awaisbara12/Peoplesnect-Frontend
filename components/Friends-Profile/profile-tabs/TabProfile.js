import { PencilAltIcon } from "@heroicons/react/outline";
import React from "react";
import ProfileFeed from "../ProfileFeed";

const TabProfile = (props) => {
  
  return (
    <>
      <div className="bg-white rounded-xl p-10">
        <div className="flex items-center justify-between">
          <div className="font-extrabold">About</div>
        </div>
        <div className="w-auto">
          {props.user && props.user.description?(
            <div className="my-4 leading-8 text-justify font-extralight">
            {props.user.description}
            <span className="text-indigo-400 cursor-pointer ml-2 font-bold">
              Read More
            </span>
          </div>
          ):(
            <div className="my-4 leading-8 text-justify font-extralight">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries....
            <span className="text-indigo-400 cursor-pointer ml-2 font-bold">
              Read More
            </span>
          </div>
          )}
          
        </div>
      </div>
      <ProfileFeed />
    </>
  );
};

export default TabProfile;
