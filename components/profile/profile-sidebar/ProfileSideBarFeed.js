import React, { Fragment } from "react";
import EventsCard from "../../news-feed/eventcard/EventsCard";
import Footer from "../../footer/Footer";
import DropdownRender from "../../news-feed/Chat-box/ChatBox";
const ProfileSideBarFeed = () => {
  return (
    <div className="mt-8">
      <div className="">
        <EventsCard />
        {/* <ProfilePromotionsSidebar /> */}
        <Footer />
        <DropdownRender />
      </div>
    </div>
  );
};

export default ProfileSideBarFeed;
