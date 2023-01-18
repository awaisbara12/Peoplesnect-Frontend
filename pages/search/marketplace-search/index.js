import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import MarketPlaceSearchFeed from "../../../components/news-feed/search/Marketplace-search/MarketPlaceSearchFeed";
import UserSearchFeed from "../../../components/news-feed/search/Users-Search/UsersSearchFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <MarketPlaceSearchFeed />
    </PrivateRoutes>
  );
};

export default index;
