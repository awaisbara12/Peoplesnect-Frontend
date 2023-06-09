import React from "react";
import Head from "next/head";
import ProfileCard from "../../news-feed/profilecard/ProfileCard";
import MobileNav from "../../news-feed/navbar/mobile-navbar/MobileNav";
import TopNavbar from "../../news-feed/navbar/TopNavbar";
import EventsCard from "../../news-feed/eventcard/EventsCard";
import Footer from "../Footer";
import MobileBottomBar from "../../news-feed/navbar/MobileBottomBar";
import NewsFeedSidebar from "../../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import ContactUs from "./ContactUs";
const ContactUsFeed = () => {
  return (
    <div>
      <Head>
        <title>Contact Us - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <div className="sticky top-0 z-50">
            {/* <TopNavbar /> */}
            <MobileNav />
          </div>
          <div className="flex px-2 xl:px-0 lg:px-4 md:px-4 gap-[65px] md:gap-8 lg:gap-6 justify-between mt-12 md:mt-0">
            <div className="h-full bg-zinc-100 md:bg-transparent lg:bg-transparent xl:bg-transparent px-4 md:px-0 lg-px-0 xl:px-0">
              <ContactUs />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <ProfileCard />
              <div className="sticky top-20 z-0">
                <EventsCard />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileBottomBar />
    </div>
  );
};
export default ContactUsFeed;