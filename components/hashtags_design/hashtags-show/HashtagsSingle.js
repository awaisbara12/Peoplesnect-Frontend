import React, { useState, useEffect } from "react";
import axios from "axios";
import { GET_CONNECTION_AND_FOLLOWING_NEWS_FEEDS, Show_USER_NEWS_FEEDS } from "../../../pages/config";
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
  const getNewsFeed = async () => {
    const res = await axios(GET_CONNECTION_AND_FOLLOWING_NEWS_FEEDS + "?page=" + currentpage, {
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
        console.log(result.data.pages)
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
              <HashtagsShow lists={item} key={item.id} />        
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
