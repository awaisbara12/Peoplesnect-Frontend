import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import GroupMembersFeed from "../../../../components/group/joind-group/group-members/GroupMembersFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <GroupMembersFeed/>
    </PrivateRoutes>
  );
};

export default index;
