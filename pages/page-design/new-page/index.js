import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import NewPageFeed from "../../../components/page-design/new-page/NewPageFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <NewPageFeed />
    </PrivateRoutes>
  );
};

export default index;
