import React from "react";
import Head from "next/head";
import ProfileCard from "../news-feed/profilecard/ProfileCard";
import MyNetwork from "./MyNetwork";
import MobileBottomBar from "../news-feed/navbar/MobileBottomBar";
import MyNetWorkNav from "../news-feed/navbar/mobile-navbar/MyNetWorkNav";
import MyConnections from "../news-feed/sugesteduser/MyConnections";
import EventsCard from "../news-feed/eventcard/EventsCard";
import TopNavbar from "../news-feed/navbar/TopNavbar";
import Footer from "../footer/Footer";
import DropdownRender from "../news-feed/Chat-box/ChatBox";
import MobileNav from "../news-feed/navbar/mobile-navbar/MobileNav";

const MyNetWorkFeed = () => {
  return (
    <div>
      <Head>
        <title>My Network - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <div className="sticky top-0 z-50">
            {/* <TopNavbar /> */}
            {/* <MyNetWorkNav /> */}
            {/* <MobileNav/> */}
          </div>
          <div className="flex px-2 xl:px-0 lg:px-4 md:px-4 gap-[65px] md:gap-8 lg:gap-6 justify-between mt-12 md:mt-0">
            <div className="h-full bg-zinc-100 mx-auto">
              <MyNetwork />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <ProfileCard />
              <div className="sticky top-20 z-0">
                <EventsCard />
                <MyConnections />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DropdownRender />
      <MobileBottomBar />
    </div>
  );
};

export default MyNetWorkFeed;
