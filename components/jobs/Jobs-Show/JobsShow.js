import React from "react";
import Link from "next/link";
import Image from "next/image";
import Compnylogo from "../../../public/images/compny-logo.png";
import Compnylogo1 from "../../../public/images/logo1.jpeg";
import Compnylogo2 from "../../../public/images/logo2.jpeg";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ClipboardCopyIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { BriefcaseIcon, Lock, LockClosedIcon, StarIcon } from "@heroicons/react/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const JobsShow = () => {
  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 xl:px-0 lg:px-0">
        <div className="">
          {/* <div className="">
            <div className="heading font-bold">Job Details</div>
          </div> */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <div className="bg-white rounded-xl p-4">
                <div className="flex gap-4 items-center">
                  <Link href="">
                    <a>
                      <Image src={Compnylogo1} width={112} height={112} alt="" className="rounded-full" />
                    </a>
                  </Link>
                  <div>
                    <div className="font-extrabold">
                      Company Name
                    </div>
                    <div className="font-light">
                      Compnay Type
                    </div>
                    <div className="mt-2 flex text-sm font-light">
                      <StarIcon className="text-amber-400 w-5 h-5" />
                      Rating is 4.3
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2 py-4 border-t-1">
                  <div className="font-bold text-sm">Job Posted</div>
                  <div className="text-sm font-light">2 Days Ago</div>
                </div>
                <div className="py-4 border-t-1">
                  <div className="flex justify-between items-center mt-2">
                    <div className="font-bold text-sm">Countary</div>
                    <div className="text-sm font-light">Paksitan</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="font-bold text-sm">State</div>
                    <div className="text-sm font-light">Punjab</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="font-bold text-sm">City</div>
                    <div className="text-sm font-light">Lahore</div>
                  </div>
                </div>
                <div className="py-4 border-t-1">
                  <div className="flex justify-between items-center mt-2">
                    <div className="font-bold text-sm">Minimum Salary</div>
                    <div className="text-sm font-light">400$</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="font-bold text-sm">Maximum Salary</div>
                    <div className="text-sm font-light">480$</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="font-bold text-sm">Job Type</div>
                    <div className="text-sm font-light">Full Time</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="bg-white rounded-xl p-8">
                <div>
                  {/* <div className="font-bold">Hiring Process</div>
                  <div className="grid grid-cols-3">
                    <div className="text-white bg-gradient-to-r border-left from-cyan-500 to-blue-500 font-bold flex justify-center items-center h-[50px] ">
                      Interview
                    </div>
                  </div> */}
                </div>
                <div className="font-bold">
                  Job description
                </div>
                <div className="mt-2 text-justify indent-20">
                In order to decentralize administrative and financial authority to be accountable to Local Governments, for good governance, effective delivery of services, and transparent decision making through institutionalized participation of the people at grassroots level, elections to the local government institutions are held after every four years on none party basis by the Chief <br/><br/> Election Commissioner of Pakistan.
                In order to decentralize administrative and financial authority to be accountable to Local Governments, for good governance, effective delivery of services, and transparent decision making through institutionalized participation of the people at grassroots level, elections to the local government institutions are held after <br/><br/> every four years on none party basis by the Chief Election Commissioner of Pakistan.
                In order to decentralize administrative and financial authority to be accountable to Local Governments, for good governance, effective delivery of services, and transparent decision making through institutionalized participation of the people at grassroots level, elections to the local government institutions <br/><br/> are held after every four years on none party basis by the Chief Election Commissioner of Pakistan.In order to decentralize administrative and financial authority to be accountable to Local Governments, for good governance, effective delivery of services, and transparent decision making through institutionalized participation of the people at grassroots level, elections to the local government institutions are held after every four years on none party basis by the Chief Election Commissioner of Pakistan.
                In order to decentralize administrative and financial authority to be accountable to Local Governments, for good governance, effective delivery of services, and transparent decision making through institutionalized participation of the people at grassroots level, elections to the local government institutions are held after every four years<br/><br/> on none party basis by the Chief Election Commissioner of Pakistan.
                In order to decentralize administrative and financial authority to be accountable to Local Governments, for good governance, effective delivery of services, and transparent decision making through institutionalized participation of the people at grassroots level, elections to the local government institution<br/><br/>s are held after every four years on none party basis by the Chief Election Commissioner of Pakistan.
                </div>
                <div className="mt-4 text-right">
                  <button className="bg-indigo-400 text-white rounded-full p-3">Apply On Job</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsShow;