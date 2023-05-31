import React from "react";
import Head from "next/head";
import ProfileCard from "../../news-feed/profilecard/ProfileCard";
import NewsFeedSidebar from "../../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import BlogsNav from "../../news-feed/navbar/mobile-navbar/BlogsNav";
import EventView from "./EventView";
import EventsSearch from "../../news-feed/search/EventsSearch";
import SugestedUser from "../../news-feed/sugesteduser/SugestedUser";
import MobileBottomBar from "../../news-feed/navbar/MobileBottomBar";
import TopNavbar from "../../news-feed/navbar/TopNavbar";
import EventsCard from "../../news-feed/eventcard/EventsCard";
import Footer from "../../footer/Footer";
import DropdownRender from "../../news-feed/Chat-box/ChatBox";

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
          <div className="sticky top-0 z-50">
            <TopNavbar />
            <BlogsNav />
          </div>
          <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 gap-[65px] lg:gap-6 md:gap-4 justify-between mt-12 md:mt-0">
            <div className="">
              <EventView />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <ProfileCard />
              <EventsCard />
              <SugestedUser />
              <Footer />
            </div>
          </div>
        </div>
      </div>
      <DropdownRender />
      <MobileBottomBar />
    </div>
  );
};

export default EventViewFeed;
