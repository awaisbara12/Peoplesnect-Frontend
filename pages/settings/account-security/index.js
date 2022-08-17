import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import AccountSecurityFeed from "../../../components/settings/account-security/AccountSecurityFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <AccountSecurityFeed />
    </PrivateRoutes>
  );
};

export default index;
