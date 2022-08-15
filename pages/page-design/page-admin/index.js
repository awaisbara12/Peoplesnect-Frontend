import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import PageAdminFeed from "../../../components/page-design/page-admin/PageAdminFeed";

const index = () => {
  return (
    <PrivateRoutes>
    <PageAdminFeed/>
    </PrivateRoutes>
  );
};

export default index;
