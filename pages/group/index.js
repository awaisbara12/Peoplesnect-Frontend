import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import GroupFeed from "../../components/groups/GroupsFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <GroupFeed />
    </PrivateRoutes>
  );
};

export default index;
