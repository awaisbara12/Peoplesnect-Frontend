import React from "react";
import Head from "next/head";
import ProfileCard from "../../news-feed/profilecard/ProfileCard";
import AddNewJob from "./../AddNewJob";
import JobsNav from "../../news-feed/navbar/mobile-navbar/JobsNav";
import JobsSideBar from "../../news-feed/sugesteduser/JobsSideBar";
// import TopNavbar from "../Job-Header/TopNavbar";
import EventsCard from "../../news-feed/eventcard/EventsCard";
import FooterNewsFeed from "../../news-feed/newsfeed/newsfeedfooter/FooterNewsFeed";
import JobsBottomBar from "../../news-feed/navbar/JobsBottomBar";
import SavedJobs from "./SavedJobs";
import Footer from "../../footer/Footer";
import DropdownRender from "../../news-feed/Chat-box/ChatBox";
import TopNavbar from "../../news-feed/navbar/TopNavbar";
import MobileNav from "../../news-feed/navbar/mobile-navbar/MobileNav";

const SavedJobsFeed = () => {
  return (
    <div>
      <Head>
        <title>Saved Jobs - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <div className="sticky top-0 z-50">
            {/* <TopNavbar screen="jobs" /> */}
            {/* <JobsNav /> */}
            {/* <MobileNav/> */}
          </div>
          <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 gap-[65px] lg:gap-6 md:gap-4 justify-between mt-12 md:mt-0">
            <div className="h-full bg-zinc-100">
              <SavedJobs />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <ProfileCard />
              <div className="sticky top-20 z-0">
                <EventsCard />
                <JobsSideBar />
                <Footer />
                <AddNewJob />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DropdownRender />
      {/*<JobsBottomBar/>*/}
    </div>
  );
};

export default SavedJobsFeed;
