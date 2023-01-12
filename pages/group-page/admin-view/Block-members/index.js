import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import BlockMembersFeed from "../../../../components/group/admin-view/Block-members/BlockMembersFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <BlockMembersFeed />
    </PrivateRoutes>
  );
};

export default index;
