import React from "react";
import Head from "next/head";
import NewsSearch from "../news-feed/search/NewsSearch";
import ProfileCard from "../news-feed/profilecard/ProfileCard";
import MobileNav from "../news-feed/navbar/mobile-navbar/MobileNav";
import MobileBottomBar from "../news-feed/navbar/MobileBottomBar";
import Notifications from "./Notifications";
import SugestedUser from "../news-feed/sugesteduser/SugestedUser";
import NewsFeedSidebar from "../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import EventsCard from "../news-feed/eventcard/EventsCard";
import TopNavbar from "../news-feed/navbar/TopNavbar";
import FooterNewsFeed from "../news-feed/newsfeed/newsfeedfooter/FooterNewsFeed";
import Footer from "../footer/Footer";
import DropdownRender from "../news-feed/Chat-box/ChatBox";

const NotificationsFeed = () => {
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
              {/* <TopNavbar /> */}
            {/* <MobileNav/> */}
            </div>
            <div className="flex px-2 xl:px-0 md:px-4 gap-[65px] md:gap-8 lg:gap-6 justify-between">
              <div className="h-full bg-zinc-100 mx-auto">
                <Notifications />
              </div>
              <div className="w-72 hidden md:block lg:block">
                <ProfileCard />
                <div className="sticky top-20 z-0">
                  <EventsCard />
                  <SugestedUser />
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
        <DropdownRender />
        {/*<MobileBottomBar/> */}
      </div>
    </div>
  );
};

export default NotificationsFeed;
