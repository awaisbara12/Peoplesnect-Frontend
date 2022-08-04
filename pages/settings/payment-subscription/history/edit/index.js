import React from "react";
import PrivateRoutes from "../../../../../components/auth/routes/PrivateRoutes";
import EditFeed from "../../../../../components/settings/payment-subscription/history/edit/EditFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <EditFeed />
    </PrivateRoutes>
  );
};

export default index;
