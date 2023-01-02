import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import PageMembersFeed from "../../../../components/page-design/page-admin/page-members/PageMembersFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <PageMembersFeed />
    </PrivateRoutes>
  );
};

export default index;
