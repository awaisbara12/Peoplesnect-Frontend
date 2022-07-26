import React from "react";
import Head from "next/head";
import NewsSearch from "../news-feed/search/NewsSearch";
import ProfileCard from "../news-feed/profilecard/ProfileCard";
import EventsCard from "../news-feed/eventcard/EventsCard";
import MobileNav from "../news-feed/navbar/MobileNav";
import MobileBottomBar from "../news-feed/navbar/MobileBottomBar";
import MyConnectionsSidebar from "../news-feed/newsfeed/sidebar/MyConnectionsSidebar";
import Notifications from "./Notifications";

const NotificationsFeed = () => {
  return (
    <div>
      <div>
        <Head>
          <title>Notifications - Peoples Nect</title>
          <meta name="description" content="Connect peoples proffasoinaly" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="pb-20 md:pb-10 lg:pb-10">
          <div className="xl:max-w-[1340px] container mx-auto">
            <div className="">
              <MobileNav />
            </div>
            <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 gap-[65px] lg:gap-6 md:gap-4 justify-between">
              <div className="hidden md:block lg:block">
                <MyConnectionsSidebar />
              </div>
              <div className="h-full bg-zinc-100 mx-auto">
                <Notifications />
              </div>
              <div className="w-72 hidden md:block lg:block">
                <NewsSearch />
                <ProfileCard />
                <EventsCard />
              </div>
            </div>
          </div>
        </div>
        <MobileBottomBar />
      </div>
    </div>
  );
};

export default NotificationsFeed;
