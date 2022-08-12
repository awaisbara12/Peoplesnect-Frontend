import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import GroupsFeed from "../../components/group/GroupsFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <GroupsFeed />
    </PrivateRoutes>
  );
};

export default index;
