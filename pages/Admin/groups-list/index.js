import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import GroupsListFeed from "../../../components/Admin-view/Group-List/GroupsListFeed";

const index = () => {
  return (
    <PrivateRoutes >
      <GroupsListFeed />
    </PrivateRoutes>
  );
};

export default index;
