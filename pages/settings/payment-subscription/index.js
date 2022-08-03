import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import PaymentSubscriptionFeed from "../../../components/settings/payment-subscription/PaymentSubscriptionFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <PaymentSubscriptionFeed />
    </PrivateRoutes>
  );
};

export default index;
