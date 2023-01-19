import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import GroupSearchFeed from "../../../components/news-feed/search/Group-Search/GroupSearchFeed";
import UserSearchFeed from "../../../components/news-feed/search/Users-Search/UsersSearchFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <GroupSearchFeed />
    </PrivateRoutes>
  );
};

export default index;
