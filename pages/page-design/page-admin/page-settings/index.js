import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import PageSettingsFeed from "../../../../components/page-design/page-admin/page-settings/PageSettingsFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <PageSettingsFeed />
    </PrivateRoutes>
  );
};

export default index;
