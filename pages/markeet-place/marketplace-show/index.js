import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import MarketplaceShowFeed from "../../../components/markeetplace/marketplace-show/MarketplaceShowFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <MarketplaceShowFeed />
    </PrivateRoutes>
  );
};

export default index;
