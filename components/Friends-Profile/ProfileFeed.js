import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileFeedSingle from "./ProfileFeedSingle";
import { Show_USER_NEWS_FEEDS } from "../../pages/config";
import { useRouter } from "next/router";

const ProfileFeed = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // bareer key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  // ShowUser NewFeed
  const getNewsFeed = async () => {
    const res = await axios(`${Show_USER_NEWS_FEEDS}?user_id=${myArray[1]}`, {
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
        <div>
          {list&&
            list.map((item) => (
              <ProfileFeedSingle lists={item} key={item.id} />        
            )
            )
          }
        </div>
         
      </div>
    </div>
  );
};

export default ProfileFeed;
