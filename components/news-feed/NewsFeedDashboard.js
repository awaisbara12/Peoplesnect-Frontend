import React from "react";
import Head from "next/head";
import NewsPost from "./newsfeed/newspost/NewsPost";
import NewsFeedUserCard from "./newsfeed/feedcard/NewsFeedUserCard";
import NewsFeedSidebar from "./newsfeed/sidebar/NewsFeedSidebar";
import NewsSearch from "./search/NewsSearch";
import ProfileCard from "./profilecard/ProfileCard";
import EventsCard from "./eventcard/EventsCard";
import NewsFeedLayout from "./layout";
import MobileNav from "./navbar/MobileNav";
import MobileBottomBar from "./navbar/MobileBottomBar";

const NewsFeedDashboard = () => {
  return (
    <NewsFeedLayout>
      <Head>
        <title>News Feed - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-10">
        <div className="container mx-auto">
          <div className="">
            <MobileNav />
          </div>
          <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 gap-[65px] lg:gap-6 md:gap-4 justify-between">
            <div className="hidden md:block lg:block">
              <NewsFeedSidebar />
            </div>
            <div className="h-full bg-zinc-100 md:bg-transparent lg:bg-transparent xl:bg-transparent px-4 md:px-0 lg-px-0 xl:px-0">
              <NewsPost />
              <NewsFeedUserCard />
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
    </NewsFeedLayout>
  );
};

export default NewsFeedDashboard;
