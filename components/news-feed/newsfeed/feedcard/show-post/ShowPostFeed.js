import React from "react";
import Head from "next/head";
import ShowNewsPost from "./ShowNewsPost";
import TopNavbar from "../../../navbar/TopNavbar";
import MobileNav from "../../../navbar/mobile-navbar/MobileNav";
import ProfileCard from "../../../profilecard/ProfileCard";
import EventsCard from "../../../eventcard/EventsCard";
import SugestedUser from "../../../sugesteduser/SugestedUser";
import FooterNewsFeed from "../../newsfeedfooter/FooterNewsFeed";
import MobileBottomBar from "../../../navbar/MobileBottomBar";

const ShowPostFeed = () => {
  return (
    <div>
      <div>
        <Head>
          <title>Notifications - Peoples Nect</title>
          <meta name="description" content="Connect peoples proffasoinaly" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="pb-20 md:pb-10 lg:pb-10">
          <div className="xl:max-w-[1340px] container mx-auto">
            <div className="sticky top-0 z-50">
              <TopNavbar />
              <MobileNav />
            </div>
            <div className="flex px-2 xl:px-0 md:px-4 gap-[65px] md:gap-8 lg:gap-6 justify-between">
              <div className="h-full bg-zinc-100 mx-auto">
                <ShowNewsPost />
              </div>
              <div className="w-72 hidden md:block lg:block">
                <ProfileCard />
                <div className="sticky top-20 z-10">
                <EventsCard />
                <SugestedUser />
                <FooterNewsFeed />
                </div>
              </div>
            </div>
          </div>
        </div>
        <MobileBottomBar />
      </div>
    </div>
  );
};

export default ShowPostFeed;
