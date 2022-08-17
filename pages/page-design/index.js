import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import MainPageFeed from "../../components/page-design/MainPageFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <MainPageFeed />
    </PrivateRoutes>
  );
};

export default index;
