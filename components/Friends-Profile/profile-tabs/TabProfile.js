import { PencilAltIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import ProfileFeed from "../ProfileFeed";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 300) + (text.length > 300?("......"):('')) : text}
      {text.length > 300?(
        <span onClick={toggleReadMore} className="text-indigo-400 cursor-pointer ml-2 font-bold">
          {isReadMore ? "Read more" : "Show less"}
        </span>
      ):('')}
    </p>
  );
};

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
            {/* {props.user.description} */}
            <ReadMore>
              {props.user.description}
            </ReadMore>
          </div>
          ):(
            <div className="my-4 leading-8 text-justify font-extralight">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
          )}
          
        </div>
      </div>
      <ProfileFeed />
    </>
  );
};

export default TabProfile;
