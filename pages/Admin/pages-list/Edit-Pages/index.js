import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import EditPagesFeed from "../../../../components/Admin-view/Pages-List/Edit-Pages/EditPagesFeed";


const index = () => {
  return (
    <PrivateRoutes >
        <EditPagesFeed />
    </PrivateRoutes>
  );
};

export default index;