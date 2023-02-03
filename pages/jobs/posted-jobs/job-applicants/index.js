import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import JobsApplicantFeed from "../../../../components/jobs/Posted-Jobs/Jobs Applicants/JobsApplicantFeed";
const index = () => {
  return (
    <PrivateRoutes>
      <JobsApplicantFeed/>
    </PrivateRoutes>
  );
};

export default index;
