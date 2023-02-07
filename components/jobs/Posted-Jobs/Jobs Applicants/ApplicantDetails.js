import React, { useState, Fragment } from "react";
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

const ApplicatnDetails = () => {
  return (
    <div className="">
      <div className="">
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
                <div className="font-light italic">Ibrar Zahid</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Email:
                </div>
                <div className="font-light italic">IbrarZahid975@gmail.com</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Phon:
                </div>
                <div className="font-light italic">+12345678910</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Date Of Birth:
                </div>
                <div className="font-light italic">25.22.1620</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Country:
                </div>
                <div className="font-light italic">USA</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  City Name:
                </div>
                <div className="font-light italic">New York</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Gander:
                </div>
                <div className="font-light italic">Male</div>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <hr/>
          </div>
          <div>
            <div className="font-bold mt-4">
              Educations Details
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2 p-2">
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Degree:
                </div>
                <div className="font-light italic">M-Phill</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Institution:
                </div>
                <div className="font-light italic">University Of Punjab</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Study From:
                </div>
                <div className="font-light italic">11-10-1990</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Study To:
                </div>
                <div className="font-light italic">11-02-2022</div>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <hr/>
          </div>
          <div>
            <div className="font-bold mt-4">
              Work Experience
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2 p-2">
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Job title:
                </div>
                <div className="font-light italic">HR</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Company:
                </div>
                <div className="font-light italic">Ibex</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Job Type:
                </div>
                <div className="font-light italic">Full Time</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Currently Working:
                </div>
                <div className="font-light italic">No</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Jobs From:
                </div>
                <div className="font-light italic">25-01-2016</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Job To:
                </div>
                <div className="font-light italic">11-02-2022</div>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <hr/>
          </div>
          <div>
            <div className="font-bold mt-4">
              Skills
            </div>
            <div className="mt-2 p-2">
              <ul className="pl-4">
                <li className="list-disc">
                  abc
                </li>
                <li className="list-disc">
                  abc
                </li>
                <li className="list-disc">
                  abc
                </li>
                <li className="list-disc">
                  abc
                </li>
              </ul>
            </div>
          </div>
          <div className="absolute bottom-5 right-5 text-right">
            <button className="bg-indigo-400 text-white rounded-full p-3">Download Resume</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicatnDetails;
