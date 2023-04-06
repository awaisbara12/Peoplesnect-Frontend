import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import ReportsFeed from "../../../components/Admin-view/Reports/RepotsFeed";

const index = () => {
  return (
    <PrivateRoutes >
      <ReportsFeed />
    </PrivateRoutes>
  );
};

export default index;