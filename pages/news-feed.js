import React from "react";
import NewsFeedDashboard from "../components/news-feed/NewsFeedDashboard";
import PrivateRoutes from "../components/auth/routes/PrivateRoutes";

const NewsFeed = () => {
  return (
    <>
      <PrivateRoutes>
        <NewsFeedDashboard />
      </PrivateRoutes>
    </>
  );
};

export default NewsFeed;
