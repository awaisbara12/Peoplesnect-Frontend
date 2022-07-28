import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import GroupsPageFeed from "../../components/group/GroupsPageFeed";
const index = () => {
  return (
    <PrivateRoutes>
      <GroupsPageFeed />
    </PrivateRoutes>
  );
};

export default index;
