import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import FollowingsFeed from "../../../components/my-network/FollowingsFeed";
const index = () => {
  return (
    <PrivateRoutes>
      <FollowingsFeed />
    </PrivateRoutes>
  );
};

export default index;
