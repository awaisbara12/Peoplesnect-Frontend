import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { ChevronRightIcon, PencilAltIcon } from "@heroicons/react/outline";

const TabEducationProfile = (props) => {
  
  return (
    <div className="bg-white rounded-xl p-10">
      <div className="flex items-center justify-between mb-5">
        <div className="font-extrabold ">Education</div>
      </div>
      <div className="px-2">
        <div className="flex flex-col">
         {props.user && props.user.educations?(
          props.user.educations.map((i)=>(
            <div className="border-b-1 py-5" key={i.id}>
            <div className="flex items-center gap-10">
              <Link href="">
                <a>
                  <Image
                    src={ProfileAvatar}
                    width={66}
                    height={66}
                    className="object-cover rounded-full"
                    placeholder="empty"
                    alt="profile-image"
                  />
                </a>
              </Link>
              <div className="flex flex-col gap-1">
                <div className="font-extrabold">
                  {i.institution}
                  {/* Punjab University Of Lahore punjab Pakistan */}
                </div>
                <div className="font-light text-sm">{i.degree_type}</div>
                <div className="font-light text-sm">{i.degree}</div>
                {i.continue?(
                  <div className="font-extralight">Session: ({i.study_from} <b>To</b> Present)</div>
                ):(
                  <div className="font-extralight">Session: ({i.study_from} <b>To</b> {i.study_to})</div>
                )
               }
                
              </div>
            </div>
           </div>
          ))
          
         ):('')

         }
          
          {/* <div className="border-b-1 py-5">
            <div className="flex items-center gap-10">
              <Link href="">
                <a>
                  <Image
                    src={ProfileAvatar}
                    width={66}
                    height={66}
                    className="object-cover rounded-full"
                    placeholder="empty"
                    alt="profile-image"
                  />
                </a>
              </Link>
              <div className="flex flex-col gap-1">
                <div className="font-extrabold">
                  University Of Central punjab Lahore Pakistan
                </div>
                <div className="font-light text-sm">MSc</div>
                <div className="font-extralight">Session: (2016-2018)</div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="flex justify-center font-bold items-center mt-10">
          Show All Skills
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default TabEducationProfile;
