import React from "react";
import Head from "next/head";
import ProfileCard from "../news-feed/profilecard/ProfileCard";
import NewsFeedSidebar from "../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import MobileBottomBar from "../news-feed/navbar/MobileBottomBar";
import MobileNav from "../news-feed/navbar/mobile-navbar/MobileNav";
import NewsSearch from "../news-feed/search/NewsSearch";
import EventsCard from "../news-feed/eventcard/EventsCard";
import Messaging from "./Messaging";
import SugestedUser from "../news-feed/sugesteduser/SugestedUser";
import ChatBox from "./Chat-box/ChatBox";
import Messages from "./Inbox-Feed/Messages";
import NewMessage from "./NewMessage";
import TopNavbar from "../news-feed/navbar/TopNavbar";
import ProfileSideBar from "../profile/profile-sidebar/ProfileSideBar";
import ProfileSideBarFeed from "../profile/profile-sidebar/ProfileSideBarFeed";
import FooterNewsFeed from "../news-feed/newsfeed/newsfeedfooter/FooterNewsFeed";

const MessagingFeed = () => {
  return (
    <div>
      <Head>
        <title>Message - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <div className="sticky top-0 z-50">
            <TopNavbar />
            <MobileNav />
          </div>
          <div className="flex px-2 xl:px-0 lg:px-4 md:px-4 gap-[65px] md:gap-8 lg:gap-6 justify-between">
            <div className="h-full bg-zinc-100 md:bg-transparent lg:bg-transparent xl:bg-transparent px-4 md:px-0 lg-px-0 xl:px-0">
              <div className="flex mt-8">
                <Messaging />
                <NewMessage />
              </div>
            </div>
            <div className="w-72 hidden md:block lg:block">
              <ProfileCard />
              <EventsCard />
              <SugestedUser /> 
              <FooterNewsFeed />
            </div>
          </div>
        </div>
      </div>
      <MobileBottomBar />
    </div>
  );
};

export default MessagingFeed;
