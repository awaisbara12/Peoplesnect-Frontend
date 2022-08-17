import React from "react";
import Head from "next/head";
import ProfileCard from "../../news-feed/profilecard/ProfileCard";
import NewsFeedSidebar from "../../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import BlogsBottomBar from "../../news-feed/navbar/BlogsBottomBar";
import BlogsSearch from "../../news-feed/search/BlogsSearch";
import BlogsNav from "../../news-feed/navbar/mobile-navbar/BlogsNav";
import EventView from "./EventView";
import EventsSearch from "../../news-feed/search/EventsSearch";
import EventsCard from "../../news-feed/eventcard/EventsCard";

const EventViewFeed = () => {
  return (
    <div>
      <Head>
        <title>Events - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <div className="">
            <BlogsNav />
          </div>
          <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 gap-[65px] lg:gap-6 md:gap-4 justify-between">
            <div className="hidden md:block lg:block">
              <NewsFeedSidebar />
            </div>
            <div className="">
              <EventView />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <EventsSearch />
              <ProfileCard />
              <EventsCard />
            </div>
          </div>
        </div>
      </div>
      <BlogsBottomBar />
    </div>
  );
};

export default EventViewFeed;
