import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import JobsListFeed from "../../../components/Admin-view/Jobs-List/JobsListFeed";

const index = () => {
  return (
    <PrivateRoutes >
      <JobsListFeed />
    </PrivateRoutes>
  );
};

export default index;