import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import SearchFeed from "../../components/news-feed/search/SearchFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <SearchFeed />
    </PrivateRoutes>
  );
};

export default index;
