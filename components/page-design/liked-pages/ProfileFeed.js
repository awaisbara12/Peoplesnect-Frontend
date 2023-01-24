import React, { useState, useEffect } from "react";
import Image from "next/image";
import NewsPostProfile from "./NewsPostProfile";
import ProfileFeedSingle from "./ProfileFeedSingle";
import axios from "axios";
import { Show_USER_NEWS_FEEDS, GROUP_API } from "/pages/config";
import { useRouter } from "next/router";
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';

const ProfileFeed = (props) => {
  const [list, setList] = useState([]);
  const [admins,setadmins] = useState(props.admins);
  const [lastpage,setlastpage] = useState(0);
  const [currentpage,setcurrentpage] = useState(1);

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");

  function isadmin(admin,user_id)
  {
    for(var i=0; i < admin.length; i++){
     if (admin[i].user.id == user_id)
     {
      return true;
     }
    }
    return false;
  }

  const getNewsFeed = async () => {
    const res = await axios(`${Show_USER_NEWS_FEEDS}?page_id=${myArray[1]}&page=${currentpage}`, {
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
        const mergedata = [...list,...result.data.data]
        setList(mergedata);
        setcurrentpage(result.data.pages.next_page)
        setlastpage(result.data.pages.total_pages)
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  };

  const getNewsFeeds = async () => {
    const res = await axios(`${Show_USER_NEWS_FEEDS}?page_id=${myArray[1]}`, {
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
        // const mergedata = [...list,...result.data.data]
        setList(result.data.data);
        setcurrentpage(result.data.pages.next_page)
        setlastpage(result.data.pages.total_pages)
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  };
  const fetchMoreData = () => {
    getNewsFeed();
  }

  useEffect(() => {
    getNewsFeeds();
  },[props.group]);
 
  return (
    <div className="mt-8">
      <div className="w-[750px] md:w-full xl:w-full">
        {
          props.currentUser && props.group?(
            (admins && isadmin(admins,props.currentUser.id)) || props.group.owner.id == props.currentUser.id?(
              <NewsPostProfile lists={list} currentUser = {props.currentUser} setList={setList} />
            ):("")
          ):("")
        }
        <div>

        <InfiniteScroll
          dataLength={list.length}
          next={fetchMoreData}
          hasMore={ currentpage != null }
          loader={ <div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40}/> </div>}
        >
          {list&&
            list.map((item) => (
              <ProfileFeedSingle lists={item} setList={setList} key={item.id} admin = {props.admins}  group = {props.group} currentUser = {props.currentUser}/>        
            )
            )
          }
        </InfiniteScroll>
          
        </div>
         
      </div>
    </div>
  );
};

export default ProfileFeed;
