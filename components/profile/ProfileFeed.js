import React, { useState, useEffect } from "react";
import Image from "next/image";
import NewsPostProfile from "./NewsPostProfile";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import ProfileFeedSingle from "./ProfileFeedSingle";
import axios from "axios";
import { POST_NEWSFEED_API_KEY } from "/pages/config";

const ProfileFeed = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const getNewsFeed = async () => {
    const res = await axios(POST_NEWSFEED_API_KEY, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        Authorization: authKey,
      },
      credentials: "same-origin",
    });
    const result = await res;

    try {
      if (result.status == 200) {
        setList(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    return result;
  };
  useEffect(() => {
    setLoading(false);
   getNewsFeed();
  },[]);
 
  return (
    <div className="mt-8">
      <div className="w-[750px] md:w-full xl:w-full">
        <NewsPostProfile setList={setList}/>
        <div>
          
          {list&&
            list.map((item) => (
              <ProfileFeedSingle lists={item} setList={setList} key={item.id} />        
            )
            )
          }
        </div>
         
      </div>
    </div>
  );
};

export default ProfileFeed;
