import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import JobsShowFeed from "../../../components/jobs/Jobs-Show/JobsShowFeed";
const index = () => {
  return (
    <PrivateRoutes>
      <JobsShowFeed/>
    </PrivateRoutes>
  );
};

export default index;
