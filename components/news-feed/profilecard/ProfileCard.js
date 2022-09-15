import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import profilebg from "../../../public/images/profile-bg.png";
import profileAvatar from "../../../public/images/profile-avatar.png";
import { UserIcon, EyeIcon, BookmarkIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../store/userSlice";

import Spinner from "../../common/Spinner";

const ProfileCard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchUser());
    setLoading(false);
  }, [dispatch]);

  const { data: user } = useSelector((state) => state.user);

  useEffect(() => {
    const authKey = localStorage.getItem("keyStore");
    function load() {
      if (authKey || localStorage == undefined) {
        localStorage.setItem("userData", JSON.stringify(user));
      }
    }
    load();
    setUserDetails(JSON.parse(localStorage.getItem("userData")));
  }, [user]);

  if (loading)
    return (
      <div className="mt-8">
        <Spinner />
      </div>
    );

  return (
    <Fragment>
      <div className="mt-11 mx-auto bg-white rounded-xl w-full h-auto pb-4">
        <div className="">
          <Link href="/profile">
            <a>
              <div className="relative -z-0 flex justify-center">
                <Image
                  src={profilebg}
                  width={293}
                  height={93}
                  placeholder="blur"
                  alt="profile-bg"
                />
                <div className="absolute z-10 -top-4">
                  <Image
                    src={profileAvatar}
                    width={42}
                    height={42}
                    placeholder="blur"
                    alt="profile"
                  />
                </div>
              </div>
            </a>
          </Link>
          <div className="font-semibold capitalize text-base text-gray-900 text-center mt-2.5 mb-1.5">
            {userDetails && userDetails.user ? (
              <>
                {" "}
                {userDetails.user.first_name} {userDetails.user.last_name}
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
        <div className="font-light text-base text-gray-900 leading-5 text-center">
          {userDetails && userDetails.user ? (
            <> {userDetails.user.recent_job}</>
          ) : (
            <Spinner />
          )}
        </div>
        {/* <div className="border-1 text-gray-100 my-5"></div>
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
        </div> */}
        <div className="border-1 text-gray-100 my-5"></div>
        <Link href="/">
          <a>
            <div className="flex justify-center items-center font-light text-indigo-400 text-base gap-2">
              <BookmarkIcon className="h-5  w-5" />
              Saved Items
            </div>
          </a>
        </Link>
      </div>
    </Fragment>
  );
};

export default ProfileCard;
