import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import PageNotificationsFeed from "../../../../components/page-design/page-admin/page-notifications/PageNotificationsFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <PageNotificationsFeed />
    </PrivateRoutes>
  );
};

export default index;
