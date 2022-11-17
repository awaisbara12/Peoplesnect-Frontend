import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { ChevronRightIcon, PencilAltIcon } from "@heroicons/react/outline";

const TabExperienceProfile = (props) => {
  console.log(props.user)
  return (
    <div className="bg-white rounded-xl p-10">
      <div className="flex items-center justify-between mb-5">
        <div className="font-extrabold ">Experience</div>
      </div>
      <div className="px-2">
        <div className="flex flex-col">
          {props.user && props.user.work_experiences?(
            props.user.work_experiences.map(i=>(
              <div className="border-b-1 py-10 " key={i.id}>
                <div className="flex gap-5">
                  <Link href="">
                    <a>
                      <Image
                        src={ProfileAvatar}
                        width={55}
                        height={55}
                        className="object-cover rounded-full"
                        placeholder="empty"
                        alt="profile-image"
                      />
                    </a>
                  </Link>
                  <div className="flex flex-col gap-1">
                    <div className="font-extrabold">{i.company_name}</div>
                    <div className="font-light">{i.job_title} - {i.job_type}</div>
                    {i.current_work?(<div className="font-extralight">
                      {i.starting} - Present
                    </div>):(
                      <div className="font-extralight">
                      {i.starting} <b>-</b> {i.ending}
                    </div>
                    )}
                    {i.city?(
                      <div className="font-light">
                        {i.city} 
                          {i.state?(<span>, {i.state}</span>):('')} 
                            {i.country?(<span>, {i.country}</span>):('')}
                      </div>
                    ):('')}
                    </div>
                </div>
              </div>
            ))
            
          ):('')}
          
        </div>
        <div className="flex justify-center font-bold items-center mt-10">
          Show All Experiences
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default TabExperienceProfile;
