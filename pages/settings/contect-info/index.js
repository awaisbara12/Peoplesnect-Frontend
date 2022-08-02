import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import ContectInfoFeed from "../../../components/settings/contect-info/ContectInfoFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <ContectInfoFeed />
    </PrivateRoutes>
  );
};

export default index;
