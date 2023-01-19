import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import JobsSearchFeed from "../../../components/news-feed/search/Jobs-Search/JobsSearchFeed";
import PagesSearchFeed from "../../../components/news-feed/search/Pages-Search/PagesSearchFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <JobsSearchFeed />
    </PrivateRoutes>
  );
};

export default index;
