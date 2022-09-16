import React from "react";
import Head from "next/head";
import ProfileCard from "../news-feed/profilecard/ProfileCard";
import MobileBottomBar from "../news-feed/navbar/MobileBottomBar";
import AddNewJob from "./AddNewJob";
import RecommendedJobs from "./RecommendedJobs";
import MostSearchedJobs from "./MostSearchedJobs";
import JobsSearch from "../news-feed/search/JobsSearch";
import JobsNav from "../news-feed/navbar/mobile-navbar/JobsNav";
import JobsSideBar from "../news-feed/sugesteduser/JobsSideBar";
import TopNavbar from "../news-feed/navbar/TopNavbar";
import EventsCard from "../news-feed/eventcard/EventsCard";
import FooterNewsFeed from "../news-feed/newsfeed/newsfeedfooter/FooterNewsFeed";

const NewJobsFeed = () => {
  return (
    <div>
      <Head>
        <title>Jobs - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <div className="sticky top-0 z-50">
            <TopNavbar />
            <JobsNav />
          </div>
          <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 gap-[65px] lg:gap-6 md:gap-4 justify-between">
            <div className="h-full bg-zinc-100">
              <RecommendedJobs />
              <MostSearchedJobs />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <ProfileCard />
              <div className="sticky top-20 z-50">
                <EventsCard />
                <FooterNewsFeed />
                <AddNewJob />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileBottomBar />
    </div>
  );
};

export default NewJobsFeed;
