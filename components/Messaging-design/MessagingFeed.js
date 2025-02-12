import React from "react";
import Head from "next/head";
import ProfileCard from "../news-feed/profilecard/ProfileCard";
import MobileBottomBar from "../news-feed/navbar/MobileBottomBar";
import MobileNav from "../news-feed/navbar/mobile-navbar/MobileNav";
import EventsCard from "../news-feed/eventcard/EventsCard";
import Messaging from "./Messaging";
import SugestedUser from "../news-feed/sugesteduser/SugestedUser";
import Messages from "./Inbox-Feed/Messages";
// import NewMessage from "./NewMessage";
import TopNavbar from "../news-feed/navbar/TopNavbar";
import Footer from "../footer/Footer";

// import cable from './Inbox-Feed/Cable'
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
            {/* <TopNavbar /> */}
            {/* <MobileNav/> */}
            {/* <MobileNav/> */}
          </div>
          <div className="flex px-2 xl:px-0 lg:px-4 md:px-4 gap-[65px] md:gap-8 lg:gap-6 justify-between mt-12 md:mt-0">
            <div className="h-full bg-zinc-100 md:bg-transparent px-4 md:px-0">
              <div className="mt-8 grid grid-cols-6 md:grid-cols-6 w-[580px] xl:w-[980px] lg:w-[730px] md:w-[780px] ">
                <div className="col-span-3 md:col-span-2">
                  <Messaging />
                </div>
                <div className="col-span-3 md:col-span-4">
                  <Messages />
                </div>
              </div>
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
      {/*<MobileBottomBar/> */}
    </div>
  );
};

export default MessagingFeed;
