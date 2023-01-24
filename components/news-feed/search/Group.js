import React,{useState,useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import { SearchIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { 
  FOLLOW_USER_API, 
  CURENT_USER_LOGIN_API,
  SEARCH_MULTIPLE
} from "../../../pages/config";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Group = () => {
  const [followee, setfollowee] = useState();
  let [results, setresults] = useState();

  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
   // Bareer Key
   if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }

  const searchmultiples  = async() =>{
      await fetch(SEARCH_MULTIPLE+"?query="+myArray[1]+"&type=Group", {
        method: "GET",
         headers: {
          Accept: "application/json", 
           Authorization: `${authKey}`,
         },
      })
         .then((resp) => resp.json())
        .then((result) => {
          if (result) {
            setresults(result.data);
            console.log("Group",result.data);
          }
        })
        .catch((err) => console.log(err));
  }
  useEffect(() => {
    searchmultiples();
  },[myArray[1]]);
  return (
    <div className="">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="bg-white rounded-b-xl">
          
          {results?(
            results.map((i)=>(
            <div className="border-b-1" key={i.id}>
            <div className="Followings-profile flex  px-4 py-4 justify-between items-center">
            <Link 
              href={{
              pathname: "/group-page/joind-group",
              query: i.group.id,
            }}>
            <a>
              <div className="flex items-center gap-3">
                {i.group && i.group.display_image_url ?
                  (
                    <img
                      src={i.group.display_image_url}
                      className="object-cover rounded-full z-40 h-[42px] w-[42px]"
                      alt=""
                    />
                  ) : (
                    <Image
                      src={ProfileAvatar}
                      width={45}
                      height={45}
                      alt=""
                    />
                  )
                }
                <div className="">
                  <div className="flex gap-4 items-center">
                  <div className="font-bold">{i.group.title}</div>
                  </div>
                  <div className="font-light text-xs">{i.group.group_members_count?(i.group.group_members_count):(0)} Members</div>
                </div>
              </div>
            </a>
            </Link> 
              
            </div>
            </div> 
            ))
          ):('')}
          
          
        </div>
      </div>
    </div>
  );
};

export default Group;
