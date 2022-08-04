import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import HistoryFeed from "../../../../components/settings/payment-subscription/history/HistoryFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <HistoryFeed />
    </PrivateRoutes>
  );
};

export default index;
