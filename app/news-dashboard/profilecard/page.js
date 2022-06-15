import React, { Fragment } from "react";
import Image from "next/image";
import profilebg from "../../../public/images/profile-bg.png";
import profileAvatar from "../../../public/images/profile-avatar.png";

const ProfileCard = () => {
  return (
    <Fragment>
      <div className="mt-11 mx-auto bg-white rounded-xl shadow-xl w-72 h-80">
        <div className="relative -z-0 ">
          <Image src={profilebg} width={280} height={93} placeholder="blur" />
          <div className="absolute z-10 -top-4 left-32">
            <Image
              src={profileAvatar}
              width={42}
              height={42}
              placeholder="blur"
            />
          </div>
        </div>
        <div className="font-semibold text-base text-gray-900 text-center mt-2.5 mb-1.5">
          Johnson Kia
        </div>
        <div className="font-light text-base text-gray-900 leading-5 text-center">
          Node.js developer at agency.
        </div>
        <div className="border-1 text-gray-100 mt-5"></div>
        <div className="flex">
         <div className="">Connections</div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileCard;
