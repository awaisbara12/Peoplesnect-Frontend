import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import profilebg from "../../../public/images/profile-bg.png";
import profileAvatar from "../../../public/images/profile-avatar.png";
import { UserIcon, EyeIcon, BookmarkIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../store/userSlice";

const ProfileCard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const { data: user } = useSelector((state) => state.user);

  return (
    <Fragment>
      <div className="mt-11 mx-auto bg-white rounded-xl w-full h-auto pb-4">
        <div className="">
          <div className="relative -z-0 ">
            <Image
              src={profilebg}
              width={293}
              height={93}
              placeholder="blur"
              alt="profile-bg"
            />
            <div className="absolute z-10 -top-4 left-32">
              <Image
                src={profileAvatar}
                width={42}
                height={42}
                placeholder="blur"
                alt="profile"
              />
            </div>
          </div>
          <div className="font-semibold text-base text-gray-900 text-center mt-2.5 mb-1.5">
            Johnson Kia
          </div>
        </div>

        <div className="font-light text-base text-gray-900 leading-5 text-center">
          Node.js developer at agency.
        </div>
        <div className="border-1 text-gray-100 my-5"></div>
        <div className="mx-5 flex justify-between items-center">
          <div className="text-sm text-gray-900 leading-4 font-medium">
            Connections
          </div>
          <div className="flex gap-2 items-center font-light text-sm">
            <UserIcon className="h-5 w-5" />
            07
          </div>
        </div>
        <div className="mx-5 mt-3 flex justify-between items-center">
          <div className="text-sm text-gray-900 leading-4 font-medium">
            Who’s viewed your profile
          </div>
          <div className="flex gap-2 items-center font-light text-sm">
            <EyeIcon className="h-5 w-5" />
            14
          </div>
        </div>
        <div className="border-1 text-gray-100 my-5"></div>
        <Link href="/">
          <a>
            <div className="flex justify-center items-center font-light text-base gap-2">
              <BookmarkIcon className="h-5 w-5" />
              Saved Items
            </div>
          </a>
        </Link>
      </div>
    </Fragment>
  );
};

export default ProfileCard;
