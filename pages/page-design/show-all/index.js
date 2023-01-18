import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import ShowAllFeed from "../../../components/page-design/show-all/ShowAllFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <ShowAllFeed />
    </PrivateRoutes>
  );
};

export default index;
