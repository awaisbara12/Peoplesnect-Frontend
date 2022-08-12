import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import GroupSettingsFeed from "../../../../components/group/admin-view/group-settings/GoupSettingsFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <GroupSettingsFeed />
    </PrivateRoutes>
  );
};

export default index;
