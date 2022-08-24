import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import ProfileViewFeed from "../../components/profile/ProfileViewFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <ProfileViewFeed />
    </PrivateRoutes>
  );
};

export default index;
