import React from "react";
import Head from "next/head";
import MobileBottomBar from "../news-feed/navbar/MobileBottomBar";
import MobileNav from "../news-feed/navbar/mobile-navbar/MobileNav";
import SugestedUser from "../news-feed/sugesteduser/SugestedUser";
import NewsSearch from "../news-feed/search/NewsSearch";
import ProfileCard from "./ProfileCard";
import ProfileFeed from "./ProfileFeed";
import NewsFeedSidebar from "../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import ProfileNavbar from "./profile-navbar/ProfileNavbar";

const ProfileViewFeed = () => {
  return (
    <div>
      <Head>
        <title>Suggestion - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <div className="">
            <ProfileNavbar />
          </div>
          <div className="h-full bg-zinc-100 md:bg-transparent lg:bg-transparent xl:bg-transparent px-4 md:px-0 lg-px-0 xl:px-0">
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewFeed;
