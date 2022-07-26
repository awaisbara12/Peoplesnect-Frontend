import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import NotificationsFeed from "../../components/notifications/NotificationsFeed";
const index = () => {
  return (
    <PrivateRoutes>
      <NotificationsFeed/>
    </PrivateRoutes>
  );
};

export default index;
