import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import SettingFeed from "../../components/settings/SettingFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <SettingFeed />
    </PrivateRoutes>
  );
};

export default index;
