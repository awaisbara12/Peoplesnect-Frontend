import React from "react";
import UserDashboardLayout from "../app/news-dashboard/layout";
import ProfileCard from "../app/news-dashboard/profilecard/page";
import NewsSearch from "../app/news-dashboard/search/page";

const NewsFeed = () => {
  return (
    <UserDashboardLayout>
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="">1</div>
          <div className="">2</div>
          <div className="">
            <NewsSearch />
            <ProfileCard />
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default NewsFeed;
