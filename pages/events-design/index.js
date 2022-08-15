import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import MainEventsFeed from "../../components/events-design/MainEventsFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <MainEventsFeed />
    </PrivateRoutes>
  );
};

export default index;
