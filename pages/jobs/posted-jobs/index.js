import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import PostedJobsFeed from "../../../components/jobs/Posted-Jobs/PostedJobsFeed";
const index = () => {
  return (
    <PrivateRoutes>
      <PostedJobsFeed />
    </PrivateRoutes>
  );
};

export default index;
