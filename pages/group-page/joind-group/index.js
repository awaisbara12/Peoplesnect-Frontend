import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import JoindGroupFeed from "../../../components/group/joind-group/JoindGroupFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <JoindGroupFeed />
    </PrivateRoutes>
  );
};

export default index;
