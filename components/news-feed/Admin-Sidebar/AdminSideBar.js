import {
  CalendarIcon,
  HashtagIcon,
  LightBulbIcon,
  UserCircleIcon,
  UserGroupIcon,
  VideoCameraIcon,
  BriefcaseIcon, ExclamationCircleIcon, FlagIcon, AdjustmentsIcon, DocumentTextIcon, MapIcon
} from "@heroicons/react/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CURENT_USER_LOGIN_API } from "../../../pages/config";
import  Router from "next/router";
  
const AdminSideBAr = () => {
  const [currentuser, setCurrent_User] = useState();

  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }

  const Current_User = async()=>{    
   
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
          setCurrent_User(result.data);
          if(result.data.role == "user"){
            Router.push("/news-feed");
          }else if(result.data.role == "job_admin"){
            Router.push("/Admin/Jobs-list");
          }
        }
      })
      .catch((err) => console.log(err)); 
  }

  useEffect(() => {
    Current_User();
  }, []);
  return (
  <div>
   <div className="w-64 lg:w-auto">
      <div className="mt-8 mx-auto bg-white rounded-xl w-full h-auto p-4">
        {currentuser && currentuser.role=="admin"?(
          <>
                  <Link href="/Admin">
                  <a href="">
                    <div className="flex justify-between font-light text-sm  border-b-1 pb-4">
                      <div className="">Users List</div>
                      <UserCircleIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                  </a>
                  </Link>
                  
                  <Link href="/Admin/Jobs-list">
                  <a>
                    <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                      <div className="">Jobs List</div>
                      <BriefcaseIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                  </a>
                  </Link>
                  <Link href="/Admin/article-list">
                  <a>
                    <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                      <div className="">Article List</div>
                      <DocumentTextIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                  </a>
                  </Link>
                  <Link href="/Admin/Products-list">
                  <a>
                    <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                      <div className="">Product List</div>
                      <LightBulbIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                  </a>
                  </Link>
                  <Link href="/Admin/Categories">
                    <a>
                      <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                        <div className="">Product Category</div>
                        <BriefcaseIcon className="w-5 h-5 text-indigo-400" />
                      </div>
                    </a>
                  </Link>
                  <Link href="/Admin/groups-list">
                  <a>
                    <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                      <div className="">Groups</div>
                      <UserGroupIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                  </a>
                  </Link>
                  <Link href="/Admin/pages-list">
                  <a>
                    <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                      <div className="">Pages</div>
                      <VideoCameraIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                  </a>
                  </Link>
                  <Link href="/Admin/Reports-list">
                  <a>
                    <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                      <div className="">Report</div>
                      <BriefcaseIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                  </a>
                  </Link>
                  <Link href="/Admin/hashtags-list">
                  <a href="">
                    <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                      <div className="">Hashtags</div>
                      <HashtagIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                  </a>
                  </Link>
                  <Link href="/Admin/Newsletter-list">
                  <a href="">
                    <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                      <div className="">NewsLatter</div>
                      <MapIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                  </a>
                  </Link>
                  <Link href="/Admin/admin-roles">
                  <a href="">
                    <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                      <div className="">Admin Roles</div>
                      <AdjustmentsIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                  </a>
                  </Link>
                  <Link href="/Admin/skills">
                  <a href="">
                    <div className="flex justify-between font-light text-sm mt-4">
                      <div className="">Add Skills</div>
                      <AdjustmentsIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                  </a>
                  </Link>
        </>
        ):(currentuser && currentuser.role=="job_admin"?(
          <Link href="/Admin/Jobs-list">
            <a>
              <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                <div className="">Jobs List</div>
                <BriefcaseIcon className="w-5 h-5 text-indigo-400" />
              </div>
            </a>
          </Link>
        ):(currentuser && currentuser.role=="marketplace_admin"?(
            <>
              <Link href="/Admin/Products-list">
                <a>
                  <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                    <div className="">Product List</div>
                    <LightBulbIcon className="w-5 h-5 text-indigo-400" />
                  </div>
                </a>
              </Link>
              <Link href="/Admin/Categories">
                <a>
                  <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                    <div className="">Product Category</div>
                    <BriefcaseIcon className="w-5 h-5 text-indigo-400" />
                  </div>
                </a>
              </Link>
            </>
        ):(
          currentuser && currentuser.role=="job_marketplace_admin"?(
            <div>
              <Link href="/Admin/Jobs-list">
                <a>
                  <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                    <div className="">Jobs List</div>
                    <BriefcaseIcon className="w-5 h-5 text-indigo-400" />
                  </div>
                </a>
              </Link>

              <Link href="/Admin/Products-list">
                <a>
                  <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                    <div className="">Product List</div>
                    <LightBulbIcon className="w-5 h-5 text-indigo-400" />
                  </div>
                </a>
              </Link>
              <Link href="/Admin/Categories">
                <a>
                  <div className="flex justify-between font-light text-sm mt-4 border-b-1 pb-4">
                    <div className="">Product Category</div>
                    <BriefcaseIcon className="w-5 h-5 text-indigo-400" />
                  </div>
                </a>
              </Link>
            </div>
          ):('')
        )))}
      </div>
    </div> 
  </div>
  );
};
  
export default AdminSideBAr;