import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import AddSkilsFeed from "../../../components/Admin-view/add-skills/AddSkilsFeed";

const index = () => {
  return (
    <PrivateRoutes >
      <AddSkilsFeed />
    </PrivateRoutes>
  );
};

export default index;