import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import PersonalInfoFeed from "../../../components/settings/personal-info/PersonalInfoFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <PersonalInfoFeed />
    </PrivateRoutes>
  );
};

export default index;
