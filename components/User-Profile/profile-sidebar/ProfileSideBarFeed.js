import React, { Fragment } from "react";
import NewsSearch from "../../news-feed/search/NewsSearch";
import ProfileFooter from "./ProfileFooter";
import ProfilePromotionsSidebar from "./ProfilePromotionsSidebar";
import ProfileSideBar from "./ProfileSideBar";
import ProfileUserSidebar from "./ProfileUserSidebar";
const ProfileSideBarFeed = () => {
  return (
    <div className="mt-8">
      <div className="">
        <ProfileSideBar />
        <ProfileUserSidebar />
        <ProfilePromotionsSidebar />
        <ProfileFooter />
      </div>
    </div>
  );
};

export default ProfileSideBarFeed;
