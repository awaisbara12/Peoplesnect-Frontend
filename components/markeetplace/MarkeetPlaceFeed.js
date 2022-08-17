import React from "react";
import Head from "next/head";
import NewsFeedSidebar from "../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import MobileBottomBar from "../news-feed/navbar/MobileBottomBar";
import NewsSearch from "../news-feed/search/NewsSearch";
import MobileNavbar from "./navbar/MobileNavbar";
import MarkeetPlaceSideBar from "./markeetplace-rightbar/MarkeetPlaceSideBar";
import HomeProducts from "./products/LatestProducts";
import MarkeetplaceSuggestion from "../news-feed/sugesteduser/MarkeetplaceSuggestion";
import PropertyProducts from "./products/PropertyProducts";

const MarkeetPlaceFeed = () => {
  return (
    <div>
      <Head>
        <title>MarkeetPlace - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <div className=""></div>
          <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 gap-[65px] lg:gap-6 md:gap-4 justify-between">
            <div className="hidden md:block lg:block">
              <NewsFeedSidebar />
            </div>
            <div className="mt-8 mx-auto">
              <HomeProducts />
              <div className="mt-8">
                <PropertyProducts />
              </div>
            </div>
            <div className="mt-8"></div>
            <div className="w-72 hidden md:block lg:block">
              <NewsSearch />
              <MarkeetPlaceSideBar />
              <MarkeetplaceSuggestion />
            </div>
          </div>
        </div>
      </div>
      <MobileBottomBar />
    </div>
  );
};

export default MarkeetPlaceFeed;
