import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import EditProductsFeed from "../../../../components/Admin-view/Products-List/Edit-Products/EditProductsFeed";

const index = () => {
  return (
    <PrivateRoutes >
        <EditProductsFeed />
    </PrivateRoutes>
  );
};

export default index;