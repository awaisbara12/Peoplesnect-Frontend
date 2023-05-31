import React, { Fragment } from "react";
import NewsSearch from "../../news-feed/search/NewsSearch";
import SugestedUser from "./SugestedUser";
import EventsCard from "../../news-feed/eventcard/EventsCard";
import Footer from "../../footer/Footer";
import DropdownRender from "../../news-feed/Chat-box/ChatBox";
const ProfileSideBarFeed = () => {
  return (
    <div className="mt-8">
      <div className="">
        <EventsCard />
        <SugestedUser />
        <Footer />
        <DropdownRender />
      </div>
    </div>
  );
};

export default ProfileSideBarFeed;
