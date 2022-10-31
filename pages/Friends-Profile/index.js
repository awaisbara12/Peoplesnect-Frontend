import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import FriendsProfileViewFeed from "../../components/Friends-Profile/FriendsProfileViewFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <FriendsProfileViewFeed />
    </PrivateRoutes>
  );
};

export default index;
