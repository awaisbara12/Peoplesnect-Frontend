import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import MessagingFeed from "../../components/Messaging-design/MessagingFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <MessagingFeed />
    </PrivateRoutes>
  );
};

export default index;
