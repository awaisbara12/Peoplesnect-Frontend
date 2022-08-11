import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import PendingGroupRequestFeed from "../../../../components/group/admin-view/pending-request/PendingGroupRequestFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <PendingGroupRequestFeed />
    </PrivateRoutes>
  );
};

export default index;
