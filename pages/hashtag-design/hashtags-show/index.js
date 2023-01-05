import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import HashtagsShowFeed from "../../../components/hashtags_design/hashtags-show/HashtagsShowFeed";
const index = () => {
  return (
    <PrivateRoutes>
      <HashtagsShowFeed />
    </PrivateRoutes>
  );
};

export default index;
