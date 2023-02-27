import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import ListingFeed from "../../../components/markeetplace/my-listing/ListingFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <ListingFeed />
    </PrivateRoutes>
  );
};

export default index;
