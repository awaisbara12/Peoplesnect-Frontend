import React, { Fragment } from "react";
import ProfilePromotionsSidebar from "./ProfilePromotionsSidebar";
import ProfileSideBar from "./ProfileSideBar";
import ProfileUserSidebar from "./ProfileUserSidebar";
import Footer from "../../footer/Footer";
const ProfileSideBarFeed = () => {
  return (
    <div className="mt-8">
      <div className="">
        <ProfileSideBar />
        <ProfileUserSidebar />
        <ProfilePromotionsSidebar />
        <Footer />
      </div>
    </div>
  );
};

export default ProfileSideBarFeed;
