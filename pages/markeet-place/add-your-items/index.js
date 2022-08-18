import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import AddYourItemsFeed from "../../../components/markeetplace/add-your-items/AddYourItemsFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <AddYourItemsFeed />
    </PrivateRoutes>
  );
};

export default index;
