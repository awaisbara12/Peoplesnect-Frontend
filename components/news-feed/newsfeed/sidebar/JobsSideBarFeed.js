import React, { Fragment } from "react";
import NewsFeedNav from "../../navbar/NewsFeedNav";
import JobsSideBar from "../../sugesteduser/JobsSideBar";
import FooterNewsFeed from "../newsfeedfooter/FooterNewsFeed";

const JobsSideBarFeed = () => {
  return (
    <div className="sticky top-7 z-50">
      <div className=" bg-white w-72 rounded-xl mt-7 p-5">
        <div>
          <NewsFeedNav />
          <div className="border-1 my-6 w-56 mx-auto text-gray-100"></div>
          <Fragment>
            <JobsSideBar />
          </Fragment>
        </div>
      </div>
      <FooterNewsFeed />
    </div>
  );
};

export default JobsSideBarFeed;
