import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import SavedJobsFeed from "../../../components/jobs/Saved-Jobs/SavedJobsFeed";
const index = () => {
  return (
    <PrivateRoutes>
      <SavedJobsFeed />
    </PrivateRoutes>
  );
};

export default index;
