import React, { useState, useEffect } from "react";
import Image from "next/image";
import NewsPostProfile from "./NewsPostProfile";
import ProfileFeedSingle from "./ProfileFeedSingle";
import axios from "axios";
import { Show_USER_NEWS_FEEDS, GROUP_API } from "/pages/config";
import { useRouter } from "next/router";

const ProfileFeed = (props) => {
  const [list, setList] = useState([]);
  const [admins,setadmins] = useState(props.admins);

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");

  function isadmin(admin,user_id)
  {
    for(var i=0; i < admin.length; i++){
     if (admin[i].group_member.id == user_id)
     {
      return true;
     }
    }
    return false;
  }

  const getNewsFeed = async () => {
    const res = await axios(`${Show_USER_NEWS_FEEDS}?group_id=${myArray[1]}`, {
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
    return result;
  };

  useEffect(() => {
    getNewsFeed();
  },[]);
 
  return (
    <div className="mt-8">
      <div className="w-[750px] md:w-full xl:w-full">
        {props.group && props.group.can_post == "all_member" ?(
          <NewsPostProfile setList={setList} />
        ):(
          props.currentUser && props.group?(
            (admins && isadmin(admins,props.currentUser.id)) || props.group.owner.id == props.currentUser.id?(
              <NewsPostProfile setList={setList} />
            ):("")
          ):("")
        )}
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