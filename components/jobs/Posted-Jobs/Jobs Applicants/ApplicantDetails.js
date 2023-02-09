import React, { useState, Fragment, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import ProfileAvatar2 from "../../../../public/images/mira.png";
import ProfileAvatar3 from "../../../../public/images/profile-avatar.png";

import InputEmoji from "react-input-emoji";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

import {
  PhotographIcon,
  EmojiHappyIcon,
  ChevronRightIcon,
  PaperAirplaneIcon,
  ChevronDownIcon,
  PencilAltIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";
import { useFormik } from "formik";

const ApplicatnDetails = (props) => {
  const [resume, setresume] = useState();
  useEffect(() => {
    setresume(props.data)
  }, [props.data]);
  console.log('props',props.data)
  return (
    <div className="">
      <div className="">
        {resume?(
        <div className="bg-white rounded-end-xl p-8 overflow-y-scroll relative h-[750px] ">
          <div>
            <div className="font-bold">
              Applicant Info
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 p-2">
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Name:
                </div>
                <div className="font-light italic capitalize">{resume.first_name?resume.first_name:""} {resume.last_name?resume.last_name:""}</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Email:
                </div>
                <div className="font-light italic">{resume.email?resume.email:""}</div>
              </div>
              {resume.phone_number?(
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Phon:
                </div>
                <div className="font-light italic">{resume.phone_number}</div>
              </div>):('')}
              {resume.DOB?(
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Date Of Birth:
                </div>
                <div className="font-light italic">{resume.DOB}</div>
              </div>
              ):('')}
              {resume.country?(
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Country:
                </div>
                <div className="font-light italic">{resume.country}</div>
              </div>
              ):('')}
              {resume.city?(
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  City Name:
                </div>
                <div className="font-light italic">{resume.city}</div>
              </div>
              ):('')}
              {/* <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Gander:
                </div>
                <div className="font-light italic">Male</div>
              </div> */}
            </div>
          </div>
          <div className="pt-2">
            <hr/>
          </div>
          <div>
            <div className="font-bold mt-4">
              Educations Details
            </div>
            {resume.educations?(
              resume.educations.map((i)=>(
                <div className="grid grid-cols-2 gap-1 mt-2 p-2" key={i.id}>
                  <div className="flex gap-2 items-center font-bold text-sm">
                    <div>
                    Degree:
                    </div>
                    <div className="font-light italic">{i.degree_type}</div>
                  </div>
                  <div className="flex gap-2 items-center font-bold text-sm">
                    <div>
                    Institution:
                    </div>
                    <div className="font-light italic">{i.institution}</div>
                  </div>
                  <div className="flex gap-2 items-center font-bold text-sm">
                    <div>
                    Program:
                    </div>
                    <div className="font-light italic">{i.degree}</div>
                  </div>
                  <div className="flex gap-2 items-center font-bold text-sm">
                    <div>
                    Study From:
                    </div>
                    <div className="font-light italic">{i.study_from}</div>
                  </div>
                  <div className="flex gap-2 items-center font-bold text-sm">
                    <div>
                    Study To:
                    </div>
                    <div className="font-light italic">{i.study_to}</div>
                  </div>
                </div>
              ))
                
            ):('')}
          </div>
          <div className="pt-2">
            <hr/>
          </div>
          <div>
            <div className="font-bold mt-4">
              Work Experience
            </div>
            {resume.work_experiences?(
              resume.work_experiences.map((i)=>(
                <div className="grid grid-cols-2 gap-1 mt-2 p-2">
                  <div className="flex gap-2 items-center font-bold text-sm">
                    <div>
                    Job title:
                    </div>
                    <div className="font-light italic">{i.job_title}</div>
                  </div>
                  <div className="flex gap-2 items-center font-bold text-sm">
                    <div>
                    Company:
                    </div>
                    <div className="font-light italic">{i.company_name}</div>
                  </div>
                  <div className="flex gap-2 items-center font-bold text-sm">
                    <div>
                    Job Type:
                    </div>
                    <div className="font-light italic">{i.job_type}</div>
                  </div>
                 
                  <div className="flex gap-2 items-center font-bold text-sm">
                    <div>
                    Jobs From:
                    </div>
                    <div className="font-light italic">{i.starting}</div>
                  </div>
                  {i.current_work?(
                    <div className="flex gap-2 items-center font-bold text-sm">
                      <div>
                      Currently Working:
                      </div>
                      <div className="font-light italic">yes</div>
                    </div>
                  ):(
                    <div className="flex gap-2 items-center font-bold text-sm">
                      <div>
                      Job To:
                      </div>
                      <div className="font-light italic">{i.ending}</div>
                    </div>
                  )}
                  
                </div>
              ))
            ):('')}
          </div>
          <div className="pt-2">
            <hr/>
          </div>
          <div>
            <div className="font-bold mt-4">
              Skills
            </div>
            {resume.skills?(
            <div className="mt-2 p-2">
              <ul className="pl-4">
              {resume.skills.map((i)=>(
                <li className="list-disc" key={i.id}>
                  {i.title}
                </li>
              ))}
                
                {/* <li className="list-disc">
                  abc
                </li>
                <li className="list-disc">
                  abc
                </li>
                <li className="list-disc">
                  abc
                </li> */}
              </ul>
            </div>
            ):('')}
          </div>
          <div className="absolute bottom-5 right-5 text-right">
            <button className="bg-indigo-400 text-white rounded-full p-3">Download Resume</button>
          </div>
        </div>
        ):('')}
      </div>
    </div>
  );
};

export default ApplicatnDetails;
