import React from "react";
import Head from "next/head";
import NewsPost from "./newsfeed/newspost/NewsPost";
import NewsFeedUserCard from "./newsfeed/feedcard/NewsFeedUserCard";
import NewsFeedSidebar from "./newsfeed/sidebar/NewsFeedSidebar";
import NewsSearch from "./search/NewsSearch";
import ProfileCard from "./profilecard/ProfileCard";
import EventsCard from "./eventcard/EventsCard";
import NewsFeedLayout from "./layout";

const NewsFeedDashboard = () => {
  return (
    <NewsFeedLayout>
      <Head>
        <title>News Feed - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-zinc-100 w-full h-full pb-10">
        <div className="container mx-auto">
          <div className="flex gap-[65px] lg:gap-6 md:gap-4 justify-between">
            <div className="">
              <NewsFeedSidebar />
            </div>
            <div className="">
              <NewsPost />
              <NewsFeedUserCard />
            </div>
            <div className="w-72">
              <NewsSearch />
              <ProfileCard />
              <EventsCard />
            </div>
          </div>
        </div>
      </div>
    </NewsFeedLayout>
  );
};

export default NewsFeedDashboard;
