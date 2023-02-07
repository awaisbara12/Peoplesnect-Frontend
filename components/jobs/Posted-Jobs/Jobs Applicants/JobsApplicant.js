import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import ApplicatnDetails from "./ApplicantDetails";

const JobsApplicant = () => {
  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 xl:px-0 lg:px-0">
        <div className="grid grid-cols-3">
          <div className="">
            <div className="border bg-white rounded-l-xl">
              <div className="sticky z-40 top-0 bg-white rounded-l-xl">
                <div className="p-3 border-b">
                  <div className="font-bold">Job Title</div>
                </div>
              </div>
              <div className="overflow-y-scroll h-[700px] ">
                <Link href="/jobs/posted-jobs/job-applicants">
                  <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                    <Image
                      className="object-cover rounded-full"
                      src={ProfileAvatar}
                      width={45}
                      height={45}
                      alt=""
                    />
                    <div className="">
                      <div className="font-bold">User Name</div>
                      <div className="">User Applied on Job Job title</div>
                      <div className="font-light text-sm">2Hours Ago</div>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <ApplicatnDetails/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsApplicant;
