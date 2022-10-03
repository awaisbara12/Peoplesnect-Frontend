import React from "react";
import Head from "next/head";
import ProfileCard from "../news-feed/profilecard/ProfileCard";
import NewsFeedSidebar from "../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import MobileBottomBar from "../news-feed/navbar/MobileBottomBar";
import MobileNav from "../news-feed/navbar/mobile-navbar/MobileNav";
import Groups from "./Groups";
import GroupSearch from "../news-feed/search/GroupSearch";
import GroupsSuggesions from "../news-feed/sugesteduser/GroupsSuggesions";
import EventsCard from "../news-feed/eventcard/EventsCard";
import TopNavbar from "../news-feed/navbar/TopNavbar";
import FooterNewsFeed from "../news-feed/newsfeed/newsfeedfooter/FooterNewsFeed";
import GroupsBottomBar from "../news-feed/navbar/GroupsBottomBar";

const GroupsFeed = () => {
  return (
    <div>
      <Head>
        <title>Suggestion - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
      <div className="xl:max-w-[1340px] container mx-auto">
          <div className="sticky top-0 z-50">
            <TopNavbar />
            <MobileNav />
          </div>
          <div className="flex px-2 xl:px-0 lg:px-4 md:px-4 gap-[65px] md:gap-8 lg:gap-6 justify-between">
            <div className="h-full bg-zinc-100 mx-auto">
              <Groups />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <ProfileCard />
              <div className="sticky top-20 z-20">
              <EventsCard />
              <GroupsSuggesions />
              <FooterNewsFeed />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GroupsBottomBar />
    </div>
  );
};

export default GroupsFeed;
