import React, { useState, useEffect } from "react";
import axios from "axios";
import { GET_CONNECTION_AND_FOLLOWING_NEWS_FEEDS, Show_USER_NEWS_FEEDS,HASHTAGS_API } from "../../../pages/config";
import { useRouter } from "next/router";
import HashtagsShow from "./HashtagsShow";

const HashtagsSingle = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentpage,setcurrentpage] = useState(1);
  
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // bareer key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  // ShowUser NewFeed
  const getHashtagFeed = async () => {
    const res = await axios(HASHTAGS_API + "/get_hashtag_feed?hashtag_id=" + myArray[1], {
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
        // setcurrentpage(result.data.pages.next_page)
        // setlastpage(result.data.pages.total_pages)
        // console.log(result.data.data)
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    return result;
  };
  useEffect(() => {
   
    setLoading(false);
    getHashtagFeed();
  },[]);
 
  return (
    <div className="mt-8">
      <div className="w-[750px] md:w-full xl:w-full">
        <div>
          {list&&
            list.map((item) => (
              item.hashtag_feedable_type == "NewsFeed"?(
                <HashtagsShow lists={item.newsfeed} key={item.newsfeed.id} type={item.hashtag_feedable_type} />  
              ):(
                item.hashtag_feedable_type == "Blog"?(
                  <HashtagsShow lists={item} key={item.blog.id} type={item.hashtag_feedable_type}/>
                ):('')
              )
            )
            )
          }
        </div>
         <></>
      </div>
    </div>
  );
};

export default HashtagsSingle;
