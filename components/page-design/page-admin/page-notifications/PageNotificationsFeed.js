import React from "react";
import Head from "next/head";
import ProfileCard from "../../../news-feed/profilecard/ProfileCard";
import MobileNav from "../../../news-feed/navbar/mobile-navbar/MobileNav";
import MobileBottomBar from "../../../news-feed/navbar/MobileBottomBar";
import PageNotifications from "./PageNotifications";
import PageSearch from "../../../news-feed/search/PageSearch";
import NewsFeedSidebar from "../../../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import PageSuggesions from "../../../news-feed/sugesteduser/PageSuggestions";

const PageNotificationsFeed = () => {
  return (
    <div>
      <div>
        <Head>
          <title>Page Notifications - Peoples Nect</title>
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
                <NewsFeedSidebar />
              </div>
              <div className="h-full bg-zinc-100 mx-auto">
                <PageNotifications />
              </div>
              <div className="w-72 hidden md:block lg:block">
                <PageSearch />
                <ProfileCard />
                <PageSuggesions />
              </div>
            </div>
          </div>
        </div>
        <MobileBottomBar />
      </div>
    </div>
  );
};

export default PageNotificationsFeed;
