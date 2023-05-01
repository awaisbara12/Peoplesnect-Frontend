import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import EditGroupsFeed from "../../../../components/Admin-view/Group-List/Edit-Groups/EditGroupsFeed";

const index = () => {
  return (
    <PrivateRoutes >
        <EditGroupsFeed/>
    </PrivateRoutes>
  );
};

export default index;