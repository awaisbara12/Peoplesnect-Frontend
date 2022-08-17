import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import GroupMembersFeed from "../../../../components/group/admin-view/group-members/GroupMembersFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <GroupMembersFeed />
    </PrivateRoutes>
  );
};

export default index;
