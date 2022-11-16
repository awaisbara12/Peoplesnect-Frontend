import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../public/images/profile-girl.jpg";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { ChevronRightIcon, PencilAltIcon } from "@heroicons/react/outline";

const TabExperienceProfile = (props) => {
  return (
    <div className="bg-white rounded-xl p-10">
      <div className="flex items-center justify-between mb-5">
        <div className="font-extrabold ">Experience</div>
      </div>
      <div className="px-2">
        <div className="flex flex-col">
          <div className="border-b-1 py-10">
            {props.user && props.user.work_experiences?(
              props.user.work_experiences.map((i)=>(
              <div className="flex gap-5" key={i.id}>
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
                <div className="font-light"> <b>{i.job_title} - {i.job_type}</b></div>
                
                {i.current_work?(
                  <div className="font-light">
                  {i.starting} <b>To</b> Present
                </div>
                ):(
                  <div className="font-light">
                 {i.starting} <b>To</b> {i.ending}
                </div>
                )}
                <div className="font-extralight">
                {i.city}, {i.state}, {i.country}
                  {/* <span className="text-indigo-400">Seen More</span> */}
                </div>
              </div>
            </div>
              ))
            ):('')}
            
          </div>
          {/* <div className="border-b-1 py-10">
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
                <div className="font-extrabold">Graphic Designer</div>
                <div className="font-light">Freelance</div>
                <div className="font-extralight">
                  March 2019 - Present- 3 yrs 7 mos
                </div>
                <div className="mt-2 font-light md:w-[775px]">
                  3 Years Ago i start my Career a Website Designer. I have
                  collaborated with companies brands for online work. Through my
                  Skills I Accompany the Client In Managing His Ideas...
                  <span className="text-indigo-400">Seen More</span>
                </div>
              </div>
            </div>
          </div> */}
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
