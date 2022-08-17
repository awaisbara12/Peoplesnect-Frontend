import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import HashtagsFeed from "../../components/hashtags_design/HashtagsFeed";
const index = () => {
  return (
    <PrivateRoutes>
      <HashtagsFeed />
    </PrivateRoutes>
  );
};

export default index;
