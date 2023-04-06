import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import AdminRolesFeed from "../../../components/Admin-view/Admins-roles/AdminRolesFeed";

const index = () => {
  return (
    <PrivateRoutes >
      <AdminRolesFeed />
    </PrivateRoutes>
  );
};

export default index;
