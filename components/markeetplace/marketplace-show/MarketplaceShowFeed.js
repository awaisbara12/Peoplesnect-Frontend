import React from "react";
import Head from "next/head";
import NewsFeedSidebar from "../../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import MobileBottomBar from "../../news-feed/navbar/MobileBottomBar";
import NewsSearch from "../../news-feed/search/NewsSearch";
import MobileNavbar from "../navbar/MobileNavbar";
import MarkeetPlaceSideBar from "../markeetplace-rightbar/MarkeetPlaceSideBar";
import MarkeetplaceSuggestion from "../markeetplace-rightbar/MarkeetplaceSuggestion";
import MarketplaceShow from "./MarketplaceShow";
import MarkeetplaceNavbar from "../navbar/MarkeetplaceNavbar";
import TopNavbar from "../MarketPlace-Header/TopNavbar";
import EventsCard from "../../news-feed/eventcard/EventsCard";
import FooterNewsFeed from "../../news-feed/newsfeed/newsfeedfooter/FooterNewsFeed";
import MarkeetPlaceMobileNav from "../../news-feed/navbar/mobile-navbar/MarkeetPlaceMobileNav";
import MarketplaceBottomBar from "../../news-feed/navbar/MarketplaceBotoombar";
import Footer from "../../footer/Footer";
import DropdownRender from "../../news-feed/Chat-box/ChatBox";
import MobileNav from "../../news-feed/navbar/mobile-navbar/MobileNav";

const MarketplaceShowFeed = () => {
  return (
    <div>
      <Head>
        <title>MarketPlace - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          {/* <TopNavbar /> */}
          <div className="z-50">
            {/* <MarkeetPlaceMobileNav /> */}
            {/* <MobileNav/> */}
          </div>
          <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 lg:gap-6 md:gap-4 justify-between mt-12 md:mt-0">
            <div className="mt-8 mx-auto">
              <MarketplaceShow />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <div className="sticky top-20 z-0">
                <MarkeetPlaceSideBar />
                <MarkeetplaceSuggestion />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DropdownRender />
      <MarketplaceBottomBar />
    </div>
  );
};

export default MarketplaceShowFeed;
