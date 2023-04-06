import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import ProductsListFeed from "../../../components/Admin-view/Products-List/ProductsListFeed";

const index = () => {
  return (
    <PrivateRoutes >
      <ProductsListFeed />
    </PrivateRoutes>
  );
};

export default index;