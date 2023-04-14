import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import AdminViewFeed from "../../components/Admin-view/AdminViewFeed";

const index = () => {
  return (
    <PrivateRoutes >
      <AdminViewFeed />
    </PrivateRoutes>
  );
};

export default index;
