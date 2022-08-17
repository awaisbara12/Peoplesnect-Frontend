import React, { Fragment } from "react";
import EventsCard from "../../eventcard/EventsCard";
import NewsFeedNav from "../../navbar/NewsFeedNav";
import FooterNewsFeed from "../newsfeedfooter/FooterNewsFeed";

const NewsFeedSidebar = () => {
  return (
    <div className="z-50">
      <div className="bg-white w-72 rounded-xl mt-7 p-5">
        <div>
          <NewsFeedNav />
          <div className="border-1 my-6 w-56 mx-auto text-gray-100"></div>
          <Fragment>
            <EventsCard />
          </Fragment>
        </div>
      </div>
      <FooterNewsFeed />
    </div>
  );
};

export default NewsFeedSidebar;
