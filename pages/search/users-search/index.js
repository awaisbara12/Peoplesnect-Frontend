import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import UserSearchFeed from "../../../components/news-feed/search/Users-Search/UsersSearchFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <UserSearchFeed />
    </PrivateRoutes>
  );
};

export default index;
