import React from "react";
import PrivateRoutes from "../../../../../components/auth/routes/PrivateRoutes";
import GroupAdminsFeed from "../../../../../components/group/admin-view/group-members/group-admins/GroupAdminsFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <GroupAdminsFeed />
    </PrivateRoutes>
  );
};

export default index;
