import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import NewGroupFeed from "../../../components/group/new-group/NewGroupFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <NewGroupFeed />
    </PrivateRoutes>
  );
};

export default index;
