import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import HashtagsListFeed from "../../../components/Admin-view/Hashtags-List/HashtagsListFeed";

const index = () => {
  return (
    <PrivateRoutes >
      <HashtagsListFeed />
    </PrivateRoutes>
  );
};

export default index;