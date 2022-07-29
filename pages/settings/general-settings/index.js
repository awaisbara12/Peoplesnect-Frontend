import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import GeneralSettingsFeed from "../../../components/settings/genral-settings/GeneralSettingsFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <GeneralSettingsFeed />
    </PrivateRoutes>
  );
};

export default index;
