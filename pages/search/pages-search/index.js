import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import PagesSearchFeed from "../../../components/news-feed/search/Pages-Search/PagesSearchFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <PagesSearchFeed />
    </PrivateRoutes>
  );
};

export default index;
