import React, { useEffect } from "react";
import Head from "next/head";
import MobileBottomBar from "../news-feed/navbar/MobileBottomBar";
import MobileNav from "../news-feed/navbar/mobile-navbar/MobileNav";
import NewsSearch from "../news-feed/search/NewsSearch";
import ProfileTopCard from "./ProfileTopCard";
import ProfileSideBarFeed from "./profile-sidebar/ProfileSideBarFeed";
import NewsFeedNav from "../news-feed/navbar/NewsFeedNav";
import MobileProfileNav from "./profile-navbar/MobileProfileNav";
import TopNavbar from "../news-feed/navbar/TopNavbar";
import { CURENT_USER_LOGIN_API } from "../../pages/config";
import { useRouter } from "next/router";
const ProfileViewFeed = (props) => {
  const userid = props.id
  
  return (
    <div>
      <Head>
        <title>Profile - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <div className="sticky top-0 z-50">
            {/* <TopNavbar /> */}
            {/*<MobileProfileNav /> */}
          </div>
          <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 gap-[65px] lg:gap-6 md:gap-4 justify-between mt-12 md:mt-0">
            <div className="h-full bg-zinc-100 md:bg-transparent lg:bg-transparent xl:bg-transparent px-4 md:px-0 lg-px-0 xl:px-0">
              <ProfileTopCard id={userid} />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <div className=" sticky top-20 z-0">
                <ProfileSideBarFeed />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<MobileBottomBar/> */}
    </div>
  );
};

export default ProfileViewFeed;
