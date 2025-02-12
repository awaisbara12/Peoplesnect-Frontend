import React from "react";
import Head from "next/head";
import MobileBottomBar from "../news-feed/navbar/MobileBottomBar";
import MarkeetPlaceSideBar from "./markeetplace-rightbar/MarkeetPlaceSideBar";
import HomeProducts from "./products/LatestProducts";
import MarkeetplaceSuggestion from "./markeetplace-rightbar/MarkeetplaceSuggestion";
import TopNavbar from "./MarketPlace-Header/TopNavbar";
import FooterNewsFeed from "../news-feed/newsfeed/newsfeedfooter/FooterNewsFeed";
import MarkeetPlaceMobileNav from "../news-feed/navbar/mobile-navbar/MarkeetPlaceMobileNav";
import MarketplaceBottomBar from "../news-feed/navbar/MarketplaceBotoombar";
import Footer from "../footer/Footer";
import DropdownRender from "../news-feed/Chat-box/ChatBox";
import MobileNav from "../news-feed/navbar/mobile-navbar/MobileNav";

const MarkeetPlaceFeed = () => {
  return (
    <div>

      <Head>
        <title>MarketPlace - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <div className="sticky top-0 z-50">
            {/* <TopNavbar /> */}
            <div className="block md:hidden lg:hidden">
              {/* <MarkeetPlaceMobileNav /> */}
              {/* <MobileNav/> */}
            </div>
          </div>
          <div className="flex xl:px-0 lg:px-4 md:px-8 px-2 lg:gap-6 md:gap-4 justify-between">
            <div className="mt-8">
              <HomeProducts />
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
      {/*<MarketplaceBottomBar/>*/}

    </div>
  );
};

export default MarkeetPlaceFeed;