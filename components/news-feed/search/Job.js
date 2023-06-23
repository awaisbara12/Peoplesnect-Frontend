import React,{useState,useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import Nodata from "../../../public/images/no_data.png";
import Compnylogo1 from "../../../public/images/logo1.jpeg";
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

const Job = () => {
  const [followee, setfollowee] = useState();
  let [results, setresults] = useState();

  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
   // Bareer Key
   if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }

  const searchmultiples  = async() =>{
      await fetch(SEARCH_MULTIPLE+"?query="+myArray[1]+"&type=Job", {
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
          {results && results.length>0?(
            results.map((i)=>(
            <div className="border-b-1" key={i.id}>
              <div className="Followings-profile flex  px-4 py-4 justify-between items-center">
                <Link 
                  href={{
                  pathname: "/jobs/jobs-show",
                  query: i.jobs.id,
                }}>
                  <a>
                    <div className="flex items-center gap-3">
                      {i.jobs && i.jobs.company_photo ?
                        (
                          <img
                            src={i.jobs.company_photo}
                            className="object-cover rounded-full z-40 h-[42px] w-[42px]"
                            alt=""
                          />
                        ) : (
                          <Image
                            src={Compnylogo1}
                            width={45}
                            height={45}
                            alt=""
                          />
                        )
                      }
                      <div className="">
                        <div className="flex gap-4 items-center">
                        <div className="font-bold">{i.jobs.title}</div>
                        </div>
                        <div className="font-light text-xs"> {i.jobs.workplace_type}</div>
                      </div>
                    </div>
                  </a>
                </Link> 
              </div>
            </div> 
            ))
          ):(
            <div className="border-b-1">
            <div className="Followings-profile flex  px-4 py-4 justify-between items-center">
              <div className="flex items-center mx-auto flex-col pt-4">
                <Image 
                src={Nodata}
                width={300} 
                height={300} 
                alt="" />
                <div className="">
                  <div className="username text-base font-bold"> 
                  No Item Found  
                  </div>
                  {/* <div className="userfield text-xs">{i.user.city}, {i.user.country}</div> */}
                </div>
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;
