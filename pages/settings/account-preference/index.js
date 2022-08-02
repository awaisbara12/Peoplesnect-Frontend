import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import AccountPreferencesFeed from "../../../components/settings/account-preferences/AccountPreferencesFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <AccountPreferencesFeed />
    </PrivateRoutes>
  );
};

export default index;
