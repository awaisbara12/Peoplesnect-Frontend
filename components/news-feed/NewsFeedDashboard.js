import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import NewsPost from "./newsfeed/newspost/NewsPost";
import NewsFeedUserCard from "./newsfeed/feedcard/NewsFeedUserCard";
import ProfileCard from "./profilecard/ProfileCard";
import EventsCard from "./eventcard/EventsCard";
import MobileBottomBar from "./navbar/MobileBottomBar";
import { GET_CONNECTION_AND_FOLLOWING_NEWS_FEEDS } from "/pages/config";
import MobileNav from "./navbar/mobile-navbar/MobileNav";
import SugestedUser from "./sugesteduser/SugestedUser";
import TopNavbar from "./navbar/TopNavbar";

const NewsFeedDashboard = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  useEffect(() => {
    setLoading(true);
    const getNewsFeed = async () => {
      const res = await axios(GET_CONNECTION_AND_FOLLOWING_NEWS_FEEDS, {
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
          setList(result.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      return result;
    };
    getNewsFeed();
  }, []);

  return (
    <>
      <Head>
        <title>News Feed - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <>
          <div className="sticky z-50 top-0">
          <TopNavbar />
            <MobileNav />
          </div>
          </>
          <div className="flex xl:px-0 lg:px-4 md:px-6 sm:px-0 gap-[65px] lg:gap-6 md:gap-4 justify-between">
            <div className="h-full bg-zinc-100 md:bg-transparent lg:bg-transparent xl:bg-transparent px-4 md:px-0 lg-px-0 xl:px-0">
              <NewsPost setList={setList} />
              {!loading && <NewsFeedUserCard list={list.data} />}
            </div>
            <div className="w-72 md:w-64 hidden md:block lg:block">
              <ProfileCard />
              <div className="sticky top-20 z-10">
              <EventsCard />
              <SugestedUser />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileBottomBar />
    </>
  );
};

export default NewsFeedDashboard;
