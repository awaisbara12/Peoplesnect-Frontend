import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import MyNetWorkFeed from "../../components/my-network/MyNetWorkFeed";
const index = () => {
  return (
    <PrivateRoutes>
      <MyNetWorkFeed/>
    </PrivateRoutes>
  );
};

export default index;
