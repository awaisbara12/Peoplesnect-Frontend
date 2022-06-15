import React, { Fragment } from "react";
import EventsCard from "../app/news-dashboard/eventcard/page";
import UserDashboardLayout from "../app/news-dashboard/layout";
import NewsFeedUserCard from "../app/news-dashboard/newsfeed/feedcard/page";
import NewsPost from "../app/news-dashboard/newsfeed/newspost/page";
import NewsFeedSidebar from "../app/news-dashboard/newsfeed/sidebar/page";
import ProfileCard from "../app/news-dashboard/profilecard/page";
import NewsSearch from "../app/news-dashboard/search/page";

const NewsFeed = () => {
  return (
    <UserDashboardLayout>
      <div className="bg-zinc-100 w-full h-full pb-96">
        <div className="container mx-auto">
          <div className="flex gap-[65px] justify-between">
            <div className="">
              <Fragment>
                <NewsFeedSidebar />
              </Fragment>
            </div>
            <div className="">
              <Fragment>
                <NewsPost />
                <NewsFeedUserCard />
              </Fragment>
            </div>
            <div className="w-72">
              <Fragment>
                <NewsSearch />
                <ProfileCard />
                <EventsCard />
              </Fragment>
            </div>
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default NewsFeed;
