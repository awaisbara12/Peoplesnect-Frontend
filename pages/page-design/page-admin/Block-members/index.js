import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import BlockMembersFeed from "../../../../components/page-design/page-admin/Block-members/BlockMembersFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <BlockMembersFeed />
    </PrivateRoutes>
  );
};

export default index;
