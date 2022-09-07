import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import InboxFeed from "../../../components/Messaging-design/Inbox-Feed/InboxFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <InboxFeed />
    </PrivateRoutes>
  );
};

export default index;
