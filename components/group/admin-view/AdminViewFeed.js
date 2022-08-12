import React from "react";
import Head from "next/head";
import ProfileCard from "../../news-feed/profilecard/ProfileCard";
import NewsFeedSidebar from "../../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import MobileBottomBar from "../../news-feed/navbar/MobileBottomBar";
import MobileNav from "../../news-feed/navbar/mobile-navbar/MobileNav";
import NewsSearch from "../../news-feed/search/NewsSearch";
import EventsCard from "../../news-feed/eventcard/EventsCard";
import AdminView from "./AdminView";
import GroupSearch from "../../news-feed/search/GroupSearch";

const AdminViewFeed = () => {
  return (
    <div>
      <Head>
        <title>Admin View - Peoples Nect</title>
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
            <div className="h-full bg-zinc-100 md:bg-transparent lg:bg-transparent xl:bg-transparent px-4 md:px-0 lg-px-0 xl:px-0">
              <AdminView />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <GroupSearch/>
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

export default AdminViewFeed;
