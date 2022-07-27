import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import NewJobsFeed from "../../components/jobs/NewJobsFeed";
const index = () => {
  return (
    <PrivateRoutes>
      <NewJobsFeed />
    </PrivateRoutes>
  );
};

export default index;
