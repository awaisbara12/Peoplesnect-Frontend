import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import CategoryFeed from "../../../components/markeetplace/category/CategoryFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <CategoryFeed />
    </PrivateRoutes>
  );
};

export default index;
