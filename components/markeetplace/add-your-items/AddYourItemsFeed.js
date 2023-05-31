import React from "react";
import Head from "next/head";
import NewsFeedSidebar from "../../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import MobileBottomBar from "../../news-feed/navbar/MobileBottomBar";
import NewsSearch from "../../news-feed/search/NewsSearch";
import MarkeetPlaceSideBar from "../markeetplace-rightbar/MarkeetPlaceSideBar";
import MarkeetplaceSuggestion from "../markeetplace-rightbar/MarkeetplaceSuggestion";
import MarkeetplaceNavbar from "../navbar/MarkeetplaceNavbar";
import AddYourItems from "./AddYourItems";
import TopNavbar from "../MarketPlace-Header/TopNavbar";
import FooterNewsFeed from "../../news-feed/newsfeed/newsfeedfooter/FooterNewsFeed";
import MarketplaceBottomBar from "../../news-feed/navbar/MarketplaceBotoombar";
import MarkeetPlaceMobileNav from "../../news-feed/navbar/mobile-navbar/MarkeetPlaceMobileNav";
import Footer from "../../footer/Footer";
import DropdownRender from "../../news-feed/Chat-box/ChatBox";

const AddYourItemsFeed = () => {
  return (
    <div>
      <Head>
        <title>MarketPlace - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <TopNavbar />
          <div className="block md:hidden lg:hidden">
            <MarkeetPlaceMobileNav />
          </div>
          <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 lg:gap-6 md:gap-4 justify-between mt-12 md:mt-0">
            <div className="mt-8 mx-auto">
              <AddYourItems />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <div className="sticky top-20 z-0">
                <MarkeetPlaceSideBar />
                {/* <MarkeetplaceSuggestion /> */}
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

export default AddYourItemsFeed;
