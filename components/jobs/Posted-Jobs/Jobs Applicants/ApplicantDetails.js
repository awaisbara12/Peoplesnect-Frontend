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
        <div className="bg-white rounded-end-xl p-8 overflow-y-scroll h-[750px] ">
          <div>
            <div className="font-bold">
              Profile Details
            </div>
            <div className="grid grid-cols-3 gap-1 mt-2 p-2">
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  User Name:
                </div>
                <div className="font-light">Ibrar Zahid</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Gander:
                </div>
                <div className="font-light">Male</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Countary:
                </div>
                <div className="font-light">USA</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  City Name:
                </div>
                <div className="font-light">New York</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Phon:
                </div>
                <div className="font-light">+12345678910</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                  Email:
                </div>
                <div className="font-light">IbrarZahid975@gmail.com</div>
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
                <div className="font-light">M-Phill</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Institution:
                </div>
                <div className="font-light">University Of Punjab</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Study From:
                </div>
                <div className="font-light">11-10-1990</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Study To:
                </div>
                <div className="font-light">11-02-2022</div>
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
                <div className="font-light">HR</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Company:
                </div>
                <div className="font-light">Ibex</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Job Type:
                </div>
                <div className="font-light">Full Time</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Currently Working:
                </div>
                <div className="font-light">No</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Jobs From:
                </div>
                <div className="font-light">25-01-2016</div>
              </div>
              <div className="flex gap-2 items-center font-bold text-sm">
                <div>
                Job To:
                </div>
                <div className="font-light">11-02-2022</div>
              </div>
              <div className="col-span-2">
              <div className="flex gap-2 font-bold text-sm">
                <div>
                Discripation:
                </div>
                <div className="font-light">DISPUTATIO HISTORICO - THEOLOGICA DE Epicureo illorum errore , QUI NEGANT In Deo Præfcientiam Futurorum Contingentium . L Rovidentia Divinæ opponitur ...
                  DISPUTATIO HISTORICO - THEOLOGICA DE Epicureo illorum errore , QUI NEGANT In Deo Præfcientiam Futurorum Contingentium . L Rovidentia Divinæ opponitur ...
                  DISPUTATIO HISTORICO - THEOLOGICA DE Epicureo illorum errore , QUI NEGANT In Deo Præfcientiam Futurorum Contingentium . L Rovidentia Divinæ opponitur ...
                  DISPUTATIO HISTORICO - THEOLOGICA DE Epicureo illorum errore , QUI NEGANT In Deo Præfcientiam Futurorum Contingentium . L Rovidentia Divinæ opponitur ...
                  DISPUTATIO HISTORICO - THEOLOGICA DE Epicureo illorum errore , QUI NEGANT In Deo Præfcientiam Futurorum Contingentium . L Rovidentia Divinæ opponitur ...
                  DISPUTATIO HISTORICO - THEOLOGICA DE Epicureo illorum errore , QUI NEGANT In Deo Præfcientiam Futurorum Contingentium . L Rovidentia Divinæ opponitur ...
                  DISPUTATIO HISTORICO - THEOLOGICA DE Epicureo illorum errore , QUI NEGANT In Deo Præfcientiam Futurorum Contingentium . L Rovidentia Divinæ opponitur ...
                  DISPUTATIO HISTORICO - THEOLOGICA DE Epicureo illorum errore , QUI NEGANT In Deo Præfcientiam Futurorum Contingentium . L Rovidentia Divinæ opponitur ...
                </div>
              </div>
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
          <div className="mt-4 text-right">
            <button className="bg-indigo-400 text-white rounded-full p-3">Apply On Job</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicatnDetails;
