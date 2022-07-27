import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import EventViewFeed from "../../components/Event-view/EventViewFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <EventViewFeed />
    </PrivateRoutes>
  );
};

export default index;
