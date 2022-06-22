import React, { Fragment } from "react";
import Head from "next/head";
import EventsCard from "../components/news-feed/eventcard/EventsCard";
import NewsFeedLayout from "../components/news-feed/layout";
import NewsFeedUserCard from "../components/news-feed/newsfeed/feedcard/NewsFeedUserCard";
import NewsPost from "../components/news-feed/newsfeed/newspost/NewsPost";
import NewsFeedSidebar from "../components/news-feed/newsfeed/sidebar/NewsFeedSidebar";
import ProfileCard from "../components/news-feed/profilecard/ProfileCard";
import NewsSearch from "../components/news-feed/search/NewsSearch";
import ProRoutes from "../components/ProRoutes";

const NewsFeed = () => {
  return (
    <NewsFeedLayout>
      <Head>
        <title>News Feed - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-zinc-100 w-full h-full pb-96">
        <div className="container mx-auto">
          <div className="flex gap-[65px] lg:gap-6 md:gap-4 justify-between">
            <div className="">
              <Fragment>
                <NewsFeedSidebar />
              </Fragment>
            </div>
            <div className="">
              <Fragment>
                <NewsPost />
                <NewsFeedUserCard />
              </Fragment>
            </div>
            <div className="w-72">
              <Fragment>
                <NewsSearch />
                <ProfileCard />
                <EventsCard />
              </Fragment>
            </div>
          </div>
        </div>
      </div>
    </NewsFeedLayout>
  );
};

export default ProRoutes(NewsFeed);
