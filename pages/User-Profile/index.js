import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import UserProfileViewFeed from "../../components/User-Profile/UserProfileViewFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <UserProfileViewFeed />
    </PrivateRoutes>
  );
};

export default index;
