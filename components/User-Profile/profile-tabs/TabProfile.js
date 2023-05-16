import { PencilAltIcon } from "@heroicons/react/outline";
import React,{useState} from "react";
import NewsPostProfile from "../NewsPostProfile";
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
              <ReadMore>
              {props.user.description}
            </ReadMore>
           </div>
          ):(
             <div className="my-4 leading-8 text-justify font-extralight">
               No Description is Available
             </div>
          )}
         
        </div>
      </div>
       {props.user && props.user.profile_type=="private_profile" && props.connection == false?(
         <NewsPostProfile />
       ):(
        <ProfileFeed user={props.user} follow={props.follow} connection={props.connection} currentuser={props.currentuser}/>
       )} 
    </>
  );
};

export default TabProfile;
