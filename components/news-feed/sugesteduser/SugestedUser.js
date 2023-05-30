import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SugestionProfile from "../../../public/images/profile-avatar.png";
import MariaProfile from "../../../public/images/mariamomo.png";
import MiraProfile from "../../../public/images/mira.png";
import { PlusIcon, DotsHorizontalIcon } from "@heroicons/react/outline";
import { SUGGESTED_USER_API, FOLLOW_USER_API } from "../../../pages/config";
import axios from "axios";

const SugestedUser = () => {

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  const [loading, setLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    // if(suggestedUsers.length == 0){
    //   setLoading(true);
      
      getSuggestedUsers();
    // }
  }, []);
  const getSuggestedUsers = async () => {
    const res = await axios(
      SUGGESTED_USER_API,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: authKey,
        },
        credentials: "same-origin",
      }
    );
    const result = await res;

    try {
      if (result) {
        setSuggestedUsers(result.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  };
  function followUser(userId){
    const dataForm = new FormData();
    dataForm.append("followers[followee_id]", userId);

    fetch(FOLLOW_USER_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        getSuggestedUsers();
      }
    })
    .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="bg-white p-5 mt-5 rounded-xl">
        <div className="text-base font-normal leading-5">Start feed with</div>
        {!loading ?
          (suggestedUsers.data && suggestedUsers.data.map((user) => (
            <div className="flex items-start mt-4" key={user.id}>
              <Link href={{pathname: "/User-Profile", query: user.id}}>
                <a>
                  {user.display_photo_url?(
                    <img
                      src={user.display_photo_url}
                      className="aspect-video object-cover rounded-full h-[25px] w-[25px]"
                      alt=""
                    />
                  ):(
                    <Image src={SugestionProfile} width={35} height={35} alt="" />
                  )}
                </a>
              </Link>
              <div className="flex w-full items-center justify-between ">
                <div className="ml-2">
                  <Link href={{pathname: "/User-Profile", query: user.id}}>
                    <a>
                      <p className="text-base font-normal leading-5">{user.first_name} {user.last_name}</p>
                    </a>
                  </Link>
                  <p className="text-xs font-extralight text-gray-900">
                    {user.recent_job}
                  </p>
                </div>
                <button onClick={() => followUser(user.id)}>
                  <div className="flex h- items-center text-gray-900 gap-1.5">
                    <PlusIcon className="h-5 w-5" />
                    Follow
                  </div>
                </button>
              </div>
            </div>
          )))
          :
          ("")
        }

        <Link href="/my-network/Peending-Request">
          <a className="flex justify-center mt-5 underline ">
            {/* <DotsHorizontalIcon className="h-5 w-5 mx-auto mt-5" /> */}
            <div>Show more</div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default SugestedUser;
