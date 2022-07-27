import React from "react";
import Head from "next/head";
import ProfileCard from "../news-feed/profilecard/ProfileCard";
import EventsCard from "../news-feed/eventcard/EventsCard";
import MobileBottomBar from "../news-feed/navbar/MobileBottomBar";
import MyConnectionsSidebar from "../news-feed/newsfeed/sidebar/MyConnectionsSidebar";
import PeendingRequest from "./PeendingRequest";
import MyNetwrokSearch from "../news-feed/search/MyNetworkSearch";
import MyNetWorkNav from "../news-feed/navbar/mobile-navbar/MyNetWorkNav";

const RequestFeed = () => {
  return (
    <div>
      <Head>
        <title>Peeding Request - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <div className="">
            <MyNetWorkNav />
          </div>
          <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 gap-[65px] lg:gap-6 md:gap-4 justify-between">
            <div className="hidden md:block lg:block">
              <MyConnectionsSidebar />
            </div>
            <div className="h-full bg-zinc-100 mx-auto">
              <PeendingRequest />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <MyNetwrokSearch />
              <ProfileCard />
              <EventsCard />
            </div>
          </div>
        </div>
      </div>
      <MobileBottomBar />
    </div>
  );
};
export default RequestFeed;
