import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import AccountManagmentFeed from "../../../components/settings/account-managment/AccountManagmentFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <AccountManagmentFeed />
    </PrivateRoutes>
  );
};

export default index;
