import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import BlockedFeed from "../../../components/settings/Blocked/BlockedFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <BlockedFeed/>
    </PrivateRoutes>
  );
};

export default index;
