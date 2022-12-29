import React, { useState, useEffect } from "react";
import Image from "next/image";
import NewsPostProfile from "./NewsPostProfile";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import ProfileFeedSingle from "./ProfileFeedSingle";
import axios from "axios";
import { POST_NEWSFEED_API_KEY } from "/pages/config";
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';

const ProfileFeed = (props) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState(props.bookmarks);
  const [lastpage,setlastpage] = useState(0);
  const [currentpage,setcurrentpage] = useState(1);

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const getNewsFeed = async () => {
    // const pageno = Math.ceil(list.length/10) + 1;
    const res = await axios(POST_NEWSFEED_API_KEY + "?page="+currentpage, {
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
    setLoading(false);
    return result;
  };

  const fetchMoreData = () => {
    getNewsFeed();
  }
  useEffect(() => {
    getNewsFeed();
    setLoading(false);
  },[]);
 
  return (
    <div className="mt-8">
      <div className="w-[750px] md:w-full xl:w-full">
        <NewsPostProfile lists={list} setList={setList} bookmarks={props.bookmarks} setBookmarks={props.setBookmarks}/>
        <div>
        <InfiniteScroll
          dataLength={list.length}
          next={fetchMoreData}
          hasMore={ currentpage != null }
          loader={ <div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40}/> </div>}
        >
          {list && list.length > 0 && list.map((item) => (
              <ProfileFeedSingle lists={item} setList={setList} key={item.id} bookmarks={props.bookmarks} setBookmarks={props.setBookmarks}/>        
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
