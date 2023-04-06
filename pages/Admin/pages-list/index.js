import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import PagesListFeed from "../../../components/Admin-view/Pages-List/PagesListFeed";

const index = () => {
  return (
    <PrivateRoutes >
      <PagesListFeed />
    </PrivateRoutes>
  );
};

export default index;