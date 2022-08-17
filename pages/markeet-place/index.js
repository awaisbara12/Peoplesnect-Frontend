import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import MarkeetPlaceFeed from "../../components/markeetplace/MarkeetPlaceFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <MarkeetPlaceFeed />
    </PrivateRoutes>
  );
};

export default index;
