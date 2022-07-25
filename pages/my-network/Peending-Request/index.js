import React from "react";
import RequestFeed from "../../../components/my-network/RequestFeed";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
const index = () => {
  return (
    <PrivateRoutes>
      <RequestFeed />
    </PrivateRoutes>
  );
};

export default index;